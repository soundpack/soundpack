export const AppActionTypes = {
  SET_SEARCH_QUERY: 'SET_SEARCH_QUERY',
};

interface SetSearchQueryAction {
  type: typeof AppActionTypes.SET_SEARCH_QUERY,
  payload: {
    searchQuery: string,
  }
}

export function setSearchQuery(searchQuery: string): SetSearchQueryAction {
  return {
    type: AppActionTypes.SET_SEARCH_QUERY,
    payload: {
      searchQuery,
    }
  };
};

export type AppActionCreatorTypes = SetSearchQueryAction;
