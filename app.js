//BG COLOURS
const bgBtn = document.querySelector('#bg');
const groupOne = document.querySelectorAll('.original');
const groupTwo = document.querySelectorAll('.original-two');

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