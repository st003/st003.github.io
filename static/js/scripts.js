// slideshow logic
function incrementSlide(currentSlide, increment) {
    return displaySlide(currentSlide += increment);
}


function displaySlide(slideNum) {
    const slideCounter = document.getElementById('slideCounter');
    const slideImgs = document.getElementsByClassName('slideImg');
    const captions = document.getElementsByClassName('captionText');

    if (slideNum > slideImgs.length - 1) slideNum = 0;
    if (slideNum < 0) slideNum = slideImgs.length -1;
    for (let i = 0; i < slideImgs.length; i++) {
        slideImgs[i].style.display = 'none';
        captions[i].style.display = 'none';
    }

    slideCounter.innerHTML = `${slideNum + 1} / ${slideImgs.length}`;
    slideImgs[slideNum].style.display = 'inline';
    captions[slideNum].style.display = 'block';
    return slideNum;
}

// modal logic
function openModal(modalID, sliderID) {
    const modal = document.getElementById(modalID);

    // construct, insert, and configure the exit button
    const closeBtn = document.createElement('button');
    closeBtn.style.top = 'auto';
    closeBtn.style.bottom = 0;
    closeBtn.style.zIndex = 100;
    closeBtn.innerHTML = 'Close';
    closeBtn.addEventListener('click', () => { modal.style.display = 'none'; });

    if (sliderID) closeBtn.addEventListener('click', () => { destroySlider(sliderID) });

    modal.style.display = 'flex';
    modal.insertBefore(closeBtn, modal.getElementsByClassName('modalAnimate').item(0));
}

// compare slide logic
function initCompareSlider(topImgID) {

    let handleInUse = false;
    const img       = document.getElementById(topImgID);
    const w         = img.offsetWidth;
    const h         = img.offsetHeight;

    // set width & height of top image
    img.style.width  = `${w / 2}px`;
    img.style.height = `${h}px`;

    // construct, insert, and position the slider handle
    const handle = document.createElement('div');
    handle.setAttribute('class', 'imgCompareSliderHandle');
    handle.innerHTML = '&#10094 &#10095'
    img.parentElement.parentElement.insertBefore(handle, null);
    handle.style.top  = (h / 2) - (handle.offsetHeight / 2) + 'px';
    handle.style.left = (w / 2) - (handle.offsetWidth / 2) + 'px';

    // define re-usable internal procedures
    function getMouseXPosition(event) {
        const imgBound = img.getBoundingClientRect();
        let xPos = (event.pageX - imgBound.left) - window.pageXOffset;
        return xPos;
    }

    function resizeImg(mousePos) {
        img.style.width = `${mousePos}px`;
        handle.style.left = img.offsetWidth - (handle.offsetWidth / 2) + 'px';
    }

    function moveSlider(event) {
        if (handleInUse) {
            let mousePos = getMouseXPosition(event);
            if (mousePos < 0) mousePos = 0;
            if (mousePos > w) mousePos = w;
            resizeImg(mousePos);
        }
    }

    function handleIsReady(event) {
        event.preventDefault();
        handleInUse = true;
        window.addEventListener("mousemove", moveSlider);
        window.addEventListener("touchmove", moveSlider);
    }

    // attached mouse and touch screen event listeners for stop and start
    handle.addEventListener('mousedown', handleIsReady);
    handle.addEventListener('touchstart', handleIsReady);
    window.addEventListener('mouseup', () => { handleInUse = false; });
    window.addEventListener('touchend', () => { handleInUse = false; });
}

function destroySlider(topImgID) {
    const img = document.getElementById(topImgID);
    // reset image resolution
    img.style.width  = '100%';
    img.style.height = 'auto';

    img.parentElement.parentElement.getElementsByClassName('imgCompareSliderHandle').item(0).remove();
}


/* EVENT LISTENERS */
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementsByClassName('slideshow').length > 0) {

        // configure slideshow back and forward buttons
        let currentSlide = displaySlide(0);
        document.getElementById('backBtn').addEventListener('click', () => {
            currentSlide = incrementSlide(currentSlide, -1);
        });
        document.getElementById('forwardBtn').addEventListener('click', () => {
            currentSlide = incrementSlide(currentSlide, 1);
        });

        const slides = document.getElementsByClassName('slide');
        for (let i = 0; i < slides.length; i++) {

            const slideImg = slides[i].getElementsByClassName('slideImg').item(0);
            const modal    = slides[i].getElementsByClassName('modal').item(0);
            var sliderID   = undefined;

            if (slides[i].getElementsByClassName('imgCompareSliderContainer').length > 0) {
                const topImg = slides[i].getElementsByClassName('topImg').item(0);
                sliderID = `slider-${i}`;
                topImg.id = sliderID;
            }

            const modalID = `modal-${i}`;
            modal.id = modalID;
            slideImg.addEventListener('click', () => { openModal(modalID, sliderID); });
            if (sliderID) slideImg.addEventListener('click', () => { initCompareSlider(sliderID); });
        }
    }

});
