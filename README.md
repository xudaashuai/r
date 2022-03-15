# Redirector

一个简简单单的短链小工具，支持配置短链跳转，期待的使用场景是公司内部私有部署，用于定义跨团队分享的短链接。（想法抄袭自 Airbnb 内部的短链工具 air.bb）

例如前端部门可以创建 `redirector.com/frontend` 的短链跳转到前端部门的文档主页。

## 使用方法

```
DOMAIN=部署的网站域名 UI_PREFIX=编辑短链的子域名 docker-compose up -d
```

例如，我将 Redirector 部署在 我设置 `DOMAIN=xudashuai.xyz UI_PREFIX=r`

- 那我就可以打开 `r.xudashuai.xyz` 看到添加和编辑短链的页面。
- 访问 `xudashuai.xyz/你定义的短链名称` 来使用短链跳转

## TODO

目前还在 MVP 开发中

- [ ] 短链创建/编辑/删除/搜索
- [ ] 短链模板功能
- [ ] 短链数据统计
