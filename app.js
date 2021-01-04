document.addEventListener('DOMContentLoaded', function() {
	//--------------------------------------------
	//Reload page immediately after first load (temp fix for carousel issue?)
	// window.onload = function() {
	//     if(!window.location.hash) {
	//         window.location = window.location + '#loaded';
	//         window.location.reload();
	//     }
	// }

	//--------------------------------------------
	//Invert background colours
	const slider = document.querySelector('.switch');
	const highlight = document.querySelectorAll('.highlight');

	function invertColours() {
		highlight.forEach(x => {
			x.classList.toggle('highlight');
			x.style.transition = '.4s ease-in';
		})
	}
	slider.addEventListener('mousedown', invertColours); //click doesn't work here? diff between mousedown and click?

	//----------
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

	//--------------
// CAROUSEL VARIABLES
const slideContainer = document.querySelector('.carousel');
const slideGroup = document.querySelector('.slides');
const nextBtn = document.querySelector('.next-btn');
const prevBtn = document.querySelector('.prev-btn');
const interval = 3250;
const playPause = document.querySelector('.pause');
let slides = document.querySelectorAll('.slide');
let index = 1; //bc 0 is clone of last slide
let slideId; // this is later set to be the intervalID parameter. 
let playing;

// CLONE FIRST AND LAST CAROUSEL IMAGE
const firstClone = slides[0].cloneNode(true);
const lastClone = slides[slides.length - 1].cloneNode(true);

// SET IDS FOR THESE TWO CLONES
firstClone.id = 'first-clone'; 
lastClone.id = 'last-clone';

// PLACE CLONES AT START AND END OF SLIDES GROUP
slideGroup.append(firstClone);
slideGroup.prepend(lastClone);

// SET SLIDE WIDTH
const slideWidth = slides[index].clientWidth;

// SET THE DISTANCE OF THE IMAGE MOVING HORIZONTALLY
slideGroup.style.transform = `translateX(${-slideWidth * index}px)`;

// FUNCTION TO START SLIDESHOW
const startSlide = () => {
	playing = true;
	return slideId = setInterval(() => { // WHY DO I HAVE TO RETURN IT FOR IT TO WORK? //is this example of a closure?
		moveToNextSlide();
	}, interval);
};

// GET ALL OF THE SLIDES
const getSlides = () => document.querySelectorAll('.slide');

// WHEN THE CSS TRANSITION ENDS, KEEP GOING
slideGroup.addEventListener('transitionend', () => {
	slides = getSlides();
	if (slides[index].id === firstClone.id) {
		slideGroup.style.transition = 'none';
		index = 1;
		slideGroup.style.transform = `translateX(${-slideWidth * index}px)`;
	}
	if (slides[index].id === lastClone.id) {
		slideGroup.style.transition = 'none';
		index = slides.length - 2;
		slideGroup.style.transform = `translateX(${-slideWidth * index}px)`;
	}
});

// FUNCTION FOR MOVING TO NEXT SLIDE
const moveToNextSlide = () => {
	slides = getSlides();
	if (index >= slides.length - 1) return;
	index++;
	slideGroup.style.transform = `translateX(${-slideWidth * index}px)`;
	slideGroup.style.transition = '.8s';
}

// FUNCTION FOR MOVING TO PREVIOUS SLIDE
const moveToPrevSlide = () => {
	slides = getSlides();
	if (index <= 0) return;
	index--;
	slideGroup.style.transform = `translateX(${-slideWidth * index}px)`;
	slideGroup.style.transition = '.7s';
}

// WHEN CLICK THE ARROWS, MOVE TO NEXT OR PREVIOUS SLIDES
nextBtn.addEventListener('click', moveToNextSlide);
prevBtn.addEventListener('click', moveToPrevSlide);

// START AUTOMATIC SLIDESHOW 
startSlide();

// PLAY PAUSE BUTTON - slideshow start/stop
playPause.addEventListener('click', () => {
	if(!slideId) {
		slideId = startSlide(); // WHY DO I HAVE TO SPECIFY SLIDE ID = STARTSLIDE. WHY CAN'T IT JUST BE STARTSLIDE(). 
		console.log('started');
	} else {
		clearInterval(slideId);
		slideId = null;
		console.log('stopped');
	}
});

// PLAY PAUSE BUTTON - image change
playPause.addEventListener('click', function () { //why function not arrow works here???
	var button = this; 
	if(button.className != 'pause') {
		button.src = 'img/pause.png';
		button.className = 'pause';
	} else if (button.className == 'pause') {
		button.src = 'img/play.png';
		button.className = 'play';
	}
	return false;
});

// PLAY PAUSE BUTTON - mouseover event
slideContainer.addEventListener('mouseout', () => {
	playPause.style.display = 'none';
})
slideContainer.addEventListener('mouseover', () => {
	playPause.style.display = 'block';
})

// KEYBOARD FUNCTION
document.onkeydown = function (event) {
	event = event || window.event;
	switch (event.keyCode) {
		case 37:
			leftArrowPressed();
			break;
		case 39:
			rightArrowPressed();
			break;
	}
}

function leftArrowPressed() {
	moveToPrevSlide();
}
function rightArrowPressed() {
	moveToNextSlide();
}


	//-------------
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

	//-------------
	//TYPING EFFECT
	let str = 'Thank you for reading!'
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

	//-------------
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

});	