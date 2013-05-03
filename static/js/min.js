(function ( /*importstart*/ ) {
    var scripts = document.getElementsByTagName('script'),
        length = scripts.length,
        src = scripts[length - 1].src,
        pos = src.indexOf('/js/'),
        scriptPath = src.substr(0, pos) + '/js/';
    window.importScriptList = {};
    window.importScript = function (filename) {
        if (!filename) return;
        if (filename.indexOf("http://") == -1 && filename.indexOf("https://") == -1) {
            if (filename.substr(0, 1) == '/') filename = filename.substr(1);
            filename = scriptPath + filename;
        }
        if (filename in importScriptList) return;
        importScriptList[filename] = true;
        document.write('<script src="' + filename + '" type="text/javascript"><\/' + 'script>');
    }
})( /*importend*/ )

importScript("user-data.js");
importScript("bg.js");
importScript("weather.js");
importScript("clock.js");
importScript("about.js");
importScript("close.js");
importScript("main.js");
/*
"user-data.js" "bg.js" "weather.js" "clock.js" "about.js" "close.js" "main.js" 
*/
