# Node.js-Beauty-API - PTT表特板 API


[![Codacy Badge](https://api.codacy.com/project/badge/Grade/76470b0961b247d194648deda1ceb3b2)](https://app.codacy.com/app/stu01509/Node.js-Beauty-API?utm_source=github.com&utm_medium=referral&utm_content=stu01509/Node.js-Beauty-API&utm_campaign=Badge_Grade_Dashboard)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Build Status](https://travis-ci.org/stu01509/Node.js-Beauty-API.svg?branch=master)](https://travis-ci.org/stu01509/Node.js-Beauty-API)


![Node.js-Beauty-API](https://imgur.com/BGGBgD5.jpg)

## Installation
在使用 Node.js-Beauty-API 之前，你需要 Clone 這份專案，並且安裝相依的套件。

```shell
$ git git@github.com:stu01509/Node.js-Beauty-API.git
$ cd Node.js-Beauty-API
$ npm install
```

## Config
因為這套 API 的資料來源都是透過爬蟲的方式，將文章資訊儲存至 MongoDB，所以使用環境下必須還有一台 MongoDB Server。

```shell
$ cp .env.example .env
```

使用編輯器開啟 .env 檔案，設定 PORT 與 DB_PATH 資料庫的連線路徑，API 預設的監聽 Port 為 `3000`

![Node.js-Beauty-API](https://imgur.com/bbze2Cf.jpg)

## Usage
這套 API 的資料來源都是透過爬蟲的方式，在執行的第 1 分鐘後先執行第一次爬蟲，之後則是固定每 30 分鐘執行爬蟲。

```shell
$ npm start
```
![Node.js-Beauty-API](https://imgur.com/7d5wWJF.jpg)


## API Docs
下列 API 的僅大致列出，詳細的使用參數都可以在[API Docs](https://nodejs-beauty-api.azurewebsites.net/api-docs/) 進行查閱測試。


### Dcard

* `GET /dcard` - 取得 Dcard 穿搭板前 30 筆最新的資料
* `GET /dcard/search` - 搜尋 Dcard 穿搭板內容

### Meteor

* `GET /meteor` - 取得 Meteor 賣照板前 30 筆最新的資料
* `GET /meteor/search` - 搜尋 Meteor 賣照板內容

### PTT

* `GET /ptt` - 取得 PTT 表特板前 30 筆最新的資料
* `GET /ptt/search` - 搜尋 PTT 表特板內容

## Demo
* API Demo
    * [Dcard](https://nodejs-beauty-api.azurewebsites.net/dcard)
    * [Meteor](https://nodejs-beauty-api.azurewebsites.net/meteor)
    * [PTT](https://nodejs-beauty-api.azurewebsites.net/ptt)
* API Docs
    * [Docs](https://nodejs-beauty-api.azurewebsites.net/api-docs/)
* Demo Site
    * [Demo Site](https://beautybeauty.azurewebsites.net/)


## License
[MIT](LICENSE)
