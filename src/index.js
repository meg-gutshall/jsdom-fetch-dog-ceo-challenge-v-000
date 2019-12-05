async function loadImages() {
  // Make the function asynchronous because the imageLinks array value requires an await
  const frame = document.getElementById('dog-image-container');
  // 
  const imageLinks = await fetchImages();
  renderImages(imageLinks);
  // Pass the result of the fetch into the renderImages function
  
  function renderImages(imageLinks) {
    imageLinks.forEach(imageLink => {
    // Iterate through the imageLinks array
      const dogImage = document.createElement('img');
      // Create an image element for each link
      dogImage.src = imageLink;
      // Set the element's SRC property to the link URL
      frame.appendChild(dogImage);
    })
  };
};

async function fetchImages() {
  const resp = await fetch("https://dog.ceo/api/breeds/image/random/4");
  const data = await resp.json();
  return data.message;
};

async function loadBreeds() {
  const breedList = document.getElementById('dog-breeds');
  const dropdown = document.getElementById('breed-dropdown');
  const allBreeds = await fetchBreeds();
  renderBreeds(allBreeds);

  function emptyBreedList() {
    const liCollection = document.querySelectorAll('#dog-breeds li');
    for (let i = 0; li = liCollection[i]; i++) {
      li.parentNode.removeChild(li);
    };
  };

  dropdown.addEventListener('change', (event) => {
    emptyBreedList();
    let letter = event.target.value;
    const mainBreeds = Object.keys(allBreeds);
    let filtered = mainBreeds.filter(mainBreed => mainBreed.startsWith(letter));
    let filteredBreeds = {}
    for (const element of filtered) {
      filteredBreeds[element] = [];
    }
    renderBreeds(filteredBreeds);
  });

  function renderBreeds(breeds) {
    for (const key in breeds) {
      const dogBreed = document.createElement('li');
      dogBreed.innerText = key;
      dogBreed.addEventListener('click', textColor);
      
      if (Array.isArray(breeds[key]) && breeds[key].length) {
        const breedSubList = document.createElement('ul');
        
        breeds[key].forEach(subBreed => {
          const dogSubBreed = document.createElement('li');
          dogSubBreed.innerText = subBreed;
          dogSubBreed.style.color = "#000000";
          dogSubBreed.addEventListener('click', textColor);
          breedSubList.appendChild(dogSubBreed);
        })
        
        dogBreed.appendChild(breedSubList);
      }
  
      breedList.appendChild(dogBreed);
    }
  };

  function textColor(event) {
    event.currentTarget.style.color = "#009AE4";
  };

};

async function fetchBreeds() {
  const resp = await fetch("https://dog.ceo/api/breeds/list/all");
  const data = await resp.json();
  return data.message;
};

document.addEventListener('DOMContentLoaded', function() {
  loadImages();
  loadBreeds();
});

// ** DO WHAT WORKS NOW - REFACTOR LATER!!