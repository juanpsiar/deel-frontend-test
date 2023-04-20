import React from 'react'
import { Character } from '../models/interfaces/character.interface'
import '../styles/CharacterCard.css'

interface Props {
  dataCharacter: Character
  onSelect: (value: string) => void
}

const CharacterCard: React.FC<Props> = ({ dataCharacter, onSelect }) => {
  const colorStatus: { [key: string]: string } = {
    alive: 'green',
    dead: 'red',
    unknown: 'gray',
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
    <div className="character-container" onClick={() => onSelect(dataCharacter.name)}>
      <div className="character-image-status">
        <img className="character-image" src={dataCharacter.image} alt={dataCharacter.name} />
        <span
          className={`character-status-${colorStatus[`${dataCharacter.status.toLowerCase()}`]}`}>
          {dataCharacter.status}
        </span>
      </div>

      <div className="character-info-container">
        <h3 className="character-name">{dataCharacter.name}</h3>
        {/* <div className="character-info">
          <b>Type: </b>
          {dataCharacter.type.length > 0 ? dataCharacter.type : 'Unknown'}
        </div> */}
        <div className="character-info">
          <b>Gender: </b>
          {dataCharacter.gender}
        </div>
        <div className="character-info">
          <b>Species: </b>
          {dataCharacter.species}
        </div>

        {/* <div className="character-info">
          <b>URL: </b>
          <a rel="noreferrer" target="_blank" href={dataCharacter.url}>
            {' '}
            {dataCharacter.name}
          </a>
        </div> */}
      </div>
    </div>
  )
}

export default CharacterCard
