var BAIDU = BAIDU||{};
BAIDU.IMAGEDATA = BAIDU.IMAGEDATA || {};
BAIDU.IMAGEDATA = (function () {
	var img = new Image(),
		defaultimgurl ,
		isDefaultImg,
		myimgurl,
		shadowFlag = false,
		LogoWidth = 720,
		LogoHeight = 220,
		storePicNum = 4,
		splitFlag="@",
		imgUrls = [],
		tabIds = [];
	function addPicUrltoLocal (imgurl,defaultflag){
		if(!imgurl) return;
		isDefaultImg = defaultflag;
		if(getPicUrlinLocal()){
			imgUrls = getPicUrlinLocal().split(splitFlag).slice(0);
		}
		if(imgUrls.indexOf(imgurl)>-1) return;
		if(!defaultflag){
			if(imgUrls.length>=storePicNum){
				imgUrls.pop()
			}
			imgUrls.unshift(imgurl);
			localStorage["BAIDU_WEATHER_BG_FILENAMES"] = imgUrls.join(splitFlag);
		}		
	};
	function getPicUrlinLocal(){
		return localStorage["BAIDU_WEATHER_BG_FILENAMES"];
	};
	function init(imgurl){
		img.src = "" ;
		tabIds = [];
		chrome.tabs.query({ title:"百度一下，你就知道"}, function (tabs) {
  			$.each(tabs,function(i,item){
  				tabIds.push(item.id)
  			})
  			if(imgurl){
				myimgurl = imgurl;
				img.src = imgurl;
			}else{
				$.each(tabIds,function(i,item){
					chrome.tabs.sendMessage(item,{shadowflag:shadowFlag,imgurl:"",filenames:getPicUrlinLocal()})
				})
			}
		});
	};
	img.onload = function () {
		var ImgData ,
			width = img.width,
			height = img.height,
			picCanvas = $('<canvas width="'+width+'" height="'+height+'">')[0].getContext("2d");
		try{
			picCanvas.drawImage(img,0,0);
			var imageData = picCanvas.getImageData(0,0,width,height),
				imageDataArray = createPixelPic(imageData.data,width,height);
			shadowFlag = getLogoAverageColor(imageDataArray,width,height);
		}catch(e){
			console.log(e);
		}
		$.each(tabIds,function(i,item){
			chrome.tabs.sendMessage(item,{shadowflag:shadowFlag,imgurl:myimgurl,filenames:getPicUrlinLocal(),isdefaultflag:isDefaultImg})
		})
	};
	
	function createPixelPic(imgData,width,height){
		var picData = [];
		for (var i=0;i<height;i++){
			picData[i] = [];
			for (var j=0;j<width;j++){
				var _step =  (i*width + j) * 4 ;
				picData[i][j] = [imgData[0 + _step],imgData[1 + _step],imgData[2 + _step],imgData[3 + _step]];
			}
		}
		return picData;
	};
	//true : 暗色 false: 亮色
	function getLogoAverageColor(imgdataarr,width,height){
		var leftx = width/2-LogoWidth/2;
		leftx = leftx>0?leftx:0;
		var rightx = width/2+LogoWidth/2;
		rightx = rightx>width?width:rightx;
		var topy = 0,
			bottomy = LogoHeight,
			r=0,
			g=0,
			b=0;
		for(var i=topy;i<bottomy;i++){
			for(var j=leftx;j<rightx;j++){
				r+=imgdataarr[i][j][0];
				g+=imgdataarr[i][j][1];
				b+=imgdataarr[i][j][2];
			}
		}
		var pixelCount = (bottomy-topy)*(rightx-leftx); 
		var averagecolor = [Math.floor(r/pixelCount),Math.floor(g/pixelCount),Math.floor(b/pixelCount)];
		var average_hsbcolor = RGB_2_HSB(averagecolor[0],averagecolor[1],averagecolor[2]);
		if(average_hsbcolor.B<0.6){
			return true;
		}else{
			if(average_hsbcolor.S>0.15){
				return true
			}else{
				return false;
			}
		}
	};
	function messageHandler (requestdata, sender, sendResponse){
		var imgurl = "",
			hasImg ,
			isDefaultFlag ;//本次是否为默认
		if(requestdata){
  			isDefaultFlag = (requestdata.isfirstinit==="false")||(localStorage["BAIDU_WEATHER_CUR_BG_IS_DEFAULT"]==="true")
  			if(requestdata.imgurl){
  				localStorage["BAIDU_WEATHER_CUR_BG_FILENAME"] = requestdata.imgurl;
  				hasImg ="has";
  				localStorage["BAIDU_WEATHER_CUR_BG_IS_DEFAULT"]="false";//记录用户之前有没有选过默认
  				isDefaultFlag = false;
  			}
  			if(requestdata.defaultimg){
  				localStorage["BAIDU_WEATHER_CUR_BG_DEFAULT_FILENAME"]=requestdata.defaultimg;
  				hasImg ="has";
  				if(isDefaultFlag){
	  				localStorage["BAIDU_WEATHER_CUR_BG_IS_DEFAULT"]="true";
	  				isDefaultFlag = true;
  				}	
  			}
  			if(requestdata.isfirstinit==="true"){
  				imgurl = localStorage["BAIDU_WEATHER_CUR_BG_FILENAME"];
  			}
  			if(requestdata.clear=="true"){
  				hasImg ="none";
  				localStorage["BAIDU_WEATHER_CUR_BG_IS_DEFAULT"]="false";
  				localStorage["BAIDU_WEATHER_CUR_BG_FILENAME"] = "";
  			}
  		}
  		if( hasImg ==="has"){
  			if(isDefaultFlag){
  				imgurl = requestdata.defaultimg||localStorage["BAIDU_WEATHER_CUR_BG_DEFAULT_FILENAME"];
  			}else{
  				imgurl = requestdata.imgurl||localStorage["BAIDU_WEATHER_CUR_BG_FILENAME"];
  			}	
  		}
  		addPicUrltoLocal(imgurl,isDefaultFlag);
	  	init(imgurl);
	  	sendResponse({imgurl:imgurl,filenames:getPicUrlinLocal()})
	};
	function RGB_2_HSB(R, G, B) {    
	    var var_Min = Math.min(Math.min(R, G), B);  	  
	    var var_Max = Math.max(Math.max(R, G), B);  	  
	    var hsb = {H:0, S:0, B:0};  	  
	    if(var_Min == var_Max) {  	  
	        hsb.H = 0;  	  
	    } else if(var_Max == R && G >= B) {  	  
	        hsb.H = 60 * ( (G - B) / (var_Max - var_Min) );  	  
	    } else if(var_Max == R && G < B) {  	  
	        hsb.H = 60 * ( (G - B) / (var_Max - var_Min) ) + 360;  	  
	    } else if(var_Max == G) {  	  
	        hsb.H = 60 * ( (B - R) / (var_Max - var_Min) ) + 120;  	  
	    } else if(var_Max == B) {  	  
	        hsb.H = 60 * ( (R - G) / (var_Max - var_Min) ) + 240;  	  
	    }  	  
	    if(var_Max == 0) {  	  
	        hsb.S = 0;  	  
	    } else {  	  
	        hsb.S = 1 - (var_Min / var_Max);  	  
	    }  	  
	    var var_R = (R / 255);  	  
	    var var_G = (G / 255);  	  
	    var var_B = (B / 255);  	  
	    hsb.B = Math.max(Math.max(var_R, var_G), var_B);  
	    hsb.H = (hsb.H >= 360) ? 0 : hsb.H;  	  
	    return hsb;  	  
	};  
	return{
		init : init,
		messageHandler : messageHandler
	}
})();
chrome.extension.onMessage.addListener(BAIDU.IMAGEDATA.messageHandler);