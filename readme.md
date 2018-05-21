# captcha-solver

> Facilitates the automation of CAPTCHA verification.

[![NPM](https://img.shields.io/npm/v/captcha-solver.svg)](https://www.npmjs.com/package/captcha-solver) [![Build Status](https://travis-ci.com/transitive-bullshit/captcha-solver.svg?branch=master)](https://travis-ci.com/transitive-bullshit/captcha-solver) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)


## Status

This project is an early WIP.


## Packages

- [captcha-solver](packages/captcha-solver) - Main library entrypoint.
- [captcha-solver-provider](packages/captcha-solver-provider) - Abstract base class for captcha solver providers.
  - [captcha-solver-provider-anti-captcha](packages/captcha-solver-provider-anti-captcha) - Captcha solver provider for the [anti-captcha](https://anti-captcha.com) service.
  - [captcha-solver-provider-browser](packages/captcha-solver-provider-browser) - Captcha solver provider for a local, browser-based, manual solver.


## Related

- [puppeteer](https://github.com/GoogleChrome/puppeteer) - Headless Chrome Node API used under the hood.
- [puppeteer-email](https://github.com/transitive-bullshit/puppeteer-email) - Email automation driven by headless chrome.
- [sms-number-verifier](https://github.com/transitive-bullshit/sms-number-verifier) - Allows you to spoof SMS number verification.
- [awesome-puppeteer](https://github.com/transitive-bullshit/awesome-puppeteer) - A curated list of awesome puppeteer resources.


## Disclaimer

Using this softare to violate the terms and conditions of any third-party service is strictly against the intent of this software. By using this software, you are acknowledging this fact and absolving the author or any potential liability or wrongdoing it may cause. This software is meant for testing and experimental purposes only, so please act responsibly.


## License

MIT © [Travis Fischer](https://github.com/transitive-bullshit)
