
let poemArray = []
let numbersArray = []
let isBlackedout = false;


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
  
  let poemArea = document.getElementById('poemArea')
  
  //make poems appear onscreen when user searches or hits Erase/Reveal button
  function renderPoems() {
    poemArea.innerHTML = '';
    poemArray.forEach((poemInfo) => {
      
      const poemBox = document.createElement('div');

      const titleDiv = document.createElement('div')
      titleDiv.innerHTML = poemInfo.title.bold()
      poemBox.appendChild(titleDiv)
  
      const authorDiv = document.createElement('div')
      authorDiv.innerHTML = poemInfo.author.italics()
      poemBox.appendChild(authorDiv)
  
      //in API, lines is an array with one element for each line of the poem
      const lines = poemInfo.lines
      //let count = 1
      for (let i = 0; i < lines.length; i++){
        //div to build up the poem
        const linesDiv = document.createElement('div')
        //span to build up each line
        const span = document.createElement('span')

        //split the current line into words 
        lines[i].split(' ').map((word) => {
          //create span to build up the sentence
          const innerSpan = document.createElement('span')
          //apply blackout to 50% of words when user has hit 'Erase' button
          if(Math.random() > 0.5 && isBlackedout === true ) {
            innerSpan.className = 'blacked-out'
            innerSpan.innerHTML = `${word} `
            span.appendChild(innerSpan)         
          }
          else{
            span.innerHTML += `${word} `
          }
          //count++;
        })
        linesDiv.appendChild(span) 
        poemBox.appendChild(linesDiv)      
      }
      poemBox.classList.add('dotted')    
      poemArea.appendChild(poemBox)
    })

      //apply solid border when mouse passes over poem
      Array.from(document.getElementsByClassName('dotted')).forEach((element) => {
      element.addEventListener('mouseover', (event) => {event.currentTarget.classList.add('selected')});
      element.addEventListener('mouseout', (event) => {event.currentTarget.classList.remove('selected')});
      //apply blue border when user clicks on poem
      element.addEventListener('click', (event) => {
          event.currentTarget.classList.toggle('clicked')
      })
    })
  }
    
  //select search type from dropdown value
  let dropdownValue;
  const searchForm = document.getElementById('userInput')
  searchForm.addEventListener('submit', event => {
    event.preventDefault()
    resetBlackout()
    dropdownValue = event.target.elements[0].value
    let inputText = event.target.elements[1].value
    console.log(poemArea)
    let searchType = 'lines'
    if (dropdownValue === 'author' || dropdownValue === 'title') searchType = dropdownValue
      fetchPoem(searchType, inputText);
    event.target.elements[1].value = ''
  });

  // When the user clicks on the button,
//toggle between hiding and showing the dropdown content 
function dropdownFxn() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

//reset blackout when user searches
function resetBlackout(){
    isBlackedout = false;
    blackoutButton.innerHTML = 'Erase!'
}

//toggle between blacked out and normal when user clicks Erase/Reveal button
  const blackoutButton = document.getElementById('blackoutButton')
  blackoutButton.addEventListener('click', function() {
    toggleBlackout();
  });

  function toggleBlackout(){
    isBlackedout === false ? isBlackedout = true : isBlackedout = false
    isBlackedout === false ? blackoutButton.innerHTML ='Erase!' : blackoutButton.innerHTML ='Reveal!'
    renderPoems()
  }
  
