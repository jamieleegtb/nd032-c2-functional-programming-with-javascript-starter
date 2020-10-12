  let store = Immutable.Map({
      rover: '',
      roverOptions: ['curiosity', 'opportunity', 'spirit'],
      roverData: '',
      roverLink: ''
  });

  // add our markup to the page
  const root = document.getElementById('root')

  const updateStore = (store, newState) => {
      store = store.merge(newState)
      render(root, store)
  }

  const render = async (root, state) => {
      root.innerHTML = App(state)
  }


  // create content
  const App = (state) => {
      return `
          <header>RECENT MARS IMAGES</header>
          <main>
              <section>
                  ${addRoverLinks()}
                  <h1 class="rvrHeader">${state.get('rover').toUpperCase()} IMAGES</h1>
                  <div class="rvrContainer">
                  ${
                    state.get('roverData') &&
                    state
                      .get('roverData')
                      .get('data')
                      .get('photos')
                      .toArray()
                      .slice(0, 10)
                      .map((rovers) => createRoverContent(rovers))
                      .join('')
                  }
                  </div>
              </section>
          </main>
          <footer></footer>
      `
  }

  // listening for load event because page should load before any JS is called
  window.addEventListener('load', () => {
      render(root, store)
  })

  // ------------------------------------------------------  COMPONENTS

  // ------------------------------------------------- HELPERS
  // Create links
  function addRoverLinks() {
    return `
      <nav>
        <ul id="roverLinks">
          ${store
            .get('roverOptions')
            .map((rover) => roverButton(rover))
            .join('')}
        </ul>
      </nav>
    `
  }

  // Link click event
  function callLink(roverLink) {
    store = store.set('roverLink', roverLink)
    getRover(store)
  }

  // ------------------------------------------------------

  // Create Button
  function roverButton(name) {
    return `
      <li class="roverList">
        <button class="roverBtn" onclick="callRover('${String(name)}')">
          ${name.toUpperCase()}
        </button>
      </li>
    `
  }

  // Button click event
  function callRover(rover) {
    store = store.set('rover', rover)
    getRover(store.get('rover'))
    console.log('Call rover')
    render(root, store)

    const rvrHeader = document.getElementsByClassName('rvrHeader');
    rvrHeader[0].style.display = "block";
  }

  // ------------------------------------------------------

  // Create rover content
  function createRoverContent(rovers) {
    return`
      <div class="rvrItem">
        <img class="rvrImg" src="${rovers.get('img_src')}">
        <ul class="rvrInfoContainer">
          <li>Photo ID: ${rovers.get('id')}</li>
          <li>Landing Date: ${rovers.get('rover').get('landing_date')}</li>
          <li>Launch Date: ${rovers.get('rover').get('launch_date')}</li>
          <li>Status: ${rovers.get('rover').get('status')}</li>
        </ul>
      </div>
    `
  }

  // ------------------------------------------------------  API CALLS
  // NASA ROVER API CALL
  const getRover = (roverName) => {
    fetch(`http://localhost:3000/rover/${roverName}`)
      .then((res) => res.json())
      .then((roverData) => { updateStore(store, {roverData}) })

      console.log(store.roverData);
  }


  // Example API call
  /*const getImageOfTheDay = (state) => {
      let { apod } = state

      fetch(`http://localhost:3000/apod`)
          .then(res => res.json())
          .then(apod => updateStore(store, { apod }))

      return data
  }*/
