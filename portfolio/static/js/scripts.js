// svgs
const backSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-left-fill" viewBox="0 0 16 16"><path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z"/></svg>'

const closeSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16"><path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/></svg>'

const forwardSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-right-fill" viewBox="0 0 16 16"><path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/></svg>'


function toggleBeforeAfter(element) {

    const imgs   = element.parentElement.getElementsByTagName('img');
    const before = imgs.item(0);
    const after  = imgs.item(1);

    if (!before.style.display || before.style.display == 'none') {
        before.style.display = 'inline';
        after.style.display  = 'none';
        element.innerHTML    = 'Show After';
    } else {
        before.style.display = 'none';
        after.style.display  = 'inline';
        element.innerHTML    = 'Show Before';
    }
}

/* EVENT LISTENERS */
document.addEventListener('DOMContentLoaded', () => {

    // configure slide shows
    if (document.getElementsByClassName('slideShowContainer').length) {

        let currentSlide = 0;
        const buttons    = document.getElementsByClassName('slideShowButton');
        const slides     = document.getElementsByClassName('slideShowContent');
        const counter    = document.getElementsByClassName('slideShowCounter')[0];

        counter.innerHTML = `1/${slides.length}`;


        buttons[0].addEventListener('click', () => {
            currentSlide = (currentSlide > 0) ? (currentSlide - 1) : slides.length - 1;
            for (let i = 0; i < slides.length; i++) {
                if (i === currentSlide) slides[i].classList.add('active');
                else slides[i].classList.remove('active');
            }
            counter.innerHTML = `${currentSlide + 1}/${slides.length}`;
        });

        buttons[1].addEventListener('click', () => {
            currentSlide = (currentSlide < slides.length - 1) ? (currentSlide + 1) : 0;
            for (let i = 0; i < slides.length; i++) {
                if (i === currentSlide) slides[i].classList.add('active');
                else slides[i].classList.remove('active');
            }
            counter.innerHTML = `${currentSlide + 1}/${slides.length}`;
        });
    }

});
