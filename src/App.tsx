import React, { useState, useEffect } from 'react'
import './App.css'
import InterfaceFilter from './components/InterfaceFilter'
import CharacterCard from './components/CharacterCard'
import { getAllCharacters } from './services/GetDataAPI'
import { Character } from './models/interfaces/character.interface'

const App: React.FC = () => {
  const [selectedValue, setSelectedValue] = useState<string>('')
  const [characterData, setCharacterData] = useState<Character | null>()
  const [filteredOptions, setFilteredOptions] = useState<Character[] | undefined>()
  const [errorMessage, setErrorMessage] = useState<string | undefined>('')
  const [searchTerm, setSearchTerm] = useState<string>('')

  const handleSelect = (value: string) => {
    setSelectedValue(value)
  }

  const [isLoading, setIsLoading] = useState(false)

  const [typingTimer, setTypingTimer] = useState<NodeJS.Timeout | null>(null)
  const doneTypingInterval = 2000

  const doneTyping = async (textToSearch: any) => {
    if (textToSearch.length > 0) {
      const options = await getAllCharacters(textToSearch)
      if (options?.results && options?.results?.length > 0) {
        setFilteredOptions(options.results)
        handleSelect('')
      } else {
        setFilteredOptions([])
        setErrorMessage(options?.error)
      }
    } else {
      setFilteredOptions([])
    }
    setIsLoading(false)
  }

  const onTyping = (textTyped: string) => {
    if (typingTimer) {
      clearTimeout(typingTimer)
    }
    setTypingTimer(setTimeout(() => doneTyping(textTyped), doneTypingInterval))
  }

  useEffect(() => {
    return () => {
      if (typingTimer) {
        clearTimeout(typingTimer)
      }
    }
  }, [typingTimer])

  const getDataCharacter = async () => {
    const dataCharacter = filteredOptions!.filter(
      (itemCharacter) => itemCharacter.name === selectedValue,
    )
    if (dataCharacter!.length > 0) {
      setCharacterData(dataCharacter![0])
    }
  }

  useEffect(() => {
    if (selectedValue.length > 0) {
      getDataCharacter()
    }
  }, [selectedValue])

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
    if (event.target.value.length > 0) {
      setIsLoading(true)
    } else {
      setCharacterData(null)
      setFilteredOptions([])
    }
    onTyping(event.target.value)
    handleSelect('')
  }

  return (
    <div className="container">
      <h2 className="title-page">Autocomplete Rick & Morty</h2>
      <div className="">
        <input
          className="input-search"
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder="Enter a Rick & Morty name"
        />
        {isLoading ? (
          <div className="loader">
            <div className="loader__spinner"></div>
            <div className="loader__text">Loading...</div>
          </div>
        ) : (
          <div className="flex-container">
            <InterfaceFilter
              filteredOptions={filteredOptions}
              onSelect={handleSelect}
              searchTerm={searchTerm}
              errorMessage={errorMessage}
            />
            {characterData && Object.keys(characterData).length > 0 && (
              <CharacterCard dataCharacter={characterData} />
            )}
          </div>
        )}
      </div>
    </div>
  )
}
export default App
