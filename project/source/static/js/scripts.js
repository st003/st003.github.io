// svgs
const backSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-left-fill" viewBox="0 0 16 16"><path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z"/></svg>'

const closeSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16"><path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/></svg>'

const forwardSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-right-fill" viewBox="0 0 16 16"><path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/></svg>'

// modal logic
function openModal(modalID) {
    const modal = document.getElementById(modalID);
    const modalContent = modal.getElementsByClassName('modalContent').item(0);

    // construct close button
    const closeBtn     = document.createElement('button');
    closeBtn.innerHTML = closeSvg;
    closeBtn.classList.add('modalExitButton');
    closeBtn.addEventListener('click', () => { closeModal(modalID); });
    modalContent.appendChild(closeBtn);

    modal.style.display = 'flex';

    function closeModal(modalID) {
        document.getElementById(modalID).style.display = 'none';
        document.getElementsByClassName('modalExitButton').item(0).remove();
    }
}

// slideshow logic
function incrementSlide(slideshow, currentSlide, increment) {
    return displaySlide(slideshow, currentSlide += increment);
}

function displaySlide(slideshow, slideNum) {
    const counter = document.getElementById(`${slideshow.id}-counter`);
    const slides  = slideshow.getElementsByClassName('slide');

    // wrapping behavior
    if (slideNum > slides.length - 1) slideNum = 0;
    if (slideNum < 0) slideNum = slides.length -1;

    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = 'none';
    }

    counter.innerHTML = `${slideNum + 1} / ${slides.length}`;
    slides[slideNum].style.display  = 'block';

    return slideNum;
}

function initSlideshow(slideshowID) {
    const slideshow = document.getElementById(slideshowID);

    // create nav
    const slideshowNav = document.createElement('div');
    slideshowNav.classList.add('slideshowNav');

    const backBtn     = document.createElement('button');
    backBtn.innerHTML = backSvg;
    backBtn.classList.add('slideshowButton');
    slideshowNav.appendChild(backBtn);

    const slideCounterContainer = document.createElement('div');
    slideCounterContainer.classList.add('slideCounterContainer');

    const slideCounter = document.createElement('div');
    slideCounter.id = `${slideshowID}-counter`;
    slideCounter.classList.add('slideCounter');

    slideCounterContainer.appendChild(slideCounter);
    slideshowNav.appendChild(slideCounterContainer);

    const fwdBtn     = document.createElement('button');
    fwdBtn.innerHTML = forwardSvg;
    fwdBtn.classList.add('slideshowButton');
    slideshowNav.appendChild(fwdBtn);

    // insert nav
    slideshow.appendChild(slideshowNav);

    const initialSlideNum = 0;
    displaySlide(slideshow, initialSlideNum);

    return {
        slideshow: slideshow, 
        slideNum: initialSlideNum,
        backBtn: backBtn,
        fwdBtn: fwdBtn
    }
}

function beforeAfter(baCompareID) {
    const baCompare = document.getElementById(baCompareID);
    const beforeImg = baCompare.getElementsByClassName('before').item(0);
    const baToggle  = baCompare.getElementsByTagName('button').item(0);

    if (!beforeImg.style.display || beforeImg.style.display == 'none') {
        beforeImg.style.display = 'block';
        baToggle.innerHTML = 'Show After';
    } else {
        beforeImg.style.display = 'none';
        baToggle.innerHTML = 'Show Before';
    }
}

/* EVENT LISTENERS */
document.addEventListener('DOMContentLoaded', () => {

    // configure slideshows
    const slideshows = document.getElementsByClassName('slideshow');
    for (let i = 0; i < slideshows.length; i++) {

        const currentSlideshow = initSlideshow(slideshows[i].id);
        let currentSlideNum = currentSlideshow.slideNum;
        currentSlideshow.backBtn.addEventListener('click', () => {
            currentSlideNum = incrementSlide(currentSlideshow.slideshow, currentSlideNum, -1)
        });
        currentSlideshow.fwdBtn.addEventListener('click', () => {
            currentSlideNum = incrementSlide(currentSlideshow.slideshow, currentSlideNum, 1)
        });

    }

});
