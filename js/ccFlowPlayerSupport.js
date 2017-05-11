(function(w) {
  var isIDevice = /iPad|iPhone|iPod/i.test(navigator.userAgent);
  var head = document.getElementsByTagName("head")[0];

  if (!document.getElementById("flowplayer_src")) {
    var f = document.createElement("script");
    f.type = "text/javascript";
    f.src = "/flash/flowplayer/3.2.14/flowplayer-3.2.11.min.js";
    f.id = "flowplayer_src";
    head.appendChild(f);
  }

  setTimeout(function() {
    if (!w.flowplayer) {
      setTimeout(arguments.callee, 50);
    } else {
      if (isIDevice && !document.getElementById("flowplayer_iOS_src")) {
        var iSrc = document.createElement("script");
        iSrc.type = "text/javascript";
        iSrc.src = "/flash/flowplayer/3.2.14/flowplayer.ipad-3.2.9.min.js";
        iSrc.id = "flowplayer_iOS_src";
        iSrc.onload = startFlowPlayer;
        head.appendChild(iSrc);
      } else {
        startFlowPlayer();
      }
    }
  }, 500);

  function startFlowPlayer() {
    var anchors = document.getElementsByTagName("A");
    if (anchors.length > 0) {
      for ( var i = 0; i < anchors.length; i++) {
        var anchor = anchors[i];
        var type = anchor.getAttribute("type");
        var link = anchor.getAttribute("href");
        var hasPlay = anchor.getAttribute("hasPlayed");
        if (link != "#" && !hasPlay) {
          if (type == "video") {
            playVideo(anchor);
            anchor.setAttribute("hasPlayed", "1");
          } else if (type == "audio") {
            playAudio(anchor);
            anchor.setAttribute("hasPlayed", "1");
          }
        }
      }
    }
  }

  function playVideo(videoTag) {
    var autoPlay = videoTag.getAttribute("autoPlay") == "true" ? true : false;
    var playerId = videoTag.getAttribute("id");
    if (isIDevice) {
      flowplayer(playerId, "/flash/flowplayer/3.2.14/flowplayer-3.2.14.swf").ipad();
    } else {
      flowplayer(playerId, {
        src : "/flash/flowplayer/3.2.14/flowplayer-3.2.14.swf",
        wmode : "opaque"
      }, {
        clip : {
          autoPlay : autoPlay
        }
      });
    }
  }

  function playAudio(audioTag) {
    var autoPlay = audioTag.getAttribute("autoPlay") == "true" ? true : false;
    var modeVal = audioTag.getAttribute("mode");
    var playerId = audioTag.getAttribute("id");
    var controlsValue = "";
    if (modeVal == "compact") {
      controlsValue = {
        scrubber : false,
        volume : false,
        mute : false,
        fullscreen : false,
        height : 22,
        autoHide : false
      };
    } else {
      controlsValue = {
        fullscreen : false,
        height : 22,
        autoHide : false
      };
    }
    if (isIDevice) {
      flowplayer(playerId, "/flash/flowplayer/3.2.14/flowplayer-3.2.14.swf").ipad();
    } else {
      flowplayer(playerId, {
        src : "/flash/flowplayer/3.2.14/flowplayer-3.2.14.swf",
        wmode : "opaque"
      }, {
        plugins : {
          controls : controlsValue
        },
        clip : {
          autoPlay : autoPlay
        }
      });
    }
  }
})(window);