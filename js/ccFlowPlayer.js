var anchors = document.getElementsByTagName("A");
if(anchors.length>0){	
  for(var i=0;i<anchors.length;i++){
    var anchor = anchors[i];
    var type = anchor.getAttribute("type");
    var link = anchor.getAttribute("href");
    if(link && link!="#"){
      if(type=="video"){
        playVideo(anchor);
        anchor.removeAttribute("href");
      }else if(type=="audio"){
        playAudio(anchor);
        anchor.removeAttribute("href");
      }      
    }    
  }
}
  
function playVideo(videoTag){
  var autoPlay = videoTag.getAttribute("autoPlay")=='true'?true:false;
  var playerId = videoTag.getAttribute("id");
  flowplayer(playerId, {src : "http://releases.flowplayer.org/swf/flowplayer-3.2.7.swf", wmode: "opaque"}, {
    plugins: {
      controls: {autoHide:false}
    },
    clip: {
      autoPlay: autoPlay
    }
  });
}

function playAudio(audioTag){
  var autoPlay = audioTag.getAttribute("autoPlay")=='true'?true:false;
  var modeVal = audioTag.getAttribute("mode");
  var playerId = audioTag.getAttribute("id");
  var controlsValue = "";
  if(modeVal == "compact"){
    controlsValue = {scrubber:false,volume:false,mute:false,fullscreen:false,autoHide:false};
  }else{
    controlsValue = {fullscreen:false,autoHide:false};
  }
  var p = flowplayer(playerId, {src : "http://releases.flowplayer.org/swf/flowplayer-3.2.7.swf", wmode: "opaque"}, {
    plugins: {
      controls: controlsValue
    },
    clip: {
      autoPlay: autoPlay
    }
  });
}