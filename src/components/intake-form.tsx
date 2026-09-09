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

const FIELD_ORDER: Array<keyof FormState> = ["name", "email", "role", "track", "goals"]

export function IntakeForm() {
  const [values, setValues] = useState<FormState>(EMPTY)
  const [status, setStatus] = useState<"idle" | "error" | "success">("idle")
  const [message, setMessage] = useState<string | null>(null)
  const [invalid, setInvalid] = useState<Partial<Record<keyof FormState, boolean>>>({})
  const errorId = useId()
  const successHeadingRef = useRef<HTMLHeadingElement>(null)
  const nameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const roleRef = useRef<HTMLInputElement>(null)
  const trackRef = useRef<HTMLSelectElement>(null)
  const goalsRef = useRef<HTMLTextAreaElement>(null)

  const fieldRefs: Record<keyof FormState, React.RefObject<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | null>> = {
    name: nameRef,
    email: emailRef,
    role: roleRef,
    track: trackRef,
    goals: goalsRef,
  }

  useEffect(() => {
    if (status === "success") {
      successHeadingRef.current?.focus()
    }
  }, [status])

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setValues((current) => ({ ...current, [key]: value }))
    if (status === "error") {
      setInvalid((current) => ({ ...current, [key]: false }))
      setStatus("idle")
      setMessage(null)
    }
  }

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const missing = FIELD_ORDER.filter((key) => values[key].trim().length === 0)
    if (missing.length > 0) {
      const nextInvalid = Object.fromEntries(missing.map((key) => [key, true])) as Partial<
        Record<keyof FormState, boolean>
      >
      setInvalid(nextInvalid)
      setStatus("error")
      setMessage("Fill every field. Incomplete intake wastes both of our time.")
      queueMicrotask(() => fieldRefs[missing[0]]?.current?.focus())
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
      setInvalid({ email: true })
      setStatus("error")
      setMessage("That email does not look usable. Check it and try again.")
      queueMicrotask(() => emailRef.current?.focus())
      return
    }
    setInvalid({})
    setStatus("success")
    setMessage(null)
  }

  function describedBy(field: keyof FormState) {
    return status === "error" && invalid[field] ? errorId : undefined
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
      <div className="rounded-lg border border-ember/25 bg-iron/50 p-6 md:p-8" role="status">
        <p className="font-mono text-[0.68rem] tracking-[0.18em] text-ember-hot uppercase">
          Intake received
        </p>
        <h2
          ref={successHeadingRef}
          tabIndex={-1}
          className="mt-3 font-heading text-2xl text-cream outline-none"
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
            className="inline-flex h-auto rounded-sm bg-ember-fill px-5 py-3 text-sm font-semibold text-cream hover:bg-ember-fill-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-hot focus-visible:ring-offset-2 focus-visible:ring-offset-forge"
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
              setInvalid({})
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
          ref={nameRef}
          id="name"
          name="name"
          autoComplete="name"
          value={values.name}
          aria-required="true"
          aria-invalid={invalid.name ? true : undefined}
          aria-describedby={describedBy("name")}
          onChange={(event) => update("name", event.target.value)}
          className="h-10 rounded-sm border-ember/30 bg-forge text-cream"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="email" className="text-cream">
          Email
        </Label>
        <Input
          ref={emailRef}
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          value={values.email}
          aria-required="true"
          aria-invalid={invalid.email ? true : undefined}
          aria-describedby={describedBy("email")}
          onChange={(event) => update("email", event.target.value)}
          className="h-10 rounded-sm border-ember/30 bg-forge text-cream"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="role" className="text-cream">
          Current role
        </Label>
        <Input
          ref={roleRef}
          id="role"
          name="role"
          value={values.role}
          aria-required="true"
          aria-invalid={invalid.role ? true : undefined}
          aria-describedby={describedBy("role")}
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
          ref={trackRef}
          id="track"
          name="track"
          value={values.track}
          aria-required="true"
          aria-invalid={invalid.track ? true : undefined}
          aria-describedby={describedBy("track")}
          onChange={(event) => update("track", event.target.value)}
          className="h-10 rounded-sm border border-ember/30 bg-forge px-2.5 text-sm text-cream outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
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
          ref={goalsRef}
          id="goals"
          name="goals"
          value={values.goals}
          aria-required="true"
          aria-invalid={invalid.goals ? true : undefined}
          aria-describedby={describedBy("goals")}
          onChange={(event) => update("goals", event.target.value)}
          className="min-h-28 rounded-sm border-ember/30 bg-forge text-cream"
        />
      </div>
      {status === "error" && message ? (
        <p
          id={errorId}
          className="rounded-sm border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-cream"
          role="alert"
        >
          {message}
        </p>
      ) : null}
      <Button
        type="submit"
        className="h-auto w-fit rounded-sm bg-ember-fill px-5 py-3 text-cream hover:bg-ember-fill-hover"
      >
        Send intake
      </Button>
    </form>
  )
}
