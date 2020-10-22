// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import React from 'react'

export const useLocalStorageState = (key, initialValue) => {
  const [value, setValue] = React.useState(
    () => JSON.parse(window.localStorage.getItem(key)) || initialValue
  )

  React.useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value))
  }, [value, key])

  return [value, setValue]  
}

function Greeting({initialName = ''}) {
  const [name, setName] = useLocalStorageState('name', initialName)

  function handleChange(event) {
    setName(event.target.value)
  }
  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting />
}

export default App
