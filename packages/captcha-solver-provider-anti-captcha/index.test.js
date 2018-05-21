'use strict'

const { test } = require('ava')

const CaptchaSolverProviderAntiCaptcha = require('.')

test('require api key', async (t) => {
  t.throws(() => new CaptchaSolverProviderAntiCaptcha())
  t.notThrows(() => new CaptchaSolverProviderAntiCaptcha({ key: 'foo' }))
})

test('basic', async (t) => {
  const provider = new CaptchaSolverProviderAntiCaptcha({ key: 'foo' })

  t.is(provider.name, 'anti-captcha')
  t.true(provider.supportedTaskTypes.has('image-to-text'))

  await t.throws(provider.createTask())
  await t.throws(provider.getTaskResult())
})
