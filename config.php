<?php
return array(
	'DEBUG'                       	=>	true ,              //是否是debug模式，debug模式下打印各个功能编译的时间
	'TPL_LEFT_DELIMITER'          	=>	'<&' ,              //smarty左界符
	'TPL_RIGHT_DELIMITER'         	=>	'&>' ,              //smarty右界符
	'TPL_SUFFIX'                  	=>	'html' ,            //模板文件后缀名
	'FILE_ENCODING'               	=>	'utf-8' ,           //文件编码
	'MOD_DIR_CHECK'               	=>	false ,             //是否进行模块目录检查,
	'MOD_FILENAME_CHECK'          	=>	false ,             //是否进行文件命名检查
	'MOD_JS_REGULAR_CHECK'        	=>	false ,              //是否进行js规范检测
	'MOD_CSS_REGULAR_CHECK'       	=>	false ,              //是否进行css规范检测
	'MOD_HTML_REGULAR_CHECK'      	=>	false ,             //是否进行html规范检测
	'MOD_SMARTY_REGULAR_CHECK'    	=>	false ,             //是否进行smarty模板规范检测
	'MOD_DOS2UNIX'                	=>	false ,             //是否对原文件进行dos2unix格式转换
	'MOD_JS_BEAUTIFY'             	=>	false ,             //是否进行js beautify
	'JS_BEAUTIFY_INDENT'          	=>	'space' ,           //缩进符号 tab/space
	'MOD_CSS_BEAUTIFY'            	=>	false ,             //是否进行css beautify
	'CSS_BEAUTIFY_INDENT'         	=>	'space' ,           //缩进符号 tab/space
	'MOD_CSS_SPRITES'             	=>	false ,             //是否进行css sprites
	'CSS_SPRITES_REGULAR'         	=>	'' ,                //a|gif|1,c|png|2，文件夹_后缀_方向, 1是垂直方向，2是水平方向
	'MOD_CSS3_AUTOCOMPLETE'       	=>	false ,             //css3样式自动补全
	'MOD_JS_COMBINE'              	=>	true ,              //JS文件是否启用合并
	'MOD_CSS_COMBINE'             	=>	true ,              //CSS文件是否启用合并
	'MOD_HTML_COMPRESS'           	=>	true ,              //HTML文件是否启用压缩
	'MOD_JS_COMPRESS'             	=>	true ,              //JS文件是否启用压缩
	'MOD_CSS_COMPRESS'            	=>	true ,              //CSS文件是否启用压缩
	'MOD_CSS_SUPER_COMPRESS'      	=>	false ,             //是否开启CSS极限压缩,会同时修改HTML，css的class在js里使用会有统一的js-前缀
	'MOD_SMARTY3_OPTI'            	=>	false ,             //是否进行模版优化,smarty3的时候才开启
	'MOD_SHA1_INC_FILE'           	=>	false ,              //是否启用给inc文件添加时间戳
	'SHA1_INC_FILE_TYPE'          	=>	1 ,                 //1是加query,2是生成新文件
	'MOD_OPTI_IMG'                	=>	false ,              //是否优化图片
	'MOD_XSS_CHECK'               	=>	false ,             //是否进行XSS检查
	'MOD_XSS_AUTO_FIXED'          	=>	false ,             //是否进行XSS自动修复
	'MOD_REPLACE_DOMAIN'          	=>	false ,             //是否启用地址替换
	'MOD_OFFLINE_DOMAIN_CHECK'    	=>	false ,             //是否进行线下地址检测
	'MOD_DOMAIN_MULTIPLE'         	=>	false ,             //是否进行域名分发
	'MOD_USE_IMAGE_DATAURI'       	=>	true ,              //将CSS中的图片地址转换为dataURI
	'IMAGE_DATAURI_MAX_SIZE'      	=>	3000 ,              //图片DataUri转换后的最大尺寸限制，单位（字节）
	'MOD_STATIC_FILE_CHECK'       	=>	false ,              //检测模板中的静态文件（js、css）是否都通过*.inc文件的形式引入的
	'MOD_INLINE_JS_CSS'           	=>	false ,              //在inc文件中，将js或css内容直接引入进来
	'IS_SHOW_WARNING_INFO'        	=>	true ,              //是否显示警告信息
	'JS_CSS_LIST'                 	=>	array(              //css的class在js里用到的列表
	),
	'XSS_SAFE_VAR'                	=>	array(              //安全变量列表，必须是正则，不包含$
	),
	'REPLACE_DOMAIN_LIST'         	=>	array(              //地址替换列表
	),
	'DOMAIN_MULTIPLE_LIST'        	=>	array(              //'http://img.baidu.com' => 'http://(a,b,c,d,e).img.baidu.com',
	),
);