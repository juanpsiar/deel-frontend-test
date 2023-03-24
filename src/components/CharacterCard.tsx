import React from 'react'
import { Character } from '../models/interfaces/character.interface'
import '../App.css'

interface Props {
  dataCharacter: Character
}

const CharacterCard: React.FC<Props> = ({ dataCharacter }) => {
  return (
    <div className="character-container">
      <div className="character-name">{dataCharacter.name}</div>
      <img src={dataCharacter.image} />
      <div className="character-info">
        <b>ID: </b>
        {dataCharacter.id}
      </div>
      <div className="character-info">
        <b>Type: </b>
        {dataCharacter.type.length > 0 ? dataCharacter.type : 'Not specified'}
      </div>
      <div className="character-info">
        <b>Gender: </b>
        {dataCharacter.gender}
      </div>
      <div className="character-info">
        <b>Species: </b>
        {dataCharacter.species}
      </div>
      <div className="character-info">
        <b>Status: </b>
        {dataCharacter.status}
      </div>
      <div className="character-info">
        <b>URL: </b>
        <a rel="noreferrer" target="_blank" href={dataCharacter.url}>
          {' '}
          {dataCharacter.name}
        </a>
      </div>
    </div>
  )
}

export default CharacterCard
