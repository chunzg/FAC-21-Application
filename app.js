//Highlight colour toggle
const slider = document.querySelector('.switch');
const highlight = document.querySelectorAll('.highlight');

function highlightOff() {
	highlight.forEach(x => {
		x.classList.toggle('highlight');
		x.style.transition = '.3s ease-in';
	})
}
slider.addEventListener('mousedown', highlightOff); 

//Show/hide menu
const mainNav = document.querySelector('.main-nav');
const navBtn = document.querySelector('.navbar-plus');
const navLinks = document.querySelectorAll('.nav-link');

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


//Move text along the svg path according to the user's scroll position
const svgContainer = document.querySelectorAll('.svg-container')
const textPath = document.querySelectorAll('.text-path')
const path = document.querySelector('#wave, #wave2, #wave3');
const pathLength = path.getTotalLength()

const moveText = () => {
	requestAnimationFrame(function() {
		let scrollPercent = []
		svgContainer.forEach(x => {
			scrollPercent.push(x.getBoundingClientRect().y / window.outerHeight);
		})
		textPath[0].setAttribute('startOffset', scrollPercent[0] * pathLength);
		textPath[1].setAttribute('startOffset', scrollPercent[1] * pathLength);
		textPath[2].setAttribute('startOffset', scrollPercent[2] * pathLength);
	})
}
window.addEventListener('scroll', moveText);

//Typing effect
const str = 'Thank you for reading!'
let i = 0;
let txt;

function typeWriter() {
	txt = str.slice(0, ++i); //++i refers to the value after increment
	if(txt === str) {
		i = 0;
	}
	document.querySelector('.fa-layers-text').textContent = txt;
	setTimeout(typeWriter, 200)
}
typeWriter()

// Show/hide back to top button after a certain point
const up = document.querySelector('#up img');

const showBackToTop = () => {
	if(window.pageYOffset > 500) {
		up.style.display = 'block';
	} else if(window.pageYOffset <= 500) {
		up.style.display = 'none';
	}
}
window.addEventListener('scroll', showBackToTop);


//Carousel
const carousel = document.querySelector('.carousel');
const slideGroup = document.querySelector('.slides');
const nextBtn = document.querySelector('.next-btn');
const prevBtn = document.querySelector('.prev-btn');
const playPause = document.querySelector('.pause');
let slides = document.querySelectorAll('.slide');
let index = 1; 
let intervalId; 

// Clone first and last image
const firstClone = slides[0].cloneNode(true); //includes child nodes ie. image itself as it is child of the div
const lastClone = slides[slides.length - 1].cloneNode(true);

// Set ids for new clones
firstClone.id = 'first-clone'; 
lastClone.id = 'last-clone';

// Place clones at start and end of slide group
slideGroup.append(firstClone); //ParentNode.append(), newer API than appendChild()
slideGroup.prepend(lastClone);

// Set slide width and distance to move initially on page load
const slideWidth = slides[index].clientWidth;
slideGroup.style.transform = `translateX(${-slideWidth * index}px)`;
console.log(slideGroup)

// Function to start moving
const startSlide = () => {
	return intervalId = setInterval(nextSlide, 3000);
};

// Reassign slides var bc length has changed after DOM loaded
slides = document.querySelectorAll('.slide');
console.log(slides)

// Functions to move to next / prev slide
const nextSlide = () => {
	if(index >= slides.length - 1) return;//stops it from moving/going out into empty space
	index++;
	slideGroup.style.transform = `translateX(${-slideWidth * index}px)`;
	slideGroup.style.transition = '.8s';
}
const prevSlide = () => {
	if(index <= 0) return;
	index--;
	slideGroup.style.transform = `translateX(${-slideWidth * index}px)`;
	slideGroup.style.transition = '.7s';
}
nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

//Start on load (here bc hoisting)
startSlide();

// When get to end of loop, keep going
slideGroup.addEventListener('transitionend', () => {
	if(slides[index].id === firstClone.id) {
		index = 1; 
		slideGroup.style.transform = `translateX(${-slideWidth * index}px)`;  
		slideGroup.style.transition = 'none'; 
		//shift slidegroup by 1 pic to left from starting point to index 1 with no transition so that it's seamless
	}
	if(slides[index].id === lastClone.id) {
		index = slides.length - 2;
		slideGroup.style.transform = `translateX(${-slideWidth * index}px)`;
		slideGroup.style.transition = 'none';
		//shift slidegroup by 7 pics towards left from the starting point to land on index 7 seamlessly
	}
});

// Start/stop
function playOrPause() {
	if(!intervalId) {
		intervalId = setInterval(nextSlide, 3000); 
		playPause.src = 'img/pause.png';
	} else {
		clearInterval(intervalId);
		intervalId = null;
		playPause.src = 'img/play.png';
	}
}
playPause.addEventListener('click', playOrPause);

// Play pause mouseover event - moved to CSS bc loads faster

// Keyboard function
function onKeydown(e) {
	switch(e.keyCode) {
		case 37:
			prevSlide();
			break;
		case 39:
			nextSlide();
			break;
		case 32:
			e.preventDefault();
			playOrPause();
	}
}
document.addEventListener('keydown', onKeydown);