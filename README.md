# Github Release Watcher

## Table of Contents

* [About](#about)
* [Install](#install)
* [Usage](#usage)
* [Contribute](#contribute)
* [License](#license)

## About

This application watch releases of the github repository.

Notify with Slack web hook if a new release exists.

## Install

```shell
$ yarn install
```

## Usage

### Setting

#### Config file

Copy the template and write your setting into the config file.

```shell
$ cp app-template.config.js app.config.js
```

Config needs the following settings.

| Field | Description | Required |
| --- | --- | --- |
| name | Name. It must be unique. | Yes | 
| url | URL for Github API. See this [document](https://developer.github.com/v3/repos/releases). | Yes | 
| version | String for parsing version from API response. This string can use [jq](https://github.com/sanack/node-jq). | Yes | 
| changelog | URL for change log | Yes | 

#### Environment variables

| Name | Description | Example |
| --- | --- | --- |
| REDIS_URL | URL for Redis | `redis://localhost:6379` |
| WEBHOOK_URL | Web hook URL for Slack | `https://hooks.slack.com/services/<workspace>/<channel>/<token>` |

### Build

At first, build the source.

```shell
$ yarn build
```

### Run

```shell
$ yarn run 
```

## Contribute

Open an issue or submit PRs.

## License

[MIT](#LICENSE).
