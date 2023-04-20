import React from 'react'
import { Character } from '../models/interfaces/character.interface'
import CharacterCard from './CharacterCard'
import '../App.css'

interface Props {
  onSelect: (value: string) => void
  filteredOptions: Character[] | undefined
  errorMessage: string | undefined
  searchTerm: string
}

const InterfaceFilter: React.FC<Props> = ({
  onSelect,
  filteredOptions,
  errorMessage,
  searchTerm,
}) => {
  // const [filteredOptions, setFilteredOptions] = useState<Character[]>()

  const handleSelect = (value: string) => {
    onSelect(value)
  }

  const coincidenceHighlight = (nameOption: string, match: string) => {
    const copyName = nameOption
    const index = copyName.toLowerCase().indexOf(match.toLowerCase().trim())
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
      {filteredOptions &&
        filteredOptions?.length > 0 &&
        // {
        filteredOptions?.map((option) => (
          // <li
          //   className="option-list-container"
          //   key={option.id}
          //   onClick={() => handleSelect(option.name)}>
          //   <b>{option.id} - </b>
          //   {coincidenceHighlight(option.name, searchTerm)}{' '}
          //   {option.type.length > 0 && `-${option.type}`}

          // </li>
          <CharacterCard dataCharacter={option} />
        ))}

      {/* // ) : (
      //   <div>{errorMessage}</div>
      // )} */}
    </div>
  )
}

export default InterfaceFilter
