"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { INTAKE_TRACKS } from "@/lib/mentorship"
import { SITE } from "@/lib/site"

type FormState = {
  name: string
  email: string
  role: string
  track: string
  goals: string
}

const EMPTY: FormState = {
  name: "",
  email: "",
  role: "",
  track: "",
  goals: "",
}

export function IntakeForm() {
  const [values, setValues] = useState<FormState>(EMPTY)
  const [status, setStatus] = useState<"idle" | "error" | "success">("idle")
  const [message, setMessage] = useState<string | null>(null)

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setValues((current) => ({ ...current, [key]: value }))
    if (status === "error") {
      setStatus("idle")
      setMessage(null)
    }
  }

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const missing = (Object.keys(EMPTY) as Array<keyof FormState>).filter(
      (key) => values[key].trim().length === 0,
    )
    if (missing.length > 0) {
      setStatus("error")
      setMessage("Fill every field. Incomplete intake wastes both of our time.")
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
      setStatus("error")
      setMessage("That email does not look usable. Check it and try again.")
      return
    }
    setStatus("success")
    setMessage(null)
  }

  if (status === "success") {
    const draft = [
      `Hi Ryan — I'm ${values.name}.`,
      `Current role: ${values.role}`,
      `Track: ${INTAKE_TRACKS.find((track) => track.id === values.track)?.label ?? values.track}`,
      `Goals: ${values.goals}`,
      `Email: ${values.email}`,
    ].join("\n")

    return (
      <div className="rounded-lg border border-ember/25 bg-iron/50 p-6 md:p-8">
        <p className="font-mono text-[0.68rem] tracking-[0.18em] text-ember uppercase">
          Intake received
        </p>
        <h2 className="mt-3 font-heading text-2xl text-cream">I have what I need to reply.</h2>
        <p className="mt-3 text-sm leading-relaxed text-ash">
          This site does not store the form on a server. Send the note on LinkedIn — or copy the
          draft below — so it actually reaches me.
        </p>
        <pre className="mt-6 overflow-x-auto whitespace-pre-wrap rounded-sm border border-ember/20 bg-forge p-4 font-mono text-xs leading-relaxed text-parchment">
          {draft}
        </pre>
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={SITE.linkedin}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-auto rounded-sm bg-ember px-5 py-3 text-sm font-semibold text-cream hover:bg-ember-hot"
          >
            Open LinkedIn
          </a>
          <Button
            type="button"
            variant="outline"
            className="h-auto rounded-sm border-ash/40 bg-transparent px-5 py-3 text-cream hover:bg-iron hover:text-cream"
            onClick={() => {
              setValues(EMPTY)
              setStatus("idle")
            }}
          >
            Submit another
          </Button>
        </div>
      </div>
    )
  }

  return (
    <form
      onSubmit={onSubmit}
      className="grid gap-5 rounded-lg border border-ember/25 bg-iron/50 p-6 md:p-8"
      noValidate
    >
      <div className="grid gap-2">
        <Label htmlFor="name" className="text-cream">
          Name
        </Label>
        <Input
          id="name"
          name="name"
          autoComplete="name"
          value={values.name}
          onChange={(event) => update("name", event.target.value)}
          className="h-10 rounded-sm border-ember/30 bg-forge text-cream"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="email" className="text-cream">
          Email
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          value={values.email}
          onChange={(event) => update("email", event.target.value)}
          className="h-10 rounded-sm border-ember/30 bg-forge text-cream"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="role" className="text-cream">
          Current role
        </Label>
        <Input
          id="role"
          name="role"
          value={values.role}
          onChange={(event) => update("role", event.target.value)}
          placeholder="Lone writer, senior writer, career changer…"
          className="h-10 rounded-sm border-ember/30 bg-forge text-cream placeholder:text-steel"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="track" className="text-cream">
          Track
        </Label>
        <select
          id="track"
          name="track"
          value={values.track}
          onChange={(event) => update("track", event.target.value)}
          className="h-10 rounded-sm border border-ember/30 bg-forge px-2.5 text-sm text-cream"
        >
          <option value="">Select a track</option>
          {INTAKE_TRACKS.map((track) => (
            <option key={track.id} value={track.id}>
              {track.label}
            </option>
          ))}
        </select>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="goals" className="text-cream">
          What do you want to be true in six months?
        </Label>
        <Textarea
          id="goals"
          name="goals"
          value={values.goals}
          onChange={(event) => update("goals", event.target.value)}
          className="min-h-28 rounded-sm border-ember/30 bg-forge text-cream"
        />
      </div>
      {status === "error" && message ? (
        <p className="rounded-sm border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-cream" role="alert">
          {message}
        </p>
      ) : null}
      <Button
        type="submit"
        className="h-auto w-fit rounded-sm bg-ember px-5 py-3 text-cream hover:bg-ember-hot"
      >
        Send intake
      </Button>
    </form>
  )
}
