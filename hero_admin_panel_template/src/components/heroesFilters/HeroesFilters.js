import Spinner from '../spinner/Spinner';
import classNames from 'classnames';
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHttp } from "../../hooks/http.hook";
import { filterActiveChanged, fetchFilters } from './heroesFiltersSlice';

const HeroesFilters = () => {
    useEffect(() => {
      dispatch(fetchFilters(request))
    }, [])

    const dispatch = useDispatch();
    const {request} = useHttp();

    const {filters, filtersLoadingStatus, filterActive} = useSelector(state => state.filters)

    if (filtersLoadingStatus === 'loading') {
      return <Spinner/>
    } else if ((filtersLoadingStatus === 'error')) {
      return <h5 className="text-center mt-5">Ошибка загрузки...</h5>
    }

    const renderFilters = () => {
      return filters.map(({name, label, className}, i) => {
        const btnClass = classNames('btn', className, {'active': name === filterActive});

        return <button onClick={() => dispatch(filterActiveChanged(name))}
                        key={i}
                        className={btnClass}
                        >{label}</button>
      })
    }

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {renderFilters()}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;