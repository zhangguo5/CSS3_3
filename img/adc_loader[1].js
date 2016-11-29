if(typeof(window.TsCmcObj) != "undefined" && typeof(window.TsCmcObj.Version) != "unknown"  )
{	
	var strVersion = "";
	var scriptUrl = "";
	strVersion = window.TsCmcObj.Version();

	switch(strVersion){
		case '7':
			scriptUrl = "http://s.pc.qq.com/navigate/adc/v4/engine_loader_v3.js";
			break;
		case '6':
			scriptUrl = "http://s.pc.qq.com/navigate/adc/v3/engine_loader_v3.js";
			break;
		case '5':
			scriptUrl = "http://s.pc.qq.com/navigate/adc/v2/engine_loader_v2.js?v=01251045";
			break;
		case '4':
			scriptUrl = "http://s.pc.qq.com/navigate/adc/v1/engine_loader_v1.js";
			break;
	}


	var script = document.createElement("script");  
		script.type = "text/javascript";  
		script.src = scriptUrl;  
		script.charset = "UTF-8";
		document.body.appendChild(script);  

}