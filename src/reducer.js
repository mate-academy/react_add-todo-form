import users from './api/users';

export const reducer = (state, action) => {
  switch (action.type) {
    case 'SELECT_USER':
      return {
        ...state,
        selectedUserId: action.payload,
        selectMessage: '',
      };

    case 'CLEAR_INPUT_MESSAGE':
      return {
        ...state,
        inputMessage: '',
      };

    case 'SHOW_SELECT_MESSAGE':
      return {
        ...state,
        selectMessage: action.payload,
      };

    case 'ADD_TODO':
      if (!action.payload) {
        return {
          ...state,
          inputMessage: 'Please Enter The Title',
        };
      }

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
