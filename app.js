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
	const container = document.querySelector('.carousel');
	const carousel = document.querySelector('.slides');
	const nextBtn = document.querySelector('.next-btn');
	const prevBtn = document.querySelector('.prev-btn');
	const playPause = document.querySelector('.pause');
	let slides = document.querySelectorAll('.slide');
	let index = 1; //bc 0 is clone of last slide
	// let intervalId; 
	
	// Clone first and last image
	const firstClone = slides[0].cloneNode(true);
	const lastClone = slides[slides.length - 1].cloneNode(true);
	
	// Set ids for new clones
	firstClone.id = 'first-clone'; 
	lastClone.id = 'last-clone';
	
	// Place clones at start and end of slide group
	carousel.append(firstClone);
	carousel.prepend(lastClone);
	
	// Set slide width and distance to move
	const slideWidth = slides[index].clientWidth;
	carousel.style.transform = `translateX(${-slideWidth * index}px)`;
	
	// Function to start moving
	const startSlide = () => {
		return intervalId = setInterval(nextSlide, 2000);
	};
	
	// Redefine slides var bc length has changed
	slides = document.querySelectorAll('.slide');
	
	// When css transition ends, keep going
	carousel.addEventListener('transitionend', () => {
		if(slides[index].id === firstClone.id) {
			carousel.style.transition = 'none';
			index = 1;
			carousel.style.transform = `translateX(${-slideWidth * index}px)`;
		}
		if(slides[index].id === lastClone.id) {
			carousel.style.transition = 'none';
			index = slides.length - 2;
			carousel.style.transform = `translateX(${-slideWidth * index}px)`;
		}
	});
	
	// Functions to move to next / prev slide
	const nextSlide = () => {
		if(index >= slides.length - 1) return;
		index++;
		carousel.style.transform = `translateX(${-slideWidth * index}px)`;
		carousel.style.transition = '.8s';
	}
	const prevSlide = () => {
		if(index <= 0) return;
		index--;
		carousel.style.transform = `translateX(${-slideWidth * index}px)`;
		carousel.style.transition = '.7s';
	}
	nextBtn.addEventListener('click', nextSlide);
	prevBtn.addEventListener('click', prevSlide);
	
	//Start on load (here bc hoisting)
	startSlide();
	
	// Start/stop function
	function playOrPause() {
		if(!intervalId) {
			intervalId = setInterval(nextSlide, 2000); 
			playPause.src = 'img/pause.png';
		} else {
			clearInterval(intervalId);
			intervalId = null;
			playPause.src = 'img/play.png';
		}
	}
	playPause.addEventListener('click', playOrPause);
	
	// Play pause mouseover event
	container.addEventListener('mouseout', () => {
		playPause.style.opacity = 0;
		playPause.style.transition = '.5s';
	})
	container.addEventListener('mouseover', () => {
		playPause.style.opacity = 1;
		playPause.style.transition = '.5s';
	})
	
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