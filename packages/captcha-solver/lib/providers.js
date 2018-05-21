'use strict'

const ow = require('ow')
const CaptchaSolverProviderAntiCaptcha = require('captcha-solver-provider-anti-captcha')
// const CaptchaSolverProviderBrowser = require('captcha-solver-provider-browser')

exports.providers = {
  'anti-captcha': CaptchaSolverProviderAntiCaptcha
}

exports.getProviderByName = (name, opts) => {
  ow(name, ow.string.nonEmpty)
  const Provider = module.exports.providers[name.toLowerCase()]

  if (!Provider) throw new Error(`unrecognized provider name "${name}"`)
  return new Provider(opts)
}
