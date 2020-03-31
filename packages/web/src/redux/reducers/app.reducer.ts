import { AppActionTypes, AppActionCreatorTypes } from '../actions/app.actions';

type AppReducerState = {
  searchQuery: string;
};

function appReducerState(): AppReducerState {
  return {
    searchQuery: '',
  };
}

export default function reducer(state = appReducerState(), action: AppActionCreatorTypes) {
  const { type, payload } = action;

  switch (type) {
    case AppActionTypes.SET_SEARCH_QUERY:
      return setSearchQuery(state, payload);

    default:
      return state;
  }
}

function setSearchQuery(
  state: AppReducerState, 
  { searchQuery }: { searchQuery: string } 
): AppReducerState {
  return {
    ...state,
    searchQuery,
  };
};
