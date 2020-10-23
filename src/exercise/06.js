// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import React from 'react'
import { ErrorBoundary } from 'react-error-boundary'
// 🐨 you'll want the following additional things from '../pokemon':
// fetchPokemon: the function we call to get the pokemon info
// PokemonInfoFallback: the thing we show while we're loading the pokemon info
// PokemonDataView: the stuff we use to display the pokemon info
import { PokemonForm, fetchPokemon, PokemonInfoFallback, PokemonDataView } from '../pokemon'

function PokemonInfo({pokemonName}) {
  const [ state, setState ] = React.useState({
    status: pokemonName ? 'pending' : 'idle',
    pokemon: null,
    error: null
  })

  const { pokemon, error, status } = state

  React.useEffect(() => {
    if (!pokemonName) {
      return
    }

    setState({ status: 'pending'})
    fetchPokemon(pokemonName).then(
      pokemon => {
        setState({
          status: 'resolved',
          pokemon
        })
      },
      error => {
        setState({
          status: 'rejected',
          error
        })
      }
    )
  }, [pokemonName])

  if (status === 'rejected') {
    throw Error(error.message)
  }

  return (
    status === 'idle' ? 'Submit a pokemon' : 
    status === 'pending'? <PokemonInfoFallback name={pokemonName}/> :
    status === 'resolved'? <PokemonDataView pokemon={pokemon}/> :
    null
  )
}

const FallbackErrorComponent = ({ error, resetErrorBoundary }) => {
  return (
    <div role="alert">
      There was an error: <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
      <button style={{backgroundColor: 'red', color: 'white'}} onClick={() => resetErrorBoundary()}>Try again</button>
    </div>
  )
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <ErrorBoundary FallbackComponent={FallbackErrorComponent} onReset={() => setPokemonName('')} resetKeys={[pokemonName]}>
          <PokemonInfo pokemonName={pokemonName} />
        </ErrorBoundary>
      </div>
    </div>
  )
}

export default App
