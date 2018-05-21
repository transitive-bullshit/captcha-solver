'use strict'

const ow = require('ow')
const request = require('request-promise-native').defaults({
  baseUrl: 'https://api.anti-captcha.com',
  json: true
})

const CaptchaSolverProvider = require('captcha-solver-provider')

const SUPPORTED_TASK_TYPES = new Set([
  'image-to-text',
  'recaptcha',
  'recaptcha-proxyless',
  'nocaptcha',
  'nocaptcha-proxyless',
  'funcaptcha',
  'funcaptcha-proxyless'
  // TODO: support custom tasks
])

/**
 * Captcha solver provider for the anti-captcha service.
 *
 * @param {object} opts - Options
 * @param {string} opts.key - Client key.
 */
class CaptchaSolverProviderAntiCaptcha extends CaptchaSolverProvider {
  constructor (opts) {
    super(opts)

    ow(opts, ow.object.plain.nonEmpty)
    ow(opts.key, ow.string.nonEmpty)

    this._opts = opts
  }

  /**
   * Provider name.
   *
   * @member {string}
   */
  get name () {
    return 'anti-captcha'
  }

  /**
   * Set containing task types supported by this provider.
   *
   * @member {Set<string>}
   */
  get supportedTaskTypes () {
    return SUPPORTED_TASK_TYPES
  }

  /**
   * Creates a new captcha solving task.
   *
   * @param {object} opts - Options
   * @param {string} opts.type - Type of captcha to solve
   * @param {string} [opts.image] - Captcha image to process encoded as a base64 string
   *
   * @return {Promise<string>} Unique task identifier
   */
  async createTask (opts) {
    ow(opts, ow.object.plain.nonEmpty)
    ow(opts.type, ow.string.nonEmpty)

    const {
      type,
      image,
      ...rest
    } = opts

    const body = {
      clientKey: this._opts.key,
      task: rest
    }

    // we only validate required parameters
    // any optional parameters will be passed through untouched
    switch (opts.type) {
      case 'image-to-text':
        ow(opts.image, ow.string.nonEmpty)
        body.task.type = 'ImageToTextTask'
        body.task.body = opts.image
        break

      case 'nocaptcha':
      case 'recaptcha':
        ow(opts.websiteURL, ow.string.nonEmpty)
        ow(opts.websiteKey, ow.string.nonEmpty)
        ow(opts.proxyType, ow.string.nonEmpty)
        ow(opts.proxyAddress, ow.string.nonEmpty)
        ow(opts.proxyPort, ow.number.positive)
        ow(opts.userAgent, ow.string.nonEmpty)

        body.task.type = 'NoCaptchaTask'
        break

      case 'nocaptcha-proxyless':
      case 'recaptcha-proxyless':
        ow(opts.websiteURL, ow.string.nonEmpty)
        ow(opts.websiteKey, ow.string.nonEmpty)
        body.task.type = 'NoCaptchaTaskProxyless'
        break

      case 'funcaptcha':
        ow(opts.websiteURL, ow.string.nonEmpty)
        ow(opts.websitePublicKey, ow.string.nonEmpty)
        ow(opts.proxyType, ow.string.nonEmpty)
        ow(opts.proxyAddress, ow.string.nonEmpty)
        ow(opts.proxyPort, ow.number.positive)
        ow(opts.userAgent, ow.string.nonEmpty)

        body.task.type = 'FunCaptchaTask'
        break

      case 'funcaptcha-proxyless':
        ow(opts.websiteURL, ow.string.nonEmpty)
        ow(opts.websitePublicKey, ow.string.nonEmpty)

        body.task.type = 'FunCaptchaTaskProxyless'
        break

      default:
        throw new Error(`unsupported task type "${opts.type}"`)
    }

    const result = await request({
      method: 'POST',
      uri: '/createTask',
      body
    })

    if (result.errorId) {
      const err = new Error(result.errorDescription)
      err.code = result.errorCode
      throw err
    } else {
      return '' + result.taskId
    }
  }

  /**
   * Fetches the result of a previously created captcha solving task.
   *
   * @param {string} taskId - Unique task identifier
   *
   * @return {Promise<object>}
   */
  async getTaskResult (taskId) {
    ow(taskId, ow.string.nonEmpty)

    const result = await request({
      method: 'POST',
      uri: '/getTaskResult',
      body: {
        clientKey: this._opts.key,
        taskId
      }
    })

    if (result.errorId) {
      const err = new Error(result.errorDescription)
      err.code = result.errorCode
      throw err
    } else {
      return result
    }
  }
}

module.exports = CaptchaSolverProviderAntiCaptcha
