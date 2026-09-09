"use client"

import Link from "next/link"
import { useEffect, useMemo, useRef, useState } from "react"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  ASSESSMENT_QUESTIONS,
  isCompleteAssessment,
  scoreAssessment,
} from "@/lib/assessment"
import { DMF_LEVELS } from "@/lib/dmf"
import { cn } from "@/lib/utils"

type Status = "idle" | "in-progress" | "error" | "result"

export function AssessmentQuiz() {
  const [answers, setAnswers] = useState<Array<number | null>>(
    () => Array.from({ length: ASSESSMENT_QUESTIONS.length }, () => null),
  )
  const [index, setIndex] = useState(0)
  const [status, setStatus] = useState<Status>("idle")
  const [error, setError] = useState<string | null>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const errorRef = useRef<HTMLParagraphElement>(null)
  const resultRef = useRef<HTMLHeadingElement>(null)
  const previousIndex = useRef(0)

  const question = ASSESSMENT_QUESTIONS[index]
  const answeredCount = answers.filter((answer) => answer !== null).length
  const result = useMemo(() => {
    if (status !== "result" || !isCompleteAssessment(answers)) return null
    try {
      return scoreAssessment(answers)
    } catch {
      return null
    }
  }, [answers, status])

  useEffect(() => {
    if (status === "error") {
      errorRef.current?.focus()
    } else if (status === "result") {
      resultRef.current?.focus()
    } else if (previousIndex.current !== index) {
      headingRef.current?.focus()
    }
    previousIndex.current = index
  }, [index, status])

  function selectOption(level: number) {
    setError(null)
    setStatus("in-progress")
    setAnswers((current) => {
      const next = [...current]
      next[index] = level
      return next
    })
  }

  function goNext() {
    if (answers[index] === null) {
      setError("Pick the option that is true most of the time — not the one you wish were true.")
      setStatus("error")
      return
    }
    setError(null)
    if (index < ASSESSMENT_QUESTIONS.length - 1) {
      setIndex((value) => value + 1)
      setStatus("in-progress")
      return
    }
    if (!isCompleteAssessment(answers)) {
      const firstMissing = answers.findIndex((answer) => answer === null)
      setIndex(firstMissing === -1 ? 0 : firstMissing)
      setError("Every question needs an answer before we can score the system.")
      setStatus("error")
      return
    }
    setStatus("result")
  }

  function goBack() {
    setError(null)
    setStatus("in-progress")
    setIndex((value) => Math.max(0, value - 1))
  }

  function reset() {
    setAnswers(Array.from({ length: ASSESSMENT_QUESTIONS.length }, () => null))
    setIndex(0)
    setStatus("idle")
    setError(null)
  }

  if (status === "result" && result) {
    return (
      <div className="rounded-lg border border-ember/25 bg-iron/50 p-6 md:p-10">
        <p className="font-mono text-[0.68rem] tracking-[0.18em] text-ember-hot uppercase">
          Assessment result
        </p>
        <h2
          ref={resultRef}
          tabIndex={-1}
          className="mt-3 font-heading text-4xl tracking-tight text-cream"
        >
          Level {result.level.code} · {result.level.name}
        </h2>
        <p className="mt-2 font-mono text-xs text-ash" role="status">
          Average score {result.average} / 5 across {ASSESSMENT_QUESTIONS.length} questions
        </p>
        <p className="mt-6 max-w-2xl text-[0.95rem] leading-relaxed text-ash">
          {result.level.summary}
        </p>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-cream/90">
          {result.level.nextMove}
        </p>

        <div className="mt-8 grid gap-2">
          {DMF_LEVELS.map((level) => {
            const current = level.id === result.levelId
            return (
              <div
                key={level.id}
                className={cn(
                  "flex items-center justify-between rounded-sm border px-3 py-2 text-sm",
                  current
                    ? "border-ember/50 bg-ember/15 text-spark"
                    : "border-ember/15 text-ash",
                )}
                aria-current={current ? "true" : undefined}
              >
                <span>
                  {level.code} {level.name}
                </span>
                {current ? <span className="font-mono text-xs">You are here</span> : null}
              </div>
            )
          })}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/framework"
            className={cn(
              buttonVariants(),
              "h-auto rounded-sm bg-ember-deep px-5 py-3 text-cream hover:bg-ember-fill",
            )}
          >
            Read the framework
          </Link>
          <Link
            href="/mentorship"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "h-auto rounded-sm border-ash/40 bg-transparent px-5 py-3 text-cream hover:border-ash hover:bg-transparent hover:text-cream",
            )}
          >
            Talk through the gap
          </Link>
          <Button
            type="button"
            variant="ghost"
            className="h-auto rounded-sm px-5 py-3 text-ash hover:bg-iron hover:text-cream"
            onClick={reset}
          >
            Retake assessment
          </Button>
        </div>
      </div>
    )
  }

  const promptId = `${question.id}-prompt`
  const helpId = `${question.id}-help`
  const errorId = "assessment-error"

  return (
    <div className="rounded-lg border border-ember/25 bg-iron/50 p-6 md:p-10">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <p className="font-mono text-[0.68rem] tracking-[0.18em] text-ember-hot uppercase">
          Question {index + 1} of {ASSESSMENT_QUESTIONS.length}
        </p>
        <p className="text-xs text-ash" aria-live="polite">
          {answeredCount} answered
        </p>
      </div>

      <div
        className="mb-6 h-1 overflow-hidden rounded-full bg-forge"
        role="progressbar"
        aria-label="Assessment progress"
        aria-valuemin={0}
        aria-valuemax={ASSESSMENT_QUESTIONS.length}
        aria-valuenow={answeredCount}
      >
        <div
          className="h-full bg-ember-hot motion-safe:transition-[width]"
          style={{ width: `${(answeredCount / ASSESSMENT_QUESTIONS.length) * 100}%` }}
        />
      </div>

      {status === "idle" ? (
        <p className="mb-6 text-sm text-ash">
          Ten questions. Pick the answer that matches how the work actually happens, not the slide
          deck version.
        </p>
      ) : null}

      <h2
        id={promptId}
        ref={headingRef}
        tabIndex={-1}
        className="font-heading text-2xl tracking-tight text-cream md:text-3xl"
      >
        {question.prompt}
      </h2>
      <p id={helpId} className="mt-2 text-sm text-ash">
        {question.help}
      </p>

      <fieldset className="mt-8 grid gap-2" aria-labelledby={promptId} aria-describedby={helpId}>
        {question.options.map((option) => {
          const selected = answers[index] === option.level
          const optionId = `${question.id}-l${option.level}`
          return (
            <label
              key={option.level}
              htmlFor={optionId}
              className={cn(
                "flex cursor-pointer items-start gap-3 rounded-sm border px-4 py-3 text-sm leading-relaxed transition-colors",
                selected
                  ? "border-ember bg-ember/15 text-cream"
                  : "border-ember/20 text-ash hover:border-ember/40 hover:text-cream",
              )}
            >
              <input
                id={optionId}
                type="radio"
                className="mt-1 accent-[#f07020]"
                name={question.id}
                value={option.level}
                checked={selected}
                onChange={() => selectOption(option.level)}
              />
              <span>
                <span className="mr-2 font-mono text-[0.68rem] text-ember-hot">L{option.level}</span>
                {option.label}
              </span>
            </label>
          )
        })}
      </fieldset>

      {error ? (
        <p
          id={errorId}
          ref={errorRef}
          tabIndex={-1}
          className="mt-4 rounded-sm border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-cream"
          role="alert"
        >
          {error}
        </p>
      ) : null}

      <div className="mt-8 flex flex-wrap gap-3">
        <Button
          type="button"
          variant="outline"
          className="h-auto rounded-sm border-ash/40 bg-transparent px-5 py-3 text-cream hover:bg-iron hover:text-cream"
          onClick={goBack}
          disabled={index === 0}
        >
          Back
        </Button>
        <Button
          type="button"
          className="h-auto rounded-sm bg-ember-deep px-5 py-3 text-cream hover:bg-ember-fill"
          onClick={goNext}
          aria-describedby={error ? errorId : undefined}
        >
          {index === ASSESSMENT_QUESTIONS.length - 1 ? "See my level" : "Next question"}
        </Button>
      </div>
    </div>
  )
}
