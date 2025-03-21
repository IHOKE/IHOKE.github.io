/* Author: Hermina Tealie */
/*
A script that pans to the bottom of the child and back to top
The parent element should use hidden overflow
*/

function loopBottomTop(elementPan, argOffset) {

    let elementChild = document.querySelector(elementPan);
    let elementParent = elementChild.parentElement;
    let panBottom = elementParent.offsetHeight - elementChild.offsetHeight
    // Gets the height of the child

    let panBottomTop = gsap.timeline({repeat: -1, repeatDelay: 1 });

    panBottomTop.to(elementPan, {y: panBottom - argOffset, duration: 3});
    panBottomTop.to(elementPan, {y: 0, duration: 3},">+1");

}