export const actionTypes = {
  selectUserType: 'SELECT_USER',
  clearInputWarnType: 'CLEAR_INPUT_WARN',
  changeInputTextType: 'CHANGE_INPUT_TEXT',
  showWarnType: 'SHOW_WARN',
  setInitStateType: 'SET_INIT_STATE',
};

export const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.selectUserType:
      return {
        ...state,
        selectedUserId: action.payload,
        selectWarnMessage: '',
      };

    case actionTypes.clearInputWarnType:
      return {
        ...state,
        inputWarnMessage: '',
      };

    case actionTypes.changeInputTextType:
      return {
        ...state,
        inputText: action.payload,
      };

    case actionTypes.showWarnType:
      return {
        ...state,
        inputWarnMessage: !action.payload
          ? 'Please Enter The Title'
          : '',
        selectWarnMessage: !state.selectedUserId
          ? 'Please Choose a User'
          : '',
      };

    case actionTypes.setInitStateType:
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
