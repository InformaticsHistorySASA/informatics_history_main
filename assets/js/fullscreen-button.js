document.querySelectorAll('.fullscreen-button').forEach(item => {
    item.addEventListener('click', e => {
        e.preventDefault();
        if(!document.fullscreenElement) document.documentElement.requestFullscreen();
        else document.exitFullscreen();
    })
})