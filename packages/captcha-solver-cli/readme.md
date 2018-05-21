# captcha-solver-cli

> CLI for automating CAPTCHA verification.

[![NPM](https://img.shields.io/npm/v/captcha-solver-cli.svg)](https://www.npmjs.com/package/captcha-solver-cli) [![Build Status](https://travis-ci.com/transitive-bullshit/captcha-solver.svg?branch=master)](https://travis-ci.com/transitive-bullshit/captcha-solver) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

This CLI also has a [library](https://github.com/transitive-bullshit/captcha-solver/tree/master/packages/captcha-solver).

## Install

```bash
npm install -g captcha-solver-cli
```

## Usage

```bash
  Usage: index [options] [command]

  Options:

    -V, --version                       output the version number
    -i, --image <path>                  path or url of image to solve
    -t, --type <string>                 type of captcha to solve (default: image-to-text)
    -k, --key <string>                  api key for provider
    -P, --provider <provider>           provider to use for solving (default: anti-captcha)
    -h, --help                          output usage information

  Commands:

    create-task
    get-task-result [options] <taskId>
    solve [options]
```

## Related

-   [captcha-solver](https://github.com/transitive-bullshit/captcha-solver/tree/master/packages/captcha-solver) - Library for this module.

## License

MIT © [Travis Fischer](https://github.com/transitive-bullshit)
