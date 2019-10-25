# 小算包（miniCalculator）

> 本项目使用小程序框架mpvue扩展的微信小程序，内容包括进制数值转换，几何面积计算，生辰八字测算等计算工具。

## 项目运行

```
  git clone https://github.com/tujindong/miniCalculator.git
  cd miniCalculator_master(进入项目)
  npm install (安装依赖包)
  npm start (启动服务)
```

## 扫码体验
![小程序码](./static/images/qrcode.jpg)

## 预览

### [Live demo](https://codepen.io/steveliao/pen/eEPwda)

![shopping-cart-preview](img/preview.png)

## 目录结构
```
  miniCalculator
  ├── package.json //项目的主配置文件，里面包含了mpvue项目的基本描述信息、项目所依赖的各种第三方库以及版本信息、以及可执行的脚本信息
  ├── project.config.json       
  ├── static            
  ├── src
  │    ├── pages
  |    │     ├── index
  |    │     ├── about
  |    │     ├── modules
  │    |     └── components
  │    ├── utils
  │    ├── App.vue
  │    └── main.js
  ├── config
  │   ├── index.js
  │   ├── dev.env.js
  │   └── prod.env.js
  └── build
```

## 功能

### 数值转换

- 角度弧度相互转换
- 进制转换
- 长度、面积、体积、质量、温度、功/能/热转换

### 计算工具（均附有canvas图形展示）

- 圆面积、周长，半径计算
- 矩形周长、面积、边长计算
- 三角形角度、边长、面积、周长计算
- 多边形面积、周长计算
- 生辰八字测算，农历、五行、方位、星座、生肖测算

****
	
|Author|涂小图|
|---|---
|E-mail|1965382331@qq.com

****
