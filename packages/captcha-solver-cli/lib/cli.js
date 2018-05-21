#!/usr/bin/env node
'use strict'

const delay = require('delay')
const program = require('commander')

const CaptchaSolver = require('captcha-solver')

const { version } = require('../package')

module.exports = (argv) => {
  program
    .version(version)
    .option('-i, --image <path>', 'Path or url of image to solve')
    .option('-t, --type <string>', 'Type of captcha to solve', (s) => s, 'image-to-text')
    .option('-k, --key <string>', 'API key for provider')
    .option('-u, --website-url <url>', 'Website URL for nocaptcha, recaptcha, and funcaptcha')
    .option('---website-key <url>', 'Recaptcha website key')
    .option('---website-s-token <token>', 'Optional secret token for old version of Recaptcha')
    .option('---website-public-key <string>', 'Funcaptcha public key')
    .option('--proxy-type <string>', 'Type of proxy to use', /^(http|socks4|socks5)$/)
    .option('--proxy-address <string>', 'Proxy IP address ipv4/ipv6')
    .option('--proxy-port <number>', 'Proxy port')
    .option('--proxy-login <string>', 'Optional login for proxy which requires authorizaiton (basic)')
    .option('--proxy-password <string>', 'Optional proxy password')
    .option('--user-agent <string>', 'Browser\'s User-Agent which is used in emulation.')
    .option('--cookies <string>', 'Optional additional cookies.')
    .option('-P, --provider <provider>', 'Provider to use', /^(anti-captcha)$/, 'anti-captcha')

  program
    .command('create-task')
    .action(async () => {
      try {
        const client = new CaptchaSolver(program.provider, { key: program.key })

        const taskId = await client.createTask({
          type: program.type,
          image: program.image,
          websiteURL: program.websiteUrl,
          websiteKey: program.websiteKey,
          websiteSToken: program.websiteSToken,
          websitePublicKey: program.websitePublicKey,
          proxyType: program.proxyType,
          proxyAddress: program.proxyAddress,
          proxyPort: program.proxyPort,
          proxyLogin: program.proxyLogin,
          proxyPassword: program.proxyPassword,
          userAgent: program.userAgent,
          cookies: program.cookies
        })

        console.log(taskId)
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
          image: program.image,
          websiteURL: program.websiteUrl,
          websiteKey: program.websiteKey,
          websiteSToken: program.websiteSToken,
          websitePublicKey: program.websitePublicKey,
          proxyType: program.proxyType,
          proxyAddress: program.proxyAddress,
          proxyPort: program.proxyPort,
          proxyLogin: program.proxyLogin,
          proxyPassword: program.proxyPassword,
          userAgent: program.userAgent,
          cookies: program.cookies
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
