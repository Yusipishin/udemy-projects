import { useHttp } from "../hooks/http.hook"

const useMarvelService = () => {
  const {request, clearError, process, setProcess} = useHttp()

  const _apiBase = 'https://gateway.marvel.com:443/v1/public/'
  const _apiKey = 'apikey=05afab07ece62d34c6750585c2e2d3fe'
  const _baseOffset = 210

  const getAllCharacters = async (offset = _baseOffset) => {
    const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`)
    return res.data.results.map(_transformCharacter)
  }

  const getCharacter = async (id) => {
    const res = await request(`${_apiBase}characters/${id}?${_apiKey}`)
    return _transformCharacter(res.data.results[0])
  }

  const _transformCharacter = (char) => {
    return {
      id: char.id,
      name: char.name,
      description: char.description ? char.description.slice(0, 210) + '...' : 'Описание отсутствует',
      thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
      homepage: char.urls[0].url,
      wiki: char.urls[1].url,
      comics: char.comics.items
    }
  }

  const getAllComics = async (offset = 0) => {
    const res = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`)
    return res.data.results.map(_transformComics)
  }

  const getComic = async (id) => {
    const res = await request(`${_apiBase}comics/${id}?${_apiKey}`)
    return _transformComics(res.data.results[0])
  }

  const _transformComics = (comics) => {
    return {
      id: comics.id,
      title: comics.title,
      language: comics.textObjects[0]?.language || "en-us",
      description: comics.description || 'There is not description',
      thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
      pageCount: comics.pageCount ? `${comics.pageCount} pages` : 'No info about Pages',
      price: comics.prices[0].price ? `${comics.prices[0].price} $` : 'No info about Price',
    }
  }

  return {
          process,
          getComic,
          setProcess,
          clearError,
          getCharacter,
          getAllComics,
          getAllCharacters,
        }
}

export default useMarvelService