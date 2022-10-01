let poemArray = []
function fetchPoem(searchType, searchTerm) {
    poemArray = []
    fetch(`https://poetrydb.org/${searchType}/${searchTerm}`)
    .then(function(response){
      return response.json()
    })
    .then(function(data){
      for (let i = 0; i < 10; i++){
        const random = Math.floor(Math.random()*data.length)
        const {author, title, lines} = data[random]
        poemArray.push({
            author, title, lines
          })
      }
        renderPoems()
    })
}




  let isBlackedout = false;

  function toggleBlackout(){

    isBlackedout === false ? isBlackedout = true : isBlackedout = false
    isBlackedout === false ? blackoutButton.innerHTML ='Erase!' : blackoutButton.innerHTML ='Reveal!'
    renderPoems()
  }
  
  let poemArea = document.getElementById('poemArea')
  function renderPoems() {
    poemArea.innerHTML = '';
    poemArray.forEach((poemInfo) => {
      
      const poemBox = document.createElement('div');

      const titleDiv = document.createElement('div')
      titleDiv.innerHTML = poemInfo.title
      poemBox.appendChild(titleDiv)
  
      const authorDiv = document.createElement('div')
      authorDiv.innerHTML = poemInfo.author
      poemBox.appendChild(authorDiv)
  
      const lines = poemInfo.lines
      let count = 1
      for (let i = 0; i < lines.length; i++){
        const linesDiv = document.createElement('div')
        const span = document.createElement('span')
        lines[i].split(' ').map((word) => {
          const innerSpan = document.createElement('span')
          if(Math.random() > 0.5 && isBlackedout === true ) {
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
      }
     

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
    console.log(poemArea)
    let searchType = 'lines'
    if (dropdownValue === 'author' || dropdownValue === 'title') searchType = dropdownValue
      fetchPoem(searchType, inputText);
    event.target.elements[1].value = ''
  });

function resetBlackout(){
    isBlackedout = false;
    blackoutButton.innerHTML = 'Erase!'

}

  const blackoutButton = document.getElementById('blackoutButton')
  blackoutButton.addEventListener('click', function() {
    toggleBlackout();
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