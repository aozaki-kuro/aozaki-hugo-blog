---
title: '尝试了一大堆评论系统后，我用回了 Disqus'
summary: '还是稳定、便捷、一站式最重要。'
slug: 'back to disqus'
date: 2022-10-07
draft: false
featuredImage: '0001.png'
featuredImagePreview: '0001.png'
images: ['/back-to-disqus/0001.png']
categories: ['Tech']
tags:
  - 折腾
  - 博客
---

## 我又干了啥？

把博客模板迁移回 Hugo 后，我对模板做了一大堆魔改。

但是关于评论系统，始终没有拿定主意。

## 评论系统怎么了？

今天查看 [DisqusJS](https://github.com/SukkaW/DisqusJS) 的引入方式的时候，发现了[这么一篇文章](https://eallion.com/disqus/)。

其中几个点我觉得很有道理，也是折腾那么多、时间也逐渐不够用之后的体会

- Waline、Twikoo 等服务虽然开源，但维护复杂，数据库也是托管在别的云服务上（自建可以但是更费事），前后端也需要不断更新。更像是为了“轻量化”而轻量化，实际上只把工作复杂化了
- Disqus 在过去十年间变化并不大，哪怕是真的十年前的站点数据文件拿出来，依然可以正常跑
- **独立博客盛景不再，要不要评论系统又有什么关系呢**

实际上我的个人体会也是如此：

- 评论不多，纯粹是自己折腾，折腾完了又不想折腾了
- Twikoo 等服务又需要时不时进行更新，数据托管在 mongoDB 或其他服务上，导入导出也不方便，自己搭建的话又需要自己维护数据库，不如直接用 Disqus
- 我的大陆读者并没有那么多，Disqus 被墙的问题也不大

那为什么不用 Disqus 呢，至多引入 DisqusJS 就好了。

## Disqus 的广告？

这个其实也是由来已久的问题了。Disqus 的免费订阅是有关闭不了的广告的。

但是这也是有解决方案的。

根据 [Disqus 官方博客](https://blog.disqus.com/advertising-will-remain-optional-for-over-95-of-sites-on-disqus)所写，使用 Disqus 的个人非营利、无广告网站可以申请免费的无广告订阅。

> **What about smaller, non-commercial sites?**
>
> For small, non-commercial sites, advertising will be optional. These sites will be able to use Disqus’ ads-optional subscription, free of charge.
>
> **Who qualifies as a small / non-commercial site?**
>
> Publishers will be able to self-identify. For personal blogs, educational sites, non-profits, and small sites that do not run other advertising, Disqus advertising will be optional. Currently, over 95% of sites on our network fall into this category.

比较鸡贼的是，Disqus 官方并没有给出申请的方式，实际上直接给邮件给 [Disqus 客服](mailto:help@disqus.com)申请就好了[^1]。过几天审核完 Disqus 会给回信，然后就可以去设置里面关闭广告了。

剩下就是把 Aff 和追踪关掉就行。

## DisqusJS 呢？

呃，因为之前 Sukka 更新了 3.0，但 3.0 有些小问题…例如网络检查的提示不会消除，Disqus 的底栏会有两层。但 1.3 版本又没有很好地适配深色模式，于是工作陷入了停顿。

在 Sukka 修好前应该是不考虑引入了。

## 最后

博客其实也就是给了我自己一个写长文、练笔头、发泄的地方。评论系统也只是一个附加功能，不是必须的。

之前说好要写的桌面音响相关的文章可能要晚些了，尽管最近是假期但还是各种奇奇怪怪的事情太多了…

[^1]: 呃，因为太过久远并不确定还是不是这个邮件地址，也有可能是[这个专门负责处理广告/广告主的地址](mailto:publisher-success@disqus.com)。但是写给客服一般都没错。
