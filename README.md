# Github Release Watcher

## Table of Contents

* [About](#about)
* [Deploy](#deploy)
* [Install](#install)
* [Usage](#usage)
* [Contribute](#contribute)
* [License](#license)

## About

This application watch releases of the github repository. Notify with Slack web hook if a new release exists.

## Deploy

### 1. Setup config file

#### Setup configuration file

This application need a configuration file. Download the `app-template.config.js` file as `app.config.js`.

```shell
$ wget -O app.config.js https://raw.githubusercontent.com/naoki-sawada/github-release-watcher/master/app-template.config.js
```

After download the configuration file, modify the file according to your settings. For more detail about configuration file see [this section](#config-file).

#### Upload configuration file

Upload your configuration file to an online storage service such as Google Drive, DropBox, S3 etc.

### 2. Deploy to heroku

Push following button and deploy the application to heroku.

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/naoki-sawada/github-release-watcher/tree/master)

#### Set environment variable

This application need two environment variables.

* `CONFIG_URL`: URL of the configuration file set in [section one](#upload-configuration-file).
* `WEBHOOK_URL`: Webhook URL for Slack.

### 3. Setup scheduler

After deploy the application to heroku, open your scheduler addon, and set the following run command.

```
npm start
```

For more detail about scheduler see [this document](https://devcenter.heroku.com/articles/scheduler#scheduling-jobs).

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
| CONFIG_URL | URL for config file | `https://s3-<region>.amazonaws.com/<your bucket>/app.config.js` |
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

[MIT](LICENSE).
