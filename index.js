
let poemArray = []
let numbersArray = []
let isBlackedout = false;
let poemArea = document.getElementById('poemArea')
poemArea.innerHTML = ''



function fetchPoem(searchType, searchTerm) {
    poemArray = []
    numbersArray = []
    fetch(`https://poetrydb.org/${searchType}/${searchTerm}`)
    .then(function(response){
      return response.json()
    })
    .then(function(data){
      if (typeof data[0] === 'undefined') poemArea.innerHTML = 'Sorry, no results'
      else{
      for (let i = 0; i < 10; i++){
        const random = Math.floor(Math.random()*data.length)
        const {author, title, lines} = data[random]
        if (numbersArray.includes(random) === false){
        poemArray.push({
            author, title, lines
          })
        numbersArray.push(random)
        }
      }
        renderPoems()
      }
      })
}
  
  function renderPoems() {
    poemArea.innerHTML = '';
    poemArray.forEach((poemInfo) => {
      
      const poemBox = document.createElement('div');
      poemBox.classList.add('dotted')    

      const titleDiv = document.createElement('div')
      titleDiv.innerHTML = poemInfo.title.bold()
      poemBox.appendChild(titleDiv)
  
      const authorDiv = document.createElement('div')
      authorDiv.innerHTML = poemInfo.author.italics()
      poemBox.appendChild(authorDiv)
  
      poemInfo.lines.forEach((line) => {
        const linesDiv = document.createElement('div')
        const span = document.createElement('span')

        
        line.split(' ').map((word) => {
          const innerSpan = document.createElement('span')
          if(Math.random() > 0.5 && isBlackedout === true ) {
            innerSpan.className = 'blacked-out'
            innerSpan.innerHTML = `${word} `
            span.appendChild(innerSpan)         
          }
          else{
            span.innerHTML += `${word} `
          }
        })
        linesDiv.appendChild(span) 
        poemBox.appendChild(linesDiv)      
      })

      poemArea.appendChild(poemBox)
    })

      Array.from(document.getElementsByClassName('dotted')).forEach((element) => {
      element.addEventListener('mouseover', (event) => {event.currentTarget.classList.add('selected')});
      element.addEventListener('mouseout', (event) => {event.currentTarget.classList.remove('selected')});
      element.addEventListener('click', (event) => {
          event.currentTarget.classList.toggle('clicked')
      })
    })
  }
    
  let dropdownValue;
  const searchForm = document.getElementById('userInput')
   searchForm.addEventListener('submit', event => {
    event.preventDefault()
    resetBlackout()
    dropdownValue = event.target.elements[0].value
    let inputText = event.target.elements[1].value
    let searchType = 'lines'
    if (dropdownValue === 'author' || dropdownValue === 'title') searchType = dropdownValue
      fetchPoem(searchType, inputText);
    event.target.elements[1].value = ''
  });

 
function dropdownFxn() {
  document.getElementById("myDropdown").classList.toggle("show");
}

window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    let dropdowns = document.getElementsByClassName("dropdown-content");
    let i;
    for (i = 0; i < dropdowns.length; i++) {
      let openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

function resetBlackout(){
    isBlackedout = false;
    blackoutButton.innerHTML = 'Erase!'
}

  const blackoutButton = document.getElementById('blackoutButton')
  blackoutButton.addEventListener('click', function() {
    if (poemArea.innerHTML !== '' && poemArea.innerHTML !== 'No poems to erase, try a different search')
    toggleBlackout();
    else poemArea.innerHTML = 'No poems to erase, try a different search'
  });

  function toggleBlackout(){
    isBlackedout === false ? isBlackedout = true : isBlackedout = false
    isBlackedout === false ? blackoutButton.innerHTML ='Erase!' : blackoutButton.innerHTML ='Reveal!'
    renderPoems()
  }
  
