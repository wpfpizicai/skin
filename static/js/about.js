var BAIDU = BAIDU||{};
BAIDU.ABOUT = BAIDU.ABOUT || {};
$.extend(BAIDU.ABOUT,{
	init: function (userdata) {
		$('#s_content').empty().append($('<div id="about_wrap" class="about-wrap"></div>'));
		$('#about_wrap').append($('<img src="chrome-extension://'+MYEXTENSIONID+'/static/img/about_bg.jpg"></img>')).append($('<div id="about_p" class="about-p"></div>'));
		$('#about_p').append($('<p>如遇到任何问题，或者任何建议</p>')).append($('<p>请联系：</p>')).append($('<p>hi:wpfpizicai</p>')).append($('<p> mail:wangpengfei04@baidu.com</p>'));

		var topdom = $('#s_top');
			titleol = $('<div id="clock_top" class="clock-top">'+"关于"+'</div>');
		topdom.empty();
		topdom.append(titleol);
	},
	clickLeftHand : function(){
		
	},
	clickRightHand : function(){
		
	}
})