document.addEventListener('DOMContentLoaded', function() {
    const wire = document.querySelector('.wire');
    const bip = document.querySelector('.bip');
    const cokelogo = document.querySelector('.cokelogo');
    const glitch = document.querySelector('.glitch');
    const soundbox = document.querySelector('.soundbox');
    const guitarL = document.querySelector('.guitarL');
    const bg = document.querySelector('.bg');
    const video = document.querySelector('.video-wrapper');
    const l_effects = document.querySelector('.l_effects');
    const m_effects = document.querySelector('.m_effects');
    const r_effects = document.querySelector('.r_effects');

    let isDragging = false;
    let offsetX, offsetY;
    let isAttached = false;

    wire.addEventListener('mousedown', startDrag);
    wire.addEventListener('touchstart', startDrag);

    function startDrag(e) {
        e.preventDefault();
        isDragging = true;

        const bounds = wire.getBoundingClientRect();
        offsetX = e.clientX - bounds.left;
        offsetY = e.clientY - bounds.top;

        document.addEventListener('mousemove', drag);
        document.addEventListener('touchmove', drag);
        document.addEventListener('mouseup', stopDrag);
        document.addEventListener('touchend', stopDrag);
    }

    function drag(e) {
        if (!isDragging) return;

        e.preventDefault();

        const x = e.clientX - offsetX;
        const y = e.clientY - offsetY;

        wire.style.left = `${x}px`;
        wire.style.top = `${y}px`;

        const wireRect = wire.getBoundingClientRect();
        const bipRect = bip.getBoundingClientRect();

        if (!isAttached && isNear(wireRect, bipRect)) {
            wire.style.left = `${parseInt(wire.style.left) + 200}px`; 
            isAttached = true;
            hideWireAndBip();
        }
    }

    function stopDrag() {
        isDragging = false;
    
        // Get the wire's position after dragging stops
        const wireLeft = parseInt(wire.style.left || wire.getBoundingClientRect().left);
        const wireTop = parseInt(wire.style.top || wire.getBoundingClientRect().top);
    
        console.log('Wire position after dragging stops - Left:', wireLeft, 'Top:', wireTop);
    
      
        const targetLeft = -1790; 
        const targetTop = 280; 
        const distanceThreshold = 50; 
    
        const distance = Math.sqrt(
            Math.pow(wireLeft - targetLeft, 2) + 
            Math.pow(wireTop - targetTop, 2)
        );
    
        if (distance < distanceThreshold) {
            gsap.to('.wire, .bip, .cokelogo', {display: 'none', opacity: 0});
            gsap.to('.glitch, .l_effects, .m_effects, .r_effects', {display: 'block', opacity: 1})
            gsap.to('.l_effects, .m_effects, .r_effects, .glitch', {scale: .9, yoyo: true, repeat: -1})
            gsap.to('.l_effects, .m_effects, .r_effects, .glitch, .guitarL, .soundbox', {delay: 2, rotateY: 90, onComplete: showbg})
            function showbg(){
                gsap.to('.bg', {display: 'block', opacity: 1, top: '0'})
                gsap.to('.bg', {delay: 1, top: '800px', opacity: 0})
                gsap.to('.video-wrapper, .ppa_hidden', {display: 'block', opacity: 1, top: '0'})
            }
           
        }
    
        document.removeEventListener('mousemove', drag);
        document.removeEventListener('touchmove', drag);
        document.removeEventListener('mouseup', stopDrag);
        document.removeEventListener('touchend', stopDrag);
    }
    
    
    function isNear(wireRect, bipRect) {
        const distance = Math.sqrt(
            Math.pow(wireRect.left - bipRect.left, 2) + 
            Math.pow(wireRect.top - bipRect.top, 2)
        );

        return distance < 50; 
    }

    function hideWireAndBip() {
        wire.style.visibility = 'hidden';
        bip.style.visibility = 'hidden';
    }
});


function handleVideoClick(event) {
    event.preventDefault();
    event.stopPropagation();
}
const closebtn = document.querySelector('.closebtn');
const videoPlayer = document.querySelector('#video-player');
const iframe = videoPlayer.querySelector('iframe');
closebtn.addEventListener('click', () => {
 
    console.log('hello');
    iframe.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
    gsap.to(['.main'], { opacity: 0, display: 'none', scale: .9, duration: 1, ease: "power1.inOut" });
    
});