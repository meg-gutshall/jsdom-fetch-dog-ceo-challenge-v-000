async function loadImages() {
  // !! Make the function asynchronous because the arrayImageSrcs array value requires an await
  const frame = document.getElementById('dog-image-container');
  // Find the div element by its ID and save it to a new variable called frame
  const arrayImageSrcs = await fetchImages();
  // Assign the result of the fetchImages function to the new arrayImageSrcs variable
  renderImages(arrayImageSrcs);
  // Invoke the renderImages function, passing arrayImageSrcs variable as its argument
  
  function renderImages(imageLinks) {
  // Define the renderImages function with a parameter of imageLinks (which should be an array of image SRCs)
    imageLinks.forEach(imageLink => {
    // Iterate through the imageLinks array; for each imageLink...
      const dogImage = document.createElement('img');
      // Create an image element and save it to a variable called dogImage
      dogImage.src = imageLink;
      // Then, set dogImage's SRC property to equal the value of imageLink (in order words, the image SRC)
      frame.appendChild(dogImage);
      // Take dogImage and append it to frame by nesting it as a child element
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
    // Figure something out here if I want to include to the subbreeds
    let filtered = mainBreeds.filter(mainBreed => mainBreed.startsWith(letter));
    let filteredBreeds = {}
    for (const key of filtered) {
      filteredBreeds[key] = allBreeds[key];
    }
    renderBreeds(filteredBreeds);
  });

  function textColor(event) {
    event.currentTarget.style.color = "#009AE4";
  };

  renderBreeds(allBreeds);
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