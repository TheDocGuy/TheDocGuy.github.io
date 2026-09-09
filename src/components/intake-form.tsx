"use client"

import { useEffect, useId, useRef, useState } from "react"
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

const FIELD_LABELS: Record<keyof FormState, string> = {
  name: "Name",
  email: "Email",
  role: "Current role",
  track: "Track",
  goals: "What do you want to be true in six months?",
}

export function IntakeForm() {
  const [values, setValues] = useState<FormState>(EMPTY)
  const [status, setStatus] = useState<"idle" | "error" | "success">("idle")
  const [message, setMessage] = useState<string | null>(null)
  const [invalid, setInvalid] = useState<Partial<Record<keyof FormState, boolean>>>({})
  const errorId = useId()
  const errorRef = useRef<HTMLParagraphElement>(null)
  const successHeadingRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    if (status === "error") errorRef.current?.focus()
    if (status === "success") successHeadingRef.current?.focus()
  }, [status])

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setValues((current) => ({ ...current, [key]: value }))
    if (status === "error") {
      setStatus("idle")
      setMessage(null)
      setInvalid({})
    }
  }

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const missing = (Object.keys(EMPTY) as Array<keyof FormState>).filter(
      (key) => values[key].trim().length === 0,
    )
    if (missing.length > 0) {
      const nextInvalid = Object.fromEntries(missing.map((key) => [key, true])) as Partial<
        Record<keyof FormState, boolean>
      >
      setInvalid(nextInvalid)
      setStatus("error")
      setMessage(
        missing.length === 1
          ? `Add ${FIELD_LABELS[missing[0]].toLowerCase()} before sending.`
          : "Fill every field. Incomplete intake wastes both of our time.",
      )
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
      setInvalid({ email: true })
      setStatus("error")
      setMessage("That email does not look usable. Check it and try again.")
      return
    }
    setInvalid({})
    setStatus("success")
    setMessage(null)
  }

  if (status === "success") {
    const trackLabel =
      INTAKE_TRACKS.find((track) => track.id === values.track)?.label ?? values.track
    const draft = [
      `Hi Ryan — I'm ${values.name}.`,
      `Current role: ${values.role}`,
      `Track: ${trackLabel}`,
      `Goals: ${values.goals}`,
      `Email: ${values.email}`,
    ].join("\n")

    return (
      <div className="rounded-lg border border-ember/25 bg-iron/50 p-6 md:p-8" role="status">
        <p className="font-mono text-[0.68rem] tracking-[0.18em] text-ember-hot uppercase">
          Intake received
        </p>
        <h2
          ref={successHeadingRef}
          tabIndex={-1}
          className="mt-3 font-heading text-2xl text-cream"
        >
          I have what I need to reply.
        </h2>
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
            className="inline-flex h-auto rounded-sm bg-ember-deep px-5 py-3 text-sm font-semibold text-cream hover:bg-ember-fill"
          >
            Open LinkedIn
            <span className="sr-only"> (opens in a new tab)</span>
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
      aria-describedby={status === "error" && message ? errorId : undefined}
    >
      <div className="grid gap-2">
        <Label htmlFor="name" className="text-cream">
          Name
        </Label>
        <Input
          id="name"
          name="name"
          autoComplete="name"
          required
          aria-required="true"
          aria-invalid={invalid.name || undefined}
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
          required
          aria-required="true"
          aria-invalid={invalid.email || undefined}
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
          required
          aria-required="true"
          aria-invalid={invalid.role || undefined}
          value={values.role}
          onChange={(event) => update("role", event.target.value)}
          placeholder="Lone writer, senior writer, career changer…"
          className="h-10 rounded-sm border-ember/30 bg-forge text-cream placeholder:text-ash"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="track" className="text-cream">
          Track
        </Label>
        <select
          id="track"
          name="track"
          required
          aria-required="true"
          aria-invalid={invalid.track || undefined}
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
          required
          aria-required="true"
          aria-invalid={invalid.goals || undefined}
          value={values.goals}
          onChange={(event) => update("goals", event.target.value)}
          className="min-h-28 rounded-sm border-ember/30 bg-forge text-cream"
        />
      </div>
      {status === "error" && message ? (
        <p
          id={errorId}
          ref={errorRef}
          tabIndex={-1}
          className="rounded-sm border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-cream"
          role="alert"
        >
          {message}
        </p>
      ) : null}
      <Button
        type="submit"
        className="h-auto w-fit rounded-sm bg-ember-deep px-5 py-3 text-cream hover:bg-ember-fill"
      >
        Send intake
      </Button>
    </form>
  )
}
