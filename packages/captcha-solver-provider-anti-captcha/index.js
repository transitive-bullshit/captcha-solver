'use strict'

const ow = require('ow')
const request = require('request-promise-native').defaults({
  baseUrl: 'https://api.anti-captcha.com',
  json: true
})

const CaptchaSolverProvider = require('captcha-solver-provider')

const SUPPORTED_TASK_TYPES = new Set([
  'custom',
  'image-to-text',
  'recaptcha',
  'recaptcha-proxyless',
  'nocaptcha',
  'nocaptcha-proxyless',
  'funcaptcha',
  'funcaptcha-proxyless'
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

  get supportedTaskTypes () {
    return SUPPORTED_TASK_TYPES
  }

  /**
   * Creates a new captcha solving task.
   *
   * @param {object} opts - Options
   * @param {string} opts.type - Type of captcha to solve
   * @param {string} opts.image - Captcha image to process
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

    switch (opts.type) {
      case 'image-to-text':
        ow(opts.image, ow.string.nonEmpty.alphanumeric)
        body.task.type = 'ImageToTextTask'
        body.task.body = opts.image
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
      return result.taskId
    }
  }

  /**
   * Fetches the result of a previously created captcha solving task.
   *
   * @param {string} taskId - Unique task identifier
   */
  async getTaskResult (taskId) {
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
      return result.solution
    }
  }
}

module.exports = CaptchaSolverProviderAntiCaptcha
