var MYFRAMES = [BAIDU.WEATHER,BAIDU.CLOCK,BAIDU.BACKGROUND,BAIDU.ABOUT,BAIDU.CLOSE],
	USERDATA = {
		"Cur_Tab" : parseInt(BAIDU.USERDATA.getCurTab()),
		"Cur_TimeZone" : parseInt(BAIDU.USERDATA.getCurTimeZone()),
		"Cur_BG_Tab" : parseInt(BAIDU.USERDATA.getCurBGTab()),
		"Cur_BG_FileName" : BAIDU.USERDATA.getCurBGFileName()
	};
	
$(document).ready(function(){
	MYFRAMES[USERDATA['Cur_Tab']].init(USERDATA);
	$('#s_nav>ul>li:eq('+USERDATA['Cur_Tab']+')').addClass('selected');
	var removeSelectedClass = function(){
		$('#s_nav>ul>li').removeClass('selected');
	}
	$('#left_hand').click(function(e){
		MYFRAMES[USERDATA['Cur_Tab']].clickLeftHand()
	});
	$('#right_hand').click(function(e){
		MYFRAMES[USERDATA['Cur_Tab']].clickRightHand()
	});
	$('#s_nav>ul').click(function(e){
		removeSelectedClass();
		var linode = e.target.parentNode.parentNode;
		$(linode).addClass("selected");
		var clickframe = parseInt($(linode).attr('data-id'));
		if(clickframe!=USERDATA['Cur_Tab']){
			USERDATA['Cur_Tab'] = clickframe;
			MYFRAMES[USERDATA['Cur_Tab']].init({
				"Cur_Tab" : parseInt(BAIDU.USERDATA.getCurTab()),
				"Cur_TimeZone" : parseInt(BAIDU.USERDATA.getCurTimeZone()),
				"Cur_BG_Tab" : parseInt(BAIDU.USERDATA.getCurBGTab()),
				"Cur_BG_FileName" : parseInt(BAIDU.USERDATA.getCurBGFileName())
			});
			if(clickframe==4){
				clickframe = 1;
			}
			BAIDU.USERDATA.setCurTab(clickframe);
		}
	});
});
