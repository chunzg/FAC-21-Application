//BG COLOURS
const bgBtn = document.querySelector('#bg');
const groupOne = document.querySelectorAll('.original');
const groupTwo = document.querySelectorAll('.original-two');

//MENU 
const mainNav = document.querySelector('.main-nav');
const navBtn = document.querySelector('.navbar-plus');
const navLinks = document.querySelectorAll('.nav-link');

//BACK TO TOP
const up = document.querySelector('#up img');

// CAROUSEL
const carousel = document.querySelector('.carousel');
const slideGroup = document.querySelector('.slides');
const nextBtn = document.querySelector('.next-btn');
const prevBtn = document.querySelector('.prev-btn');
let playPause = document.querySelector('.pause');
let slide = document.querySelectorAll('.slide');
let index = 4; //can't start on 0 or can't use backwards button
let playing = true; //check if this line needed? 
let intervalId;

//--------------------------------------------
// Clone images
const cloneZero = slide[0].cloneNode(true);
const cloneOne = slide[1].cloneNode(true);
const cloneTwo = slide[2].cloneNode(true);
const cloneThree = slide[3].cloneNode(true);
const cloneFour = slide[4].cloneNode(true);
const cloneFive = slide[5].cloneNode(true);
const cloneSix = slide[6].cloneNode(true);

// Add clones to start and end of slide group
slideGroup.prepend(cloneThree, cloneFour, cloneFive, cloneSix);
slideGroup.append(cloneZero, cloneOne, cloneTwo, cloneThree, cloneFour); //check if need to append so many?

// Set the slide width ie. amount to move
//why -slideWidth? bc moving left
const width = slide[index].clientWidth; 
slideGroup.style.transform = `translateX(${-width * index}px)`; //this line is to set the first image we see as index 4

// Start automatic loop on page load
// no need for explicit return bc not block code in curly braces
// no need to do anon function inside setInterval bc nextSlide is in global scope
const startSlide = () => intervalId = setInterval(nextSlide, 1700); 
startSlide();

// When click the arrows...
// Move to next slide
function nextSlide() {
	slide = document.querySelectorAll('.slide');
	index >= slide.length - 4 ? false : index++; //return false means don't continue 
	slideGroup.style.transform = `translateX(${-width * index}px)`;//needs to be *index bc it signifies the position we are moving it to the left from the starting point. 
	slideGroup.style.transition = '2s'; 
}
// Move to previous slide
function prevSlide() {
	slide = document.querySelectorAll('.slide');
    index <= 0 ? false : index--; //false is to stop it from going off the carousel
	slideGroup.style.transform = `translateX(${-width * index}px)`;
	slideGroup.style.transition = '2s';
}
nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

//However it will stop at the last slide, so...
//When loop ends, keep going
//Set ids for the clones to differentiate from the others, or loop doesnt work
cloneOne.id = 'clone1';
cloneFive.id = 'clone5';

slideGroup.addEventListener('transitionend', () => { //transitionend means each time it moves once. use transitionend bc used slideGroup.style.transition above
	slide = document.querySelectorAll('.slide'); //has to be defined again inside function, bc in global scope has only 7 slides. Bc prepend and append happened AFTER the first time 'slide' was assigned. 
	if(slide[index].id === 'clone1') {
		slideGroup.style.transition = 'ease-in';
        index = 3;
		slideGroup.style.transform = `translateX(${-width * index}px)`; 
	}
	if(slide[index].id === 'clone5') { //for when we click backwards and lands on clone5
		slideGroup.style.transition = 'none';
         index = 7;
	 	slideGroup.style.transform = `translateX(${-width * index}px)`;
	}
});


//Invert background colours
bgBtn.addEventListener('click', invertColours);

function invertColours() {
	groupOne.forEach(x => {
		x.classList.toggle('inverted');
		x.style.transition = '.5s ease-in';
	})
	groupTwo.forEach(x => {
		x.classList.toggle('inverted-two');
		x.style.transition = '.5s ease-in';
	})
}

//Show/hide menu
function navBtnRotate() {
	navBtn.addEventListener('click', (e) => {
		if(mainNav.classList.toggle('active')){
			e.target.style.transform = 'rotate(45deg)';
		} else if(mainNav.classList.toggle != 'active') {
			e.target.style.transform = 'rotate(0deg)';
		}
	});
}
navBtnRotate()

//Hide menu when a link is clicked
navLinks.forEach((x) => {
	x.addEventListener('click', () => {
		mainNav.classList.toggle('active');
		navBtn.style.transform = 'rotate(0deg)';
	})
})

// Show/hide back to top button after a certain point
const showBackToTop = () => {
    if(window.pageYOffset > 500) {
		up.style.display = 'block';
	} else if(window.pageYOffset <= 500) {
		up.style.display = 'none';
	}
}
window.addEventListener('scroll', showBackToTop);

