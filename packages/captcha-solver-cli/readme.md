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
    -i, --image <path>                  Path or url of image to solve
    -t, --type <string>                 Type of captcha to solve (default: image-to-text)
    -k, --key <string>                  API key for provider
    -u, --website-url <url>             Website URL for nocaptcha, recaptcha, and funcaptcha
    ---website-key <url>                Recaptcha website key
    ---website-s-token <token>          Optional secret token for old version of Recaptcha
    ---website-public-key <string>      Funcaptcha public key
    --proxy-type <string>               Type of proxy to use
    --proxy-address <string>            Proxy IP address ipv4/ipv6
    --proxy-port <number>               Proxy port
    --proxy-login <string>              Optional login for proxy which requires authorizaiton (basic)
    --proxy-password <string>           Optional proxy password
    --user-agent <string>               Browser's User-Agent which is used in emulation.
    --cookies <string>                  Optional additional cookies.
    -P, --provider <provider>           Provider to use (default: anti-captcha)
    -h, --help                          output usage information

  Commands:

    create-task
    get-task-result [options] <taskId>
    solve [options]
```

## Related

-   [captcha-solver](https://github.com/transitive-bullshit/captcha-solver/tree/master/packages/captcha-solver) - Library for this module.

## Disclaimer

Using this software to violate the terms and conditions of any third-party service is strictly against the intent of this software. By using this software, you are acknowledging this fact and absolving the author or any potential liability or wrongdoing it may cause. This software is meant for testing and experimental purposes only, so please act responsibly.

## License

MIT © [Travis Fischer](https://github.com/transitive-bullshit)
