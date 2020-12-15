//BG COLOURS
const bgBtn = document.querySelector('#bg');
const groupOne = document.querySelectorAll('.original');
const groupTwo = document.querySelectorAll('.original-two');

//MENU 
const mainNav = document.querySelector('.main-nav');
const navBtn = document.querySelector('.navbar-plus');
const navLinks = document.querySelectorAll('.nav-link');

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

