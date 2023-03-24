import React, { useState, useEffect } from 'react'
import './App.css'
import InterfaceFilter from './components/InterfaceFilter'
import CharacterCard from './components/CharacterCard'
import { getAllCharacters } from './services/GetDataAPI'
import { Character, resultsAPI } from './models/interfaces/character.interface'

const App: React.FC = () => {
  const [selectedValue, setSelectedValue] = useState<string>('')
  const [characterData, setCharacterData] = useState<Character | null>()

  const handleSelect = (value: string) => {
    setSelectedValue(value)
  }

  const getDataCharacter = async () => {
    const dataCharacter = await getAllCharacters(selectedValue)
    if (dataCharacter!.results!.length > 0) {
      setCharacterData(dataCharacter!.results![0])
    }
  }

  useEffect(() => {
    if (selectedValue.length > 0) {
      getDataCharacter()
    } else {
      setCharacterData(null)
    }
  }, [selectedValue])

  return (
    <div className="container">
      <h2 className="title-page">Autocomplete Rick & Morty</h2>
      <div className="flex-container">
        <InterfaceFilter fetchOptions={getAllCharacters} onSelect={handleSelect} />

        {characterData && Object.keys(characterData).length > 0 && (
          <CharacterCard dataCharacter={characterData} />
        )}
      </div>
    </div>
  )
}
export default App
