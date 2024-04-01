import './charList.scss';
import MarvelService from '../../services/MarvelService';
import { Component } from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import PropTypes from 'prop-types';
import React from 'react';

class CharList extends Component {
  state = {
    chars: [],
    loading: true,
    error: false,
    newItemLoading: false,
    offset: 1548,
    charEnded: false,
    // charTarget: null,
  }

  marvelService = new MarvelService()
  myRef = React.createRef()

  onError = () => {
    this.setState({
      loading: false,
      error: true
    })
  }

  onCharListLoading = () => {
    this.setState({
      newItemLoading: true,
    })
  }

  onCharListLoaded = (newChars) => {
    let ended = false
    if (newChars.length < 9) {
      ended = true
    }

    this.setState(({offset, chars}) => ({
      chars: [...chars, ...newChars],
      loading: false,
      newItemLoading: false,
      offset: offset + 9,
      charEnded: ended
    }))
  }

  componentDidMount() {
    this.onRequest()
  }

  onRequest = (offset) => {
    this.onCharListLoading()
    this.marvelService.getAllCharacters(offset)
        .then(this.onCharListLoaded)
        .catch(this.onError)
  }






  itemRefs = [];

  setRef = (ref) => {
      this.itemRefs.push(ref);
  }

  focusOnItem = (id) => {
      this.itemRefs.forEach(item => item.classList.remove('char__item_selected'));
      this.itemRefs[id].classList.add('char__item_selected');
      this.itemRefs[id].focus();
  }

  renderItems(chars) {
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
            ref={this.setRef}
            key={id}
            onClick={() => {
                this.props.onCharSelected(id);
                this.focusOnItem(i);
            }}
            onKeyDown={(e) => {
                if (e.key === ' ' || e.key === "Enter") {
                    this.props.onCharSelected(id);
                    this.focusOnItem(i);
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

  // мой большой говнокод без рефов

  // onSelectChar = (char) => {
  //   const newCharTarget = char.target
  //   const {charTarget} = this.state

  //   if (char.code === 'Enter' || !char.code) {
  //     if (charTarget) {
  //       charTarget.classList.remove('char__item_selected')
  //     }
  
  //     if (newCharTarget.classList.contains('char__item')) {
  //       newCharTarget.classList.add('char__item_selected')
  
  //       this.setState({
  //         charTarget: newCharTarget
  //       })
  
  //     } else if (!newCharTarget.classList.contains('char__grid') && newCharTarget) {
  //       newCharTarget.parentElement.classList.add('char__item_selected')
  
  //       this.setState({
  //         charTarget: newCharTarget.parentElement
  //       })
  //     }
  //   }
  // }

  

  render() {
    const {chars, loading, error, newItemLoading, offset, charEnded} = this.state

    const items = this.renderItems(chars)

    const errorMessage = error ? <ErrorMessage/> : null
    const spinner = loading ? <Spinner/> : null
    const content = !(loading || error) ? items : null
    return (
      <div className="char__list">
        {errorMessage}
        {spinner}
        {content}
        <button 
            className="button button__main button__long"
            disabled = {newItemLoading}
            style = {{'display': charEnded ? 'none': 'block' }}
            onClick={() => this.onRequest(offset)}
            >
            <div className="inner">load more</div>
        </button>
    </div>
    )
  }
}

CharList.propTypes = {
  onCharSelected: PropTypes.func
}

export default CharList;