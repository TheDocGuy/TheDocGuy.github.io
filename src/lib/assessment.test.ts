import assert from "node:assert/strict"
import { test } from "node:test"
import { ASSESSMENT_QUESTIONS, isCompleteAssessment, scoreAssessment } from "./assessment"
import { DMF_LEVEL_NAMES, DMF_LEVELS, getDmfLevel } from "./dmf"

test("DMF ships five canonical levels in order", () => {
  assert.deepEqual(DMF_LEVEL_NAMES, [
    "Reactive",
    "Managed",
    "Structured",
    "Optimized",
    "Systemic",
  ])
  assert.equal(DMF_LEVELS.length, 5)
  assert.deepEqual(
    DMF_LEVELS.map((level) => level.id),
    [1, 2, 3, 4, 5],
  )
})

test("assessment has ten questions with five ranked options", () => {
  assert.equal(ASSESSMENT_QUESTIONS.length, 10)
  for (const question of ASSESSMENT_QUESTIONS) {
    assert.equal(question.options.length, 5)
    assert.deepEqual(
      question.options.map((option) => option.level),
      [1, 2, 3, 4, 5],
    )
  }
})

test("all ones scores Reactive", () => {
  const result = scoreAssessment(Array(10).fill(1))
  assert.equal(result.levelId, 1)
  assert.equal(result.level.name, "Reactive")
  assert.equal(result.average, 1)
})

test("all fives scores Systemic", () => {
  const result = scoreAssessment(Array(10).fill(5))
  assert.equal(result.levelId, 5)
  assert.equal(result.level.name, "Systemic")
})

test("mid mixed scores round to Structured", () => {
  const result = scoreAssessment([3, 3, 3, 3, 2, 3, 4, 3, 3, 3])
  assert.equal(result.level.name, "Structured")
  assert.equal(result.average, 3)
})

test("rejects the wrong number of answers", () => {
  assert.throws(() => scoreAssessment([1, 2, 3]), /Expected 10 answers/)
})

test("rejects out-of-range answers", () => {
  const answers = Array(10).fill(3)
  answers[4] = 9
  assert.throws(() => scoreAssessment(answers), /Invalid answer/)
})

test("incomplete answers are not scored", () => {
  assert.equal(isCompleteAssessment([1, 2, null, 4, 5, 1, 2, 3, 4, 5]), false)
  assert.equal(isCompleteAssessment(Array(10).fill(2)), true)
})

test("getDmfLevel rejects unknown ids", () => {
  assert.throws(() => getDmfLevel(8), /Unknown DMF level/)
})
