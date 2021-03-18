---
title: "Hugo部署与踩坑记"
date: 2020-08-09T11:29:51+08:00
draft: false
categories: ["tech"]
tags:
- 折腾
- 网络
slug: "Hugo Deployment Debugging"
displayCopyright: true
toc: true
---

![](0001.jpg)

本博客部署于Github Pages上，最初构建时应用的Hexo。在被Node.js的巨量依赖和最终页面生成速度面前决定迁移至Hugo。Hugo部署的坑很多，故保留完整操作与相关踩坑记录。😫

***

## WSL2的部署

在反复折腾几轮后遂决定 ~~滚回Hexo方案~~ 在WSL下Hexo的生成速度面前我又滚回来了。

以下为操作笔记：

### Windows 10内启用相关功能

首先确保Windows 10版本在18917以上，Store内安装Ubuntu后开始WSL2的配置。[^1]

以管理员权限运行Powershell，并启用虚拟机平台可选组件
```Powershell
Enable-WindowsOptionalFeature -Online -FeatureName VirtualMachinePlatform
```

启用Linux子系统功能
```Powershell
Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Windows-Subsystem-Linux
```

**重启后**打开安装的Ubuntu子系统，输入用户名密码，完成WSL1的安装；此时在Powershell内输入`wsl -l`可查看安装的版本号（我所安装的是Ubuntu 18.04 LTS，则显示`Ubuntu-18.04`）。

### 转换为WSL2

首先至Microsoft下载[Linux Kernel](https://docs.microsoft.com/zh-cn/windows/wsl/wsl2-kernel)，安装后方可进行转换。

根据`wsl -l`获得的版本号，将其转换为WSL2。
```Powershell
wsl --set-version Ubuntu-18.04 2
```

之后可以输入`wsl --set-default-version 2`，使之后安装的Linux子系统都安装到WSL2中。

至此WSL2的部署完成。

***

## Hugo

### WSL2内部署Hugo

对于老手应该问题不大，我还是记录一下新手的操作防止自己忘记……

```sh
cd /tmp
wget https://github.com/gohugoio/hugo/releases/download/v0.74.3/hugo_extended_0.74.3_Linux-64bit.tar.gz
tar xvf hugo_extended_0.74.3_Linux-64bit.tar.gz
sudo mv hugo /usr/local/bin
hugo
```

此处要注意，虽然WSL2是64位的，但好像只能运行32位的程序（未确证）。

### Hugo相关操作

#### 创建博客与添加新文章

如下命令创建博客
```sh
hugo new site blog #这里填入自己的博客根目录名称
cd blog
```

新增主题（这里应用的是MemE）[^2]
```sh
git init
git submodule add --depth 1 https://github.com/reuixiy/hugo-theme-meme.git themes/meme
rm config.toml && cp themes/meme/config-examples/zh-cn/config.toml config.toml #将config.toml替换为主题用
```

新建文章与关于页面
```sh
hugo new "tech/hello-world.md"
hugo new "about/_index.md"
```

运行本地渲染，进行预览
```sh
hugo server -D
```

#### 连接至SSH

```sh
ssh-keygen -tecdsa #创建sshkey，可以看到一个谜之ASCII图片
cat ~/.ssh/id_ecdsa.pub #查看公钥，复制后添加至Github
```

#### 推送更新

```sh
git remote set-url origin git@github.com:xxxxxxx #此处修改为自己项目主页的ssh地址
```

在添加过origin后如下操作：

```sh
hugo --gc --minify #这里在博客根目录下执行
cd public
git add .
git status
git commit -m "Update" #根据需要填写更新名称
git push
```

如果博客出现渲染问题，可以改用`hugo --gc -e production --cleanDestinationDir`进行重构。

## 部署Cloudflare CDN

由于国内CDN均要求备案，粗略看了看备案的冗长过程并想到要在博客底下挂一个~~又长又丑的~~备案号，加之DNSpod的解析服务突然出错（DNSpod你自己说你是第几次了），便下定决心迁移至Cloudflare的~~降速~~CDN上。

### 为何选择Cloudflare？

原因很简单，Cloudflare的CDN遍布全世界，并且提供号称全球最快的DNS `1.1.1.1`、免费的SSL证书，以及号称几乎打不死的DDoS保护，而且最重要的是不需要备案🤣 近期还听说Cloudflare在内地与百度有合作，部署了大量节点，想必访问速度应该是差不到哪里去……吧。

配置过程不详述了，我主要参考的是[Mogeko的Cloudflare CDN添加教程](https://mogeko.me/2019/056/)。

部署后的踩坑记录更新在后面。

***

## 踩坑记

### CSS错误的排查

最开始听说Hugo轻量化且不需要那么多依赖，于是便想着往Hugo迁移。当然折腾上手后才发现踩坑的点太多了。

首先部署在Windows 10下，未使用WSL时，遇到了本地`hugo server -D`预览正常，`git push`后页面出错的问题。排查几次后发现报错如下：
```
Failed to find a valid digest in the 'integrity' attribute for resource 'xxxxxxx.css' with computed SHA-256 integrity. The resource has been blocked.
```

查了多方资料后发现有怀疑CRLF/LF的问题，也有说可以把`integrity`属性删除即正常的。但是根据相关指引执行后均没有效果。

此外，老马在Manjaro下生成的网页`git push`后是正常的，可以正常加载CSS，Windows下无论通过`Powershell`还是`Git bash`窗口执行都不正常。问题排查困难重重，暂时断了迁移至Hugo的念想。

一直到昨天，尝试性地部署了`WSL2`，最终编译才通过，让CSS能够正常加载。

### 大小写的识别

昨天在成功通过Hugo部署后发现了问题：首页可以加载文章，但点进Read More后404。

进行多次排查后发现是文章所在文件夹的大小写问题，这一问题在Hexo下未发生，将所有文件改为小写后加载正常。

### 部署操作麻烦

除了难以排查的CSS问题和大小写识别的坑，由于我的coding基础薄弱，Hugo部署时的命令行数量也让我头疼。不仅难记且涉及根目录及`public/`两个目录层级。而Hexo则只需要优雅地输入`hexo g && hexo d`即可完成在服务端的部署。

### Cloudflare CDN部署时的注意事项

由前面的踩坑经验可知，Hugo生成的CSS需要检查完整性，所以尽管Cloudflare提供了Auto Minify功能，但是请千万不要去勾选HTML以外的选项。Auto Minify会导致出现前述的CSS完整性错误，进而使得网页无法加载CSS样式。

***

## 总结

Hugo尽管只需要下载一个二进制文件即可开始部署和使用，但是在这过程中碰到的坑和解决问题的难度远超Hexo。如果我想不起来用WSL，那可能就完全和Hugo无缘。

这方面不得不说Hexo的功能性强得多，编译时自动转换CRLF/LF，并且不受到大小写的影响。除了在WSL下生成网页时真的很慢……

看在Hugo有MemE这个颜值高、简洁还不容易撞车的主题面上饶了你了。

另外题图来自赤井はあと，回顾整个排查过程确实非常生草 ~~以及哭笑不得~~ 。

***

当然尽管折腾了那么多，建立博客的初衷还是写点东西下来你说是不是。

好好写点东西下来吧………………🤯

[^1]: 具体请参照《适用于Linux的Windows子系统安装指南》：https://docs.microsoft.com/zh-cn/windows/wsl/install-win10
[^2]: 更多操作及详情，请查看MemE项目主页：https://github.com/reuixiy/hugo-theme-meme/blob/master/README.zh-cn.md