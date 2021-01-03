document.addEventListener('DOMContentLoaded', function(){
	// rest of code here
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
	const slideGroup = document.querySelector('.slides'); //difference between this and slide? 
	const nextBtn = document.querySelector('.next-btn');
	const prevBtn = document.querySelector('.prev-btn');
	let playPause = document.querySelector('.pause');
	let slide = document.querySelectorAll('.slide'); //could also have prepend/append slideclones to this, and then maybe don't need to define again inside transitionend function or next prev functions
	let index = 3; //can't start on 0 or can't use backwards button

	//SVG
	const svgContainer = document.querySelectorAll('.svg-container')
	const textPath = document.querySelectorAll('.text-path')
	const path = document.querySelector('#wave, #wave2, #wave3');
	const pathLength = path.getTotalLength()

	//BACK TO TOP
	const up = document.querySelector('#up img');

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
	slider.addEventListener('mousedown', invertColours); //click doesn't work here? diff between mousedown and click?

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
	const cloneOne = slide[0].cloneNode(true);
	const cloneTwo = slide[1].cloneNode(true);
	const cloneThree = slide[2].cloneNode(true);
	const cloneFour = slide[3].cloneNode(true);
	const cloneFive = slide[4].cloneNode(true);
	const cloneSix = slide[5].cloneNode(true);
	const cloneSeven = slide[6].cloneNode(true);

	// Add clones to start and end of slide group
	slideGroup.prepend(cloneFour, cloneFive, cloneSix, cloneSeven);
	slideGroup.append(cloneOne, cloneTwo, cloneThree, cloneFour); 

	// Set the slide width ie. amount to move
	//why -slideWidth? bc moving left
	const width = slide[index].clientWidth; 
	slideGroup.style.transform = `translateX(${-width * index}px)`; //this line sets the first image we see as index 3 bc it has moved 3 slides already on load (bc no transition)

	// Start automatic loop on page load
	let intervalId;
	const startSlide = () => intervalId = setInterval(nextSlide, 2000); 
	// window.addEventListener('load', startSlide);
	startSlide();
	// document.addEventListener('DOMContentLoaded', startSlide);

	// When click the arrows...
	// Move to next slide
	function nextSlide() {
		console.log('nextSlide fired')
		slide = document.querySelectorAll('.slide');
		index >= slide.length - 4 ? false : index++; //return false means don't continue 
		slideGroup.style.transform = `translateX(${-width * index}px)`;//needs to be *index bc it signifies the position we are moving it to the left from the starting point. 
		slideGroup.style.transition = '1s'; 
	}
	// Move to previous slide
	function prevSlide() {
		console.log('prevSlide fired')
		slide = document.querySelectorAll('.slide');
		index <= 0 ? false : index--; //false is to stop it from going off the carousel
		slideGroup.style.transform = `translateX(${-width * index}px)`;
		slideGroup.style.transition = '1s';
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
		console.log('transitionend fired')
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
		console.log('playpause fired')
		if(!intervalId) {
			playPause.src = 'img/pause.png';
			intervalId = setInterval(nextSlide, 2000); 
		} else {
			playPause.src = 'img/play.png';
			clearInterval(intervalId);
			intervalId = null; //bc first condition depends if !intervalId 
		}
	}
	playPause.addEventListener('click', playOrPause)

	// Play/pause button mouseover event
	playPause.addEventListener('mouseout', (e) => {
		e.target.style.opacity = '0';
		e.target.style.transition = '.3s';
	});
	playPause.addEventListener('mouseover', (e) => {
		e.target.style.opacity = '1';
		e.target.style.transition = '.3s';
	});

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

	//-------------
	//Move text along the svg path according to the user's scroll position
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
	const showBackToTop = () => {
		if(window.pageYOffset > 500) {
			up.style.display = 'block';
		} else if(window.pageYOffset <= 500) {
			up.style.display = 'none';
		}
	}
	window.addEventListener('scroll', showBackToTop);

});	