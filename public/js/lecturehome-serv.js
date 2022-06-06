const lectVideo = document.getElementsByClassName('lecture-video')
const leftNav = document.getElementById('left-nav')

function resizeUI(){
    if(leftNav.style.display == 'none'){
        leftNav.style.display == 'block'
    }else{
        leftNav.style.display == 'none'
    }
}

lectVideo.item(0).addEventListener('resize',  resizeUI)