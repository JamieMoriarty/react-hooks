// Lifting state
// http://localhost:3000/isolated/exercise/03.js

import React, { useState } from 'react'

function Name() {
  const [name, setName] = React.useState('')
  return (
    <div>
      <label htmlFor="name">Name: </label>
      <input id="name" value={name} onChange={event => setName(event.target.value)} />
    </div>
  )
}

function FavoriteAnimal({ animal, onAnimalChange}) {
  return (
    <div>
      <label htmlFor="animal">Favorite Animal: </label>
      <input
        id="animal"
        value={animal}
        onChange={onAnimalChange}
      />
    </div>
  )
}

function Display({animal}) {
  return <div>{`Your favorite animal is: ${animal}!`}</div>
}

function App() {
  const [favoriteAnimal, setFavoriteAnimal] = useState('')
  return (
    <form>
      <Name />
      <FavoriteAnimal animal={favoriteAnimal} onAnimalChange={event => setFavoriteAnimal(event.target.value)}  />
      <Display animal={favoriteAnimal} />
    </form>
  )
}

export default App
