---
title: "搬家到Netlify"
description: "是的，我又在折腾了。"
slug: "migrating to netlify"
date: 2021-04-01T09:05:00+08:00
draft: false
featuredImage: "0001.jpg"
featuredImagePreview: "0001.jpg"
images: ["/migrating-to-netlify/0001.jpg"]
categories: ["Tech"]
tags:
- 网络
- 折腾
- 博客
---

在使用几天Cloudflare Pages后，我最后决定还是搬家到Netlify。

没错，我又在折腾了…

<!--more-->

## Cloudflare Pages有什么问题？

尽管我在[上一篇文章](/migrating-from-github-pages-to-cloudflare-pages/)中提到Cloudflare Pages非常方便，并且与Cloudflare的DNS/CDN功能结合紧密，使用起来非常快捷。但是在实际使用一段时间后发现有以下种种问题：

1. 构建环境速度非常慢（常超过1分钟）
2. 偶尔会因不明原因在构建过程中卡住，最短需要十几分钟，偶发案例可持续数小时，需通过删库才能跳过构建
3. Rocket Loader可能造成很多意外问题

虽然Cloudflare在防御方面以及（自己号称的）加速方面有着诸多选项，但是看着满控制台的报错和在CodeIT主题上出现的闪屏问题，我决定扔掉Cloudflare和Cloudflare Pages。

## 搬家到Netlify

后来才知道Cloudflare Pages就是一个直接模仿Netlify的项目，整个搬家过程也非常简单：

- 关联Github，导入Repo
- 设定`HUGO_VERSION`
- 构建
- 设置域名
- 等待DNS解析及`Let's Encrypt`证书颁发

搬迁至Netlify后再也没出现过各种样式报错，Lighthouse的得分也快速上涨，PWA功能也可以正常使用了。

而整个构建过程也是相当迅速，几乎push后1分钟以内就可以看到页面构建完成并上线，并没有冗长的环境构建以及不可预料的超长时间挂起。

目前Netlify的体验良好，短期内应该不会再进行折腾了。如果Cloudflare Pages可以进一步完善，到时候确实可以考虑重新用回去，并尽量避免Rocket Loader等功能的影响。
