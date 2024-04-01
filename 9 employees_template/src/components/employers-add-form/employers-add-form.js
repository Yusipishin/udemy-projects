import {Component} from 'react'

// import './employers-add-form.css'
import './employers-add-form.scss'

class EmployersAddForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      salary: '',
    }
  }

  onValueChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  changeForm = (e, name, salary) => {
    e.preventDefault()
    if (name.length > 1 && salary !== '') {
      const {onInsert} = this.props
      onInsert(name, salary, e)
      this.setState({
        name: '',
        salary: '',
      })
    }
  }

  render() {
    const {name, salary} = this.state
    return (
      <div className="app-add-form">
        <h3>Добавьте нового сотрудника</h3>
        <form
            onSubmit={(e) => this.changeForm(e, name, salary)}
            className="add-form d-flex">
            <input type="text"
                className="form-control new-post-label"
                placeholder="Как его зовут?" 
                name = "name"
                value={name}
                onChange={this.onValueChange}
            />
            <input type="number"
                className="form-control new-post-label"
                placeholder="З/П в $?" 
                name='salary'
                value={salary}
                onChange={this.onValueChange}
            />
  
            <button type="submit"
                    className="btn btn-outline-light"
            >Добавить</button>
        </form>
      </div>
    );
  }
}

export default EmployersAddForm;