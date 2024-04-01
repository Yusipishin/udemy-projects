import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/http.hook";

const initialState = {
  filters: [],
  filtersLoadingStatus: 'idle',
  filterActive: 'all',
}

export const fetchFilters = createAsyncThunk(
  'filters/fetchFilters',
  () => {
    const {request} = useHttp();
    return request("http://localhost:3001/filters")
  }
)

const heroesFiltersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    filterActiveChanged: (state, action) => {state.filterActive = action.payload}
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchFilters.pending, state => {state.filtersLoadingStatus = 'loading'})
    .addCase(fetchFilters.fulfilled, (state, action) => {
      state.filtersLoadingStatus = 'idle';
      state.filters = action.payload;
    })
    .addCase(fetchFilters.rejected, state => {state.filtersLoadingStatus = 'error'})
    .addDefaultCase(() => {})
  }
})

const {actions, reducer} = heroesFiltersSlice;

export default reducer;
export const {
  filtersFetched,
  filtersFetching,
  filterActiveChanged,
  filtersFetchingError,
} = actions