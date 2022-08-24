import './css/styles.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import axios from 'axios';
import Notiflix from 'notiflix';
import fetchByQuery from './fetchByQuery';
import markUpForGallery from './markUpForGallery';

const searchInput = document.querySelector(`input`);
const searchBtn = document.querySelector(`.search-btn`);
const loadMoreBtn = document.querySelector(`.load-more`);
const gallery = document.querySelector(`.gallery`);

searchInput.addEventListener(`input`, onInput);
searchBtn.addEventListener(`click`, onSubmit);
const searchInput = document.querySelector(`input`)
const searchBtn = document.querySelector(`.search-btn`)
const loadMoreBtn = document.querySelector(`.load-more`)

let searchQuery;
let page = 1;

function onInput(event) {
  searchQuery = event.target.value;
}

function onSubmit(event) {
  gallery.innerHTML = ``;
  page = 1;
  event.preventDefault();
  fetchByQuery(searchQuery, page)
    .then(response => {
      const {
        data: { hits },
      } = response;
      if (hits.length === 0) {
        Notiflix.Notify.failure(
          `Sorry, there are no images matching your search query. Please try again.`
        );
      }
      for (let i = 0; i < hits.length; i += 1) {
        gallery.insertAdjacentHTML(`beforeend`, markUpForGallery(hits[i]));
      }
      loadMoreBtn.classList.remove(`is-hidden`);
    })
    .catch(error => console.log(error));
}
