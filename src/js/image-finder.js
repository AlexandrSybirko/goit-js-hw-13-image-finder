

import getRefs from './gets-refs';


import ImagesApiService from '../js/fetchImages';
import card from '../templates/card.hbs';

import { onOpenModal } from './modal';
import { error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

const refs = getRefs()



refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);
refs.imageContainer.addEventListener('click', onOpenModal);

const imagesApiService = new ImagesApiService();

let coord = 0

async function onSearch(event) {
  event.preventDefault();

  try {
    
    const inputValue = event.currentTarget.elements.query.value;
    imagesApiService.query = inputValue;

    refs.loadMoreBtn.classList.add('is-hidden');

    imagesApiService.resetPage();
    clearImageContainer();
    const response = await imagesApiService.fetchImages();

    if (imagesApiService.query ==='') {
      Nothing()
      clearImageContainer();
    }

    else if (imagesApiService.query) {
      
      appendImagesMarkup(response);
      refs.loadMoreBtn.classList.remove('is-hidden');
    }
    if (response.length < 12) {
      refs.loadMoreBtn.classList.add('is-hidden');
    }
  } catch (error) {
    console.log('Ошибка');
  }
}

async function onLoadMore() {
  coord = refs.imageContainer.offsetHeight;
  try {
    const response = await imagesApiService.fetchImages();
    console.log(response);

    appendImagesMarkup(response);

    scroll()
    
  } catch (error) {
    console.log('Ошибка');
  }
}

function appendImagesMarkup(articles) {
  refs.imageContainer.insertAdjacentHTML('beforeend', card(articles));
}

function clearImageContainer() {
  refs.imageContainer.innerHTML = '';
}

function scroll() {
  window.scrollTo({
    top: coord,
    left: 0,
    behavior: 'smooth'
  })
}
  
function Nothing() {
  error({
    title: 'ПУСТОООООООО!',
    text: 'НЕ ЛЕНИСЬ, НАПИШИ!',
    delay: 2000,
    
  });
}


