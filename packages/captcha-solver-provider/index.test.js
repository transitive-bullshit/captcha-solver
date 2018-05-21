'use strict'

const { test } = require('ava')

const CaptchaSolverProvider = require('.')

test('basic', async (t) => {
  const provider = new CaptchaSolverProvider()

  t.throws(() => provider.name)
  t.throws(() => provider.supportedTaskTypes)

  await t.throws(provider.createTask())
  await t.throws(provider.getTaskResult())
})
