var BAIDU = BAIDU||{};
BAIDU.WEATHER = BAIDU.WEATHER || {};
$.extend(BAIDU.WEATHER,{
	init: function (userdata) {
		$('#s_content').empty().append($('<div id="weather_wrap" class="weather-wrap"></div>'));
		$('#weather_wrap').append($('<img src="chrome-extension://'+MYEXTENSIONID+'/static/img/weather_bg.png"></img>')).append($('<div id="weather_p" class="weather-p"></div>'));
		$('#weather_p').append($('<p>开发中...</p>'));

		var topdom = $('#s_top');
			titleol = $('<div id="clock_top" class="clock-top">'+"天气"+'</div>');
		topdom.empty();
		topdom.append(titleol);
	},
	clickLeftHand : function(){
		
	},
	clickRightHand : function(){
		
	}
});