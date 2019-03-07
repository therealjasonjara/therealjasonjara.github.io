"use strict"


// particlesJS.load('particles-js', 'js/particles.json');

function removeLocationHash(){
  const noHashURL = window.location.href.replace(/#.*$/, '');
  window.history.replaceState('', document.title, noHashURL) 
}
window.addEventListener("popstate", function(event){
  removeLocationHash();
});
window.addEventListener("hashchange", function(event){
  event.preventDefault();
  removeLocationHash();
});
window.addEventListener("load", function(){
  removeLocationHash();
});

// Scroll to top button
function checkScrollPosition() {
  const button = document.querySelector('.scrollTop')
  if ((window.pageYOffset) >= 100) { // Check if window is scrolled 100px from top;
    button.classList.add('scrolled')
  } else {
    button.classList.remove('scrolled')
  }
}

window.addEventListener('scroll', checkScrollPosition)

// Hamburger
const toggleButton = document.querySelector('.hamburger')
const buttonIcon = document.querySelector('.hamburger__icon')
const mobileMenu = document.querySelector('.menu__phone__container')
const disableScroll = document.getElementById('site-body')
const toggleAnywhere = document.getElementById('site-content')

let isClicked = false; // Element Boolean

function clickHandler() {
  if ( !isClicked ) {
    isClicked = true;
    mobileMenu.classList.add('show')
    buttonIcon.classList.add('animate')
    disableScroll.classList.add('menu__open')
    toggleAnywhere.classList.add('menu__close')
    
  } else {
    isClicked = false;
    mobileMenu.classList.remove('show')
    buttonIcon.classList.remove('animate')
    disableScroll.classList.remove('menu__open')
    toggleAnywhere.classList.remove('menu__close')
  }
}

toggleButton.addEventListener('click', clickHandler)

// Animate on scroll
const about = document.getElementsByClassName('about-items');
const skills = document.getElementsByClassName('skills-items');
const works = document.getElementsByClassName('works__image');
const contact = document.getElementsByClassName('contact-us')

// checks if element passed as parameter is in viewport
const isElementInViewport = (el) => { 
  const getBoundValues = el.getBoundingClientRect();
  const windowHeight = window.innerHeight;
  const windowWidth = window.innerWidth;

  return (
    getBoundValues.bottom > 0 &&
    getBoundValues.right > 0 &&
    getBoundValues.left <
    (windowWidth || document.documentElement.clientWidth) &&
    getBoundValues.top < (windowHeight || document.documentElement.clientHeight)
  );
}

window.addEventListener("scroll", () => {
  for (var item of about) { // for each about-items
    if (isElementInViewport(item) == true) { // check if item is in viewport
      item.classList.replace("hidden", "scale-up"); // if it is, remove the class that hides it and add in the css animation
    }
  }

  for (var item of skills) { // for each post 
    if (isElementInViewport(item) == true) { // check if item is in viewport
      item.classList.replace("hidden", "scale-up"); // if it is, remove the class that hides it and add in the css animation
    }
  }

  for (var item of works) { // for each post 
    if (isElementInViewport(item) == true) { // check if item is in viewport
      item.classList.replace("hidden", "scale-up"); // if it is, remove the class that hides it and add in the css animation
    }
  }

  // if(isElementInViewport(contact) == true) { // check if item is in viewport
  //   contact.classList.replace("hidden", "scale-up") // if it is, remove the class that hides it and add in the css animation
  // }

  for (var item of contact) {
    if (isElementInViewport(item) == true) {
      item.classList.replace("hidden", "scale-up");
    }
  }
});


// Preloader

const preloader = document.querySelector('.preloader__container')

const preloadScroll = () => {
  window.scrollTo(0, 0)
}

window.addEventListener('scroll', preloadScroll)

window.addEventListener('load', function(){
  preloader.style.opacity = 0
  preloader.classList.add('hide')
  window.removeEventListener('scroll', preloadScroll)
})