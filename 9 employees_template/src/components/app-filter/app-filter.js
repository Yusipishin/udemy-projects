import './app-filter.css';

import { Component } from 'react';

class AppFilter extends Component {
  state = {
    filter: 'all'
  }

  onUpdateBtnClass = event => {
    const activeBtn = event.target
    const btns = [...activeBtn.parentElement.children]
    btns.forEach(item => {
      if (item.classList.contains('btn-light')) {
        item.classList.remove('btn-light')
        item.classList.add('btn-outline-light')
      }
    })
    const filter = activeBtn.getAttribute('data-filter')
    this.setState({filter})
    activeBtn.classList.remove('btn-outline-light')
    activeBtn.classList.add('btn-light')
    this.props.onUpdateFilter(filter)
  }

  render() {
    return (
      <div className="btn-group">
        <button 
              className="btn btn-light"
              type = "button"
              onClick={event => this.onUpdateBtnClass(event)}
              data-filter = 'all'
              >
                Все сотрудники
        </button>
        <button 
              className="btn btn-outline-light"
              type = "button"
              onClick={event => this.onUpdateBtnClass(event)}
              data-filter = 'increase'
              >
                На повышение
        </button>
        <button 
              className="btn btn-outline-light"
              type = "button"
              onClick={event => this.onUpdateBtnClass(event)}
              data-filter = '>1000'
              >
                З/П больше 1000$
        </button>
      </div>
    );
  }
}

export default AppFilter;