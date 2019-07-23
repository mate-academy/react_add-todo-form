const ACTION_TYPE_SET_TODOS = 'SET_TODOS';
const ACTION_TYPE_ADD_TODO = 'ADD_TODO';

export const setTodos = todos => ({
  type: ACTION_TYPE_SET_TODOS,
  todos,
});

export const addTodo = todo => ({
  type: ACTION_TYPE_ADD_TODO,
  todo,
});

const todosReducer = (state = [], action) => {
  const { type } = action;

  switch (type) {
    case ACTION_TYPE_SET_TODOS:
      return action.todos;

    case ACTION_TYPE_ADD_TODO:
      return [...state, action.todo];

    default:
      return state;
  }
};

export default todosReducer;
