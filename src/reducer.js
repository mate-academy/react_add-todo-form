export const reducer = (state, action) => {
  switch (action.type) {
    case 'SELECT_USER':
      return {
        ...state,
        selectedUserId: action.payload,
        selectWarnMessage: '',
      };

    case 'CLEAR_INPUT_WARN':
      return {
        ...state,
        inputWarnMessage: '',
      };

    case 'CHANGE_INPUT_TEXT':
      return {
        ...state,
        inputText: action.payload,
      };

    case 'SHOW_WARN':
      return {
        ...state,
        inputWarnMessage: !action.payload
          ? 'Please Enter The Title'
          : '',
        selectWarnMessage: !state.selectedUserId
          ? 'Please Choose a User'
          : '',
      };

    case 'SET_INIT_STATE':
      return {
        selectedUserId: 0,
        inputText: '',
        selectWarnMessage: '',
        inputWarnMessage: '',
      };

    default:
      throw new Error('Something went wrong');
  }
};
