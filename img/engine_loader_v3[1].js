
var $gjjq;
function IsIE()
{
	var c = navigator.userAgent.toLowerCase();
	var bIsIe = (c.indexOf("msie") > -1) || 
	(navigator.appName.toLowerCase().indexOf("microsoft internet explorer") > -1) ||
	 !! window.ActiveXObject ||
	  "ActiveXObject" in window;
	return bIsIe;
}
var GJ_MINI_BAR_ENGINE = {
    m_strGJGuid: "",
    m_isIE: false,
    m_nIEVersion: -1,
    m_nBID: 0,
    m_ElementMain: null,
    m_Timer: null,
    m_oricontextmenu: null,
    index: 0,
    sindex: 0,
    cindex: 0,
    timer: null,
    shader_timer: null,
    circle_timer: null,
    bclick: false,
    bPostAni: false,
	bhover:false,
	bHasShownSTip:false,
	tipstimer:null,
    cl_timer: null,
    number_timer: null,
	objAdcJson:null,
    objAdcount:"",
	bClear:false,
	hoverTime:0,
    numberTime:0,
	nAdCount:0,
    nWeekCount:0,
    nJustNowCount:0,
    nJustNowCountTemp:0,
    bJustNowShowd:false,
    nUseCount:0,
    bIsClicked:0,
    dragging :false ,
    iX :0,
	iY :0,
    oX :0,
    oY:0,
    oXr :0,
    oYb :0,
    vX :0,
    vY: 0,
	IsMousedown:false,
    conf: {
        strDaohangFrameId: "gj_SafeDaohang",
        strAddFrameId: "gj_SafeDaohangAdd",
        strDaohangDivId: "gj_NavDiv",
        strDaohangAddDivId: "gj_NavAddDiv",
        strDaohangHotNews: "gj_HotNews",
        strDaohangJSId: "adc_loader",
        strMiniId: "gj_mini",
        strShardId: "gj_shard",
        strCircleId: "gj_circle",
        strBarId: "gj_bar_left",
        strMiniImgId: "gj_MiniImg",
        nGetReportMaxCnt: 1024,
        strReoprtCgi: "http://c.gj.qq.com/fcgi-bin/microreport",
        version: 01251240,
        nReportInsertJsId: 0,
        nReportHoveredId: 1,
        nReportClickUrlId: 2,
        nReportAddUrl: 3,
        nReportDelUrl: 4,
        nReportShowHotNews: 5,
		nReportInsertAdc: 10,
		nReportShowAdc: 11,
		nReportClickAdc: 12,
		nReportRClickAdc: 13,
		nReportCompleteAdc: 14,
        nReportCompleteAuto: 15,
        nReportTipsJustNow: 31,
        nReportTipsClickMe:32,
        nReportTipsWeekShow:33,
        nReportTipsNoAd:34
    },
    Log: function(str) {
        return;
       if (typeof console != 'undefined') console.log(str);
    },
    getTop: function(e) {
        var offset = e.offsetTop;
        if (e.offsetParent != null) offset += this.getTop(e.offsetParent);
        return offset;
    },
    getLeft: function(e) {
        var offset = e.offsetLeft;
        if (e.offsetParent != null) offset += this.getLeft(e.offsetParent);
        return offset;
    },
    getHeight:function(){  
         return $gjjq(window).height();
    /*if(window.innerHeight!= undefined){  
        return $gjjq(window).height();//document.body.clientHeight;//window.innerHeight;  
    }  
    else{  
        var B= document.body, D= document.documentElement;  
        return Math.min(D.clientHeight, B.clientHeight);  
    }  */
    },
    getWidth:function(){  
       return $gjjq(window).width();
    /*if(window.innerWidth!= undefined){  
        return $gjjq(window).width();//document.body.clientWidth;//window.innerWidth;  
    }  
    else{  
        var B= document.body, D= document.documentElement;  
        return Math.min(D.clientWidth, B.clientWidth);  
    }  */
    },
    getXDirection:function()
    {
        var objMini = document.getElementById("gj_mini");
        var left = objMini.offsetLeft;
        if(left+objMini.clientWidth/2 < GJ_MINI_BAR_ENGINE.getWidth()/2)
        {
            return 0;
        }
        else
        {
            return 1;
        }
    },
    getYDirection:function()
    {
        var objMini = document.getElementById("gj_mini");
        var Top = objMini.offsetTop;
        if(Top+objMini.clientWidth/2 < GJ_MINI_BAR_ENGINE.getHeight()/2)
        {
            return 0;
        }
        else
        {
            return 1;
        }
    },
    getBottom: function(e) {
        var top =this.getTop(e);
        
        return this.getHeight()-top-e.offsetHeight;
    },
    getRight: function(e) {
        var left =this.getLeft(e);
        
        return this.getWidth()-left-e.offsetWidth;
    },
    getMiniWidth: function() {
        var objMini = document.getElementById("gj_mini");
        return objMini.offsetWidth;
    },
    getMiniHeight: function() {
        var objMini = document.getElementById("gj_mini");
        return objMini.offsetHeight;
    },
    getScrollTop: function() {
        var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
        return scrollTop;
    },
    
	tipstime_handle: function()
	{

        GJ_MINI_BAR_ENGINE.hoverTime++;
        if (GJ_MINI_BAR_ENGINE.hoverTime > 23) {
            //GJ_MINI_BAR_ENGINE.index = 0;

            clearInterval(GJ_MINI_BAR_ENGINE.tipstimer);
			if(!GJ_MINI_BAR_ENGINE.bHasShownSTip && !GJ_MINI_BAR_ENGINE.bClear)
			{	
				GJ_MINI_BAR_ENGINE.bHasShownSTip = !GJ_MINI_BAR_ENGINE.bHasShownSTip;
				GJ_MINI_BAR_ENGINE.ShowTips();
			}//showtip();
        
		}
		
       // GJ_MINI_BAR_ENGINE.Log("tipstime_handle" + GJ_MINI_BAR_ENGINE.hoverTime);
	},
    number_handle: function()
	{

        GJ_MINI_BAR_ENGINE.numberTime++;
        if (GJ_MINI_BAR_ENGINE.numberTime > 23) {
            clearInterval(GJ_MINI_BAR_ENGINE.number_timer);
		}
        var dom = document.getElementById('gj_justnow_num');
        if(GJ_MINI_BAR_ENGINE.nJustNowCountTemp < GJ_MINI_BAR_ENGINE.nJustNowCount)
        {
            dom.innerText= GJ_MINI_BAR_ENGINE.nJustNowCountTemp.toString() ;
            GJ_MINI_BAR_ENGINE.nJustNowCountTemp ++;
        }

        
        
		
        //1//GJ_MINI_BAR_ENGINE.Log("tipstime_handle" + GJ_MINI_BAR_ENGINE.hoverTime);
	},
    hover_handler: function() {
        var dom = document.getElementById('gj_mini');
        var xPos = 0;
        xPos = GJ_MINI_BAR_ENGINE.index * -58;
        dom.style.backgroundPosition = xPos + "px 0px";
        GJ_MINI_BAR_ENGINE.index++;
        if (GJ_MINI_BAR_ENGINE.index > 15) {
            //GJ_MINI_BAR_ENGINE.index = 0;
            clearInterval(GJ_MINI_BAR_ENGINE.timer);
        
		}
		
        //1//GJ_MINI_BAR_ENGINE.Log("hover_handler" + GJ_MINI_BAR_ENGINE.index + dom.style.backgroundPosition);
    },
    animationMuti: function(str) {
        elemObj = document.getElementById(str);
        GJ_MINI_BAR_ENGINE.animationElement(elemObj);
    },
    animationElement: function(elem) {
        elemObj = elem;
        if (!elemObj) {
            return;
        }
        var manager = new jsAnimManager();
        elemObj.style.width = elemObj.offsetWidth + "px";
        elemObj.style.height = elemObj.offsetHeight + "px";
        elemObj.style.overflow = "hidden";

        var oriLeft = this.getLeft(elemObj);
        var oriTop = this.getTop(elemObj);
        var oriLeft = oriLeft + elemObj.offsetWidth / 2;
        var oriTop = oriTop + elemObj.offsetHeight / 2;

        manager.registerElemPosition(elemObj, true);
        elemObj.setPosition( - (document.body.offsetWidth / 2) + oriLeft, oriTop);

        var anim1 = manager.createAnimElemObject(elem);
        var anim2 = manager.createAnimElemObject(elem);
        var time =  Math.floor(Math.random() * 10 + 1) * 150;
        var mini = document.getElementById("gj_mini");

        anim1.add({
            property: Prop.position,
            to: new Pos((document.body.offsetWidth / 2) - 10 - 22-10, this.getTop(mini) + 22),
            duration: time,
            ease: jsAnimEase.parabolicPos
        });
		anim2.add({
            property: Prop.dimension,
            to: new Dim(0, 0),
            duration: time+100,
			ease: jsAnimEase.parabolicPos,
            onComplete: function() {
                elemObj = elem; //document.getElementById(str);
               // elemObj.style.display = "none";
                elemObj.style.zIndex = 0;
                elemObj.parentNode.removeChild(elemObj);
            }
        });

        //anim1.add({property: Prop.positionSemicircle(true), to: new Pos(950,900),
        //	duration: 2000 ,ease: jsAnimEase.bounceSmooth});
       
		
		
		function DelaySizeAni(ani,elem,speed){
			//alert(/call/);
		  ani.add({
            property: Prop.dimension,
            to: new Dim(30, 30),
            duration: speed,
			ease: jsAnimEase.parabolicPos,
            onComplete: function() {
                elemObj = elem; //document.getElementById(str);
                elemObj.style.display = "none";
                elemObj.style.zIndex = 0;
                elemObj.parentNode.removeChild(elemObj);
            }
        });
		}
		var dalayTime = 0;
		var speed =  time - dalayTime;
		//window.setTimeout(function(){DelaySizeAni(anim2,elem,speed);},dalayTime);
			

    },
    calc_dis: function(element) {
        if (!element) return;
        var left = GJ_MINI_BAR_ENGINE.getLeft(element);
        //1//GJ_MINI_BAR_ENGINE.Log(": " + left + "  " +getLeft(document.getElementById('gj_mini')));
        if (left + 600 > GJ_MINI_BAR_ENGINE.getLeft(document.getElementById('gj_mini'))) {
            //1//GJ_MINI_BAR_ENGINE.Log("!!!!: " + left);
            GJ_MINI_BAR_ENGINE.DrawCircle();
            clearInterval(GJ_MINI_BAR_ENGINE.cl_timer);
        }

        //var dis = Math.sqrt(x) ;
    },
    mouseover_handler: function() {
        var dom = document.getElementById('gj_mini');

        var xPos = 0;
        xPos = GJ_MINI_BAR_ENGINE.index * -58;
        dom.style.backgroundPosition = xPos + "px 0px";
        GJ_MINI_BAR_ENGINE.index--;
        if (GJ_MINI_BAR_ENGINE.index < 0) { //GJ_MINI_BAR_ENGINE.index = 15;
            clearInterval(GJ_MINI_BAR_ENGINE.timer);
        }
        //1//GJ_MINI_BAR_ENGINE.Log("mouseover_handler" + GJ_MINI_BAR_ENGINE.index + dom.style.backgroundPosition);
    },
    mousedown_handler: function() {
        var dom = document.getElementById('gj_mini');
        var xPos = 0;
        xPos = GJ_MINI_BAR_ENGINE.index * -58;
        dom.style.backgroundPosition = xPos + "px 0px";
        GJ_MINI_BAR_ENGINE.index++;
        if (GJ_MINI_BAR_ENGINE.index > 6) { //GJ_MINI_BAR_ENGINE.index = 0;
            clearInterval(GJ_MINI_BAR_ENGINE.timer);
        }
        //1//GJ_MINI_BAR_ENGINE.Log("mousedown_handler" + GJ_MINI_BAR_ENGINE.index + dom.style.backgroundPosition);
    },
    mouseup_handler: function() {
        var dom = document.getElementById('gj_mini');
        var xPos = 0;
        xPos = GJ_MINI_BAR_ENGINE.index * -58;
        dom.style.backgroundPosition = xPos + "px 0px";
        //1//GJ_MINI_BAR_ENGINE.Log("mouseup_handler" + GJ_MINI_BAR_ENGINE.index + dom.style.backgroundPosition);
        GJ_MINI_BAR_ENGINE.index++;
        if (GJ_MINI_BAR_ENGINE.index > 91) {
            GJ_MINI_BAR_ENGINE.index = 0;
            clearInterval(GJ_MINI_BAR_ENGINE.timer);
			 setTimeout("GJ_MINI_BAR_ENGINE.Reset()", 2000);
            //return;
        }
        if (GJ_MINI_BAR_ENGINE.index == 17) {
            GJ_MINI_BAR_ENGINE.StartShard();
            //StopShark(document.getElementById('lanrenzhijia'));
        }
        if (GJ_MINI_BAR_ENGINE.index == 57) {
            GJ_MINI_BAR_ENGINE.StopShard();
        }
        if (GJ_MINI_BAR_ENGINE.index == 25) {
            GJ_MINI_BAR_ENGINE.collect();
        }
        if (GJ_MINI_BAR_ENGINE.index == 91) {
            //StopShard();
            //1//GJ_MINI_BAR_ENGINE.Log("------------------------hide gj_shard" + GJ_MINI_BAR_ENGINE.index + dom.style.backgroundPosition);
            $gjjq('#gj_shard').hide();
			// $gjjq("#gj_bar_left"),show();
            $gjjq("#gj_bar_left").animate({
                width: 160
            },
            "slow");

        }

    },
    filterpost_handler: function() {
        var dom = document.getElementById('gj_mini');
        var xPos = 0;
        xPos = GJ_MINI_BAR_ENGINE.index * -58;
        dom.style.backgroundPosition = xPos + "px 0px";
        GJ_MINI_BAR_ENGINE.index++;
        if (GJ_MINI_BAR_ENGINE.index > 91) {
            GJ_MINI_BAR_ENGINE.index = 0;

            clearInterval(GJ_MINI_BAR_ENGINE.timer);
			 setTimeout("GJ_MINI_BAR_ENGINE.Reset()", 50);
        }
        if (GJ_MINI_BAR_ENGINE.index == 17) {
            GJ_MINI_BAR_ENGINE.StartShard();
        }
        if (GJ_MINI_BAR_ENGINE.index == 57) {
            GJ_MINI_BAR_ENGINE.StopShard();
        }
        if (GJ_MINI_BAR_ENGINE.index == 91) {
        
            $gjjq('#gj_shard').hide();
        }

    },
    collect_ani_handler: function() {
        GJ_MINI_BAR_ENGINE.collect();
    },
    shard_handle: function() {
        var dom = document.getElementById('gj_shard');
        var xPos = 0;
        xPos = GJ_MINI_BAR_ENGINE.sindex * -200;
        dom.style.backgroundPosition = xPos + "px 0px";
        GJ_MINI_BAR_ENGINE.sindex++;
        if (GJ_MINI_BAR_ENGINE.sindex > 39) { //GJ_MINI_BAR_ENGINE.index = 0;
            clearInterval(GJ_MINI_BAR_ENGINE.shader_timer);
        }
        //1//GJ_MINI_BAR_ENGINE.Log("shard_handle: " + GJ_MINI_BAR_ENGINE.sindex + dom.style.backgroundPosition);
    },
    circle_handle: function() {
        var dom = document.getElementById('gj_circle');
        var xPos = 0;
        xPos = GJ_MINI_BAR_ENGINE.cindex * -58;
        dom.style.backgroundPosition = xPos + "px 1px";
        GJ_MINI_BAR_ENGINE.cindex++;
        if (GJ_MINI_BAR_ENGINE.cindex > 17) {
            GJ_MINI_BAR_ENGINE.cindex = 0;
            clearInterval(GJ_MINI_BAR_ENGINE.circle_timer);
            $gjjq("#gj_circle").hide();
        }
        //1//GJ_MINI_BAR_ENGINE.Log("++++++++++++++++circle_handle: " + GJ_MINI_BAR_ENGINE.cindex + dom.style.backgroundPosition);
    },
    reset_handle: function() {
        var dom = document.getElementById('gj_mini');
        var xPos = 0;
        xPos = GJ_MINI_BAR_ENGINE.index * -58;
        dom.style.backgroundPosition = xPos + "px 0px";
        GJ_MINI_BAR_ENGINE.index++;
        if (GJ_MINI_BAR_ENGINE.index > 25) {
            GJ_MINI_BAR_ENGINE.index = 0;
            clearInterval(GJ_MINI_BAR_ENGINE.timer);
			GJ_MINI_BAR_ENGINE.bclick = false;
			
           
            if( GJ_MINI_BAR_ENGINE.bPostAni)
            {
                 GJ_MINI_BAR_ENGINE.bPostAni = false;
            }
            else{
                GJ_MINI_BAR_ENGINE.bClear = true;
            }

            $gjjq("#gj_mini").css({
                "background-position": "0px 0px",
                "background-image": "url(http://s.pc.qq.com/navigate/adc/v3/hover-ok.png)"
            });
            $gjjq("#gj_bar_left").animate({
                width: 0
            },
            "slow");
			// $gjjq("#gj_bar_left").hide();
        }
        //1//GJ_MINI_BAR_ENGINE.Log("++++++++++++++++reset_handle: " + GJ_MINI_BAR_ENGINE.index + dom.style.backgroundPosition);
    },
    breathe_handle: function() {
        var dom = document.getElementById('gj_mini');
        var xPos = 0;
        xPos = GJ_MINI_BAR_ENGINE.index * -58;
        dom.style.backgroundPosition = xPos + "px 0px";
        GJ_MINI_BAR_ENGINE.index++;
        if (GJ_MINI_BAR_ENGINE.index > 36) {
            GJ_MINI_BAR_ENGINE.index = 0;
            clearInterval(GJ_MINI_BAR_ENGINE.timer);
            setTimeout("GJ_MINI_BAR_ENGINE.StartBreathe()", 300);
        }
        //1//GJ_MINI_BAR_ENGINE.Log("breathe_handle: " + GJ_MINI_BAR_ENGINE.index + dom.style.backgroundPosition);
    },
    DrawCircle: function() {
        //return ;
        GJ_MINI_BAR_ENGINE.cindex = 0;
        $gjjq("#gj_circle").show();
        GJ_MINI_BAR_ENGINE.circle_timer = setInterval(GJ_MINI_BAR_ENGINE.circle_handle, 41.6);

    },
    StartShard: function() {

        //return ;
        GJ_MINI_BAR_ENGINE.sindex = 0;
        var Shard = $gjjq('#gj_shard');
        Shard.css({
            'display': 'block'
        });
        GJ_MINI_BAR_ENGINE.shader_timer = setInterval(GJ_MINI_BAR_ENGINE.shard_handle, 41.6);
    },
    StopShard: function() {
        $gjjq('#gj_shard').hide();
    },
    StartBreathe: function() {
        clearInterval(GJ_MINI_BAR_ENGINE.timer);
        GJ_MINI_BAR_ENGINE.index = 0;
        $gjjq("#gj_mini").css({
            "background-position": "0px 0px",
            "background-image": "url(http://s.pc.qq.com/navigate/adc/v3/breathe.png)"
        });
        GJ_MINI_BAR_ENGINE.timer = setInterval(GJ_MINI_BAR_ENGINE.breathe_handle, 41.6);
    },
    initVelocity: function()
    {
        // console.log($gjjq);
         GJ_MINI_BAR_ENGINE.insertJS("http://s.pc.qq.com/navigate/adc/velocity.js");
    },
    InitJq: function() {
	if(IsIE())
	{
	  setTimeout("GJ_MINI_BAR_ENGINE.initVelocity()",200);
	}
    else{
         $gjjq = $;
    }

    },
    Reset: function() {
        clearInterval(GJ_MINI_BAR_ENGINE.timer);
        GJ_MINI_BAR_ENGINE.index = 0;
        $gjjq("#gj_mini").css({
            "background-position": "0px 0px",
            "background-image": "url(http://s.pc.qq.com/navigate/adc/v3/over_ok.png)"
        });

        GJ_MINI_BAR_ENGINE.timer = setInterval(GJ_MINI_BAR_ENGINE.reset_handle, 41.6);
    },
	setAdcJson: function(strCss)
	{
		var jsonObj = null;
        try {
            jsonObj =JSON.parse(strCss);
        } catch (e) {
            return false;
        }
		if(jsonObj.bwhite || !jsonObj.bcss) return false;
        {{
            
            jsonObj.css_value=jsonObj.css_value.replace('\n','');
            jsonObj.css_value=jsonObj.css_value.replace("],\"}","]\"}");
            if(jsonObj.css_value.charAt(jsonObj.css_value.length - 1) == ",")
            {
                jsonObj.css_value=jsonObj.css_value.substring(0,jsonObj.css_value.length-1)
            }
            
            if(jsonObj.bexcept)
            {
                jsonObj.except_value=jsonObj.except_value.replace('\n','');
                jsonObj.except_value=jsonObj.except_value.replace("],\"}","]\"}");
                if(jsonObj.except_value.charAt(jsonObj.except_value.length - 1) == ",")
                {
                    jsonObj.except_value=jsonObj.except_value.substring(0,jsonObj.except_value.length-1)
                }
                
            }
        }}
        
        GJ_MINI_BAR_ENGINE.objAdcJson = jsonObj;
		var arrayRule = (GJ_MINI_BAR_ENGINE.objAdcJson.css_value.split(','));
		var arrCssRule = new Array();
		for(var i = 0; i< arrayRule.length; i++)
		{
			if(arrayRule[i].length < 1 )
			{
				continue;
			}
			arrCssRule.push(arrayRule[i]);
		}
        
        if(jsonObj.bhit)
        {
            GJ_MINI_BAR_ENGINE.hitDomAndContinue(true);
            return true;
            
        }
		
		var strCssRule = arrCssRule.join(",");
		
        if($gjjq(strCssRule).size() > 0 )
		 {
             GJ_MINI_BAR_ENGINE.hitDomAndContinue(false);
         }  
		 else
         {
             return false;
         }		
	},
    
    hitDomAndContinue: function(bPost)
    {
        
        
        GJ_MINI_BAR_ENGINE.AdjustZindex();
        GJ_MINI_BAR_ENGINE.InsertCss();//any
        GJ_MINI_BAR_ENGINE.InsertDiv();//hide
        GJ_MINI_BAR_ENGINE.InsertFrame();//hide
        GJ_MINI_BAR_ENGINE.InsertMini();//fix
        GJ_MINI_BAR_ENGINE.InsertShard(); //hide
        GJ_MINI_BAR_ENGINE.InsertCircle(); //hide
        GJ_MINI_BAR_ENGINE.InsertBar(); //hide
		//GJ_MINI_BAR_ENGINE.m_Timer = setInterval(GJ_MINI_BAR_ENGINE.GetHotNews, 2000);
        //document.onfocusin = this.onWindowActive;
       // document.onfocusout = this.onWindowBlur;
        setTimeout(" GJ_MINI_BAR_ENGINE.getAdCount()", 10000);
        setTimeout("GJ_MINI_BAR_ENGINE.BindJqueryEvent()", 100);
        if(bPost)
        {
            setTimeout(" GJ_MINI_BAR_ENGINE.RunAdFilterPostAni()", 500);
            GJ_MINI_BAR_ENGINE.reportCompleteAuto();
        }
        else
        {
            setTimeout(" GJ_MINI_BAR_ENGINE.RunAni()", 100);
        }
		
    },
    
    getAdCount: function()
    {
        var strAdCount="";
        if(IsIE())
        {
        if ( typeof(window.TsCmcObj) == "object" )
            {
                if( typeof(window.TsCmcObj.GetAdCount) != "undefined" )
                {
                    strAdCount = window.TsCmcObj.GetAdCount();	
                            if(strAdCount.length>0)
                            {
                                GJ_MINI_BAR_ENGINE.objAdcount = strAdCount;
                                GJ_MINI_BAR_ENGINE.ShowWeekTips(true);	
                            }
                }
            }
        }
        else
        {

            chrome.extension.sendRequest({cmd: "getADCCount", id: 0}, 
            function(response) {
                if(response.count.length > 0)
                    {
                        //console.log(response.count);
                        GJ_MINI_BAR_ENGINE.objAdcount = response.count;
                        GJ_MINI_BAR_ENGINE.ShowWeekTips(true);	
                    }
                });
            
        }
	
    },
	getAdcJson: function()
	{
		var strCss = "";
		if(GJ_MINI_BAR_ENGINE.objAdcJson != null && GJ_MINI_BAR_ENGINE.objAdcJson.bcss)
        {
            return true;
        }
		if(IsIE())
		{
			if (typeof(window.TsCmcObj) == "object") {
				if (typeof(window.TsCmcObj.GetAdRule) != "undefined" && typeof(window.TsCmcObj.GetAdRule) != "unknown") {
					strCss = window.TsCmcObj.GetAdRule(window.document.URL);
					GJ_MINI_BAR_ENGINE.setAdcJson(strCss);
				}
			}
		}
		else
		{
			chrome.extension.sendRequest({cmd: "getADCJson", url: window.document.URL}, 
				function(response) {
					if (response ) {
						GJ_MINI_BAR_ENGINE.Log(response);
						GJ_MINI_BAR_ENGINE.setAdcJson(response.rule);
					}
			});	
			
		}
	},
    collect: function() {
        var strCss = "";
        
         var time1  = new Date().getTime();

        if (!GJ_MINI_BAR_ENGINE.objAdcJson) {
            return;
        }
        if (GJ_MINI_BAR_ENGINE.objAdcJson.bwhite) {
            return;
        }
        if (!GJ_MINI_BAR_ENGINE.objAdcJson.bcss) {
            return;
        }
		
       var exceptList = new Array();
       if(GJ_MINI_BAR_ENGINE.objAdcJson.bexcept)
       {
           exceptList =  $gjjq(GJ_MINI_BAR_ENGINE.objAdcJson.except_value);
       }
		
		var arrayRule = (GJ_MINI_BAR_ENGINE.objAdcJson.css_value.split(','));
		var numCssLib = arrayRule.length;
        

		var arrCssRule = new Array();
		var arrBackgroundRule = new Array();
		for(var i = 0; i< numCssLib; i++)
		{
			if(arrayRule[i].length < 1 )
			{
				continue;
			}
			
			if(arrayRule[i].indexOf("background") > 0)
			{
				arrBackgroundRule.push(arrayRule[i]);
			}
			else
			{
				arrCssRule.push(arrayRule[i]);
			}
		}
		
		
		var strCssRule = arrCssRule.join(",");
		var strBackgroundRule = arrBackgroundRule.join(",");
		
		if(strBackgroundRule.length > 0)
		{
			$gjjq(strBackgroundRule).each(function(a,b){$gjjq(this).css('background', 'url()')});
		}
        
     
	  var time2  = new Date().getTime();
      GJ_MINI_BAR_ENGINE.Log(time2-time1);
     
      var time3  = new Date().getTime();
      GJ_MINI_BAR_ENGINE.Log(time3-time2);
      var vx = GJ_MINI_BAR_ENGINE.getLeft($gjjq('#gj_mini').get(0))+ 20;//(document.body.offsetWidth)-10-22-19;
	  var vy = GJ_MINI_BAR_ENGINE.getTop($gjjq('#gj_mini').get(0))+ 20;
           
       $gjjq(strCssRule).each(function(index, element) {


			var i = exceptList.length; 
			while (i--) { 
				if (exceptList[i] === element) { 
				  //alert(/xxxx/); 
				  return true;
				} 
			}

			GJ_MINI_BAR_ENGINE.nAdCount ++;
			
            if (index > 5)
			{
				$gjjq(this).hide();
				return true;
			}
            
            var time= Math.floor(Math.random()*10+1) *150;
            var flyElm = $gjjq(this);//.clone().css('opacity','1');

           
            flyElm.css({
					'z-index': 2147483647,
					'position': 'fixed',
                    'overflow':'hidden'
				});
           
            flyElm.velocity({
                top: vy,
                left:vx,
                width:20,
                height:20
            },time,
            "easeInOutExpo",
            function(){$gjjq(this).hide();});
     
			if(index == 1)
			{
				GJ_MINI_BAR_ENGINE.cl_timer = setInterval( GJ_MINI_BAR_ENGINE.calc_dis , 20,$gjjq(this).get(0));
			}

        });
        
       var time4  = new Date().getTime();
       GJ_MINI_BAR_ENGINE.Log(time4-time3);
	   GJ_MINI_BAR_ENGINE.UpdateBar();
	   if(IsIE())
	   {
		   if (typeof(window.TsCmcObj.ADCallBack) != "undefined" && typeof(window.TsCmcObj.ADCallBack) != "unknown") {
				 window.TsCmcObj.ADCallBack(window.document.URL,GJ_MINI_BAR_ENGINE.nAdCount);
				}
	   }
	   else
	   {
            chrome.extension.sendRequest({cmd: "ADCallBack", url: window.document.URL, count: GJ_MINI_BAR_ENGINE.nAdCount}, 
				function(response) {
			     });
	   }
	   GJ_MINI_BAR_ENGINE.reportCompleteAdc(numCssLib,GJ_MINI_BAR_ENGINE.nAdCount);
        var time5  = new Date().getTime();
      GJ_MINI_BAR_ENGINE.Log(time5-time4);

    },
    HideAllTip: function()
    {
        	GJ_MINI_BAR_ENGINE.HideTips();
			GJ_MINI_BAR_ENGINE.HideNoAdTips();
            GJ_MINI_BAR_ENGINE.ShowJustNowTips(false);
            GJ_MINI_BAR_ENGINE.ShowWeekTips(false);
    },
    BindJqueryEvent: function() {
		
		    
			
		this.m_oricontextmenu = document.oncontextmenu;
            $gjjq("#gj_shard").hover(function() {
            
            //console.log("hover");
            if(GJ_MINI_BAR_ENGINE.bPostAni &&  GJ_MINI_BAR_ENGINE.objAdcJson.bhit)
            {
               // console.log("GJ_MINI_BAR_ENGINE.ShowJustNowTips(true);");
                GJ_MINI_BAR_ENGINE.ShowJustNowTips(true);
            }

        },
        function() {
        });
        $gjjq("#gj_mini").hover(function() {

           // console.log("hover");
            if (!GJ_MINI_BAR_ENGINE.bclick && (!GJ_MINI_BAR_ENGINE.objAdcJson.bhit || GJ_MINI_BAR_ENGINE.bJustNowShowd)) {
                clearInterval(GJ_MINI_BAR_ENGINE.timer);
                GJ_MINI_BAR_ENGINE.index = 0;
                $gjjq(this).css("background-image", "url(http://s.pc.qq.com/navigate/adc/v3/hover-ok.png)");
                GJ_MINI_BAR_ENGINE.timer = setInterval(GJ_MINI_BAR_ENGINE.hover_handler, 41.6);
				GJ_MINI_BAR_ENGINE.hoverTime = 0;
				GJ_MINI_BAR_ENGINE.tipstimer = setInterval( GJ_MINI_BAR_ENGINE.tipstime_handle , 40);
            }
            if(!GJ_MINI_BAR_ENGINE.bJustNowShowd &&  GJ_MINI_BAR_ENGINE.objAdcJson.bhit )
            {
               // console.log("GJ_MINI_BAR_ENGINE.ShowJustNowTips(true);");
                GJ_MINI_BAR_ENGINE.ShowJustNowTips(true);
            }
        },

        function() {

            if (!GJ_MINI_BAR_ENGINE.bclick) {
                GJ_MINI_BAR_ENGINE.index = 14;
                clearInterval(GJ_MINI_BAR_ENGINE.timer);
                $gjjq(this).css("background-image", "url(http://s.pc.qq.com/navigate/adc/v3/hover-ok.png)");
                GJ_MINI_BAR_ENGINE.timer = setInterval(GJ_MINI_BAR_ENGINE.mouseover_handler, 41.6);
				

            }
			clearInterval(GJ_MINI_BAR_ENGINE.tipstimer); 
		    GJ_MINI_BAR_ENGINE.HideAllTip();
            document.oncontextmenu = GJ_MINI_BAR_ENGINE.m_oricontextmenu;

        });
		var oriOnmousemove = document.onmousemove;
        document.onmousemove = function(e) {
                // console.log("ismouse down" + GJ_MINI_BAR_ENGINE.IsMousedown);
                if (GJ_MINI_BAR_ENGINE.IsMousedown) {
				GJ_MINI_BAR_ENGINE.dragging = true;
                var e = e || window.event;
                var oX = e.clientX - GJ_MINI_BAR_ENGINE.iX;
                var oY = e.clientY - GJ_MINI_BAR_ENGINE.iY;
                // console.log("e.clientY" +e.clientY + "px", "GJ_MINI_BAR_ENGINE.iY" + GJ_MINI_BAR_ENGINE.iY + "px");
                var oXr = GJ_MINI_BAR_ENGINE.getWidth() - oX - GJ_MINI_BAR_ENGINE.getMiniWidth();
                var oYb = GJ_MINI_BAR_ENGINE.getHeight() - oY - GJ_MINI_BAR_ENGINE.getMiniHeight() ;
                if(1)
                {
                     GJ_MINI_BAR_ENGINE.oX = oX;
                     GJ_MINI_BAR_ENGINE.oY = oY;
                     GJ_MINI_BAR_ENGINE.oXr = oXr;
                     GJ_MINI_BAR_ENGINE.oYb = oYb;
                     
                     if(GJ_MINI_BAR_ENGINE.getXDirection() == 0)
                         {
                              GJ_MINI_BAR_ENGINE.vX = 0;
                             if(GJ_MINI_BAR_ENGINE.getYDirection() == 0)
                             {
                                 GJ_MINI_BAR_ENGINE.vY = 0;
                                 $gjjq('#gj_mini').css('right', '');
                                 $gjjq('#gj_mini').css('bottom', '');
                                   $gjjq("#gj_mini").css({"left":oX > -28 ?oX: -28 + "px", "top":oY > -28 ?oY: -28 + "px"});
                                  // console.log("0 0");
                                 //  console.log("left" +oX + "px", "top" + oY + "px");
                             }
                             else
                             {
                                 GJ_MINI_BAR_ENGINE.vY = 1;
                                 $gjjq('#gj_mini').css('right', '');
                                 $gjjq('#gj_mini').css('top', '');
                                  $gjjq("#gj_mini").css({"left":oX > -28 ?oX: -28 + "px", "bottom":oYb > -28 ?oYb: -28 + "px"});
                              //    console.log("0 1");
                                //     console.log("left" + oX + "px", "bottom"+oYb + "px");
                             }
                           
             
                        }
                    else
                    {
                        GJ_MINI_BAR_ENGINE.vX = 1;
                           if(GJ_MINI_BAR_ENGINE.getYDirection() == 0)
                             {
                                 GJ_MINI_BAR_ENGINE.vY = 0;
                              //   console.log("1 0");
                                 $gjjq('#gj_mini').css('left', '');
                                 $gjjq('#gj_mini').css('bottom', '');
                                 $gjjq("#gj_mini").css({"right":oXr > -28 ?oXr: -28 + "px", "top":oY > -28 ?oY: -28 + "px"});
                                //console.log("right"+ oXr + "px", "top"+oY + "px");
                             }
                             else
                             {
                                 GJ_MINI_BAR_ENGINE.vY = 1;
                               //  console.log("1 1 ");
                                 $gjjq('#gj_mini').css('left', '');
                                 $gjjq('#gj_mini').css('top', '');
                                  $gjjq("#gj_mini").css({"right":oXr > -28 ?oXr: -28 + "px", "bottom":oYb > -28 ?oYb: -28 + "px"});
                                // console.log("right"+oXr + "px", "bottom"+oYb + "px");
                             }
                    }
                    
                }
                return false;
                }
                else
                {
                      if(oriOnmousemove)
                    {
                        oriOnmousemove(e);
                    }
                }
            };
          //  $(document).mouseup(function(e) {
               
          //  });
		

        $gjjq("#gj_mini").mousedown(function(e) {


            GJ_MINI_BAR_ENGINE.HideAllTip();
            if (!GJ_MINI_BAR_ENGINE.bclick) {
                clearInterval(GJ_MINI_BAR_ENGINE.timer);
                GJ_MINI_BAR_ENGINE.index = 0;
                $gjjq(this).css({
                    "background-position": "0px 0px",
                    "background-image": "url(http://s.pc.qq.com/navigate/adc/v3/click_down.png)"
                });
				 clearInterval(GJ_MINI_BAR_ENGINE.tipstimer);
                GJ_MINI_BAR_ENGINE.timer = setInterval(GJ_MINI_BAR_ENGINE.mousedown_handler, 41.6);
            }
			//console.log(e.clientX);
           // console.log(e.clientY);
            
            if(e.which==1)
            {
            GJ_MINI_BAR_ENGINE.iX = e.clientX - this.offsetLeft;
            GJ_MINI_BAR_ENGINE.iY = e.clientY - this.offsetTop;
            //console.log(GJ_MINI_BAR_ENGINE.iX);
            //console.log(GJ_MINI_BAR_ENGINE.iY);
            this.setCapture && this.setCapture();
			GJ_MINI_BAR_ENGINE.IsMousedown = true;
            return false;
                
            }
       
        });
        $gjjq("#gj_mini").mouseup(function(e) {


			
		
			//alert(/mouse up/);
			GJ_MINI_BAR_ENGINE.HideTips();
			GJ_MINI_BAR_ENGINE.HideNoAdTips();

            if (3 == e.which) { //右键点击
                document.oncontextmenu = function() {
                    return false;
                };
                GJ_MINI_BAR_ENGINE.HideAllTip();
				GJ_MINI_BAR_ENGINE.ShowPannel(true);
                return false;

            } else if (1 == e.which) { //左键点击

				//console.log(GJ_MINI_BAR_ENGINE.dragging);
				 GJ_MINI_BAR_ENGINE.AdjustElementPosition();
				if(GJ_MINI_BAR_ENGINE.dragging  )
				{
					GJ_MINI_BAR_ENGINE.dragging = false;
					GJ_MINI_BAR_ENGINE.IsMousedown = false;
				    $gjjq("#gj_mini")[0].releaseCapture();
					e.cancelBubble = true;
                    GJ_MINI_BAR_ENGINE.SetPosition(); 
					return false;
				}
               
			   GJ_MINI_BAR_ENGINE.IsMousedown = false;
			   $gjjq("#gj_mini")[0].releaseCapture();
			   GJ_MINI_BAR_ENGINE.bIsClicked = 1;
               GJ_MINI_BAR_ENGINE.reportClickAdc();
               GJ_MINI_BAR_ENGINE.AutoCollect();
			   

            }

        });
    },
    rePosMini: function()
    {
        
    },
    onMiniMouseOver: function(c) {
        var ui = document.getElementById('gj_NavDiv');
        var mini = document.getElementById('gj_MiniImg');
        ui.style.display = "block";
        mini.setAttribute('src', 'http://s.pc.qq.com/navigate/js2/nav_mini_hover.png');

    },
    onFrameMouseOver: function(c) {
        var ui = document.getElementById('gj_NavDiv');
        var mini = document.getElementById('gj_MiniImg');
        ui.style.display = "block";
        mini.setAttribute('src', 'http://s.pc.qq.com/navigate/js2/nav_mini_hover.png');
        //GJ_MINI_BAR_ENGINE.report(GJ_MINI_BAR_ENGINE.conf.nReportHoveredId, GJ_MINI_BAR_ENGINE.m_nBID); dont't report again
    },
    onMiniMouseOut: function(c) {
        var ui = document.getElementById('gj_NavDiv');
        ui.style.display = "none";
        //////1//GJ_MINI_BAR_ENGINE.Log("out");
        var mini = document.getElementById('gj_MiniImg');
        mini.setAttribute('src', 'http://s.pc.qq.com/navigate/js2/nav_mini.png');

    },
    onDivMouseOver: function(c) {
        var ui = document.getElementById('gj_NavDiv');
        ui.style.display = "none";
        ////1//GJ_MINI_BAR_ENGINE.Log("out");
        var mini = document.getElementById('gj_MiniImg');
        mini.setAttribute('src', 'http://s.pc.qq.com/navigate/js2/nav_mini.png');

    },
    isIEBrowser: function() {
        var b = {
            isIE: false,
            nVersion: -1
        };
        var c = navigator.userAgent.toLowerCase();
        b.isIE = (c.indexOf("msie") > -1) || (navigator.appName.toLowerCase().indexOf("microsoft internet explorer") > -1) || !!window.ActiveXObject || "ActiveXObject" in window;
        if (b.isIE) {
            var d = null; (d = c.match(/rv:([\d.]+)\) like gecko/)) ? b.nVersion = parseInt(d[1]) : (d = c.match(/msie ([\d.]+)/)) ? b.nVersion = parseInt(d[1]) : -1
        }
        return b
    },
	reportInsertJs: function()
	{
		 GJ_MINI_BAR_ENGINE.report(GJ_MINI_BAR_ENGINE.conf.nReportInsertAdc, true,{});
	},
	reportShowAdc: function()
	{
		GJ_MINI_BAR_ENGINE.report(GJ_MINI_BAR_ENGINE.conf.nReportShowAdc, true ,{});
	},
	reportClickAdc: function()
	{
		GJ_MINI_BAR_ENGINE.report(GJ_MINI_BAR_ENGINE.conf.nReportClickAdc, true,{});
	},
	reportRClickAdc: function()
	{
		GJ_MINI_BAR_ENGINE.report(GJ_MINI_BAR_ENGINE.conf.nReportRClickAdc, true,{});
	},
    
    ReportTipsJustNow: function()
	{
		GJ_MINI_BAR_ENGINE.report(GJ_MINI_BAR_ENGINE.conf.nReportTipsJustNow, true,{});
	},
    ReportTipsClickMe: function()
	{
		GJ_MINI_BAR_ENGINE.report(GJ_MINI_BAR_ENGINE.conf.nReportTipsClickMe, true,{});
	},
    ReportTipsWeekShow: function()
	{
		GJ_MINI_BAR_ENGINE.report(GJ_MINI_BAR_ENGINE.conf.nReportTipsWeekShow, true,{});
	},
    ReportTipsNoAd: function()
	{
		GJ_MINI_BAR_ENGINE.report(GJ_MINI_BAR_ENGINE.conf.nReportTipsNoAd, true,{});
	},
	reportCompleteAdc: function(ad_found ,ad_collect)
	{
		var adinfo = {};
        adinfo.ad_found = ad_found;
		adinfo.ad_collect = ad_collect;
        adinfo.reserve2 = GJ_MINI_BAR_ENGINE.nUseCount;
        adinfo.reserve4 = GJ_MINI_BAR_ENGINE.bIsClicked;
		GJ_MINI_BAR_ENGINE.report(GJ_MINI_BAR_ENGINE.conf.nReportCompleteAdc, true,adinfo);
	},
    reportCompleteAuto: function()
	{
		GJ_MINI_BAR_ENGINE.report(GJ_MINI_BAR_ENGINE.conf.nReportCompleteAuto, true,{});
	},
    report: function(type,async,append) {
        if (undefined === type) {
            return
        }
		
		var extend=function(o,n,override){
		   for(var p in n)if(n.hasOwnProperty(p) && (!o.hasOwnProperty(p) || override))o[p]=n[p];
		};
        var g = {};
        g.gjguid = GJ_MINI_BAR_ENGINE.m_strGJGuid;
        g.type = type;
        g.reserve1 = "2";
        g.bid = GJ_MINI_BAR_ENGINE.m_nBID;
        g.rand = Math.random();
        g.refer = encodeURIComponent(window.document.URL);
        g.reserve3 = GJ_MINI_BAR_ENGINE.conf.version;
		
		extend(g,append);
		
        var f = 0;
        //////1//GJ_MINI_BAR_ENGINE.Log(g);
        for (var b in g) {
            f += b.toString().length + g[b].toString().length + 2
        }
		
		if(append)
        if (f > this.conf.nGetReportMaxCnt) {
            var d = "&cut=1";
            var e = f - this.conf.nGetReportMaxCnt;
            if (g.refer.toString().length >= (e + d.length)) {
                g.refer = g.refer.substr(0, g.refer.toString().length - e - d.length)
            }
            g.cut = "1"
        }
        this.getReport(this.conf.strReoprtCgi, g, this.conf.nGetReportMaxCnt, async)
    },
    getReport: function(e, h, nMax, async) {
        if (undefined === e || undefined === h || "" == e) {
            return 0
        }
        var para = "";
        var f = "?";
        for (var b in h) {
            para += f + b + "=" + h[b].toString();
            f = "&"
        }
        if ("" == para) {
            return 0
        }
        var strUrl = e + para;
        if ("number" == typeof nMax && strUrl.length > nMax) {
            strUrl = strUrl.substr(0, nMax)
        }

        if (async) {
            var c = new Image(1, 1);
            c.src = strUrl;
            c.onerror = c.onload = null;
            c.complete;
        } else {
            this.sendAjaxRequest(strUrl);
        }
        return strUrl.length
    },
    addEvent: function(c, b, d) {
        if (c.addEventListener) {
            c.addEventListener(b, d, false);
            return true
        } else {
            if (c.attachEvent) {
                c.attachEvent("on" + b, d);
                return true
            }
        }
        return false
    },
   /* callsetting: function() {
        if (typeof(window.TsCmcObj) == "object") {
            if (typeof(window.TsCmcObj.Setting) != "undefined") {
                window.TsCmcObj.Setting(3);
            }
        }
        var menuObj = document.getElementById("CloseMenu");
        menuObj.style.display = "none";

    },*/
    InsertMini: function() {
        var d = document.getElementsByTagName('body')[0];
        var j = document.createElement('div');
        j.setAttribute('id', this.conf.strMiniId);
        if(GJ_MINI_BAR_ENGINE.vX == 0)
        {
                if(GJ_MINI_BAR_ENGINE.vY == 0)
                {
                      j.style.cssText = "left: "+GJ_MINI_BAR_ENGINE.oX+"px; top: "+GJ_MINI_BAR_ENGINE.oY+"px; position: fixed; z-index:  2147483640;";           

                }
                else
                {
                       j.style.cssText = "left: "+GJ_MINI_BAR_ENGINE.oX+"px; bottom: "+GJ_MINI_BAR_ENGINE.oYb+"px; position: fixed; z-index:  2147483640;";           
                }
             }
         else
         {
               if(GJ_MINI_BAR_ENGINE.vY == 0)
                    {
                             j.style.cssText = "right: "+GJ_MINI_BAR_ENGINE.oXr+"px; top: "+GJ_MINI_BAR_ENGINE.oY+"px; position: fixed; z-index:  2147483640;";           
                    }
                    else
                    {
                            j.style.cssText = "right: "+GJ_MINI_BAR_ENGINE.oXr+"px; bottom: "+GJ_MINI_BAR_ENGINE.oYb+"px; position: fixed; z-index:  2147483640;";           
                    }
         }
                    
        if (!document.getElementById(this.conf.strMiniId)) d.appendChild(j);

    },
    InsertShard: function() {
        var d = document.getElementsByTagName('body')[0];
        var j = document.createElement('div');
        j.setAttribute('id', this.conf.strShardId);
        j.style.cssText = "right: -70px; bottom: -20px; position: fixed; z-index: 2147483643;";
        if (!document.getElementById(this.conf.strShardId)) d.appendChild(j);

    },
    InsertCss: function() {
        var cssText = "#gj_mini{background-image:url(http://s.pc.qq.com/navigate/adc/v3/hover-ok.png);background-repeat:no-repeat;display:block;width:58px;height:58px;background-position:0 0}#gj_shard{background-image:url(http://s.pc.qq.com/navigate/adc/v3/suipian.png);background-repeat:no-repeat;display:none;width:200px;height:200px;background-position:0 0}#gj_circle{background-image:url(http://s.pc.qq.com/navigate/adc/v3/guangquan.png);background-repeat:no-repeat;display:none;width:58px;height:58px;background-position:0 0}#gj_bar_left{background: url(http://s.pc.qq.com/navigate/adc/v3/zuo.png) no-repeat; height:42px; width :0px; font-family: \"Microsoft YaHei\" ! important;overflow:hidden; display:block;}#gj_bar_left #tipstext{line-height:normal;padding-left: 20px;padding-top: 3px;font-size: 12px;padding-right: 10px;color: #fff;overflow:hidden;}#gj_bar_left span{font-size: 14px;font-weight: bold;overflow:hidden;}#gj_bar_right{background: url(http://s.pc.qq.com/navigate/adc/v3/you.png) no-repeat; height:42px; width :0px; font-family: \"Microsoft YaHei\" ! important;overflow:hidden; display:block;}#gj_bar_right #tipstext{line-height:normal;padding-left: 20px;padding-top: 3px;font-size: 12px;padding-right: 10px;color: #fff;overflow:hidden;}#gj_bar_right span{font-size: 14px;font-weight: bold;overflow:hidden;}";
        var nod = document.createElement("style");
        nod.type = "text/css";
        if (nod.styleSheet) { //ie下
            nod.styleSheet.cssText = cssText;
        } else {
            nod.innerHTML = cssText; //或者写成 nod.appendChild(document.createTextNode(str))
        }
        document.getElementsByTagName("head")[0].appendChild(nod);

    },
    InsertCircle: function() {
        var d = document.getElementsByTagName('body')[0];
        var j = document.createElement('div');
        j.setAttribute('id', this.conf.strCircleId);
        j.style.cssText = "position: fixed; z-index: 2147483642;";
        if (!document.getElementById(this.conf.strCircleId)) d.appendChild(j);

    },
    InsertBar: function() {
        var d = document.getElementsByTagName('body')[0];
        var j = document.createElement('div');
        j.setAttribute('id', this.conf.strBarId);
        j.style.cssText = "right: 60px; bottom: 58px; position: fixed; z-index: 2147483640;";
		j.innerHTML = "<div id= \"tipstext\" style=\"white-space:nowrap;font-size: 14px;font-weight: bold;overflow:hidden;\">"+ GJ_MINI_BAR_ENGINE.nAdCount+"个广告已降服</div><div id= \"tipstext\" style=\"color:#CFDFFE;overflow:hidden;padding-top:0px;white-space: nowrap;\">可以清爽的上网了~</div>";
        if (!document.getElementById(this.conf.strBarId)) d.appendChild(j);

    },
	UpdateBar: function(){
		var eleBar = document.getElementById(GJ_MINI_BAR_ENGINE.conf.strBarId);
		if(eleBar)
		{
			eleBar.innerHTML = "<div id= \"tipstext\" style=\"white-space:nowrap;font-size: 14px;font-weight: bold;overflow:hidden;\">"+ GJ_MINI_BAR_ENGINE.nAdCount+"个广告已降服</div><div id= \"tipstext\" style=\"color:#CFDFFE;overflow:hidden;padding-top:0px;white-space: nowrap;\">可以清爽的上网了~</div>";
		}
		
	},
    InsertDiv: function() {
        var d = document.getElementsByTagName('body')[0];
        var j = document.createElement('div');
        j.setAttribute('id', this.conf.strDaohangDivId);
       // j.style.cssText = "position: fixed;  z-index: 350000000; right: 0px; width: 255px; height: 365px; bottom: 59px; display: block;";
	    j.style.cssText = "position: fixed;  z-index: 2147483640; right: 0px; width: 0px; height: 0px; bottom: 59px; display: block;";
        if (!document.getElementById(this.conf.strDaohangDivId)) {
            d.appendChild(j);
        }
    },
    InsertFrame: function() {
        var j = document.createElement('iframe');
        var OutDiv = document.getElementById(this.conf.strDaohangDivId);
		var strRefer = encodeURIComponent(window.document.URL);
         var PannelUrl = "";
        if(IsIE())
        {
           PannelUrl = "http://s.pc.qq.com/navigate/adc/v3/adcpage_ie.html";
        }
        else
        {
            PannelUrl = "http://s.pc.qq.com/navigate/adc/v3/adcpage.html";
        }
        j.setAttribute('src', PannelUrl + "?ver="+GJ_MINI_BAR_ENGINE.conf.version.toString()+"#"+ GJ_MINI_BAR_ENGINE.m_strGJGuid + "#" + GJ_MINI_BAR_ENGINE.m_nBID + '#' + strRefer );
        j.setAttribute('id', this.conf.strDaohangFrameId);
		// j.style.cssText = "position: fixed; z-index: 9999999999990; right: 0px; width: 255px; height: 365px; bottom: 99px;border: 0px none;";
        j.style.cssText = "position: fixed; z-index: 2147483640; right: 0px; width: 0px; height: 0px; bottom: 99px;border: 0px none;";
        j.setAttribute('frameBorder', '0');
        j.setAttribute('scrolling', '0');
        j.setAttribute('allowtransparency', 'true');
        j.setAttribute('width', '100%');
        j.setAttribute('height', '100%');
        j.setAttribute('noresize', 'noresize');
        if (!document.getElementById(this.conf.strDaohangFrameId)) OutDiv.appendChild(j);

    },
    IsDocument: function() {
        return true;
        var dombody = document.getElementsByTagName('div')[0];
        if (typeof(dombody) != "undefined") {
            return true;
        }
        return false;
    },
    HidePannel: function() {
        GJ_MINI_BAR_ENGINE.ShowPannel(false);

    },
    dhShowCustomItem: function(Para) {
        try {

            switch (Para) {
            case 0:
                var adddiv = document.getElementById('gj_NavAddDiv');
                adddiv.style.display = "none";
                break;
            case 1:
                var adddiv = document.getElementById('gj_NavAddDiv');
                adddiv.style.display = "block";
                //alert("call top");
                break;
            case 2:
                var ui = document.getElementById('gj_NavDiv');
                ui.style.display = "block";
                //alert("call top show ui");
                break;
            case 12:
                var pannel = document.getElementById('gj_NavDiv');
                pannel.style.display = "none";
                break;
			case 13:
                var pannel = document.getElementById('gj_NavDiv');
                pannel.style.display = "none";
                pannel = document.getElementById('gj_mini');
                pannel.style.display = "none";
                pannel = document.getElementById('gj_shard');
                pannel.style.display = "none";
                pannel = document.getElementById('gj_circle');
                pannel.style.display = "none";
				pannel = document.getElementById('gj_bar_left');
                pannel.style.display = "none";
                break;
            default:

            }

            // var ui = document.getElementById('gj_NavDiv');
            //var mini = document.getElementById('gj_MiniImg');
            //ui.style.display="block";
        } catch(e) {};
    },
	ShowTips: function()
	{
        
		if(GJ_MINI_BAR_ENGINE.bclick)
			return;
        var cssPreFix =  "height:34px;width :129px;font-family: \"Microsoft YaHei\" ! important;position: fixed;  z-index: 2147483647; display: block;";
        if (!document.getElementById("gj_adctipsmall_id")) {
            
			var divobj = document.createElement('div');
        	divobj.setAttribute('id', "gj_adctipsmall_id");
        	divobj.setAttribute('class', "gj_adctipsmall");
        	divobj.style.cssText = cssPreFix;
			document.getElementsByTagName('body')[0].appendChild(divobj);
        }
        var miniobj1 = document.getElementById('gj_mini');
      
        var left = GJ_MINI_BAR_ENGINE.getLeft(miniobj1);
        var right = GJ_MINI_BAR_ENGINE.getRight(miniobj1);
        var bottom  =GJ_MINI_BAR_ENGINE.getBottom(miniobj1);
        var offsetLeft = 58;
        var offsetRight = 58;
        var offsetBottom = 12;
        var  positionStr1 = "";
        if(GJ_MINI_BAR_ENGINE.getXDirection() == 0)
        {
            positionStr1 = "background: url(http://s.pc.qq.com/navigate/adc/v3/img/small_right.png) no-repeat;left: "+(left + offsetLeft).toString()+"px; bottom: "+(bottom + offsetBottom).toString()+"px; "
             
        }
        else
        {
             positionStr1 = "background: url(http://s.pc.qq.com/navigate/adc/v3/img/small_left.png) no-repeat;right: "+(right+ offsetRight).toString()+"px; bottom: "+(bottom + offsetBottom).toString()+"px; "
        }
        
        
        document.getElementById("gj_adctipsmall_id").style.cssText = cssPreFix + positionStr1;
        document.getElementById("gj_adctipsmall_id").innerHTML = "<div style=\"line-height:normal;font-family:Microsoft YaHei;padding-left:15px;padding-top:8px;font-size:12px;padding-right:10px;color:#fff\">广告爆棚！点我收</div>";
		document.getElementById("gj_adctipsmall_id").style.display="block";
        GJ_MINI_BAR_ENGINE.ReportTipsClickMe();
       // console.log("show tip");
		
	},
    AdjustElementPosition: function()
    {
        var miniobj1 = document.getElementById('gj_mini');
      //  var  positionStr1 = "right: "+(GJ_MINI_BAR_ENGINE.getRight(miniobj1)-2).toString()+"px; bottom: "+(GJ_MINI_BAR_ENGINE.getBottom(miniobj1)+60).toString()+"px; "
        var right =  (GJ_MINI_BAR_ENGINE.getRight(miniobj1));
        var left =  (GJ_MINI_BAR_ENGINE.getLeft(miniobj1));
        var bottom = +(GJ_MINI_BAR_ENGINE.getBottom(miniobj1));
        document.getElementById("gj_shard").style.right =(right -80).toString()+"px";
        document.getElementById("gj_shard").style.bottom = (bottom-70).toString()+"px";
        var objCircle = document.getElementById(GJ_MINI_BAR_ENGINE.conf.strCircleId);
        objCircle.style.right =(right ).toString()+"px";
        objCircle.style.bottom = (bottom).toString()+"px";
        var objBar = document.getElementById(GJ_MINI_BAR_ENGINE.conf.strBarId);
        if(GJ_MINI_BAR_ENGINE.getXDirection()==0)
        {
            objBar.style.right="";
            objBar.style.left =(left+50 ).toString()+"px";
            objBar.style.bottom = (bottom+8).toString()+"px";
           objBar.style.cssText  = "background: url(http://s.pc.qq.com/navigate/adc/v3/right.png) no-repeat;" + objBar.style.cssText;
        }
        else
        {
            objBar.style.left = "";
            objBar.style.right =(right+50 ).toString()+"px";
            objBar.style.bottom = (bottom+8).toString()+"px";
            objBar.style.cssText  = "background: url(http://s.pc.qq.com/navigate/adc/v3/zuo.png) no-repeat;" + objBar.style.cssText;
        }
        

        
    },
    ShowJustNowTips: function(bShow)
	{

        if(!bShow)
        {
            var elem = document.getElementById("gj_autofilter_id");
            if(elem)
            {
                elem.style.display="none"
            }
            return;
        }
        
        if(GJ_MINI_BAR_ENGINE.nJustNowCount > 0 )
        return;
        var cssPreFix =  "height:34px;width :238px;font-family: \"Microsoft YaHei\" ! important;position: fixed;  z-index: 2147483647;display: block;";
        GJ_MINI_BAR_ENGINE.nJustNowCount = Math.floor(Math.random()*20);
        GJ_MINI_BAR_ENGINE.nJustNowCount = GJ_MINI_BAR_ENGINE.nJustNowCount > 0 ? GJ_MINI_BAR_ENGINE.nJustNowCount : 1;
        if (!document.getElementById("gj_autofilter_id")) {
            
			var divobj = document.createElement('div');
        	divobj.setAttribute('id', "gj_autofilter_id");
        	divobj.setAttribute('class', "gj_autofilter");
        	divobj.style.cssText = cssPreFix;
			document.getElementsByTagName('body')[0].appendChild(divobj);
        }
        var miniobj1 = document.getElementById('gj_mini');
        var left = GJ_MINI_BAR_ENGINE.getLeft(miniobj1);
        var right = GJ_MINI_BAR_ENGINE.getRight(miniobj1);
        var bottom  =GJ_MINI_BAR_ENGINE.getBottom(miniobj1);
        var offsetLeft = 58;
        var offsetRight = 58;
        var offsetBottom = 7;
        var positionStr1 = "";
        if(GJ_MINI_BAR_ENGINE.getXDirection() == 0)
        {
            positionStr1 = "background: url(http://s.pc.qq.com/navigate/adc/v3/img/justnow_right.png) no-repeat;left: "+(left + offsetLeft).toString()+"px; bottom: "+(bottom + offsetBottom).toString()+"px; "
             
        }
        else
        {
             positionStr1 = "background: url(http://s.pc.qq.com/navigate/adc/v3/img/justnow_left.png) no-repeat;right: "+(right+ offsetRight).toString()+"px; bottom: "+(bottom + offsetBottom).toString()+"px; "
        }
      //  positionStr1 = "right: "+(GJ_MINI_BAR_ENGINE.getRight(miniobj1)-2).toString()+"px; bottom: "+(GJ_MINI_BAR_ENGINE.getBottom(miniobj1)+60).toString()+"px; "
        document.getElementById("gj_autofilter_id").style.cssText = cssPreFix +  positionStr1;
        document.getElementById("gj_autofilter_id").innerHTML = "<div id=\"gj_justnow_num\" style=\"width:20px;height:20px;font-weight: bold;line-height:normal;font-family:Microsoft YaHei;margin-left:143px;margin-top:8px;font-size:12px;margin-right:10px;color:#ff7f7f\">"+"0"+"</div>";
		document.getElementById("gj_autofilter_id").style.display="block";
        GJ_MINI_BAR_ENGINE.numberTime = 0;
         GJ_MINI_BAR_ENGINE.nJustNowCountTemp = 0;
        GJ_MINI_BAR_ENGINE.number_timer = setInterval(GJ_MINI_BAR_ENGINE.number_handle, 100);
        GJ_MINI_BAR_ENGINE.ReportTipsJustNow();
        GJ_MINI_BAR_ENGINE.bJustNowShowd = true;
		
	},
    ShowWeekTips: function(bShow)
	{
		if(GJ_MINI_BAR_ENGINE.bclick)
			return;
        if(!bShow)
        {
            var elem = document.getElementById("gj_weektips_id");
            if(elem)
            {
                elem.style.display="none"
            }
            return;
        }
        
        	var arrayData = new Array();
            var arrayautoData = new Array();
            var arrayDate = new Array();
            if(GJ_MINI_BAR_ENGINE.objAdcount.length ==0)
            return;
	
            var jsonobj = JSON.parse(GJ_MINI_BAR_ENGINE.objAdcount);
            if(!jsonobj.need_show)
            {
                return;
            }
            var week_count = 0;
            var auto_count = 0;
            var manual_count = 0;
            var Max = 0;
            for(var i = 4; i >=0 ; i--)
            {
                var now = new Date();
                now.setDate(now.getDate()- i)
                var month = now.getMonth() +1;
                var date =  now.getDate();      
                var mprifix =  month > 9 ? "" : "0";
                var dprifix =  date > 9 ? "" : "0"
                var strData =   mprifix + month +"." +dprifix+date;
                arrayDate.push(strData)
                var value= 0;
                var auto_value = 0;
                if(jsonobj.days!= null)
                {
                    if(jsonobj.days[''+strData+''])
                    {
                        value = jsonobj.days[''+strData+''];
                        manual_count = manual_count + value;
                    }
                    else
                    {
                        value = 0;
                    }
                }
                if(jsonobj.days_auto!=null)
                {
                    if(jsonobj.days_auto[''+strData+''])
                    {
                        auto_value = jsonobj.days_auto[''+strData+''];
                        auto_count = auto_count +auto_value;
                    }
                    else
                    {
                        auto_value = 0;
                    }
                }
                if(value > Max)Max = value;
                arrayData.push(value);
                arrayautoData.push(auto_value);
                
            }
            week_count = manual_count + auto_count;
        
        var cssPreFix = "height:50px;width :208px;font-family: \"Microsoft YaHei\" ! important;position: fixed;  z-index: 2147483647; display: block;";
        if (!document.getElementById("gj_weektips_id")) {
            
			var divobj = document.createElement('div');
        	divobj.setAttribute('id', "gj_weektips_id");
        	divobj.setAttribute('class', "gj_gj_weektips");
        	divobj.style.cssText = cssPreFix;
			document.getElementsByTagName('body')[0].appendChild(divobj);
        }
        
        var miniobj1 = document.getElementById('gj_mini');
        var left = GJ_MINI_BAR_ENGINE.getLeft(miniobj1);
        var right = GJ_MINI_BAR_ENGINE.getRight(miniobj1);
        var bottom  =GJ_MINI_BAR_ENGINE.getBottom(miniobj1);
        var offsetLeft = 58;
        var offsetRight = 58;
        var offsetBottom = 4;
        var positionStr1 = "";
        if(GJ_MINI_BAR_ENGINE.getXDirection() == 0)
        {
            positionStr1 = "background: url(http://s.pc.qq.com/navigate/adc/v3/img/week_right.png) no-repeat;left: "+(left + offsetLeft).toString()+"px; bottom: "+(bottom + offsetBottom).toString()+"px; "
             
        }
        else
        {
             positionStr1 = "background: url(http://s.pc.qq.com/navigate/adc/v3/img/week_left.png) no-repeat;right: "+(right+ offsetRight).toString()+"px; bottom: "+(bottom + offsetBottom).toString()+"px; "
        }

        document.getElementById("gj_weektips_id").style.cssText = cssPreFix +  positionStr1;

        
        document.getElementById("gj_weektips_id").innerHTML = "<div style=\"padding-top:10px;float:right;width:16px;height:16px\" onclick=\"document.getElementById(\'gj_weektips_id\').style.display=\'none\';\"></div><div style=\"font-family:Microsoft YaHei;padding-top:26px;font-size:14px;\"><span style=\"float:left;padding-left:25px;font-weight: bold;line-height:normal;font-size:12px;color:#ff7f7f\">"+week_count+"</span><span style=\"float:right;font-weight: bold;line-height:normal;font-size:12px;color:#fff;padding-right:20px;\"><a id=\"gj_open_pannel\" style=\"font-weight: bold;line-height:normal;font-size:12px;color:#fff;\" href=\"#\" >查看详情</a></span></div>";
		document.getElementById("gj_weektips_id").style.display="block";
        
        document.getElementById("gj_open_pannel").onclick = function(e){
							GJ_MINI_BAR_ENGINE.ShowPannel(true);
                            GJ_MINI_BAR_ENGINE.HideAllTip();
                            return false;
						}
        GJ_MINI_BAR_ENGINE.ReportTipsWeekShow();
		
	},
    ShowPannel: function(bShow)
    {   
        var height = 0 ;
        var frmheight = 0 ;
        var width = 0;
        if(bShow)
        {
            height = 440;
            frmheight = 393;
            width = 255;
			GJ_MINI_BAR_ENGINE.reportRClickAdc();
        }
        else{
            
        }
         var miniobj1 = document.getElementById('gj_mini');
        var left = GJ_MINI_BAR_ENGINE.getLeft(miniobj1);
        var right = GJ_MINI_BAR_ENGINE.getRight(miniobj1);
        var bottom  =GJ_MINI_BAR_ENGINE.getBottom(miniobj1);
        var offsetLeft = 58;
        var offsetRight = 58;
        var uiOffsetBottom = 1;
        var frameOffsetBottom = 41;
        var PrePositionStr = "";
        var uiPositionStr = "";
        var framePositionStr = "";
        var vecDirection = bottom + miniobj1.clientHeight/2 < GJ_MINI_BAR_ENGINE.getHeight()/2 ? 0 : 1;
        if(GJ_MINI_BAR_ENGINE.getXDirection() == 0)
        {
            
            
            PrePositionStr = "left: "+(left + offsetLeft).toString()+"px; ";
            if(vecDirection == 0)
            {
                uiPositionStr = PrePositionStr + "bottom: "+(bottom + uiOffsetBottom).toString()+"px; ";
                framePositionStr = PrePositionStr + "bottom: "+(bottom + frameOffsetBottom).toString()+"px; ";
            }
            else
            {
                 uiPositionStr = PrePositionStr + "bottom: "+(bottom - 440).toString()+"px; ";
                 framePositionStr = PrePositionStr + "bottom: "+(bottom  - 393).toString()+"px; ";
            }
            
             
        }
        else
        {
            PrePositionStr = "right: "+(right + offsetLeft).toString()+"px; ";
            if(vecDirection == 0)
            {
                uiPositionStr = PrePositionStr + "bottom: "+(bottom + uiOffsetBottom).toString()+"px; ";
                framePositionStr = PrePositionStr + "bottom: "+(bottom + frameOffsetBottom).toString()+"px; ";
            }
            else
            {
                 uiPositionStr = PrePositionStr + "bottom: "+(bottom - 440).toString()+"px; ";
                 framePositionStr = PrePositionStr + "bottom: "+(bottom  - 393).toString()+"px; ";
            }
        }

        
        var ui = document.getElementById('gj_NavDiv');
        ui.style.cssText = "position: fixed;  z-index: 2147483640;  width: "+width+"px; height: "+height+"px; display: block;"  + uiPositionStr ;
        var frame = document.getElementById(GJ_MINI_BAR_ENGINE.conf.strDaohangFrameId);
        frame.style.cssText = "position: fixed; z-index: 2147483640; width: "+width+"px; height: "+frmheight+"px;border: 0px none;" + framePositionStr;

    },
	ShowNoAdTips: function()
	{
        var cssPreFix = "height:41px;width:169px;font-family:\"Microsoft YaHei\"!important;position: fixed;  z-index: 2147483647; display: block;" ;
        if (!document.getElementById("gj_adctipnoad_id")) {
            
			var divobj = document.createElement('div');
       	 	divobj.setAttribute('id', "gj_adctipnoad_id");
        	divobj.setAttribute('class', "gj_adctips");     
        	divobj.style.cssText = cssPreFix ;
            document.getElementsByTagName('body')[0].appendChild(divobj);
        }
        var miniobj1 = document.getElementById('gj_mini');
        var left = GJ_MINI_BAR_ENGINE.getLeft(miniobj1);
        var right = GJ_MINI_BAR_ENGINE.getRight(miniobj1);
        var bottom  =GJ_MINI_BAR_ENGINE.getBottom(miniobj1);
        var offsetLeft = 58;
        var offsetRight = 58;
        var offsetBottom = 8;
        var positionStr1 = "";
        if(GJ_MINI_BAR_ENGINE.getXDirection() == 0)
        {
            positionStr1 = "background: url(http://s.pc.qq.com/navigate/adc/v3/img/big_right.png) no-repeat;left: "+(left + offsetLeft).toString()+"px; bottom: "+(bottom + offsetBottom).toString()+"px; "
             
        }
        else
        {
             positionStr1 = "background: url(http://s.pc.qq.com/navigate/adc/v3/img/big_left.png) no-repeat;right: "+(right+ offsetRight).toString()+"px; bottom: "+(bottom + offsetBottom).toString()+"px; "
        }

        document.getElementById("gj_adctipnoad_id").style.cssText  = cssPreFix +  positionStr1;
        document.getElementById("gj_adctipnoad_id").innerHTML = "<div style=\"line-height:normal;font-family: Microsoft YaHei;padding-left:10px;padding-top:3px;font-size:12px;padding-right:10px;color:#fff\">没有小广告如何让我发功呢<br><span style=\"font-size:12px\">右键一下</span> 有惊喜哦!</div>";
		document.getElementById("gj_adctipnoad_id").style.display="block";
		
        GJ_MINI_BAR_ENGINE.ReportTipsNoAd();
	},

	HideTips: function()
	{
		var elem = document.getElementById("gj_adctipsmall_id");
		if(elem)elem.style.display ="none";
	},
	HideNoAdTips: function()
	{
		var elem = document.getElementById("gj_adctipnoad_id");
		if(elem)elem.style.display ="none";
	},
    insertJS: function(strUrl) {
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.src = strUrl;
        script.charset = "UTF-8";
        document.body.appendChild(script);
    },
    SetupJson: function() {
        if(IsIE())
        {
            if (typeof JSON == "undefined") {
          this.insertJS("http://s.pc.qq.com/navigate/adc/json2.js");
        }
        //if(typeof window.jQuery == 'undefined')
        {
            this.insertJS("http://s.pc.qq.com/navigate/adc/jquery.min.js?ver=3");
        }   
        }
    },
    onWindowActive: function() {
        clearInterval(GJ_MINI_BAR_ENGINE.m_Timer);
        GJ_MINI_BAR_ENGINE.m_Timer = setInterval(GJ_MINI_BAR_ENGINE.GetHotNews, 2000);
    },
    onWindowBlur: function() {
        clearInterval(GJ_MINI_BAR_ENGINE.m_Timer);
    },
	AutoCollect:function()
	{
		   if (!GJ_MINI_BAR_ENGINE.bclick) {
                    clearInterval(GJ_MINI_BAR_ENGINE.timer);
                    
                    GJ_MINI_BAR_ENGINE.bclick = true;


					if(!GJ_MINI_BAR_ENGINE.objAdcJson.bcss ||
					    GJ_MINI_BAR_ENGINE.objAdcJson.bwhite ||
						GJ_MINI_BAR_ENGINE.bClear)
					{
						GJ_MINI_BAR_ENGINE.ShowNoAdTips();

                        GJ_MINI_BAR_ENGINE.bclick = false;
						return;
					}
//
					GJ_MINI_BAR_ENGINE.index = 0;
					GJ_MINI_BAR_ENGINE.nAdCount = 0;
                    GJ_MINI_BAR_ENGINE.HidePannel();
					var pannel = document.getElementById('gj_mini');
             		pannel.style.cssText = "right: "+GJ_MINI_BAR_ENGINE.getRight(pannel).toString()+"px; bottom: "+GJ_MINI_BAR_ENGINE.getBottom(pannel).toString()+"px; display: block; position: fixed; z-index: 2147483641; background-image: url(\"http://s.pc.qq.com/navigate/adc/v3/click_up.png\"); background-position-x: 0px; background-position-y: 0px;";
                    /*$gjjq("gj_mini").css({
                       // "background-position": "0px 0px",
						"background-position-x": "-870px",
						"background-position-y": "0px",
                        "background-image": "url(http://s.pc.qq.com/navigate/adc/v3/click_up.png)"
                    });*/

                    GJ_MINI_BAR_ENGINE.timer = setInterval(GJ_MINI_BAR_ENGINE.mouseup_handler, 41.6);
                }
	},
    RunGuide: function(nCount)
    {
        GJ_MINI_BAR_ENGINE.nUseCount = nCount;
        if(nCount == 1)
        {
            setTimeout("GJ_MINI_BAR_ENGINE.AutoCollect()", 2000);
        }
        else
        {
            setTimeout("GJ_MINI_BAR_ENGINE.StartBreathe()", 100);
        }
        GJ_MINI_BAR_ENGINE.reportShowAdc();
    },
    AdjustZindex: function()
    {
        $gjjq("div").each(function(index,ele){
        var nIndex = $gjjq(this).css("z-index");
            
		if(nIndex > 2147483600)
		{
			$gjjq(this).css("z-index",nIndex - 100);
		}
		});  
    },
	RunAni: function()
	{
		var nCount = 0;
		if(IsIE())
		{
			if ( typeof(window.TsCmcObj) == "object" )
			{
				if( typeof(window.TsCmcObj.GetUseCount) != "undefined" 
				&&  typeof(window.TsCmcObj.GetUseCount) !=  "unknown")
				{
					nCount =  window.TsCmcObj.GetUseCount();
                    GJ_MINI_BAR_ENGINE.RunGuide(nCount);
				}
			}
		}
		else
		{
			chrome.extension.sendRequest({cmd: "getAdHitCount", id:0}, 
				function(response) {
					if (response ) {
						GJ_MINI_BAR_ENGINE.Log(response);
                        var nCount =  response.count;
                        GJ_MINI_BAR_ENGINE.RunGuide(nCount);
						
					}
			});	
			
		}
     
	},
    RunAdFilterPostAni: function()
    {
          if (!GJ_MINI_BAR_ENGINE.bclick) {
            clearInterval(GJ_MINI_BAR_ENGINE.timer);
            GJ_MINI_BAR_ENGINE.bclick = true;
            GJ_MINI_BAR_ENGINE.bPostAni = true;
            GJ_MINI_BAR_ENGINE.index = 45;

            var mini = document.getElementById('gj_mini');
            GJ_MINI_BAR_ENGINE.Log(mini.style.cssText);
            var oldCss = mini.style.cssText;
            mini.style.cssText = " display: block; position: fixed; z-index: 2147483641; background-image: url(\"http://s.pc.qq.com/navigate/adc/v3/click_up.png\"); background-position-x: 0px; background-position-y: 0px;" + oldCss;
             GJ_MINI_BAR_ENGINE.Log(mini.style.cssText);
            GJ_MINI_BAR_ENGINE.reportShowAdc();
            GJ_MINI_BAR_ENGINE.timer = setInterval(GJ_MINI_BAR_ENGINE.filterpost_handler, 41.6);
         }
    },
	init: function() {
       
       GJ_MINI_BAR_ENGINE.GetPosition();
		
    },
    initSwitch: function()
    {
        if(IsIE())
        {
            var domThis = document.getElementById(this.conf.strDaohangJSId);
            if (domThis) {
                GJ_MINI_BAR_ENGINE.m_strGJGuid = domThis.getAttribute("gjguid");
                GJ_MINI_BAR_ENGINE.m_nBID = domThis.getAttribute("Bid");
            }
            GJ_MINI_BAR_ENGINE.OnSwitchOpen();
        }
        else
        {
               chrome.extension.sendRequest({cmd: "queryAdcSwitch", id: 2}, 
				function(response) {
					if (response && response.cmdret) {
                        GJ_MINI_BAR_ENGINE.m_strGJGuid = response.gjguid;
                        //console.log(response);
                        GJ_MINI_BAR_ENGINE.m_nBID = 514;
                        GJ_MINI_BAR_ENGINE.OnSwitchOpen();
					}
			     });	
                 
                
                chrome.extension.onRequest.addListener(
                function(request,sender,sendResponse)
                {
                    if (request.cmd == "closeAdcPanel") 
                    {
                        GJ_MINI_BAR_ENGINE.HidePannel();
                    }
                    if(request.cmd=="exit")
                    {
                       GJ_MINI_BAR_ENGINE.dhShowCustomItem(13);
                        
                    }
                });
            
        }
    },
    SetPosition: function()
    {
        var Position;
        Position = {'lx':GJ_MINI_BAR_ENGINE.oX > -28 ? GJ_MINI_BAR_ENGINE.oX : -28, 'rx':GJ_MINI_BAR_ENGINE.oXr> -28 ? GJ_MINI_BAR_ENGINE.oXr : -28,'ty':GJ_MINI_BAR_ENGINE.oY> -28 ? GJ_MINI_BAR_ENGINE.oY : -28,'by':GJ_MINI_BAR_ENGINE.oYb> -28 ? GJ_MINI_BAR_ENGINE.oYb : -28,'vx':GJ_MINI_BAR_ENGINE.vX,'vy':GJ_MINI_BAR_ENGINE.vY}; 
        var jsonText = JSON.stringify(Position);  
          if(IsIE())
		{
			if ( typeof(window.TsCmcObj) == "object" )
			{
				if( typeof(window.TsCmcObj.ADSetPosition) != "undefined" 
				&&  typeof(window.TsCmcObj.ADSetPosition) !=  "unknown")
				{
					window.TsCmcObj.ADSetPosition(jsonText);
				}
			}
		}
		else
		{
			chrome.extension.sendRequest({cmd: "setAdPosition", data: jsonText}, 
				function(response) {
					if (response ) {	
					}
			});	
			
		}
    },
    OnGetPosition: function(str)
    {
      var jsonObj ; 
      try {
            jsonObj =JSON.parse(str);
            GJ_MINI_BAR_ENGINE.oX = jsonObj.lx;
            GJ_MINI_BAR_ENGINE.oY = jsonObj.ty;
            GJ_MINI_BAR_ENGINE.oXr = jsonObj.rx;
            GJ_MINI_BAR_ENGINE.oYb = jsonObj.by;
            GJ_MINI_BAR_ENGINE.vX = jsonObj.vx;
            GJ_MINI_BAR_ENGINE.vY = jsonObj.vy;
       
        } catch (e) {
            
            GJ_MINI_BAR_ENGINE.oX = 0;
            GJ_MINI_BAR_ENGINE.oY = 0;
           // console.log("exception 50 10");
            GJ_MINI_BAR_ENGINE.oXr = 10;
            GJ_MINI_BAR_ENGINE.oYb = 50;
            GJ_MINI_BAR_ENGINE.vX = 1;
            GJ_MINI_BAR_ENGINE.vY = 1;
            return false;
        }
    },
    GetPosition: function()
    {
        var strPos = "";
        if(IsIE())
		{
			if ( typeof(window.TsCmcObj) == "object" )
			{
				if( typeof(window.TsCmcObj.ADGetPosition) != "undefined" 
				&&  typeof(window.TsCmcObj.ADGetPosition) !=  "unknown")
				{
					strPos =  '{"lx":0,"rx":10,"ty":0,"by":50,"vx":1,"vy":1}' ;//window.TsCmcObj.ADGetPosition();
                    GJ_MINI_BAR_ENGINE.OnGetPosition(strPos);
                    GJ_MINI_BAR_ENGINE.OnInit();

				}
			}
		}
		else
		{
            strPos =  '{"lx":0,"rx":10,"ty":0,"by":50,"vx":1,"vy":1}' ;
            GJ_MINI_BAR_ENGINE.OnGetPosition(strPos);
			/*chrome.extension.sendRequest({cmd: "getAdPosition", id:0}, 
				function(response) {
					if (response ) {
						GJ_MINI_BAR_ENGINE.Log(response);
                        var nCount =  response.count;
                        GJ_MINI_BAR_ENGINE.OnGetPosition(nCount);
                        GJ_MINI_BAR_ENGINE.OnInit();
						
					}
			});	*/
			
		}
    },
    OnInit: function()
    {
        GJ_MINI_BAR_ENGINE.getAdcJson();
    },
    OnSwitchOpen: function()
    {     
        var envBrowser = this.isIEBrowser();
        GJ_MINI_BAR_ENGINE.reportInsertJs();
        if (GJ_MINI_BAR_ENGINE.IsDocument() && envBrowser.isIE && envBrowser.nVersion > 7) {
			setTimeout("GJ_MINI_BAR_ENGINE.InitJq()", 200);
			setTimeout("GJ_MINI_BAR_ENGINE.init()", 400);	
        } else if (GJ_MINI_BAR_ENGINE.IsDocument() && !envBrowser.isIE) {
           setTimeout("GJ_MINI_BAR_ENGINE.InitJq()", 200);
			setTimeout("GJ_MINI_BAR_ENGINE.init()", 400);	
        }
        
    },
    Run: function() {
        
        this.SetupJson();
		this.initSwitch();
    }
};

GJ_MINI_BAR_ENGINE.Run();