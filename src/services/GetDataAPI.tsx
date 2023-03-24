import { API_URL } from '../constants/env'
import { resultsAPI } from '../models/interfaces/character.interface'

export const getAllCharacters = async (name: string): Promise<resultsAPI> => {
  const url = `${API_URL}?name=${name}`
  // let characters: Character[] = []
  // let nextUrl = url

  // do {
  //   const response = await fetch(nextUrl)
  //   const data = await response.json()
  //   characters.push(...data.results)
  //   nextUrl = data.info.next
  // } while (nextUrl)

  // return characters
  const response = await fetch(url)
  const data = await response.json()

  return data
}
