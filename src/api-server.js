

const BASE_URL = 'https://pixabay.com/api/?image_type=photo&orientation=horizontal';
const API_KEY = '21254029-2b209fd62c1580633fde42429';
 
export default class NewsAPIServis {
    constructor() {
        this.searchQuery = '',
        this.page = 1
    }
    fetchPhoto() {
        return fetch(`${BASE_URL}&lang=ru&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${API_KEY}`)
            .then((response) => {
                return response.json()
            })
            .then(({ hits }) => {
                this.page += 1;
                return hits
            })     
    }
    get query() {
       return this.searchQuery 
    }
    set query (newQuery) {
        this.searchQuery = newQuery
    }
}