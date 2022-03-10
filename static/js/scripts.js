// slideshow logic
function incrementSlide(currentSlide, increment) {
    return displaySlide(currentSlide += increment);
}

function displaySlide(slideNum) {
    const slideCounter = document.getElementById('slideCounter');
    const slides = document.getElementsByClassName('slide');
    if (slideNum > slides.length - 1) slideNum = 0;
    if (slideNum < 0) slideNum = slides.length -1;
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = 'none';
    }
    slides[slideNum].style.display = 'inline';
    slideCounter.innerHTML = `${slideNum + 1} / ${slides.length}`;
    return slideNum;
}

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementsByClassName('slideshow')) {
        let currentSlide = displaySlide(0);
        document.getElementById('backBtn').addEventListener('click', () => {
            currentSlide = incrementSlide(currentSlide, -1);
        });
        document.getElementById('forwardBtn').addEventListener('click', () => {
            currentSlide = incrementSlide(currentSlide, 1);
        });
    }
});
