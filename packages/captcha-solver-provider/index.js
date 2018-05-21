'use strict'

/**
 * Abstract base class for captcha solver providers.
 */
class CaptchaSolverProvider {
  /**
   * Provider name.
   *
   * @member {string}
   */
  get name () {
    throw new Error('provider must override "name"')
  }

  /**
   * Set containing task types supported by this provider.
   *
   * @member {Set<string>}
   */
  get supportedTaskTypes () {
    throw new Error('provider must override "supportedTaskTypes"')
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
    throw new Error('provider must override "createTask"')
  }

  /**
   * Fetches the result of a previously created captcha solving task.
   *
   * @param {string} taskId - Unique task identifier
   * @param {object} [opts] - Options
   *
   * @return {Promise<object>}
   */
  async getTaskResult (taskId, opts) {
    throw new Error('provider must override "getTaskResult"')
  }
}

module.exports = CaptchaSolverProvider
