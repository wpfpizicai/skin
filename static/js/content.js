(function init(){
	var colorSet = [
		{fontcolor:"white",logimg:"logo_baidu_white.png"},//背景为暗色
		{fontcolor:"",logimg:"logo_baidu_light.png"}//背景为亮色
	];
	var defaultLogoImg = "http://www.baidu.com/img/shouye_b5486898c692066bd2cbaeda86d74448.gif";
	if (location.host=="www.baidu.com"||location.host=="www.spacefe.baidu.com"||location.host=="yulan.baidu.com") {
		addDragArea();
		bindDragArea();
		chrome.extension.sendMessage({defaultimg:$('#hk_tpl_btn2').attr('data-src'),isfirstinit:"true"}, function(response){
			insertImgs(response);
		});

	} else if(location.host=="xiangce.baidu.com"){
		insertBtntoXiangce();
	};
	function addDragArea(){
		if(!$('#hk_layer')[0]){
			$(document.body).append($('<div id="hk_layer"><div id="hk_tpl_btn1"><div class="no-img-byextension"></div></div><div id="drag_area_byextension"><div class="drag-area-img"></div><div class="drag-area-text">拖动文件到这里试试</div></div><ul id="hk_wallpapers"></ul></div>')).append($('<div id="bg_entrance_byextension" class="hk_tip" style="display: block;"></div>'));
		}
		$('#hk_tpl_btn1').after($(''));
	};
	function bindDragArea(){
		$('#bg_entrance_byextension').click(function(e){
			$('#hk_layer').toggleClass("layer_display");
			e.stopPropagation();
		})
	};
	function insertBtntoXiangce(){
		var btn = $('<div id="addtobaidu_by_extension" class="addtobaidu-by-extension"><a href="javascript:;" onclick="return false;">设置为百度首页背景</a></div>');
		$(document.body).append(btn);
		btn.click(function (e) {
			chrome.extension.sendMessage({imgurl:$('#zoomLinkBt').attr('href')},function (response) {});
			if(!document.getElementById('dialog_by_extension')){
				$(document.body).append($('<div id="dialog_by_extension"><p style="width: 100px;margin: auto;height: 40px;line-height: 40px;font-size: 14px;">去<a id="add_btn_byextension" href="http://www.baidu.com/" target="_blank" style="font-size: 14px;color:#165b85;">百度首页</a>看看</p></div>'));
			}
			$("#dialog_by_extension").dialog({
				title:"设置成功",
				modal:true,
				show: {
    				effect: 'fade',
    				duration: 300
  				},
				buttons: {
    				"确定": function() {
      					var dlg = $(this).dialog("close");
      					$('.ui-dialog.ui-widget').remove();
      				}
    			}
			});
			$('#dialog_by_extension #add_btn_byextension').click(function(){
				$("#dialog_by_extension").dialog("close");
				$('.ui-dialog.ui-widget').remove();
			});
			setTimeout(function(){
				if($("#dialog_by_extension")[0]){
					$("#dialog_by_extension").dialog("close");
					$('#dialog_by_extension').remove();
				}
			},2000);
		})
	};
	function insertImgs (responseData){
		if(responseData){
			if(!$('#hk_layer .xiangce-btn')[0]){
				$("#hk_layer").append("<a class='xiangce-btn' target='_blank' href='http://xiangce.baidu.com/'></a>")
			}
			$('#hk_wallpapers').empty();
			if(responseData.filenames){
				var filenames = responseData.filenames.split("@");
				var imgWraper = $('#hk_wallpapers');
				$.each(filenames,function(i,item){
					imgWraper.append($('<li></li>').append($("<img width='123' height='90' src='"+item+"'></img><div class='img-add'>设置为页面背景</div>")));
				})
			}else{
				addText();
			}	
		}
		addImgAddTag(responseData);
		bindImgs();
	};
	function bindImgs (){
		//bind clear btn
		$('#hk_tpl_btn1').click(function(e){
			chrome.extension.sendMessage({clear:"true"});
		})
		//bind imgs
		$('#hk_wallpapers img').click(function(e){
			chrome.extension.sendMessage({imgurl:$(this).attr("src")});
		})
	};
	function setBackground (responseData) {
		if(responseData&&responseData.shadowflag!==undefined){
			var fontcolor = colorSet[(responseData.shadowflag?0:1)].fontcolor,
				logourl = colorSet[(responseData.shadowflag?0:1)].logimg;
			if(responseData.imgurl){
				document.body.style.backgroundRepeat="no-repeat";
		 		document.body.style.backgroundPosition='center top';
		 		if(document.getElementById("s_menu")){
		 			//新首页
		 			document.body.style.backgroundSize='100%';//contain
		 			document.body.className = 'newbaidu-by-extension-' + fontcolor;
					$('#u').css({
						border:"none"
					});

			 		if($('#lg .fluxslider .image1')[0]){
			 			$('#lg .fluxslider .image1').css({
				 			backgroundImage:("url(chrome-extension://"+chrome.i18n.getMessage("@@extension_id")+"/static/img/"+logourl+")")
				 		});
			 		}
			 		else{
			 			$('#lg img').attr({
				 			src:("chrome-extension://"+chrome.i18n.getMessage("@@extension_id")+"/static/img/"+logourl)
				 		});
			 		}	
		 		}else{
		 			//传统首页
		 			document.body.style.backgroundSize='cover';
		 			document.body.className = 'classicbaidu-by-extension-' + fontcolor;
		 			
		 			$('#lg img').attr({
			 			src:("chrome-extension://"+chrome.i18n.getMessage("@@extension_id")+"/static/img/"+logourl)
			 		});
		 		}
		 		//两者皆有的
		 		document.body.style.backgroundImage='url("'+responseData.imgurl+'")';
	
		 		setTimeout(function(){
		 			$('#u_level').css({
		 				color:(fontcolor?fontcolor:"black")
		 			});
		 		},800);
			}else{
				removeAllcss();
			}
		}
	};
	function removeAllcss(){
		//两者皆有的
 		document.body.style.backgroundImage="";
		document.body.className ="";
		$('#u_level').css({
			color:"black"
		})
		if(document.getElementById("s_menu")){
 			
 			//新首页
	 		if($('#lg .fluxslider .image1')[0]){
	 			$('#lg .fluxslider .image1').css({
		 			backgroundImage:"url("+defaultLogoImg+")"
		 		});
	 		}else{
	 			$('#lg img').attr({
		 			src:defaultLogoImg
		 		});
	 		}
	 		
 		}else{
 			
 			//传统首页
 			$('#lg img').attr({
	 			src:defaultLogoImg
	 		});
 		}
	};
	function addImgAddTag (responseData){
		var imgurl = responseData.imgurl,
			isDefaultImg = responseData.isdefaultflag;
		if(imgurl){
			//存在选中背景
			removeImgAddTag();
			if(isDefaultImg){
				$('#hk_tpl_btn2').append($('<div class="add-tag">'));
			}else{
				if(responseData.filenames){
					var imgindex = (responseData.filenames.split("@")||"").indexOf(imgurl);
					$("#hk_wallpapers>li:eq("+imgindex+")").append($('<div class="add-tag">'));
				}	
			}

		}else{
			//未选中任何背景
			removeImgAddTag();
		}
	};
	function removeImgAddTag(){
		$('#hk_tpl_btn2 .add-tag').remove();
		$('#hk_layer .add-tag').remove();
	};
	function addText(){
		$('#hk_wallpapers').append($("<p class='big-white'>定制专属您的百度首页</p>")).append($("<p class='small-black'>一键搞定，百度为您更智能地提供个性化服务</p>"));	
	};
	function removeText(){
		$('#hk_wallpapers').empty();
	};

	//fileReader	
	if (window.FileReader) {
		var cnt = document.getElementById('drag_area_byextension');

		// 判断是否图片
		function isImage(type) {
			switch (type) {
				case 'image/jpeg':
				case 'image/png':
				case 'image/gif':
				case 'image/bmp':
				case 'image/jpg':
					return true;
				default:
					return false;
			}
		};

		// 处理拖放文件列表
		function handleFileSelect(evt) {
			evt.stopPropagation();
			evt.preventDefault();
			var files = evt.dataTransfer.files;

			for (var i = 0, f; f = files[i]; i++) {

				var t = f.type ? f.type : 'n/a',
					reader = new FileReader(),
					isImg = isImage(t);

				// 处理得到的图片
				if (isImg) {
					reader.onload = (function (theFile) {
						return function (e) {
							chrome.extension.sendMessage({imgurl:e.target.result});
						};
					})(f)
					reader.readAsDataURL(f);
				} else {
					alert('亲，你传进来的不是图片！！');
				}

			}

		}
		
		// 处理插入拖出效果
		function handleDragEnter(evt){ $('#drag_area_byextension .drag-area-img').css({borderStyle:'dashed'})}
		function handleDragLeave(evt){ $('#drag_area_byextension .drag-area-img').css({borderStyle:''})  }

		// 处理文件拖入事件，防止浏览器默认事件带来的重定向
		function handleDragOver(evt) {
			evt.stopPropagation();
			evt.preventDefault();
		}
		if(cnt){
			cnt.addEventListener('dragenter', handleDragEnter, false);
			cnt.addEventListener('dragover', handleDragOver, false);
			cnt.addEventListener('drop', handleFileSelect, false);
			cnt.addEventListener('dragleave', handleDragLeave, false);	
		}
	} 

	chrome.extension.onMessage.addListener(function(response){
		setBackground(response);
		insertImgs(response);
	});

	document.body.addEventListener('click',function(e){
		if($('#hk_layer').hasClass("layer_display")){
			if(isOutArea(e.target)){
				$('#hk_layer').removeClass("layer_display");
			}
		}	
	},false)

	function isOutArea (element) {
		while(!isEnd(element)){
			element = element.parentNode
		}
		if(!element || element == document.body){
			return true;
		}
		else{
			return false;
		}
	}
	function isEnd(element){
		return !element || ($(element).attr('id')== "hk_layer")|| (element==document.body) ;
	}

})();