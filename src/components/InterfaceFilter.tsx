import React, { useState } from 'react'
import { resultsAPI, Character } from '../models/interfaces/character.interface'
import '../App.css'

interface Props {
  fetchOptions: (searchTerm: string) => Promise<resultsAPI>
  onSelect: (value: string) => void
}

const InterfaceFilter: React.FC<Props> = ({ fetchOptions, onSelect }) => {
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [filteredOptions, setFilteredOptions] = useState<Character[]>()
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | undefined>('')

  const handleInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    if (value.length > 0) {
      setSearchTerm(value)
      setIsLoading(true)
      const options = await fetchOptions(value)
      if (options?.results && options?.results?.length > 0) {
        setFilteredOptions(options.results)
      } else {
        setErrorMessage(options?.error!.length > 0 ? options.error : 'There is nothing here')
      }
    } else {
      handleSelect('')
      setSearchTerm(value)
      setFilteredOptions([])
    }
    setIsLoading(false)
  }

  const handleSelect = (value: string) => {
    setSearchTerm(value)
    setFilteredOptions([])
    onSelect(value)
  }

  const coincidenceHighlight = (nameOption: string, match: string) => {
    const copyName = nameOption
    const index = copyName.toLowerCase().indexOf(match)
    let elementRender = <>{nameOption}</>
    if (index !== -1) {
      elementRender = (
        <span>
          {nameOption.substring(0, index)}{' '}
          <span className="highlight-text">
            {nameOption.substring(index, index + match.length)}
          </span>
          {nameOption.substring(index + match.length)}
        </span>
      )
    }
    return elementRender
  }

  return (
    <div className="filter-list-container">
      <input
        className="input-search"
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="Enter a Rick & Morty name"
      />
      {isLoading ? (
        <div>Loading...</div>
      ) : filteredOptions && filteredOptions?.length > 0 ? (
        <div>
          {filteredOptions?.map((option) => (
            <div
              className="option-list-container"
              key={option.id}
              onClick={() => handleSelect(option.name)}>
              <b>{option.id} - </b>
              {coincidenceHighlight(option.name, searchTerm)}{' '}
              {option.type.length > 0 && `-${option.type}`}
            </div>
          ))}
        </div>
      ) : (
        <div>{errorMessage}</div>
      )}
    </div>
  )
}

export default InterfaceFilter
