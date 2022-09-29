
function fetchPoem(searchType, searchTerm) {
  //console.log(dropdownValue)
    fetch(`https://poetrydb.org/${searchType}/${searchTerm}`)
    .then(function(response){
      return response.json()
    })
    .then(function(data){
      //console.log(data)
      const random = Math.floor(Math.random()*data.length)
      console.log(random)
      sessionStorage.setItem('author', JSON.stringify(data[random].author))
      sessionStorage.setItem('title', JSON.stringify(data[random].title))
      sessionStorage.setItem('lines', JSON.stringify(data[random].lines))
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
  
  //const linebreak = document.createElement('br')
  function renderPoem() {
    const poemBox = document.createElement('div');

    const titleDiv = document.createElement('div')
    titleDiv.innerHTML = JSON.parse(sessionStorage.getItem('title'))
    poemBox.appendChild(titleDiv)

    const authorDiv = document.createElement('div')
    authorDiv.innerHTML = JSON.parse(sessionStorage.getItem('author'))
    poemBox.appendChild(authorDiv)

    const lines = JSON.parse(sessionStorage.getItem('lines'))
    let count = 1
    const isBlackedout = sessionStorage.getItem('isBlackedout')
    for (let i = 0; i < lines.length; i++){
      const linesDiv = document.createElement('div')
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
      linesDiv.appendChild(span)

      poemBox.appendChild(linesDiv)

      poemBox.classList.add('dotted')

      poemArea.appendChild(poemBox)

      poemBox.addEventListener('mouseover', (event) => {console.log(event.target)});

      
            
    }
    
  }
  
  let dropdownValue;
  const searchForm = document.getElementById('userInput')
  searchForm.addEventListener('submit', event => {
    event.preventDefault()
    //console.log(event)
    dropdownValue = event.target.elements[0].value
    let inputText = event.target.elements[1].value
   // console.log('dropdown' + dropdownValue)
    //console.log('inputText ' + inputText)
    poemArea.innerHTML = ''

    let searchType = 'lines'
    if (dropdownValue === 'author' || dropdownValue === 'title') searchType = dropdownValue
    for (let i = 0; i < 10; i++){
      fetchPoem(searchType, inputText);
    }
    event.target.elements[1].value = ''
  });

  const blackoutButton = document.getElementById('blackoutButton')
  blackoutButton.addEventListener('click', function() {
    toggleBlackout();
  });
  


/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
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