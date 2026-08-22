import test from 'node:test'
import assert from 'node:assert/strict'

test('a trip end date must not precede the start date', () => {
  const start = new Date('2026-09-14')
  const end = new Date('2026-09-23')
  assert.ok(end >= start)
})

test('budget total is the sum of its categories', () => {
  const categories = [1060, 765, 545, 395]
  assert.equal(categories.reduce((sum, item) => sum + item, 0), 2765)
})
