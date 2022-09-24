const searchTerm = 'apple'

function fetchPoem() {
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
    const main = document.querySelector('main');
    const lines = data[0].lines
    for (let i = 0; i < lines.length; i++){
      const p = document.createElement('p')
      p.innerHTML = lines[i]
      console.log(main)
      main.appendChild(p)
    }
    //const poem = document.createElement('p');
    //main.appendChild(poem);
  }
  
  document.addEventListener('DOMContentLoaded', function() {
    fetchPoem();
  });
  
  /*
  from prior lab
  function renderBooks(books) {
  const main = document.querySelector('main');
  books.forEach(book => {
    const h2 = document.createElement('h2');
    h2.innerHTML = book.name;
    main.appendChild(h2);
  });
}
*/