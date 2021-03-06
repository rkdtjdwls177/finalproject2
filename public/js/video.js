// Select elements here
const container = document.getElementById('container');
const video = document.getElementById('video');
const videoControls = document.getElementById('video-controls');
const videoContainer = document.getElementById('video-container');
const playButton = document.getElementById('play');
const playbackIcons = document.querySelectorAll('.playback-icons use');
const timeElapsed = document.getElementById('time-elapsed');
const duration = document.getElementById('duration');
const progressBar = document.getElementById('progress-bar');
const seek = document.getElementById('seek');
const seekTooltip = document.getElementById('seek-tooltip');
const volumeButton = document.getElementById('volume-button');
const volumeIcons = document.querySelectorAll('.volume-button use');
const volumeMute = document.querySelector('use[href="#volume-mute"]');
const volumeLow = document.querySelector('use[href="#volume-low"]');
const volumeHigh = document.querySelector('use[href="#volume-high"]');
const volume = document.getElementById('volume');
const playbackAnimation = document.getElementById('playback-animation');
const fullscreenButton = document.getElementById('fullscreen-button');
const fullscreenIcons = fullscreenButton.querySelectorAll('use');
const pipButton = document.getElementById('pip-button');
const memoButton = document.getElementById('memo-button');
const memoIcon = memoButton.querySelector('svg');
const memoBox = document.getElementById('memo-container');
const memoarea = document.getElementById('memoarea');
const memoFontSize = document.getElementById('memo-font-size');
const memoFontColor = document.getElementById('memo-font-color');
const BMButton = document.getElementById('bm-button');
const BMIcon = BMButton.querySelector('svg');
const BMBox = document.getElementById('bm-box');
const BMname = document.getElementById('bm-name');
const addBMButton = document.getElementById('bm-submit-button');
const speedButton = document.getElementById('speed-button')
const speedBox = document.getElementById('speed-box')
const speed = document.querySelectorAll('.speed-box .speed-button')
const videoListContainer = document.getElementById('video-list-container')
const openlistButton = document.getElementById('open-list')
const closelistButton = document.getElementById('close-list')
const wideButton = document.getElementById('wide-button')

const videoWorks = !!document.createElement('video').canPlayType;
if (videoWorks) {
  video.controls = false;
  videoControls.classList.remove('hidden');
}
// Add functions here

// togglePlay toggles the playback state of the video.
// If the video playback is paused or ended, the video is played
// otherwise, the video is paused
function togglePlay() {
  if (video.paused || video.ended) {
    video.play();
  } else {
    video.pause();
  }
}

// updatePlayButton updates the playback icon and tooltip
// depending on the playback state
function updatePlayButton() {
  playbackIcons.forEach((icon) => icon.classList.toggle('hidden'));

  if (video.paused) {
    playButton.setAttribute('data-title', 'Play (k)');
  } else {
    playButton.setAttribute('data-title', 'Pause (k)');
  }
}

// formatTime takes a time length in seconds and returns the time in
// minutes and seconds
function formatTime(timeInSeconds) {
  const result = new Date(timeInSeconds * 1000).toISOString().substr(11, 8);

  return {
    minutes: result.substr(3, 2),
    seconds: result.substr(6, 2),
  };
}

// initializeVideo sets the video duration, and maximum value of the
// progressBar
function initializeVideo() {
  const videoDuration = Math.round(video.duration);
  seek.setAttribute('max', videoDuration);
  progressBar.setAttribute('max', videoDuration);
  const time = formatTime(videoDuration);
  duration.innerText = `${time.minutes}:${time.seconds}`;
  duration.setAttribute('datetime', `${time.minutes}m ${time.seconds}s`);
  memoBox.style.display = 'none';
  memoIcon.style.fill = "rgba(200,200,200,0.6)";
  memoIcon.style.stroke = "rgba(200,200,200,0.6)";
  BMIcon.style.fill = "rgba(200,200,200,0.6)";
  BMIcon.style.stroke = "rgba(200,200,200,0.6)";
  speed.forEach((speed) => {
    switch(speed.id){
      case 'speed-0.5':
        speed.addEventListener('click',function(){
          video.playbackRate = 0.5;
          speedButton.innerText = 'X0.5'
          toggleSpeedBox()
        })
        break;
      case 'speed-0.75':
        speed.addEventListener('click',function(){
          video.playbackRate = 0.75;
          speedButton.innerText = 'X0.75'
          toggleSpeedBox()
        })
        break;
      case 'speed-1.0':
        speed.addEventListener('click',function(){
          video.playbackRate = 1.0;
          speedButton.innerText = 'X1.0'
          toggleSpeedBox()
        })
        break;
      case 'speed-1.25':
        speed.addEventListener('click',function(){
          video.playbackRate = 1.25;
          speedButton.innerText = 'X1.25'
          toggleSpeedBox()
        })
        break;
      case 'speed-1.5':
        speed.addEventListener('click',function(){
          video.playbackRate = 1.5;
          speedButton.innerText = 'X1.5'
          toggleSpeedBox()
        })
        break;
      case 'speed-1.75':
        speed.addEventListener('click',function(){
          video.playbackRate = 1.75;
          speedButton.innerText = 'X1.75'
          toggleSpeedBox()
        })
        break;
      case 'speed-2.0':
        speed.addEventListener('click',function(){
          video.playbackRate = 2.0;
          speedButton.innerText = 'X2.0'
          toggleSpeedBox()
        })
        break;  
    }
  })
}

// updateTimeElapsed indicates how far through the video
// the current playback is by updating the timeElapsed element
function updateTimeElapsed() {
  const time = formatTime(Math.round(video.currentTime));
  timeElapsed.innerText = `${time.minutes}:${time.seconds}`;
  timeElapsed.setAttribute('datetime', `${time.minutes}m ${time.seconds}s`);
}

// updateProgress indicates how far through the video
// the current playback is by updating the progress bar
function updateProgress() {
  seek.value = Math.floor(video.currentTime);
  progressBar.value = Math.floor(video.currentTime);
}

// updateSeekTooltip uses the position of the mouse on the progress bar to
// roughly work out what point in the video the user will skip to if
// the progress bar is clicked at that point
function updateSeekTooltip(event) {
  const skipTo = Math.round(
    (event.offsetX / event.target.clientWidth) *
      parseInt(event.target.getAttribute('max'), 10)
  );
  seek.setAttribute('data-seek', skipTo);
  const t = formatTime(skipTo);
  seekTooltip.textContent = `${t.minutes}:${t.seconds}`;
  const rect = video.getBoundingClientRect();
  seekTooltip.style.left = `${event.pageX - rect.left}px`;
}

// skipAhead jumps to a different point in the video when the progress bar
// is clicked
function skipAhead(event) {
  const skipTo = event.target.dataset.seek
    ? event.target.dataset.seek
    : event.target.value;
  video.currentTime = skipTo;
  progressBar.value = skipTo;
  seek.value = skipTo;
}

// updateVolume updates the video's volume
// and disables the muted state if active
function updateVolume() {
  if (video.muted) {
    video.muted = false;
  }

  video.volume = volume.value;
}

// updateVolumeIcon updates the volume icon so that it correctly reflects
// the volume of the video
function updateVolumeIcon() {
  volumeIcons.forEach((icon) => {
    icon.classList.add('hidden');
  });

  volumeButton.setAttribute('data-title', 'Mute (m)');

  if (video.muted || video.volume === 0) {
    volumeMute.classList.remove('hidden');
    volumeButton.setAttribute('data-title', 'Unmute (m)');
  } else if (video.volume > 0 && video.volume <= 0.5) {
    volumeLow.classList.remove('hidden');
  } else {
    volumeHigh.classList.remove('hidden');
  }
}

// toggleMute mutes or unmutes the video when executed
// When the video is unmuted, the volume is returned to the value
// it was set to before the video was muted
function toggleMute() {
  video.muted = !video.muted;

  if (video.muted) {
    volume.setAttribute('data-volume', volume.value);
    volume.value = 0;
  } else {
    volume.value = volume.dataset.volume;
  }
}

// animatePlayback displays an animation when
// the video is played or paused
function animatePlayback() {
  playbackAnimation.animate(
    [
      {
        opacity: 1,
        transform: 'scale(1)',
      },
      {
        opacity: 0,
        transform: 'scale(1.3)',
      },
    ],
    {
      duration: 500,
    }
  );
}

// toggleFullScreen toggles the full screen state of the video
// If the browser is currently in fullscreen mode,
// then it should exit and vice versa.
function toggleFullScreen() {
  if (document.fullscreenElement) {
    document.exitFullscreen();
  } else if (document.webkitFullscreenElement) {
    // Need this to support Safari
    document.webkitExitFullscreen();
  } else if (videoContainer.webkitRequestFullscreen) {
    // Need this to support Safari
    videoContainer.webkitRequestFullscreen();
  } else {
    videoContainer.requestFullscreen();
  }
}

// updateFullscreenButton changes the icon of the full screen button
// and tooltip to reflect the current full screen state of the video
function updateFullscreenButton() {
  fullscreenIcons.forEach((icon) => icon.classList.toggle('hidden'));

  if (document.fullscreenElement) {
    fullscreenButton.setAttribute('data-title', 'Exit full screen (f)');
  } else {
    fullscreenButton.setAttribute('data-title', 'Full screen (f)');
  }
}

// togglePip toggles Picture-in-Picture mode on the video
async function togglePip() {
  try {
    if (video !== document.pictureInPictureElement) {
      pipButton.disabled = true;
      await video.requestPictureInPicture();
    } else {
      await document.exitPictureInPicture();
    }
  } catch (error) {
    console.error(error);
  } finally {
    pipButton.disabled = false;
  }
}

// hideControls hides the video controls when not in use
// if the video is paused, the controls must remain visible
function hideControls() {
  if (video.paused) {
    return;
  }
  videoControls.classList.add('hide');
}

// showControls displays the video controls
function showControls() {
  videoControls.classList.remove('hide');
}

// keyboardShortcuts executes the relevant functions for
// each supported shortcut key
function keyboardShortcuts(event) {
  const { key } = event;

  switch (key) {
    case 'k', ' ':
      togglePlay();
      animatePlayback();
      if (video.paused) {
        showControls();
      } else {
        setTimeout(() => {
          hideControls();
        }, 2000);
      }
      break;
    case 'm':
      toggleMute();
      break;
    case 'f':
      toggleFullScreen();
      break;
    case 'p':
      togglePip();
      break;
    case 'ArrowUp':
      if(volume.value > 0.9){
        volume.value = 1;
      }else{
        volume.value += 0.1;
      }
      video.volume = volume.value;
      break; 
    case 'ArrowDown':
      if(volume.value < 0.1){
        volume.value = 0;
      }else{
        volume.value -= 0.1;
      }
      video.volume = volume.value;
      break;   
    case 'ArrowLeft':
      video.currentTime -= 5;
      break;
    case 'ArrowRight':
      video.currentTime += 5;
      break;
  }
}

function toggleMemo(){
  var attr = memoBox.style.display;
  if(attr == "none"){
    memoBox.style.display = "block";
    memoIcon.style.fill = "#fff";
    memoIcon.style.stroke = "#fff";
  }else{
    memoBox.style.display = 'none';
    memoIcon.style.fill = "rgba(200,200,200,0.6)";
    memoIcon.style.stroke = "rgba(200,200,200,0.6)";
  }
}

function toggleMemoFont(){
  const fontSize = memoFontSize.value + "px";
  const fontColor = memoFontColor.value;
  memoarea.style.setProperty('font-size', fontSize);
  memoarea.style.setProperty('color', fontColor);
}

function toggleBM(){
  var attr = BMBox.style.display;
  if(attr == "none"){
    BMBox.style.display = "flex";
    BMIcon.style.fill = "#fff";
    BMIcon.style.stroke = "#fff";
  }else{
    BMBox.style.display = 'none';
    BMIcon.style.fill = "rgba(200,200,200,0.6)";
    BMIcon.style.stroke = "rgba(200,200,200,0.6)";
  }
}

function addBM(){
  BM = document.createElement('button');
  const cur = video.currentTime;
  const time = formatTime(Math.round(cur));
  BM.innerText = `${time.minutes}:${time.seconds} `+ BMname.value;
  BM.style.setProperty('color', '#ffffff');
  BM.style.setProperty('font-size', '16px');
  BM.addEventListener('click',function(){
    video.currentTime = cur;
    progressBar.value = cur;
    seek.value = cur;
  })
  BMBox.appendChild(BM);
}


function toggleSpeedBox(){
  if(speedBox.style.display == "none"){
    speedBox.style.display = "flex"
  }else{
    speedBox.style.display = "none"
  }
}

function openList(){
  videoListContainer.style.display = "flex"
  openlistButton.style.display = "none"
}

function closeList(){
  videoListContainer.style.display = "none"
  openlistButton.style.display = "inline"
}


function wideToggle(){
  if(container.style.width == '800px'){
    container.style.width = '1100px'
    closeList()
  }else{
    container.style.width = '800px'
  }
}


// Add eventlisteners here
playButton.addEventListener('click', togglePlay);
video.addEventListener('play', updatePlayButton);
video.addEventListener('pause', updatePlayButton);
video.addEventListener('loadedmetadata', initializeVideo);
video.addEventListener('timeupdate', updateTimeElapsed);
video.addEventListener('timeupdate', updateProgress);
video.addEventListener('volumechange', updateVolumeIcon);
video.addEventListener('click', togglePlay);
video.addEventListener('click', animatePlayback);
video.addEventListener('mouseenter', showControls);
video.addEventListener('mouseleave', hideControls);
videoControls.addEventListener('mouseenter', showControls);
videoControls.addEventListener('mouseleave', hideControls);
seek.addEventListener('mousemove', updateSeekTooltip);
seek.addEventListener('input', skipAhead);
volume.addEventListener('input', updateVolume);
volumeButton.addEventListener('click', toggleMute);
fullscreenButton.addEventListener('click', toggleFullScreen);
videoContainer.addEventListener('fullscreenchange', updateFullscreenButton);
pipButton.addEventListener('click', togglePip);
memoButton.addEventListener('click', toggleMemo);
memoarea.addEventListener('focusin', toggleMemoFont);
BMButton.addEventListener('click', toggleBM);
speedButton.addEventListener('click', toggleSpeedBox);
openlistButton.addEventListener('click', openList);
closelistButton.addEventListener('click', closeList);
addBMButton.addEventListener('click', addBM);
wideButton.addEventListener('click', wideToggle);

document.addEventListener('DOMContentLoaded', () => {
  if (!('pictureInPictureEnabled' in document)) {
    pipButton.classList.add('hidden');
  }
});

video.addEventListener('keyup', keyboardShortcuts);


const animation = document.getElementsByClassName('animation');
const design = document.getElementsByClassName('design');
const forest = document.getElementsByClassName('forest');
const paint = document.getElementsByClassName('paint'); 
const rings = document.getElementsByClassName('rings');
const search = document.getElementsByClassName('search');

for(var i=0; i<animation.length; i++){
  animation.item(i).addEventListener('click', function(){
    video.src = "http://localhost:4000/video/animation.mp4"
    updatePlayButton()
  })
}

for(var i=0; i<design.length; i++){
  design.item(i).addEventListener('click', function(){
    video.src = "http://localhost:4000/video/design.mp4"
    updatePlayButton()
  })
}

for(var i=0; i<forest.length; i++){
  forest.item(i).addEventListener('click', function(){
    video.src = "http://localhost:4000/video/forest.mp4"
    updatePlayButton()
  })
}

for(var i=0; i<paint.length; i++){
  paint.item(i).addEventListener('click', function(){
    video.src = "http://localhost:4000/video/paint.mp4"
    updatePlayButton()
  })
}

for(var i=0; i<rings.length; i++){
  rings.item(i).addEventListener('click', function(){
    video.src = "http://localhost:4000/video/rings.mp4"
    updatePlayButton()
  })
}

for(var i=0; i<search.length; i++){
  search.item(i).addEventListener('click', function(){
    video.src = "http://localhost:4000/video/search.mp4"
    updatePlayButton()
  })
}


