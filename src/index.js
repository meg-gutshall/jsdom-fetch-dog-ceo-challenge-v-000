/* Load Images */

async function loadImages() {
  // Make the function asynchronous to enable to use of await
    const frame = document.getElementById('dog-image-container');
    // Find the div element by its ID and save it to a new variable called frame
    const arrayImageSrcs = await fetchImages();
    // Assign the result of the fetchImages function to the new arrayImageSrcs variable
    renderImages(arrayImageSrcs);
    // Invoke the renderImages function, passing the arrayImageSrcs variable as its argument
    
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
  // Make the function asynchronous to enable to use of await
    const resp = await fetch("https://dog.ceo/api/breeds/image/random/4");
    // Assign the Response object from the Promise returned by the fetch to the resp variable
    const data = await resp.json();
    // Extract the JSON body content stored in the resp variable and save it as an Object in the data variable
    return data.message;
    // Return the message property of the data object, which should be an array of image SRCs
  };
  
  /* Load Breeds */
  
  async function loadBreeds() {
  // Make the function asynchronous to enable to use of await
    const breedList = document.getElementById('dog-breeds');
    // Find the unordered list element by its ID and save it to a new variable called breedList
    const dropdown = document.getElementById('breed-dropdown');
    // Find the select element by its ID and save it to a new variable called dropdown
    const allBreeds = await fetchBreeds();
    // Assign the result of the fetchBreeds function to the new allBreeds variable
    
    function renderBreeds(breeds) {
    // Define the renderBreeds function with a parameter of breeds (which should be an Object of dogBreeds and dogSubBreeds)
      for (const key in breeds) {
      // Iterate through each key in breeds; for each key...
        const dogBreed = document.createElement('li');
        // Create a list element and save it to a variable called dogBreed
        dogBreed.innerText = key;
        // Then, set dogBreed's innerText property to equal the name of the key (this is the text that's rendered)
        dogBreed.addEventListener('click', textColor);
        // Add event listener to dogBreed to change text color on click
        
        if (Array.isArray(breeds[key]) && breeds[key].length) {
        // Iterate through each value in breeds; if the value is an Array and has a length...
          const breedSubList = document.createElement('ul');
          // Create an unordered list element and save it to a variable called breedSubList
          
          breeds[key].forEach(subBreed => {
          // Iterate through each value in breeds; for each value...
            const dogSubBreed = document.createElement('li');
            // Create a list element and save it to a variable called dogSubBreed
            dogSubBreed.innerText = subBreed;
            // Then, set dogSubBreed's innerText property to equal the name of the key (this is the text that's rendered)
            dogSubBreed.style.color = "#000000";
            // Set dogSubBreed's text color to black
            dogSubBreed.addEventListener('click', textColor);
            // Add event listener to dogBreed to change text color on click
            breedSubList.appendChild(dogSubBreed);
            // Take dogSubBreed and append it to breedSubList by nesting it as a child element
          })
          
          dogBreed.appendChild(breedSubList);
          // Take breedSubList and append it to dogBreed by nesting it as a child element
        }
        
        breedList.appendChild(dogBreed);
        // Take dogBreed and append it to breedList by nesting it as a child element
      }
    };
  
    function emptyBreedList() {
    // Define the emptyBreedList function
      const liCollection = document.querySelectorAll('#dog-breeds li');
      // Find all list item elements nested under an element with the dog-breeds div and save them to an Array called liCollection
      for (let i = 0; li = liCollection[i]; i++) {
      // Starting at the first list item, for each li in liCollection...
        li.parentNode.removeChild(li);
        // Find the parent node of the list item and remove the child list item, effectively removing itself
      };
    };
  
    dropdown.addEventListener('change', (event) => {
    // Define Event Target function to be called whenever the dropdown target is clicked
      let filteredBreeds = {}
      // Create an empty object and save it to a variable called filteredBreeds
      let letter = event.target.value;
      // Save the value from the dropdown selection to the letter variable
      let filtered = Object.keys(allBreeds).filter(mainBreed => mainBreed.startsWith(letter));
      // Filter through each key of the allBreeds Object and save the keys that begin with the same letter as the letter variable in an Array called filtered
      for (const key of filtered) {
      // Iterate through filtered; for each key in filtered...
        filteredBreeds[key] = allBreeds[key];
        // Copy the key into filteredBreeds and assign it the value from the allBreeds Object
      }
  
      emptyBreedList();
      // Invoke the emptyBreedList function
      renderBreeds(filteredBreeds);
      // Invoke the renderBreeds function, passing the filteredBreeds variable as its argument
    });
  
    function textColor(event) {
    // Define the textColor function passing in an event as a parameter
      event.target.style.color = "#009AE4";
      // Find the target of the event and set the color of the text
    };
  
    renderBreeds(allBreeds);
    // Invoke the renderBreeds function, passing the allBreeds variable as its argument
  };
  
  async function fetchBreeds() {
  // Make the function asynchronous to enable to use of await
    const resp = await fetch("https://dog.ceo/api/breeds/list/all");
    // Assign the Response object from the Promise returned by the fetch to the resp variable
    const data = await resp.json();
    // Extract the JSON body content stored in the resp variable and save it as an Object in the data variable
    return data.message;
    // Return the message property of the data object, which should be an Object
  };
  
  document.addEventListener('DOMContentLoaded', function() {
  // Define Event Target function to be called whenever the document target is loaded (aka whenever a page is rendered)
    loadImages();
    // Invoke the loadImages function
    loadBreeds();
    // Invoke the loadBreeds function
  });
  