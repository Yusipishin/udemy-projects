import './comicsList.scss';
import {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

const setContent = (process, Component, newItemLoading) => {
  switch (process) {
    case 'waiting': return <Spinner/>
    case 'loading': return newItemLoading ? <Component/> : <Spinner/>
    case 'confirmed': return <Component/>
    case 'error': return <ErrorMessage/>
    default: throw new Error('Unexpected process state...')
  }
}

const ComicsList = () => {
  const [comicsList, setComicsList] = useState([])
  const [newItemLoading, setNewItemLoading] = useState(false)
  const [offset, setOffset] = useState(500)
  const [comicsEnded, setComicsEnded] = useState(false)

  const {loading, error, getAllComics, clearError, process, setProcess} = useMarvelService()

  useEffect(() => {
    onRequest(offset, true)
  }, [])

  const onRequest = (offset, initial) => {
    clearError()
    setNewItemLoading(initial ? false : true)
    getAllComics(offset)
      .then(onComicsListLoaded)
      .then(() => setProcess('confirmed'))
  }

  const onComicsListLoaded = (newComics) => {
    let ended = false
    if (newComics.length < 8) {
      ended = true
    }

    setComicsList([...comicsList, ...newComics])
    setNewItemLoading(false)
    setOffset(offset + 8)
    setComicsEnded(ended)
  }

  function renderItems(comics) {
    const items = comics.map((item, i) => {
      const {thumbnail, title, price} = item
      return (
              <li className="comics__item" key = {i}>
                  <Link to={`/comics/${item.id}`}>
                      <img src={thumbnail} alt={title} className="comics__item-img"/>
                      <div className="comics__item-name">{title}</div>
                      <div className="comics__item-price">{price}</div>
                  </Link>
              </li>
            )
    })

    return (
      <ul className="comics__grid">
        {items}
      </ul>
    )
  }

  const items = renderItems(comicsList)

  const errorMessage = error ? <ErrorMessage/>: null
  const spinner = loading && !newItemLoading ? <Spinner/> : null;

  return (
    <div className="comics__list">
        {setContent(process, () => renderItems(comicsList), newItemLoading)}
        <button 
            disabled={newItemLoading} 
            style={{'display' : comicsEnded ? 'none' : 'block'}}
            className="button button__main button__long"
            onClick={() => onRequest(offset)}>
            <div className="inner">load more</div>
        </button>
    </div>
  )
}

export default ComicsList;