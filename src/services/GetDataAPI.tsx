import { API_URL } from '../constants/env'
import { resultsAPI, Character } from '../models/interfaces/character.interface'

export const getAllCharacters = async (name: string): Promise<resultsAPI> => {
  const url = `${API_URL}?name=${name}`
  let characters: Character[] = []
  let nextUrl = url
  let data = null
  let errorMsg: string = ''

  do {
    const response = await fetch(nextUrl)
    if (response.status === 200) {
      data = await response.json()
      characters.push(...data.results)
      nextUrl = data.info.next
    } else {
      nextUrl = ''
      errorMsg = 'There is nothing here'
    }
  } while (nextUrl)

  return { results: characters, error: errorMsg }
  // const response = await fetch(url)
  // let data = null
  // if (response.status === 200) {
  //   data = await response.json()
  // }

  // return data
}
