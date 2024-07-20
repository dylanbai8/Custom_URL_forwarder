# Custom_URL_forwarder
这个 Chrome 插件会添加一个自定义菜单项，允许用户将选中的文本转发到用户在 options 页面中设置的 URL 接口。选中的文本将作为查询参数附加到该 URL 上，并在新标签页中打开。

```
写一个chrome插件：
1.添加options设置项，用于添加和移除url接口
2.储存添加的url接口
3.当选择任意网页内任意文字内容时，为chrome添加自定义菜单，名称为"转发至自定义接口"
4.点击该右键菜单，在新标签打开新url，新url由 接口url+选中的文字 组成

修正以下错误：
options使用中文
在options可以添加多个url接口，并可以为每个接口自定义名称
在右键添加多个菜单，每给菜单对应一个url接口，邮件菜单名称为options内的接口名称

https://im1907.top/?jx=
https://im1907.top/?jx=

```

