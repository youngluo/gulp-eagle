# Gulp Eagle

## 1. 简介

Gulp Eagle 是基于 Laravel Elixir 改造的 gulp 构建工具。它提供了简洁的 API ，方便我们快速的使用 gulp 构建前端项目。

## 2. 安装

	npm install --save-dev gulp－eagle

## 3. 使用

	var Eagle = require('gulp-eagle');
	Eagle(function (mix) {
	    mix
	        .sass('./src/**/*.scss', 'css')
            .script('./src/**/*.js, 'js')
	});
    
## 4. 运行

- `gulp`：运行所有任务；
- `gulp watch`：监控前端资源的改变，开启浏览器实时刷新功能；
- `gulp --prod`：运行所有任务，自动压缩任务中的 css 、js 和图片文件，并为配置文件中指定的文件类型加上版本号。
    
## 5. API

#### 5.1 sass(src[, output, options])

将 sass 文件编译成 css 文件。

	mix.sass('./src/**/*.scss', 'css')

##### src

类型：String 或 Array

源文件。

##### output

类型：String

产出路径。

##### options

类型：Object

##### options.base

类型：String 默认值：将会加在 glob 之前（详情见[glob2base](https://github.com/contra/glob2base)）

假设在一个路径为 src/scss/aaa 的目录中，有一个文件叫 aaa.scss ：
	
	// 匹配 'src/scss/aaa/aaa.scss' 并且将 base 解析为 src/scss/ 最终产出到 'build/aaa/aaa.css'
	mix.sass('./src/scss/**/*.scss')
	
	// 产出到 'build/scss/aaa/aaa.css'
	mix.sass('./src/scss/**/*.scss', { base: 'src' }) 
##### options.removePath

类型：Boolean 默认值：true

默认去除源文件原有路径，只保留目标文件到产出文件夹（build）中。

#### 5.2 sassIn(src, output)

将多个 sass 文件合并编译成 css 文件。

	mix.sass([
		'./src/aaa/*.scss',
		'./src/bbb/*.scss'
	], 'css/app.css')

##### src

类型：String 或 Array

源文件。

##### output

类型：String

产出路径，必须以文件名结尾，如`css/app.css`。

#### 5.3 style(src[, output, options])

产出原生 css 文件，参数详情见 [5.1](#user-content-51-sasssrc-output-options)。

	mix.style('./src/css/*.css', 'css')
	
#### 5.4 styleIn(src, output)

合并多个原生 css 文件，参数详情见 [5.2](#user-content-52-sassinsrc-output)。

	mix.styleIn([
		'./src/aaa/aaa.css',
		'./src/bbb/bbb.css'
	], 'css/app.css')
	
#### 5.5 script(src[, output, options])

产出 js 文件，参数详情见 [5.1](#user-content-51-sasssrc-output-options)。

	mix.script('./src/js/*.js', 'js')
	
#### 5.6 scriptIn(src, output)

合并多个 js 文件，参数详情见 [5.2](#user-content-52-sassinsrc-output)。

	mix.scriptIn([
		'./src/aaa/aaa.js',
		'./src/bbb/bbb.js'
	], 'css/app.js')
	
#### 5.7 browserify(src[, output])

可以让你使用类似于 node 的 require() 的方式来组织浏览器端的 javascript 代码，通过预编译让前端 javascript 可以直接使用 node npm 安装的一些库。

	mix.browserify('./src/app.js')

##### src

类型：String

使用 Browserify 方式组织代码的入口 javascript 文件。

##### output

类型：String 默认值：bundle.js

产出路径，必须以文件名结尾。
    
#### 5.8 image(src[, output, options])

产出图片文件，参数详情见 [5.1](#user-content-51-sasssrc-output-options)。

	mix.image('./src/images', 'images', {removePath: false})
    
#### 5.9 html(src[, output, options])

产出html文件，参数详情见 [5.1](#user-content-51-sasssrc-output-options)。

	mix.html('./src/**/*.html')
    
#### 5.10 copy(src[, output, options])

复制文件，参数详情见 [5.1](#user-content-51-sasssrc-output-options)。

	mix.copy('./src/assets/fonts/**', 'assets/fonts')
    
#### 5.11 clean(src)

清除文件。

##### src

类型： String 或 Array 默认值：配置文件中指定的产出文件夹（build）

	mix.clean()
    

> **注意：src默认是从配置文件指定的产出文件夹（build）中查找，如需从当前项目根目录下查找，则在路径前加上`.／`；output默认输出在build文件夹中。**
	
## 6. 配置文件介绍


## 更新日志
    


