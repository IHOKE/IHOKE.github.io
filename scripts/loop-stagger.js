/* Script Kiddie */
/*
Got this code from AI :D
Well at least I did a lil bit modding
*/

function loopStagger(textElementSelector, containerSelector) {
    const textElement = document.querySelector(textElementSelector);
    const container = document.querySelector(containerSelector);

    const words = textElement.textContent.split(/\s+/);
    const wordElements = words.map(word => {
        const wordElement = document.createElement('span');
        wordElement.innerHTML = word + "&nbsp;";
        wordElement.style.display = 'inline-block';
        return wordElement;
    });

    textElement.innerHTML = '';
    wordElements.forEach(wordElement => textElement.appendChild(wordElement));

    const containerHeight = container.offsetHeight;
    const staggerTL = gsap.timeline({
        repeat: -1,
        repeatDelay:1,
        onComplete: () => {
            wordElements.forEach(word => {
                word.style.top = 'auto';
                word.style.opacity = 1; //Reset opacity
                word.style.transform = 'scale(1)'; //Reset scale
            });
        }
    });

    staggerTL.staggerTo(wordElements, 1, {
        y: containerHeight + 50,
        ease: 'power1.inOut',
        opacity: 0,
        onComplete: () => {
            wordElements.forEach(word => {
                word.style.top = containerHeight + 'px';
            });
        }
    }, 0.5);

    // Add a new animation to handle the reappear and magnify effect
    staggerTL.staggerTo(wordElements, 1, { //Duration can be adjusted
        y: 0,
        opacity: 0,
        scale: 0,
        ease: 'back.out(1.7)', //Use a bouncy ease for magnification
        onComplete: () => {
            wordElements.forEach(word => {
                word.style.top = -containerHeight + 'px';
            });
        }
    }, 0.1);

    staggerTL.staggerTo(wordElements, 1, { //Duration can be adjusted
        opacity: 1,
        scale: 1,
        ease: 'back.out(1.7)' //Use a bouncy ease for magnification
    }, 0);

}