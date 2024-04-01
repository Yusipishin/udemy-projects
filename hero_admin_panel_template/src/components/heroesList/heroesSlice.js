import { createSlice, createAsyncThunk, createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/http.hook";

const heroesAdapter = createEntityAdapter(); // объект с готовыми методами

// const initialState = {
//   heroes: [],
//   heroesLoadingStatus: 'idle',
// }

const initialState = heroesAdapter.getInitialState({heroesLoadingStatus: 'idle'})
console.log(initialState)

export const fetchHeroes = createAsyncThunk(
  'heroes/fetchHeroes',
  // эта ф-ия должна вернуть промис
  () => {
    const {request} = useHttp();
    return request("http://localhost:3001/heroes")
  }
)

const heroesSlice = createSlice({
  name: 'heroes', //пространство имён среза
  initialState,
  reducers: { //action creators. Zдесь тоже innerjs
    heroSetted: (state, action) => {
      //state.heroes.push(action.payload)
      heroesAdapter.addOne(state, action.payload)
    },
    heroDeleted: (state, action) => {
      // state.heroes = state.heroes.filter(item => item.id !== action.payload)
      heroesAdapter.removeOne(state, action.payload)
    },
  },
  // дополнительные (сторонние) reducers
  extraReducers: (builder) => {
    builder 
    //pending -- только начинается запрос, fulfilled -- успешно выполнилась, rejected -- ошибка
      .addCase(fetchHeroes.pending, state => {state.heroesLoadingStatus = 'loading'})
      .addCase(fetchHeroes.fulfilled, (state, action) => {
        state.heroesLoadingStatus = 'idle';
        // state.heroes = action.payload;
        heroesAdapter.setAll(state, action.payload)
      })
      .addCase(fetchHeroes.rejected, state => {state.heroesLoadingStatus = 'error'})
      .addDefaultCase(() => {})
  }
})

const {actions, reducer} = heroesSlice;

export default reducer;

const {selectAll} = heroesAdapter.getSelectors(state => state.heroes)

export const filteredHeroesSelector = createSelector(
  (state) => state.filters.filterActive,
  // (state) => state.heroes.heroes,
  selectAll,
  (filter, heroes) => {
    if (filter === 'all') {
      return heroes;
    } else {
      return heroes.filter(item => item.element === filter)
    }
  }
)

export const {
  heroSetted,
  heroDeleted,
  heroesFetched,
  heroesFetching,
  heroesFetchingError,
} = actions