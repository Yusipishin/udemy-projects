import './charList.scss';
import useMarvelService from '../../services/MarvelService';
import { useState, useEffect, useRef, useMemo } from 'react';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import PropTypes from 'prop-types';
import React from 'react';

const setContent = (process, Component, newItemLoading) => {
  switch (process) {
    case 'waiting': return <Spinner/>
    case 'loading': return newItemLoading ? <Component/> : <Spinner/>
    case 'confirmed': return <Component/>
    case 'error': return <ErrorMessage/>
    default: throw new Error('Unexpected process state...')
  }
}

const CharList = (props) => {
  const [chars, setChars] = useState([])
  const [newItemLoading, setNewItemLoading] = useState(false)
  const [offset, setOffset] = useState(1548)
  const [charEnded, setCharEnded] = useState(false)

  const {getAllCharacters, process, setProcess} = useMarvelService()

  useEffect(() => {
    onRequest(offset, true)
  }, [])

  const onRequest = (offset, initial) => {
    initial ? setNewItemLoading(false): setNewItemLoading(true)
    getAllCharacters(offset)
        .then(onCharListLoaded)
        .then(() => setProcess('confirmed'))
  }

  const onCharListLoaded = (newChars) => {
    let ended = false
    if (newChars.length < 9) {
      ended = true
    }

    setChars([...chars, ...newChars])
    setNewItemLoading(false)
    setOffset(offset + 9)
    setCharEnded(ended)
  }



  const itemRefs = useRef([]);

  const focusOnItem = (id) => {
      itemRefs.current.forEach(item => item.classList.remove('char__item_selected'));
      itemRefs.current[id].classList.add('char__item_selected');
      itemRefs.current[id].focus();
  }

  function renderItems(chars) {
    const items = chars.map((item, i) => {
      const {name, thumbnail, id} = item
      let imgStyle = {'objectFit': 'cover'}
      if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = {"objectFit": 'contain'}
      }

      return (
        <li 
            className="char__item"
            tabIndex={0}
            ref={elem => itemRefs.current[i] = elem}
            key={id}
            onClick={() => {
                props.onCharSelected(id);
                focusOnItem(i);
            }}
            onKeyDown={(e) => {
                if (e.key === ' ' || e.key === "Enter") {
                    props.onCharSelected(id);
                    focusOnItem(i);
                }
            }}>
                <img src={thumbnail} alt={name} style={imgStyle}/>
                <div className="char__name">{name}</div>
        </li>
      )
    })

    return (
      <ul className="char__grid">
          {items}
      </ul>
    )
  }

  const elements = useMemo(() => {
    return setContent(process, () => renderItems(chars), newItemLoading)
  }, [process])

  return (
    <div className="char__list">
      {elements}
      <button 
          className="button button__main button__long"
          disabled = {newItemLoading}
          style = {{'display': charEnded ? 'none': 'block' }}
          onClick={() => onRequest(offset)}
          >
          <div className="inner">load more</div>
      </button>
  </div>
  )
}

CharList.propTypes = {
  onCharSelected: PropTypes.func
}

export default CharList;