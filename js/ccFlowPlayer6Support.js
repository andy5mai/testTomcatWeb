(function(w) {
  var isIDevice = /iPad|iPhone|iPod/i.test(navigator.userAgent);
  var head = document.getElementsByTagName("head")[0];
    if(typeof jQuery == 'undefined'){
      var jquery = document.createElement("script");
      jquery.type = "text/javascript";
      jquery.src = "/lib/jquery-2.1.4.min.js";
      head.appendChild(jquery);
    }
    
    if (!document.getElementById("flowplayer6_src")) {
      var f = document.createElement("script");
      f.type = "text/javascript";
      f.src = "/flash/flowplayer/flowplayer-6.0.4/flowplayer.js";
      f.id = "flowplayer6_src";
      head.appendChild(f);
    }
    
    if(!document.getElementById("ccFlowPlayerCss")){
    	var s = document.createElement("LINK");
    	s.rel = "stylesheet";
    	s.type = "text/css";
    	s.href = "/flash/flowplayer/flowplayer-6.0.4/skin/minimalist.css";
    	s.id = "ccFlowPlayerCss";
    	head.appendChild(s);
    }
    
    if(!document.getElementById("ccAudioFlowPlayerCss")){
    	var a = document.createElement("LINK");
    	a.rel = "stylesheet";
    	a.type = "text/css";
    	a.href = "/flash/flowplayer/flowplayer-6.0.4/skin/audio.css";
    	a.id = "ccAudioFlowPlayerCss";
    	head.appendChild(a);
    }
    
    setTimeout(function() {
      console.log("come");
      if($(".ccFlowplayer").size() > 0){
        $.each($(".ccFlowplayer"), function(){
          $(this).flowplayer();
        });
        $(".fp-ratio").attr("style","");
      }
    },500);
    
    if (!document.getElementById("flowplayer6_src")) {
      /*var f = document.createElement("script");
      f.type = "text/javascript";
      f.src = "/lib/flowplayer-6.0.4/flowplayer.min.js";
      f.id = "flowplayer6_src";
      head.appendChild(f);*/
      CC.script("/flash/flowplayer-6.0.4/flowplayer.min.js",startPlay);
      if(isInclude("flowplayer.min.js")){
        startPlay();
      }
    }else{
      startPlay();
    }
    function startPlay(){
  	  setTimeout(function() {
  	    console.log("come");
  	      if($(".ccFlowplayer").size() > 0){
  	        $.each($(".ccFlowplayer"), function(){
  	          $(this).flowplayer();
  	        });
  	        $(".fp-ratio").attr("style","");
  	      }
  	    },500);
  	}
    
    function isInclude(name){
      var js= /js$/i.test(name);
      var es=document.getElementsByTagName(js?'script':'link');
      for(var i=0;i<es.length;i++) 
      if(es[i][js?'src':'href'].indexOf(name)!=-1)return true;
      return false;
    }
})(window);