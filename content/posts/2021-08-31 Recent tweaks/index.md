---
title: "最近的折腾：评论系统以及搜索系统"
description: "玩，啊，就是爱玩。"
slug: "migrating to twikoo and algolia"
date: 2021-08-31T12:05:00+08:00
draft: true
featuredImage: "0001.png"
featuredImagePreview: "0001.png"
images: ["/migrating-to-vercel/0001.png"]
categories: ["Tech"]
tags:
- 网络
- 折腾
- 博客
---

最近在外头宣传了一下博客，不过基本属于看客多，留言的少。

反思了一下可能存在的问题后开始了小规模的改造。

<!--more-->

## 更换评论系统

### Disqus

博客最开始使用的是 Disqus ，后来发现大陆不能访问后一圈折腾，引入了 DisqusJS 作为应对。DisqusJS 先前架设在 Cloudflare Workers 上，尽管大陆可以打开但是总体加载速度堪忧。加之1202年了 Disqus 还在使用`<iframe>`方式进行加载一坨巨大的脚本。且不说拖低 Lighthouse 评分，用户体验实际上也并不好。而且基础模式不能评论，且没有很好适配博客深色主题，于是下定决心将它彻底换掉。

### Waline

之前听闻 Valine 不错，它的后继者则是
