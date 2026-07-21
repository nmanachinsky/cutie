import type { FlagValue } from './types'

const OPERATORS = ['>=', '<=', '==', '!=', '>', '<'] as const
type Operator = (typeof OPERATORS)[number]

function parseLiteral(raw: string): FlagValue {
  const trimmed = raw.trim()
  if (trimmed === 'true') return true
  if (trimmed === 'false') return false
  const asNumber = Number(trimmed)
  if (!Number.isNaN(asNumber) && trimmed !== '') return asNumber
  return trimmed.replace(/^['"]|['"]$/g, '')
}

function compare(flagValue: FlagValue | undefined, operator: Operator, literal: FlagValue): boolean {
  const left = flagValue ?? 0
  switch (operator) {
    case '>=':
      return left >= literal
    case '<=':
      return left <= literal
    case '==':
      return left === literal
    case '!=':
      return left !== literal
    case '>':
      return left > literal
    case '<':
      return left < literal
  }
}

function evaluateComparison(expression: string, flags: Record<string, FlagValue>): boolean {
  const operator = OPERATORS.find((op) => expression.includes(op))
  if (!operator) return Boolean(flags[expression.trim()])

  const [flagName, rawLiteral] = expression.split(operator)
  return compare(flags[flagName.trim()], operator, parseLiteral(rawLiteral))
}

/** Safe condition evaluator for scene JSON — no `eval`, supports `&&`-joined comparisons like "affection >= 3 && metCat == true". */
export function evaluateCondition(condition: string | undefined, flags: Record<string, FlagValue>): boolean {
  if (!condition) return true
  return condition
    .split('&&')
    .every((part) => evaluateComparison(part.trim(), flags))
}
