'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content')


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

///////////////////////////////////////

//////// Btn scrolling

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

///////////////////////////////////////

// Page Navigation


// document.querySelectorAll('.nav__link').forEach
// (function(el){
//   el.addEventListener('click', function(e){
//     e.preventDefault();
//  const id = this.getAttribute('href')
//  document.querySelector(id).scrollIntoView({behavior:'smooth'});
  
//   });
// });

// 1. Add event Listener to common parent element
// 2. Determine what element originated the event

document.querySelector('.nav__links').addEventListener(
  'click', function(e){
    e.preventDefault();
// Matching Stratagy
    if(e.target.classList.contains('nav__link')){
     const id = e.target.getAttribute('href');
     console.log(id);
     document.querySelector(id).scrollIntoView({behavior:'smooth'});
    }
  }
)

// Tab component


// console.log(tabs);
//  console.log(tabsContainer);
// console.log(tabContent);
tabsContainer.addEventListener('click',function(e){
 const clicked = e.target.closest('.operations__tab');

 // Gaurd clause
 if(!clicked) return;

tabs.forEach(t=>t.classList.remove('operations__tab--active'));
 clicked.classList.add('operations__tab--active');

 // Active Content Area
 tabsContent.forEach(t=>t.classList.remove('operations__content--active'));
document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active');

});

// Menu fade animation

const hadleHover = function(e){
  if(e.target.classList.contains('nav__link')){
    const link = e.target;
    const sibling = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');
   
    sibling.forEach(el=>{
     if(el !== link) el.style.opacity = this;
    })
   logo.style.opacity = this;
   }
}

const nav = document.querySelector('.nav')
nav.addEventListener('mouseover', hadleHover.bind(0.5));
nav.addEventListener('mouseout', hadleHover.bind(1));


















// const randomInt = (min, max) =>
//   Math.floor(Math.random() * (max-min) + min);

// const randomColor = ()=>
//   `rgb(${randomInt(0,255)},
//    ${randomInt(0,255)},
//    ${randomInt(0,255)})`;
//   //  console.log(randomColor());

//    document.querySelector('.nav__link').addEventListener
//    ('click',function(e){
//    this.style.backgroundColor = randomColor();
//    console.log('Link', e.target);
//    })

//    document.querySelector('.nav__links').addEventListener
//    ('click',function(e){
//     this.style.backgroundColor = randomColor();
//     console.log('Container', e.target);

//    })

//    document.querySelector('.nav').addEventListener
//    ('click',function(e){
//     this.style.backgroundColor = randomColor();
//     console.log('Nav', e.target);
//    })


// Going downword

// const h1 = document.querySelector('h1');
// console.log(h1.querySelectorAll('.highlight'));
// console.log(h1.childNodes)
// console.log(h1.children)
//  h1.firstElementChild.style.color="white";
//  h1.lastElementChild.style.color="white";
//  console.log(h1.firstElementChild)

 // Going upword

//  console.log(h1.parentElement)
//  console.log(h1.parentNode)
//  h1.closest('.header').style.background= "var(--gradient-secondary)";
//  h1.closest('h1').style.background= "var(--gradient-secondary)";


 // Going Sideways

//  console.log(h1.previousElementSibling);
//  console.log(h1.nextElementSibling);
//  console.log([...h1.parentElement.children]);
//  [...h1.parentElement.children].forEach(function(el){
// if(el !== h1){
//   el.style.transform = 'scale(.5)'
// }
//  })

