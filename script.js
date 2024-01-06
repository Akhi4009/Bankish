'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');


///////////////////////////////////////
// Modal window



const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn=> btn.addEventListener("click",openModal))

for (let i = 0; i < btnsOpenModal.length; i++)
 

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});


// Btn scrolling

btnScrollTo.addEventListener('click',function(e){
  const s1coord = section1.getBoundingClientRect();
  // console.log(s1coord)
  // console.log('Current scroll(X/Y)',window.pageXOffset,
  // window.pageYOffset);
  
  // scrolling
  // window.scrollTo(
  //   {
  //     left:s1coord.left + window.pageXOffset,
  //     top:s1coord.top + window.pageYOffset,
  //     behavior:"smooth",
  //   }
  // )
  section1.scrollIntoView({behavior:'smooth'});
})

const randomInt = (min, max) =>
  Math.floor(Math.random() * (max-min) + min);

const randomColor = ()=>
  `rgb(${randomInt(0,255)},
   ${randomInt(0,255)},
   ${randomInt(0,255)})`;
  //  console.log(randomColor());

   document.querySelector('.nav__link').addEventListener
   ('click',function(e){
   this.style.backgroundColor = randomColor();
   console.log('Link', e.target);
   })

   document.querySelector('.nav__links').addEventListener
   ('click',function(e){
    this.style.backgroundColor = randomColor();
    console.log('Container', e.target);

   })

   document.querySelector('.nav').addEventListener
   ('click',function(e){
    this.style.backgroundColor = randomColor();
    console.log('Nav', e.target);
   })


