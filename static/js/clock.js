var BAIDU = BAIDU||{};
BAIDU.CLOCK = BAIDU.CLOCK || {};
BAIDU.TIMEZONE = {
	'CHN':[8,'北京'],
	'AUS':[9.5,'悉尼'],
	'USA':[-10,'华盛顿'],
	'ENG':[0,'伦敦']
};
BAIDU.DATE = (function(){
	/*offset应该为小时单位*/
	var getLocationTime = function(timeOffset){
		var d = new Date(),
			localTime = d.getTime(),
			localOffset = d.getTimezoneOffset() * 60000,
			utc = localTime + localOffset,//得到国际标准时间
			calctime = utc + (3600000*timeOffset),  
			od = new Date(calctime); 
		return od; 
	};	
	return{
		getLocationTime:getLocationTime
	}
})();
BAIDU.CLOCK =  (function () {
	var CITY = 0;
	var getCity = function(){
		return CITY;
	}
	var setCity = function(num){
		CITY = num;
		return CITY;
	}
	var createClock= function(id,timeZone) {
	    var clock_panel,
	    	freshClock;               
	    /********************************** 开始画指针和轮廓 **********************************/
	    (function(canvas) {
	        var paper = Raphael(canvas),
	            center_x = 150, 
	            center_y = 67,
	            underpan_radius = 70,
	            createCircle = function(attr) {
	                return paper.create('circle', attr);
	            },
	            createRect = function(attr){
	            	return paper.create('rect',attr);
	            },
	            createLine = function(attr){
	            	return paper.create('path',attr);	
	            },
	            createText = function(attr){
	            	return paper.create('text',attr);
	            },
	            createHand = function(attr){
	                return createRect({
	                    x: center_x - attr.width / 2,
	                    y: center_y - attr.height,
	                    width: attr.width,
	                    height: attr.height,
	                    fill: attr.fill||"#000"  
	                });
	            },
	            createLogo = function(attr){
	            	return createText({
		            	x:attr.x,
		            	y:attr.y,
		            	text:attr.text,
		            	fill:attr.fill,
		            	'fill-opacity':attr.fopacity||0.5,
		            	'font-family':"Verdana",
		            	'font-size':attr.fsize||30,
		            	'font-weight':'bold'
		            });
	            },
	            panel = clock_panel = createRect({
	                x: 0,
	                y: 0,
	                width: 300,
	                height: 135,
	                r: 6,
	                fill: '#051E3D',
	                'fill-opacity': 1
	            }),
	            hour_hand = createHand({width:8, height:35,fill:'#FFF',stroke:"#FFF",'stroke-opacity':0.5}),
	            minute_hand = createHand({width:5, height:42,fill:'#DDD',stroke:"#0F0F0F",'stroke-opacity':0.5}),
	            second_hand = createHand({width:3, height:60,fill:'#F30'}),
	        /********************************** 画logo **********************************/    
	            out_button = createCircle({
	                cx: center_x,
	                cy: center_y,
	                r: 10,                  
	                fill: '90-#363636:90-#efefef',
	                stroke: '#333',
	                'stroke-width': 1           
	            }),
	            in_button = createCircle({
	                cx: center_x,
	                cy: center_y,
	                r: 5,                  
	                fill: '#fff',
	                stroke: '#333',
	                'stroke-width': 1           
	            });
	            var dayLogo = createLogo({x:center_x-100,fopacity:0.1,y:center_y,fill:"#FFF",text:"AM"}),
	            	timeLogo = createLogo({x:center_x+100,y:center_y,fill:"#FFF",fsize:14,text:"00:00:00"});

	            
	        /********************************** 刻表盘 **********************************/
	        $.each([0,30,60,90,120,150,180,210,240,270,300,330], function(i,deg) {
	            var scale = createRect({
	                width: 3,
	                height: 11,
	                x: center_x - 1,
	                y: center_y - underpan_radius + 16,
	                fill: '#FFF'
	            });
	            scale.rotate(deg, center_x, center_y);
	        });
	        
	        $.each([10,20,40,50,70,80,100,110,130,140,160,170,190,200,220,230,250,260,280,290,310,320,340,350], function(i,deg) {
	            var scale = createRect({
	                width: 1,
	                height: 5,
	                x: center_x - 1,
	                y: center_y - underpan_radius + 16,
	                fill: '#666666',
	                stroke:'#666666',
	                'fill-opacity': 0.1
	            });             
	            scale.rotate(deg, center_x, center_y);
	        });	
	        getLocationTimeString = function(times){
	        	var str = "";
	        	$.each(times,function(i,item){
	        		if(item<10){
	        			item = "0" +item;
	        		}
	        		str +=item+(i>1?"":":");
	        	})
	        	return str;

	        };    
	        freshClock = function() {
	            timeOffset = timeZone[0];
	            var d = BAIDU.DATE.getLocationTime(timeOffset),
					s = d.getSeconds(),
	                m = d.getMinutes(),
	                h = d.getHours(),
	                s_arg = "r"+s*6+","+center_x+","+center_y,
	                m_arg = "r"+(6 * (m + s / 60))+","+center_x+","+center_y,
	                h_arg = "r"+(30*(h + m / 60))+","+center_x+","+center_y;
	            second_hand.transform(s_arg);
	            minute_hand.transform(m_arg);
	            hour_hand.transform(h_arg);
	            amorpm = h>12?"PM":"AM";
	            dayLogo.attr('text',amorpm);
	            timeLogo.attr('text',getLocationTimeString([h,m,s]));
	        };
	        
	        freshClock();
	               
	    })(id,timeZone); 
	    return freshClock;
	};
	var TimezoneCity =[
		'北京','悉尼','华盛顿','伦敦'
	];
	var changeTitle = function(){
		var timezone = parseInt($('#clocks_list').css('marginLeft').replace(/px$/g,""))/(-300);
		if(TimezoneCity[timezone]){
			$('#clock_top').html(TimezoneCity[timezone]+"时间");
			BAIDU.USERDATA.setCurTimeZone(timezone);
		}
	};
	return {
		createClock:createClock,
		getCity : getCity,
		setCity : setCity,
		TimezoneCity :TimezoneCity,
		changeTitle :changeTitle
	};
})();
BAIDU.CLOCKS = BAIDU.CLOCKS || [];
BAIDU.CLOCK.init = function(userdata){
	var contentdom  = $('#s_content'),
		curtimezone = userdata.Cur_TimeZone||0;
	contentdom.empty();
	contentdom.append($('<div class="clock-wrap"></div>').append($('<ul id="clocks_list">')));
	$('#clocks_list').css('marginLeft',(curtimezone*(-300)+"px"));
	for(var cty in BAIDU.TIMEZONE){
		$('#clocks_list').append('<li id="canvas_'+cty+'">');
		BAIDU.CLOCKS.push(BAIDU.CLOCK.createClock('canvas_'+cty,BAIDU.TIMEZONE[cty]));
	}
	function refresh(){
		var _that = this;
		for(var i in BAIDU.CLOCKS){
			BAIDU.CLOCKS[i].call(_that);
		}
	};
	if(intervalTimer){clearInterval(intervalTimer);}
	var intervalTimer = setInterval(refresh, 1000);
	BAIDU.CLOCK.topTitle().init(BAIDU.CLOCK.TimezoneCity[curtimezone]);
};
BAIDU.CLOCK.clickLeftHand =function(){
	var me = this,
		clockslist = $('#clocks_list'),
		cssmarginleft ;
	me.ImgCount = BAIDU.CLOCKS.length;
	me.ImgWidth = 300;

	if(parseInt(clockslist.css('marginLeft').replace(/px$/g,""))>=0){
		cssmarginleft = -(me.ImgCount-1)*me.ImgWidth+'px';
		
	}else{
		cssmarginleft = "+="+me.ImgWidth+"px"
	}
	clockslist.animate({marginLeft : cssmarginleft},600,'easeOutBack',BAIDU.CLOCK.changeTitle);
};
BAIDU.CLOCK.clickRightHand = function(){
	var me = this,
		clockslist = $('#clocks_list'),
		cssmarginleft ;
	me.ImgCount = BAIDU.CLOCKS.length;
	me.ImgWidth = 300;
	if(parseInt(clockslist.css('marginLeft').replace(/px$/g,""))<=(-(me.ImgCount-1)*me.ImgWidth)){
		cssmarginleft = "0px";
	}
	else{
		cssmarginleft = "-="+me.ImgWidth+"px"
	}
	clockslist.animate({marginLeft : cssmarginleft},600, 'easeOutBack',BAIDU.CLOCK.changeTitle);
	
};
BAIDU.CLOCK.topTitle = function(){
	return {
		init: function(titlename){
			var me = this;
			var topdom = $('#s_top');
				titleol = $('<div id="clock_top" class="clock-top">'+titlename+"时间"+'</div>');
			topdom.empty();
			topdom.append(titleol);
		}
	}
};