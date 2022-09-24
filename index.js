
function fetchPoem(searchTerm) {
    fetch(`https://poetrydb.org/lines/${searchTerm}`)
    .then(function(response){
      return response.json()
    })
  .then(function(data){
    //console.log(data)
    renderPoem(data)
  })
  }
  
  function renderPoem(data) {
    const poemBox = document.getElementById('poemBox');
    //clear the page with each search?
    poemBox.innerHTML = ''
    const lines = data[0].lines
    for (let i = 0; i < lines.length; i++){
      const p = document.createElement('p')
      p.innerHTML = lines[i]
      
      poemBox.appendChild(p)
    }
    //const poem = document.createElement('p');
    //main.appendChild(poem);
  }
  
  const searchButton = document.getElementById('searchButton')
  searchButton.addEventListener('click', function() {
    const inputText = document.getElementById('inputField').value
    console.log(inputText)
    fetchPoem(inputText);
  });
  
