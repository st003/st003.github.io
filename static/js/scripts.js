// slideshow logic
function incrementSlide(currentSlide, increment) {
    return displaySlide(currentSlide += increment);
}

function displaySlide(slideNum) {
    const slideCounter = document.getElementById('slideCounter');
    const slides = document.getElementsByClassName('slide');
    const captions = document.getElementsByClassName('captionText');
    if (slideNum > slides.length - 1) slideNum = 0;
    if (slideNum < 0) slideNum = slides.length -1;
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = 'none';
        captions[i].style.display = 'none';
    }
    slideCounter.innerHTML = `${slideNum + 1} / ${slides.length}`;
    slides[slideNum].style.display = 'inline';
    captions[slideNum].style.display = 'block';
    return slideNum;
}

function openModal(id) {
    document.getElementById(id).style.display = 'flex';
}

/* EVENT LISTENERS */
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementsByClassName('slideshow').length > 0) {
        let currentSlide = displaySlide(0);
        document.getElementById('backBtn').addEventListener('click', () => {
            currentSlide = incrementSlide(currentSlide, -1);
        });
        document.getElementById('forwardBtn').addEventListener('click', () => {
            currentSlide = incrementSlide(currentSlide, 1);
        });
    }

    if (document.getElementsByClassName('modal').length > 0) {
        const modals = document.getElementsByClassName('modal');
        for (let i = 0; i < modals.length; i++) {
            modals[i].addEventListener('click', function() {
                this.style.display = 'none';
            });
        }
    }
});
