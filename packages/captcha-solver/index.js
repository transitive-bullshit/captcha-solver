'use strict'

const ow = require('ow')
const pRetry = require('p-retry')
const pTimeout = require('p-timeout')

const CaptchaSolverProvider = require('captcha-solver-provider')
const providers = require('./lib/providers')

/**
 * Main entrypoint for solving captchas.
 *
 * @param {string|CaptchaSolverProvider} provider - Name of built-in provider or an instance of
 * a custom provider to use for solving.
 */
class CaptchaSolver {
  constructor (provider, opts = { }) {
    this._provider = typeof provider === 'object'
      ? provider
      : providers.getProviderByName(provider, opts)
    ow(this._provider, ow.object.instanceOf(CaptchaSolverProvider))
    ow(opts, ow.object.plain)
  }

  /**
   * Provider powering this solver.
   *
   * @member {CaptchaSolverProvider}
   */
  get provider () { return this._provider }

  /**
   * Creates a new captcha solving task.
   *
   * @param {object} opts - Options
   * @param {string} opts.type - Type of captcha to solve
   * @param {buffer|string} opts.image - Captcha image to process
   *
   * @return {Promise<string>} Unique task identifier
   */
  async createTask (opts) {
    ow(opts, ow.object.plain.nonEmpty)
    ow(opts.type, ow.string.nonEmpty)

    if (!this._provider.supportedTaskTypes.has(opts.type)) {
      throw new Error(`provider ${this._provider.name} does not support task type "${opts.type}"`)
    }

    return this._provider.createTask(opts)
  }

  /**
   * Fetches the result of a previously created captcha solving task.
   *
   * @param {string} taskId - Unique task identifier
   * @param {object} [opts] - Options
   * @param {number} [opts.retries=3] - Number of retries to perform
   * @param {number} [opts.timeout=30000] - Max timeout to wait in ms before aborting
   */
  async getTaskResult (taskId, opts = { }) {
    ow(taskId, ow.string.nonEmpty)
    ow(opts, ow.object.plain)

    const {
      retries = 3,
      timeout = 30000,
      ...rest
    } = opts

    return pTimeout(pRetry(() => {
      return this._provider.getTaskResult(taskId)
    }, {
      retries,
      maxTimeout: timeout,
      ...rest
    }), timeout)
  }
}

module.exports = CaptchaSolver
