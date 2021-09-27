---
title: "直播存档的自用方案"
date: 2020-11-24T09:05:50+08:00
draft: false
slug: "stream archiving"
description: "求人不如求己，仓鼠症患者的自我救赎"
featuredImage: "/stream-archiving-eng/0001.jpg"
featuredImagePreview: "/stream-archiving-eng/0001.jpg"
images: ["/stream-archiving-eng/0001.jpg"]
categories: ["Tech"]
tags:
- 仓鼠症
- 网络
---

## 起因

自从Hololive 7月版权事件造成旗下VTuber大量视频遭到隐藏，Suisei Channel也并不能幸免。甚至包括早期大量杂谈及歌回视频也遭到隐藏。

雪上加霜的是，先前仰赖的直播存档站于`2020-10-31`宣布进入只读状态，不再写入新的直播存档，导致一时间难以应对。

此外，`2020-11-23`星街的歌回疑似再次因为唱了米津玄師的感電，导致存档暂时隐藏，截至`2020-11-24 09:00 UTC+8`，存档尚未恢复，仰仗他人保住了存档。

因此痛定思痛，准备了一些方案应对将来可能出现的不留档等问题。

## 解决方案

由于我并没有太多程序基础，也没有太多精力去折腾一整套的云端存档方案，因此整体暂时以Windows的本地操作为主。

#### Youtube-dl

\>\> [**项目主页点此**](https://github.com/ytdl-org/youtube-dl)

大名鼎鼎的`youtube-dl`，可以说是各类视频站批量存储的最佳方案，有名到甚至吃了RIAA的DMCA Takedown，不过在折腾之后Github恢复了项目[^1]。

Windows环境下配置文件在`%APPDATA%\youtube-dl\config.txt`或`C:\Users\<user name>\youtube-dl.conf`，配置好后即可用

```sh
youtube-dl 'stream-address'
```

贴一下我的配置文件：
```sh
--external-downloader aria2c --external-downloader-args "--all-proxy=http://127.0.0.1:7890 -x 16 -k 1M"

-o 'C:/Users/<username>/Downloads/%(title)s.%(ext)s'

--format 'bestvideo[ext=mp4]+bestaudio[ext=m4a]/bestvideo+bestaudio/best'

--cookies 'C:/Users/<username>/Downloads/youtube-dl/cookies.txt'

--embed-thumbnail

--add-metadata
```

这里需要用到的依赖包括`aria2c`, `ffmpeg`, `atomicparsely`, `beautifulsoup4`

优点
   1. 批量操作，可对整个频道的视频/播放列表进行拉取
   2. 支持多种视频站点（具体参考项目主页说明）
   3. 更新快，能够很好应对YouTube的频繁改动

缺点：
   1. 只能单线程下载，待YouTube转码完成后才能利用`aria2c`进行多线程下载
   2. 必须在**直播结束**后才能进行下载

`youtube-dl`尽管解决了批量下载的问题，但是没有解决直播时直接对串流进行保存的问题。由于星街的歌回通常是留档的，因此以前都没有太多研究。在遭遇到`2020-11-23`直播存档神隐后这一需求自然也提上了议事日程。

#### Streamlink

\>\> [**项目主页点此**](https://github.com/streamlink/streamlink)

又一个大名鼎鼎的项目，原本常用于将直播串流至本地播放器播放，不过查阅文档后发现，`streamlink`同样具有输出至文件的能力。

我通过`chocolatey`安装后，开箱即用。

```sh
streamlink 'stream-address' best -o 'outputfile'
```

本地环境测试通过，并无明显的卡顿。依照项目说法，它甚至支持`nicolive`以及`nicolive timeshift`；但根据既往经验，`nicolive`对于多设备登录并不友好，所以是否应当使用该项目对接下来的付费Live进行保存，这点需要进一步验证。

此外，niconico录制需登录参数：

```sh
--niconico-email 'EMAIL' --niconico-password 'PASSWORD'
```

#### Stream Recorder

\>\> [**插件地址点此**](https://chrome.google.com/webstore/detail/stream-recorder-download/iogidnfllpdhagebkblkgbfijkbkjdmm)

一个直接从浏览器内即可捕获直播流的插件。目前使用感良好，包括截存`nicolive`并未引发登录冲突的问题。

`2020-11-23` 日清主办的**SUISEI "POWER" LIVE**中这个插件大显身手，甚至在浏览器播放卡顿时依然能够顺畅完整录下全部影像。

所有人都没想到日清的直播站点发布的直播存档，最后输出的影像不仅色域出错，并且音质及码率遭到不同程度劣化，对于观感影响明显。完全一时兴起对全场串流进行保存的我手里的存档成了整个discord服务器的希望…

唯一问题，不能用于`YouTube`直播串流保存，因此仍然需要`streamlink`。

## To-Do List

由于这些方案目前均是基于本地运行的，自动化程度非常低，且存在遗漏风险、占用本地带宽、卡顿造成串流失败等等问题。因此仍有非常大的改进空间。

目标：
1. 将串流存取操作挪至云端，不影响本地观看
2. 自动监测直播及投稿，及时启动下载
3. 自动将完成串流的影像转存至OneDrive等网盘进行归档

目前看中了Amazon Lightsail的3.5 USD/month方案，另一方面正在查看是否有全套的监测、录制、上传至网盘的方案，如果有更新，会追加在后面。

[^1]: 事件全貌及Github的回应：<https://github.blog/2020-11-16-standing-up-for-developers-youtube-dl-is-back/>