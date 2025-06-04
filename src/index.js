
import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

// Hide error and loader initially
error.style.display = 'none';
loader.style.display = 'none';

function showLoader() {
  loader.style.display = 'block';
  breedSelect.style.display = 'none';
  catInfo.style.display = 'none';
  error.style.display = 'none';
}

function hideLoader() {
  loader.style.display = 'none';
  breedSelect.style.display = 'block';
}

// Load breeds when page loads
showLoader();
fetchBreeds()
  .then(breeds => {
    breedSelect.innerHTML = breeds.map(breed => 
      `<option value="${breed.id}">${breed.name}</option>`
    ).join('');
    hideLoader();
  })
  .catch(() => {
    error.style.display = 'block';
    hideLoader();
  });

breedSelect.addEventListener('change', (event) => {
  showLoader();
  const breedId = event.target.value;
  
  fetchCatByBreed(breedId)
    .then(([data]) => {
      const { url, breeds } = data;
      const breed = breeds[0];
      
      catInfo.innerHTML = `
        <div style="display: flex; gap: 20px;">
          <img src="${url}" alt="${breed.name}" width="400" height="auto">
          <div>
            <h2>${breed.name}</h2>
            <p><strong>Description:</strong> ${breed.description}</p>
            <p><strong>Temperament:</strong> ${breed.temperament}</p>
          </div>
        </div>
      `;
      catInfo.style.display = 'block';
    })
    .catch(() => {
      error.style.display = 'block';
    })
    .finally(() => {
      hideLoader();
    });
});