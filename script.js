'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav')


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

const handleHover = function(e){
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


nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

// Sticky navigation

// const intialcoord = section1.getBoundingClientRect();
// console.log(intialcoord);

// window.addEventListener('scroll',function(e){
//   if(window.scrollY > intialcoord.top){
//     nav.classList.add('sticky')
//   }else{
//     nav.classList.remove('sticky');
//   }
// })


// Sticky navigation: intersection observer API
// const obsCallback =function(entries,observer){
//   entries.forEach(entry=>{
//     console.log(entry)
//   })
// };
// const obsOptions = {
//   root:null,
//   threshold:[ 0, 0.2]
// }
// const observer = new IntersectionObserver(
//   obsCallback,obsOptions
// );
// observer.observe(section1);

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;
// console.log(navHeight);

const stickyNav = function(entries){
const [entry] = entries;
// console.log(entry)
if(entry.isIntersecting){
  nav.classList.remove('sticky');
}else{
  nav.classList.add('sticky');
}

}
const headerObserver = new IntersectionObserver(
  stickyNav,{
    root:null,
    threshold:0,
    rootMargin:`-${navHeight}px`,
  }
);
headerObserver.observe(header);


// Reveal section

const allSection = document.querySelectorAll('.section');
const revealSEction = function(entries,observer){
const [entry] = entries;
//  console.log(entry)
 if(!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
 observer.unobserve(entry.target);
}

const sectionObserver = new IntersectionObserver(
revealSEction,{
  root:null,
  threshold:0.15,
});
allSection.forEach(function(section){
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
})

// lazy loading
const imageTarget = document.querySelectorAll('img[data-src]');
// console.log(imageTarget)
const loadImg = function(entries,observer){
  const [entry] =entries;
  // console.log(entry)
  if(!entry.isIntersecting) return;
  // Replace src with data-src

  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener("load",function(){
    entry.target.classList.remove('lazy-img');
  })
  observer.unobserve(entry.target);

}
const imgObserver = new IntersectionObserver(
  loadImg,{
    root:null,
    threshold:0,
    rootMargin:'200px',
  }
)

imageTarget.forEach(img=>imgObserver.observe(img));

// Slider

const slides= document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const slider = document.querySelector('.slider');
let curSlide = 0;
const maxSlide = slides.length;
// slider.style.transform = 'scale(0.3)';
// slider.style.overflow = 'visible';
const goToSlide = function(slide){
  slides.forEach(
    (s,i)=> s.style.transform = `translateX(${100 * (i - slide)}%)`);
}

goToSlide(0);

const nextSlide = function(){
  if(curSlide === maxSlide-1){
    curSlide = 0;
  }else{
    curSlide++;
  }
  goToSlide(curSlide);
}

const prevSlide = function(){
  if(curSlide === 0){
    curSlide = maxSlide-1
  }else{
    curSlide--
  }
 
  goToSlide(curSlide);
}

btnRight.addEventListener('click',nextSlide);
btnLeft.addEventListener('click',prevSlide);
// btnLeft.addEventListener('click',function(){
//   // if(curSlide === (-(maxSlide+1))){
//   //   curSlide = 0;
//   // }
//   curSlide--;
//   goToSlide(curSlide);
//   })

















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

