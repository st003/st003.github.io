// svgs
const backSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-left-fill" viewBox="0 0 16 16"><path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z"/></svg>'

const closeSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16"><path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/></svg>'

const forwardSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-right-fill" viewBox="0 0 16 16"><path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/></svg>'

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

    // configure Xslideshows
    if (document.getElementsByClassName('XslideShowContainer')) {

        let currentSlide = 0;
        const buttons    = document.getElementsByClassName('XslideShowButton');
        const slides     = document.getElementsByClassName('XslideShowContent');

        buttons[0].addEventListener('click', () => {
            currentSlide = (currentSlide > 0) ? (currentSlide - 1) : slides.length - 1;
            for (let i = 0; i < slides.length; i++) {
                if (i === currentSlide) slides[i].classList.add('active');
                else slides[i].classList.remove('active');
            }
        });

        buttons[1].addEventListener('click', () => {
            currentSlide = (currentSlide < slides.length - 1) ? (currentSlide + 1) : 0;
            for (let i = 0; i < slides.length; i++) {
                if (i === currentSlide) slides[i].classList.add('active');
                else slides[i].classList.remove('active');
            }
        });
    }

});
