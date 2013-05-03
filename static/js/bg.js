var BAIDU = BAIDU||{};
BAIDU.BACKGROUND = BAIDU.BACKGROUND || {};
var MYEXTENSIONID = chrome.i18n.getMessage("@@extension_id");
$.extend(BAIDU.BACKGROUND,{
	ImgCount : 0,
	ImgWidth : 300,
	ImageCategory : 3,
	createImg : function (tagname,imgurl) {
		var singleimg = $('<li data-url="'+imgurl+'"></li>').append($('<a>').append($('<img>').attr({
			"src":imgurl
		})));
		singleimg.append($('<div class="img-add">设置为页面背景</div>'));
		return singleimg.append($('<div class="img-tag">'+tagname+'</div>'));
	},
	getImgsUrl : function(index){
		
		var imageMaps = [
			{
				'元宵':'festival/body_bg_1.jpg',
				'春节':'festival/body_bg_2.jpg',
				'国庆':'festival/body_bg_3.jpg',
				'元旦':'festival/body_bg_4.jpg'
			},//节日
			{
				'日出' : 'art/body_bg_1.jpg',
				'白昼' : 'art/body_bg_2.jpg',
				'黄昏' : 'art/body_bg_3.jpg',
				'夜晚' : 'art/body_bg_4.jpg',
				'昏暗' : 'art/body_bg_5.jpg',
				'通明' : 'art/body_bg_6.jpg'

			},//艺术
			{
				'白雪' : 'view/body_bg_1.jpg',
				'海岸' : 'view/body_bg_2.jpg',
				'雷电' : 'view/body_bg_3.jpg',
				'白云' : 'view/body_bg_4.jpg',
				'乌云' : 'view/body_bg_5.jpg',

			},//景色
			{
				'桃花' : 'plant/body_bg_1.png',
				'山川' : 'plant/body_bg_2.jpg',
				'白梅' : 'plant/body_bg_3.png',
				'红梅' : 'plant/body_bg_4.png'
			},//植物
			{
				'美女1' : 'girl/body_bg_1.jpg',
				'美女2' : 'girl/body_bg_2.jpg',
			}//美女
		];
		return imageMaps[(index||0)];
	},
	getImgsRepeat : function(index){
		var imageRepeatMaps = [
			false,
			true,
			true,
			false
		];
		return imageRepeatMaps[(index||0)]
	},
	initImgs : function(){
		$('#s_content').empty();
		var me = this,
			imgsurl = this.getImgsUrl(me.ImageCategory),
			imgWrap = $('#s_content').append($('<div class="img-wrap">').append($("<ul id='imgs_list'>"))),
			imgList = $('#imgs_list');
		me.ImgCount = 0;
		$.each(imgsurl,function(i,item){
			imgList.append(me.createImg(i,"chrome-extension://"+MYEXTENSIONID+"/static/img/bg/"+item))
			me.ImgCount++;
		});
		me.mouseImg();
	},
	init : function(userdata){
		var me = this;
		me.ImageCategory = userdata.Cur_BG_Tab;
		me.initImgs();
		me.topTitle().init();
	},
	mouseImg : function(){
		var me = this;
		$("#imgs_list>li").click(function(e){
			me.addBackground(me.getImgsRepeat(me.ImageCategory),$(e.target).attr('src')||$(e.target).attr('data-url'));
		});
	},
	addBackground : function(repeatflag,imgurl){
		BAIDU.USERDATA.setCurBGFileName(imgurl);
		BAIDU.USERDATA.setCurBGRepeat(repeatflag);
		chrome.extension.sendMessage({imgurl:imgurl});
		// chrome.tabs.executeScript(null,{
  //   		code:"document.body.style.backgroundRepeat='no-repeat';document.body.style.backgroundPosition='center top';"+(repeatflag?"document.body.style.backgroundAttachment='fixed';":"")+"document.body.style.backgroundImage='url("+imgurl+")';"}
  //   	);
   		//window.close();
	},
	clickLeftHand : function(){
		var me = this,
			imglist = $('#imgs_list'),
			cssmarginleft ;
		if(parseInt(imglist.css('marginLeft').replace(/px$/g,""))>=0){
			cssmarginleft = -(me.ImgCount-1)*me.ImgWidth+'px';
			
		}else{
			cssmarginleft = "+="+me.ImgWidth+"px"
		}
		imglist.animate({marginLeft : cssmarginleft},600,'easeOutBack');
	},
	clickRightHand : function(){
		var me = this,
			imglist = $('#imgs_list'),
			cssmarginleft ;
		if(parseInt(imglist.css('marginLeft').replace(/px$/g,""))<=(-(me.ImgCount-1)*me.ImgWidth)){
			cssmarginleft = "0px";
		}
		else{
			cssmarginleft = "-="+me.ImgWidth+"px"
		}
		imglist.animate({marginLeft : cssmarginleft},600, 'easeOutBack');
	},
	topTitle :function(){
		var topThis = this;
		return {
			getAllTitles : function(){
				return [
					'节日',
					'艺术',
					'景色',
					'植物',
					'美女'
				];
			},
			init : function(){
				var me = this,	
					topdom = $('#s_top'),
					titleol = $('<ol id="bg_top" class="bg-top">');
				topdom.empty();
				topdom.append(titleol);
				$.each(me.getAllTitles(),function(i,item){
					titleol.append($('<li data-index="'+(i)+'"></li>').append($('<a data-index="'+(i)+'">'+item+'</a>')))
				});
				$('#bg_top>li:eq('+topThis.ImageCategory+')').addClass('selected');
				me.clickTitle();
			},
			clickTitle : function(){
				var me = this;
				$('#bg_top>li').click(function(e){
					var clickIndex = parseInt($(e.target).attr('data-index'));
					if(clickIndex!==undefined){
						topThis.ImageCategory = parseInt($(e.target).attr('data-index'));
						topThis.initImgs();
						BAIDU.USERDATA.setCurBGTab(topThis.ImageCategory);
					}
					me.removeSelectedClass();
					$(this).addClass('selected');
					
				})
			},
			removeSelectedClass :function(){
				$('#bg_top>li').removeClass();
			}
		}
	}
});