const store = Immutable.Map({
    rover:'',
    roverOptions: ['curiosity', 'opportunity', 'spirit'],
    roverData: '',
    roverLink:''
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
    let { rovers, apod } = state

    return `
        <header></header>
        <main>
            <section>
                <h3>Put things on the page!</h3>
                <p>Here is an example section.</p>
                <p>
                    One of the most popular websites at NASA is the Astronomy Picture of the Day. In fact, this website is one of
                    the most popular websites across all federal agencies. It has the popular appeal of a Justin Bieber video.
                    This endpoint structures the APOD imagery and associated metadata so that it can be repurposed for other
                    applications. In addition, if the concept_tags parameter is set to True, then keywords derived from the image
                    explanation are returned. These keywords could be used as auto-generated hashtags for twitter or instagram feeds;
                    but generally help with discoverability of relevant imagery.
                </p>
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
      <ul>
        ${store
          .get('roverOptions')
          .map((rover) => roverButon(rover))
          .join('')}
      </ul>
    </nav>
  `
}

// Link click event
function callLink(link) {
  store = store.set('link', link)
  getRover(store.get('rover'))
}

// ------------------------------------------------------

// Create Button
function roverButton(name) {
  return `
    <li>
      <button onclick="callRover('${String(name)}')">
        ${name.toUpperCase()}
      </button>
    </li>
  `
}

// Button click event
function callRover(rover) {
  store = store.set('rover', rover);
  getRover(store.get('rover'))
  render(root, store)
}

// ------------------------------------------------------


// ------------------------------------------------------  API CALLS
// NASA ROVER API CALL
const getRover = (rover) => {
  fetch(`http://localhost:3000/rover/${rover}`)
    .then((res) => res.json())
    .then((roverData) => {
      console.log(roverData)
      updateStore(store, {roverData})
    })
}


// Example API call
/*const getImageOfTheDay = (state) => {
    let { apod } = state

    fetch(`http://localhost:3000/apod`)
        .then(res => res.json())
        .then(apod => updateStore(store, { apod }))

    return data
}*/
