import React, { useState, useEffect } from 'react'
import './App.css'
import CharacterCard from './components/CharacterCard'
import CharacterInfoAll from './components/CharacterInfoAll'
import Pagination from './components/Pagination'
import Modal from './components/Modal'

import { getAllCharacters } from './services/GetDataAPI'
import { Character, Info } from './models/interfaces/character.interface'

const App: React.FC = () => {
  const [selectedValue, setSelectedValue] = useState<string>('')
  const [characterData, setCharacterData] = useState<Character | null>()
  const [filteredOptions, setFilteredOptions] = useState<Character[] | undefined>()
  const [errorMessage, setErrorMessage] = useState<string | undefined>('')
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [showModal, setShowModal] = useState(false)
  const [queryInfo, setQueryInfo] = useState<Info | undefined>(undefined)
  const [pagesResults, setPagesResults] = useState(0)
  const [pageSelected, setPageSelected] = useState(1)

  const handleSelect = (value: string) => {
    setShowModal(true)
    setSelectedValue(value)
  }

  const [isLoading, setIsLoading] = useState(false)

  const [typingTimer, setTypingTimer] = useState<NodeJS.Timeout | null>(null)
  const doneTypingInterval = 2000

  const doneTyping = async (textToSearch: any) => {
    if (textToSearch.length > 0) {
      const options = await getAllCharacters(textToSearch, pageSelected)
      if (options?.results && options?.results?.length > 0) {
        setFilteredOptions(options.results)
        setQueryInfo(options.info)
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

  console.log({ filteredOptions })

  useEffect(() => {
    console.log({ pageSelected })
    doneTyping(searchTerm)
  }, [pageSelected])

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
    if (event.target.value.length > 0) {
      setIsLoading(true)
    } else {
      setCharacterData(null)
      setFilteredOptions([])
    }
    onTyping(event.target.value)
  }

  return (
    <div className="container">
      <h2 className="title-page">Rick & Morty Characters</h2>
      <div className="vertical-container">
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
          <div className="filter-list-container">
            {filteredOptions && filteredOptions?.length > 0 ? (
              <>
                {filteredOptions?.map((option) => (
                  <CharacterCard onSelect={handleSelect} dataCharacter={option} />
                ))}
                {queryInfo && Object.keys(queryInfo).length > 0 && (
                  <Pagination
                    allDataCounter={queryInfo}
                    pageIndex={pageSelected}
                    setPageIndex={setPageSelected}
                  />
                )}
              </>
            ) : (
              <div>{errorMessage}</div>
            )}
            {characterData && Object.keys(characterData).length > 0 && (
              <Modal showModal={showModal} setShowModal={setShowModal}>
                <CharacterInfoAll allInfoCharacter={characterData} />
              </Modal>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
export default App
