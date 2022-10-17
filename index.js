
let poemArray = []
let IDArray = []
let isBlackedout = false;
let poemArea = document.getElementById('poemArea')
poemArea.innerHTML = ''

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

function fetchPoem(searchType, searchTerm) {
    poemArray = []
    IDArray = []
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
        if (IDArray.includes(random) === false){
        poemArray.push({
            author, title, lines
          })
        IDArray.push(random)
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
        const lineDiv = document.createElement('div')
       if (isBlackedout) blackoutHelper (line, lineDiv)
       else lineDiv.innerHTML = line
        poemBox.appendChild(lineDiv)      
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

function blackoutHelper(line, lineDiv){  
  const lineSpan = document.createElement('span')
 
    line.split(' ').forEach((word) => {
      const wordSpan = document.createElement('span')
      if(Math.random() > 0.5) {
        wordSpan.className = 'blacked-out'
        wordSpan.innerHTML = `${word} `
        lineSpan.appendChild(wordSpan)         
      }
      else{
        lineSpan.innerHTML += `${word} `
      }
    })
    lineDiv.appendChild(lineSpan)
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
  
