import users from './api/users';

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

    case 'ADD_TODO':
      return {
        ...state,
        selectedUserId: 0,
        todoList: [...state.todoList, createTodo(state, action)],
      };

    default:
      throw new Error('Something went wrong');
  }
};

function createTodo(state, action) {
  return {
    userId: state.selectedUserId,
    id: state.todoList.length + 1,
    title: action.payload,
    completed: false,
    user: users.find(user => user.id === state.selectedUserId),
  };
}
