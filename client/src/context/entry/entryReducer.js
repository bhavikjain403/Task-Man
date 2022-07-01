const entryReducer = (state, action) => {
  switch (action.type) {
    case 'INIT_ENTRIES':
      return {
        ...state,
        entries: action.payload,
      };
    case 'ADD_ENTRY':
      return {
        ...state,
        entries: [...state.entries, action.payload],
      };
    case 'REMOVE_ENTRY':
      return {
        ...state,
        entries: state.entries.filter((e) => e.id !== action.payload),
      };
    case 'UPDATE_ENTRY':
      return {
        ...state,
        entries: state.entries.map((e) =>
          e.id !== action.payload.id ? e : action.payload
        ),
      };
    case 'SET_EDIT_VALUES':
      return {
        ...state,
        editValues: action.payload,
      };
    case 'RESET_EDIT_VALUES':
      return {
        ...state,
        editValues: null,
      };
    case 'SET_NOTIFICATION':
      return {
        ...state,
        notification: action.payload,
      };
    case 'CLEAR_NOTIFICATION':
      return {
        ...state,
        notification: null,
      };
    case 'TOGGLE_IS_LOADING':
      return {
        ...state,
        isLoading: !state.isLoading,
      };
    default:
      return state;
  }
};

export const initializeEntries = (entries) => {
  return {
    type: 'INIT_ENTRIES',
    payload: entries,
  };
};

export const addEntry = (entry) => {
  return {
    type: 'ADD_ENTRY',
    payload: entry,
  };
};

export const removeEntry = (id) => {
  return {
    type: 'REMOVE_ENTRY',
    payload: id,
  };
};

export const updateEntry = (entry) => {
  return {
    type: 'UPDATE_ENTRY',
    payload: entry,
  };
};

export const setEditValues = (entry) => {
  return {
    type: 'SET_EDIT_VALUES',
    payload: entry,
  };
};

export const resetEditValues = () => {
  return {
    type: 'RESET_EDIT_VALUES',
  };
};

export const setNotification = (notifObj) => {
  return {
    type: 'SET_NOTIFICATION',
    payload: notifObj,
  };
};

export const clearNotification = () => {
  return {
    type: 'CLEAR_NOTIFICATION',
  };
};

export const toggleIsLoading = () => {
  return {
    type: 'TOGGLE_IS_LOADING',
  };
};

export default entryReducer;