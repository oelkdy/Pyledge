
var video = document.getElementById("vid");
var video_status =
document.getElementById("vid_status");

function playPause() {
    if (video.paused)
    video.play();
    else
    video.pause();
    }
function bigSmall() {
    if (video.width == 1000)
    video.width = 500;
    else
    video.width = 1000;
    }

function muteUnmute(){
    if (video.muted==false)
    video.muted=true;
    else
    video.muted=false;
    }

function loopNoloop() {
    var status = "";
    if (video.loop == true){
    video.loop = false;
    status = "off";
    }
    else {
    video.loop = true;
    status = "on";
    }
    video_status.innerHTML = "Loop "+
    status;
}