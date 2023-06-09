export interface Character {
  id: string
  name: string
  status: string
  species: string
  type: string
  gender: string
  origin: {
    name: string
    url: string
  }
  location: {
    name: string
    url: string
  }
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg'
  episode: string[]
  url: string
  created: string
}

export interface Info {
  count: number
  next: string
  pages: number
  prev: string
}

export interface resultsAPI {
  results?: Character[]
  info?: Info
  error?: string
}
