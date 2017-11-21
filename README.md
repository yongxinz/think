# think
记录位置和想法，以时间线形式来展示的微信小程序

![](http://ohl540wt2.bkt.clouddn.com/2017-11-20 21_30_47.gif)

## 功能
目前支持功能：新加、修改想法，生成想法详情卡片并保存到相册，生成足迹卡片并保存到相册

## 环境
Python 版本为 python3.6，后端使用：Django + restframework
小程序基础库版本 1.5.3

## 安装
1、新建虚拟环境
>mkvirtualenv think --python=python3

2、安装依赖包
>cd djapi
>pip install -r requestments.txt

3、配置 APPID 和 APPsecret
>cp djapi/djapi/settings/local_.py djapi/djapi/settings/local.py

然后将其中的 id 和 key 替换成你自己的

>WEIXIN = {
>    'url': 'https://api.weixin.qq.com',
>    'id': 'your appid',
>    'key': 'your appsecret',
>}

4、初始化表
>python manage.py migrate

5、Run，并运行小程序
>python manage.py runserver 0.0.0.0:8810

## 抢先体验
![](http://ohl540wt2.bkt.clouddn.com/think.jpg)