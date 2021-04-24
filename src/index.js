import './styles/styles.css';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css'
import photoCard from './templates/photo-card.hbs';
import Api from './api-server';
const  basicLightbox  =  require ( 'basiclightbox' )
const { error } = require('@pnotify/core');
var debounce = require('lodash.debounce');

const formButton = document.querySelector('.form-btn')
const primeryButton = document.querySelector('.primery-btn')
const inputForm = document.querySelector('.input-form')
const searchForm = document.querySelector('.search-form')
const gallery = document.querySelector('.gallery')

const api = new Api()
searchForm.addEventListener('submit', createMarkup)
primeryButton.addEventListener('click', onLoadMore)

function createMarkup(e) {
    
    e.preventDefault()
    gallery.innerHTML = ''
    api.query = e.currentTarget.elements.query.value;
    
    
    if (api.query.length === 0) {
        if (primeryButton.classList.contains('is-open')) {
            primeryButton.classList.replace('is-open', 'is-hidden')
        }
        error({
            text: "Enter something, please!",
            delay: 2000
        })
    }
    if (api.query.length > 0) {
        api.fetchPhoto()
            .then(r => photoCard(r))
            .then(rez => gallery.insertAdjacentHTML('beforeend', rez))
        primeryButton.classList.replace('is-hidden', 'is-open')
    }
    clearInput()
}
    
    

function onLoadMore(e) {
    e.preventDefault()
    if (api.query.length > 0) {
        api.fetchPhoto()
            .then(r => photoCard(r))
            .then(rez => gallery.insertAdjacentHTML('beforeend', rez))
    }
}
function scrollTooPage() {
    window.scrollTo({
        top: 200,
        left: 0,
        behavior: 'smooth',
    });
}
function clearInput() {
  inputForm.value = '';
}
