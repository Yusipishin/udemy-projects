import { Component } from 'react';

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployersList from '../employers-list/employers-list';
import EmployersAddForm from '../employers-add-form/employers-add-form';

import './app.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [
      {name: "Alex S.", salary: 800, increase: false, like: false, id: 1},
      {name: "Maxim Y.", salary: 1200, increase: false, like: false, id: 2},
      {name: "Sveta P.", salary: 700, increase: false, like: false, id: 3},
      ],
      term: '',
      filter: '',
    }
    this.maxId = 3
  }

  deleteItem = (id) => {
    this.setState(({data}) => {
      return {
        data: data.filter(item => item.id !== id)
      }
    })
  }

  insertItem = (name, salary, event) => {
    event.preventDefault()
    ++this.maxId
    this.setState(({data}) => {
      const newItem = {
        name: name,
        salary: salary,
        increase: false,
        like: false,
        id: this.maxId
      }
      return {
        data: [...data, newItem]
      }
    })
  }

  onToggleProp = (id, prop) => {
    this.setState(({data}) => ({
      data: data.map(item => {
        if (item.id === id) {
          return {...item, [prop]: !item[prop]}
        }
        return item
      })
    }))
  }

  searchEmp = (items, term) => {
    if (term.length === 0) {
      return items;
    }

    return items.filter(item => {
      return item.name.indexOf(term) > -1
    })
  }

  onUpdateSearch = (term) => {
    this.setState({term});
  }

  filterEmp = (items, filter) => {
    if (filter === 'increase') {
      return items.filter(item => {
        return item.increase === true
      })
    } else if (filter === '>1000') {
      return items.filter(item => {
        return item.salary > 1000
      })
    }
    return items
  }

  onUpdateFilter = filter => {
    this.setState({filter})
  }

  render() {
    const {data, term, filter} = this.state;
    const employees = data.length
    const increased = data.filter(item => item.increase).length
    // const visibleData = this.filterEmp(this.searchEmp(data, term), filter)
    const visibleData = this.filterEmp(this.searchEmp(data, term), filter)
    return (
      <div className = "app">
        <AppInfo
          employees = {employees}
          increased = {increased}
        />

        <div className="search-panel">
          <SearchPanel onUpdateSearch = {this.onUpdateSearch} />
          <AppFilter onUpdateFilter = {this.onUpdateFilter}/>
        </div>

        <EmployersList 
          data={visibleData} 
          onDelete = {this.deleteItem}
          onToggleProp = {this.onToggleProp}
        />
        <EmployersAddForm
          onInsert = {this.insertItem}
        />
      </div>
    );
  }
}

export default App;