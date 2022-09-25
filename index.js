
function fetchPoem(searchTerm) {
    fetch(`https://poetrydb.org/lines/${searchTerm}`)
    .then(function(response){
      return response.json()
    })
  .then(function(data){
    sessionStorage.setItem('data', JSON.stringify(data[0].lines))
    renderPoem()
  })
  }

  function toggleBlackout(){
    const blackoutButton = document.getElementById('blackoutButton')
    const isBlackedout = sessionStorage.getItem('isBlackedout')
    sessionStorage.setItem('isBlackedout', isBlackedout === 'active' ? 'inactive' : 'active')
    blackoutButton.innerHTML = isBlackedout === 'active' ? 'Erase!' : 'Reveal!'
    renderPoem()
  }
  

  function renderPoem() {
    const poemBox = document.getElementById('poemBox');
    //clear the page with each search?
    poemBox.innerHTML = ''
    const lines = JSON.parse(sessionStorage.getItem('data'))
    let count = 1
    const isBlackedout = sessionStorage.getItem('isBlackedout')
   // console.log(isBlackedout)
    for (let i = 0; i < lines.length; i++){
      const div = document.createElement('div')
      const span = document.createElement('span')
      lines[i].split(' ').map((word) => {
        const innerSpan = document.createElement('span')
        if(count%2 === 0 && isBlackedout === 'active') {
          innerSpan.className = 'blacked-out'
          innerSpan.innerHTML = `${word} `
          span.appendChild(innerSpan)
        }
        else{
          span.innerHTML += `${word} `
        }
        count++;
      })
      div.appendChild(span)
      
      poemBox.appendChild(div)
      
    }
  }
  
  const searchForm = document.getElementById('userInput')
  searchForm.addEventListener('submit', event => {
    event.preventDefault()
    //console.log(event)
    const inputText = event.target.elements[0].value
    console.log(inputText)
    //console.log(event.target)
    //console.log(event.target.elements[0].value)
    fetchPoem(inputText);
    event.target.elements[0].value = ''
  });

  const blackoutButton = document.getElementById('blackoutButton')
  blackoutButton.addEventListener('click', function() {
    toggleBlackout();
  });
  
//need to catch error that results when you search for a word that's not in archive