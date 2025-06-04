import axios from 'axios';

axios.defaults.headers.common['x-api-key'] = 'live_ThzvRwFKiamGBY85K7V5771o2ouBwhduhGHkqWXSmzPuhwgeLmHTmz7QqWopxKQj';
axios.defaults.baseURL = 'https://api.thecatapi.com/v1';



export function fetchBreeds() {
  return axios.get('/breeds')
    .then(response => response.data)
    .catch(error => {

      throw error;
    });
}

export function fetchCatByBreed(breedId) {
  return axios.get(`/images/search?breed_id=${breedId}&has_breeds=1`)
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
}