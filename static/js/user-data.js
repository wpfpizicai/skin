var BAIDU = BAIDU||{};
BAIDU.USERDATA = BAIDU.USERDATA || {};
BAIDU.USERDATA = (function () {
	var TABS = [
			'天气','时钟','背景设置','关于','收起'
		],
		TIMEZONE = [
			'北京','悉尼','华盛顿','伦敦'
		],
		BG_TAB = [
			'电影','摄影','景色','建筑','美女'
		],
		DEFAULT_CUR_TAB = 2,
		DEFAULT_CUR_TIMEZONE = 0,
		DEFAULT_CUR_BG_TAB = 2,
		DEFAULT_CUR_BG_FILENAME = ""; 
		DEFAULT_CUR_BG_REPEAT = false;
	var LSFLAGS = "BAIDU_WEATHER_"

	var getCurTab = function(){
		var CUR_TAB = localStorage[LSFLAGS+"CUR_TAB"];
		if(!CUR_TAB){
			CUR_TAB = DEFAULT_CUR_TAB;
			localStorage[LSFLAGS+"CUR_TAB"] =DEFAULT_CUR_TAB;
		}
		return CUR_TAB;
	};

	var setCurTab = function(tabindex){
		localStorage[LSFLAGS+"CUR_TAB"] = tabindex;
	};

	var getCurTimeZone = function(){
		var CUR_TIMEZONE = localStorage[LSFLAGS+"CUR_TIMEZONE"];
		if(!CUR_TIMEZONE){
			CUR_TIMEZONE = DEFAULT_CUR_TIMEZONE;
			localStorage[LSFLAGS+"CUR_TIMEZONE"] =DEFAULT_CUR_TIMEZONE;
		}
		return CUR_TIMEZONE;
	};

	var setCurTimeZone = function(timezoneindex){
		localStorage[LSFLAGS+"CUR_TIMEZONE"] = timezoneindex;
	};

	var getCurBGTab = function(){
		var CUR_BG_TAB = localStorage[LSFLAGS+"CUR_BG_TAB"];
		if(!CUR_BG_TAB){
			CUR_BG_TAB = DEFAULT_CUR_BG_TAB;
			localStorage[LSFLAGS+"CUR_BG_TAB"] =DEFAULT_CUR_BG_TAB;
		}
		return CUR_BG_TAB;
	};

	var setCurBGTab = function(curbgtab){
		localStorage[LSFLAGS+"CUR_BG_TAB"] = curbgtab;
	};

	var getCurBGFileName = function(){
		var CUR_BG_FILENAME = localStorage[LSFLAGS+"CUR_BG_FILENAME"];
		if(!CUR_BG_FILENAME){
			CUR_BG_FILENAME = DEFAULT_CUR_BG_FILENAME;
			localStorage[LSFLAGS+"CUR_BG_FILENAME"] =DEFAULT_CUR_BG_FILENAME;
		}
		return CUR_BG_FILENAME;
	};

	var setCurBGFileName = function(filename){
		localStorage[LSFLAGS+"CUR_BG_FILENAME"] = filename;
	};

	var getCurBGRepeat = function(){
		var CUR_BG_REPEAT = localStorage[LSFLAGS+"CUR_BG_REPEAT"];
		if(!CUR_BG_REPEAT){
			CUR_BG_REPEAT = DEFAULT_CUR_BG_REPEAT;
			localStorage[LSFLAGS+"CUR_BG_REPEAT"] =DEFAULT_CUR_BG_REPEAT;
		}
		return CUR_BG_REPEAT;
	};

	var setCurBGRepeat = function(filename){
		localStorage[LSFLAGS+"CUR_BG_REPEAT"] = filename;
	}; 

	return {
		getCurTab : getCurTab,
		getCurBGTab : getCurBGTab,
		getCurTimeZone : getCurTimeZone,
		getCurBGFileName : getCurBGFileName,
		getCurBGRepeat : getCurBGRepeat,
		setCurTab : setCurTab,
		setCurBGTab : setCurBGTab,
		setCurBGFileName : setCurBGFileName,
		setCurTimeZone : setCurTimeZone,
		setCurBGRepeat : setCurBGRepeat
	}

})();