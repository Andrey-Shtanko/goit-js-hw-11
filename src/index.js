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

let searchQuery;
let page = 1;

function onInput(event) {
  searchQuery = event.target.value;
}

function onSubmit(event) {
  loadMoreBtn.classList.add(`is-hidden`);
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
      if (hits.length < 40) {
        Notiflix.Notify.info(
          "We're sorry, but you've reached the end of search results."
        );
        return;
      }
      loadMoreBtn.classList.remove(`is-hidden`);
    })
    .catch(error => console.log(error));
}

loadMoreBtn.addEventListener(`click`, onLoadMore);

function onLoadMore() {
  page += 1;
  fetchByQuery(searchQuery, page)
    .then(response => {
      const {
        data: { hits },
      } = response;
      for (let i = 0; i < hits.length; i += 1) {
        gallery.insertAdjacentHTML(`beforeend`, markUpForGallery(hits[i]));
      }
      if (hits.length < 40) {
        Notiflix.Notify.info(
          "We're sorry, but you've reached the end of search results."
        );
        loadMoreBtn.classList.add(`is-hidden`);
      }
    })
    .catch(error => console.log(error));
}
