// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { heroSetted } from "../heroesList/heroesSlice";
import { v4 as uuidv4 } from 'uuid';
import { useHttp } from "../../hooks/http.hook";

const HeroesAddForm = () => {
  const [name, setName] = useState('')
  const [text, setText] = useState('')
  const [elem, setElem] = useState('')

  const dispatch = useDispatch();
  const {request} = useHttp();
  const {filters, filtersLoadingStatus} = useSelector(state => state.filters)

  const onSetHero = (event) => {
    event.preventDefault();

    const newHero = {
      "id": uuidv4(), // также можно use библиотеку nanoid из redux toolkit
      "name": name,
      "description": text,
      "element": elem
    }

    request("http://localhost:3001/heroes", "POST", JSON.stringify(newHero))
            .then(data => console.log(data))
            .then(dispatch(heroSetted(newHero)))
            .catch(err => console.log(err))

    setName('')
    setText('')
    setElem('')
  }

  const renderFilters = (filters, status) => {
    if (status === "loading") {
        return <option disabled>Загрузка элементов...</option>
    } else if (status === "error") {
        return <option disabled>Ошибка загрузки...</option>
    }

    return filters.map(({name, label}) => {
      if (name === 'all') return;

      return <option key={name} value={name}>{label}</option>
  })}

    return (
        <form className="border p-4 shadow-lg rounded">
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                <input 
                    required
                    type="text" 
                    name="name" 
                    className="form-control" 
                    id="name" 
                    placeholder="Как меня зовут?"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                />
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Описание</label>
                <textarea
                    required
                    name="text" 
                    className="form-control" 
                    id="text" 
                    placeholder="Что я умею?"
                    style={{"height": '130px'}}
                    value={text}
                    onChange={(event) => setText(event.target.value)}
                />
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                <select 
                    required
                    className="form-select" 
                    id="element" 
                    name="element"
                    value={elem}
                    onChange={(event) => setElem(event.target.value)}
                    >
                    <option value="">Я владею элементом...</option>
                    {renderFilters(filters, filtersLoadingStatus)}
                </select>
            </div>

            <button onClick={(event) => onSetHero(event)} type="submit" className="btn btn-primary">Создать</button>
        </form>
    )
}

export default HeroesAddForm;