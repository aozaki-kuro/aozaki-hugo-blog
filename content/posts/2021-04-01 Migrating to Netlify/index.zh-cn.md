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

在使用几天 Cloudflare Pages 后，我最后决定还是搬家到 Netlify。

没错，我又在折腾了…

<!--more-->

## Cloudflare Pages 有什么问题？

尽管我在[上一篇文章](/migrating-from-github-pages-to-cloudflare-pages/)中提到 Cloudflare Pages 非常方便，并且与 Cloudflare 的 DNS/CDN 功能结合紧密，使用起来非常快捷。但是在实际使用一段时间后发现有以下种种问题：

1. 构建环境速度非常慢（常超过 1 分钟）
2. 偶尔会因不明原因在构建过程中卡住，最短需要十几分钟，偶发案例可持续数小时，需通过删库才能跳过构建
3. Rocket Loader 可能造成很多意外问题

虽然 Cloudflare 在防御方面以及（自己号称的）加速方面有着诸多选项，但是看着满控制台的报错和在 CodeIT 主题上出现的闪屏问题，我决定扔掉 Cloudflare 和 Cloudflare Pages。

## 搬家到 Netlify

后来才知道 Cloudflare Pages 就是一个直接模仿 Netlify 的项目，整个搬家过程也非常简单：

- 关联 Github，导入 Repo
- 设定`HUGO_VERSION`
- 构建
- 设置域名
- 等待 DNS 解析及`Let's Encrypt`证书颁发

搬迁至 Netlify 后再也没出现过各种样式报错，Lighthouse 的得分也快速上涨，PWA 功能也可以正常使用了。

而整个构建过程也是相当迅速，几乎 push 后 1 分钟以内就可以看到页面构建完成并上线，并没有冗长的环境构建以及不可预料的超长时间挂起。

目前 Netlify 的体验良好，短期内应该不会再进行折腾了。如果 Cloudflare Pages 可以进一步完善，到时候确实可以考虑重新用回去，并尽量避免 Rocket Loader 等功能的影响。
