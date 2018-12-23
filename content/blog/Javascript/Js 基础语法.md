---
date: '20180302'
---

# 语法
- `application/javascript` 与 `text/Javascript` 的区别
- script 标签中`defer` 与 `async`属性
 - 严格模式的作用

# 数据类型
- 检测`Array`, `null`, `Object`的方法
```js
Array: 
        1. `instanceof Array`
        2. `Array.isArray()`
        3. `Object.prototype.toString.call([]).slice(8, -1) === 'Array'`
    null:
        1. `foo === null`
        2. `Object.prototype.toString.call(null).slice(8, -1) === 'Null'`
    undefined:
        1. `typeof bar === 'undefined'`
        2. `Object.prototype.toString.call(undefined).slice(8, -1) === 'Undefined'`
    null/undefined:
        1. `foo != null`
        2. `foo != undefined`
    Object:
        1. `Object.prototype.toString.call({}).slice(8, -1) === 'Object'`
```

