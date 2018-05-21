#!/usr/bin/env node
'use strict'

const delay = require('delay')
const program = require('commander')

const CaptchaSolver = require('captcha-solver')

const { version } = require('../package')

module.exports = (argv) => {
  program
    .version(version)
    .option('-i, --image <path>', 'path or url of image to solve')
    .option('-t, --type <string>', 'type of captcha to solve', /^(image-to-text)$/, 'image-to-text')
    .option('-k, --key <string>', 'api key for provider')
    .option('-P, --provider <provider>', 'provider to use for solving', /^(anti-captcha)$/, 'anti-captcha')

  program
    .command('create-task')
    .action(async () => {
      try {
        const client = new CaptchaSolver(program.provider, { key: program.key })

        const result = await client.createTask({
          type: program.type,
          image: program.image
        })

        console.log(result)
      } catch (err) {
        console.error(err)
        process.exit(1)
      }
    })

  program
    .command('get-task-result <taskId>')
    .option('-r, --retries <number>', 'number of retries', parseInt, 3)
    .option('-t, --timeout <number>', 'timeout in ms', parseInt, 30000)
    .action(async (taskId, opts) => {
      try {
        const client = new CaptchaSolver(program.provider, { key: program.key })

        const result = await client.getTaskResult(taskId, {
          retries: opts.retries,
          timeout: opts.timeout,
          onFailedAttempt: (err) => {
            console.log(`Error getting task result #${err.attemptNumber} failed. Retrying ${err.attemptsLeft} times left...`)
          }
        })

        console.log(JSON.stringify(result, null, 2))
      } catch (err) {
        console.error(err)
        process.exit(1)
      }
    })

  program
    .command('solve')
    .option('-r, --retries <number>', 'number of retries', parseInt, 3)
    .option('-d, --delay <number>', 'delay in ms before first checking for result', parseInt, 10000)
    .option('-t, --timeout <number>', 'timeout in ms', parseInt, 30000)
    .action(async (opts) => {
      try {
        const client = new CaptchaSolver(program.provider, { key: program.key })

        const taskId = await client.createTask({
          type: program.type,
          image: program.image
        })

        console.log(`task id: ${taskId}`)
        console.log('waiting for result...')
        await delay(opts.delay)

        const result = await client.getTaskResult(taskId, {
          retries: opts.retries,
          timeout: opts.timeout,
          onFailedAttempt: (err) => {
            console.log(`Error getting task result #${err.attemptNumber} failed. Retrying ${err.attemptsLeft} times left...`)
          }
        })

        console.log(JSON.stringify(result, null, 2))
      } catch (err) {
        console.error(err)
        process.exit(1)
      }
    })

  program.parse(argv)
}

module.exports(process.argv)
