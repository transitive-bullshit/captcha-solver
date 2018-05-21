'use strict'

const { test } = require('ava')
const CaptchaSolverProviderAntiCaptcha = require('captcha-solver-provider-anti-captcha')
// const CaptchaSolverProviderBrowser = require('captcha-solver-provider-browser')

const factory = require('./providers')

test('anti-captcha', (t) => {
  t.is(factory.providers['anti-captcha'], CaptchaSolverProviderAntiCaptcha)
  t.true(factory.getProviderByName('anti-captcha', {
    key: 'foo'
  }) instanceof CaptchaSolverProviderAntiCaptcha)
})

/*
test('browser', (t) => {
  t.is(factory.providers['browser'], CaptchaSolverProviderBrowser)
  t.true(factory.getProviderByName('browser') instanceof CaptchaSolverProviderBrowser)
})
*/

test('unrecognized provider', (t) => {
  t.throws(() => factory.getProviderByName('nala'))
})
