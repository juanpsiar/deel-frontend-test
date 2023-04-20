import React from 'react'
import '../styles/CharacterInfoAll.css'

interface Props {
  allInfoCharacter: any
}

const CharacterInfoAll: React.FC<Props> = ({ allInfoCharacter }) => {
  const colorStatus: { [key: string]: string } = {
    alive: 'green',
    dead: 'red',
    unknown: 'gray',
  }

  return (
    <div className="character-all-container">
      <div className="character-all-image-status">
        <img
          className="character-all-image"
          src={allInfoCharacter.image}
          alt={allInfoCharacter.name}
        />
        <span
          className={`character-status-${colorStatus[`${allInfoCharacter.status.toLowerCase()}`]}`}>
          {allInfoCharacter.status}
        </span>
      </div>

      <div className="character-all-info-container">
        <h3 className="character-all-name">{allInfoCharacter.name}</h3>
        <div className="character-all-info">
          <b>Type: </b>
          {allInfoCharacter.type.length > 0 ? allInfoCharacter.type : 'Unknown'}
        </div>
        <div className="character-all-info">
          <b>Gender: </b>
          {allInfoCharacter.gender}
        </div>
        <div className="character-all-info">
          <b>Species: </b>
          {allInfoCharacter.species}
        </div>

        <div className="character-all-info">
          <b>URL: </b>
          <a rel="noreferrer" target="_blank" href={allInfoCharacter.url}>
            {' '}
            {allInfoCharacter.name}
          </a>
        </div>
      </div>
    </div>
  )
}

export default CharacterInfoAll
