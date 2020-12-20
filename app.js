//BG COLOURS
const slider = document.querySelector('.switch');
const groupOne = document.querySelectorAll('.original');
const groupTwo = document.querySelectorAll('.original-two');

//MENU 
const mainNav = document.querySelector('.main-nav');
const navBtn = document.querySelector('.navbar-plus');
const navLinks = document.querySelectorAll('.nav-link');

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

//SVG
const svgContainer = document.querySelector('#svg-container')
const text = document.querySelector('#text')
const path = document.querySelector('#wave');
const pathLength = path.getTotalLength()

//BACK TO TOP
const up = document.querySelector('#up img');

//--------------------------------------------
//Invert background colours
function invertColours() {
	groupOne.forEach(x => {
		x.classList.toggle('inverted');
		x.style.transition = '.4s ease-in';
	})
	groupTwo.forEach(x => {
		x.classList.toggle('inverted-two');
		x.style.transition = '.4s ease-in';
	})
}
slider.addEventListener('mousedown', invertColours); //click doesn't work here?

//----------
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

//--------------
// Clone images for carousel
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

// When press play/pause button, start/stop and change icon
function playOrPause() {
	if(!intervalId) {
		playPause.src = 'img/pause.png';
		return startSlide(); 
	} else {
		playPause.src = 'img/play.png';
		clearInterval(intervalId);
		intervalId = null;
	}
}
playPause.addEventListener('click', playOrPause)

// Play/pause button mouseover event
playPause.addEventListener('mouseout', () => playPause.style.opacity = '0');
playPause.addEventListener('mouseover', () => playPause.style.opacity = '1');

// Keyboard function
function onKeydown(e) {
	switch(e.key) {
		case 'ArrowLeft':
			prevSlide();
			break;
		case 'ArrowRight':
			nextSlide(); //but shows right margin - need to fix
			break;
		case 32:
			e.preventDefault();
			playOrPause();
	}
}
document.addEventListener('keydown', onKeydown);

//-------------
//Move text along the svg path according to the user's scroll position
const moveText = () => {
	requestAnimationFrame(function() { //similar to setInterval - this method makes it move
		var rect = svgContainer.getBoundingClientRect();
		var scrollPercent = rect.y / window.innerHeight; //484/660=0.73 divide domrect obj y by window height gives percentage representation of where element is in the viewport
		text.setAttribute('startOffset', scrollPercent * pathLength);//0.73*1830=1342 we want to do the same thing here but on the x axis
	})
}
const mqMoveText = () => {
	requestAnimationFrame(function() { 
		var rect = svgContainer.getBoundingClientRect();
		var scrollPercent = rect.y / window.innerHeight;
		text.setAttribute('startOffset', scrollPercent * 800);
	})
}

let mq = window.matchMedia('(max-width: 800px)');
if(mq.matches) {
	window.addEventListener('scroll', mqMoveText);
} else {
	window.addEventListener('scroll', moveText);
}

//-------------
// Show/hide back to top button after a certain point
const showBackToTop = () => {
    if(window.pageYOffset > 500) {
		up.style.display = 'block';
	} else if(window.pageYOffset <= 500) {
		up.style.display = 'none';
	}
}
window.addEventListener('scroll', showBackToTop);

