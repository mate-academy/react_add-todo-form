export const SET_TODOS = 'SET_TODOS';
export const ADD_TODO = 'ADD_TODO';

export const setTodos = (todos, users) => ({
  type: SET_TODOS,
  todos,
  users,
});

export const addTodo = (data, users) => ({
  type: ADD_TODO,
  data,
  users,
});

const todosReducer = (state = [], action) => {
  switch (action.type) {
    case SET_TODOS:
      return action.todos.map(todo => ({
        ...todo,
        id: getId(),
        user: action.users.find(user => user.id === todo.userId),
      }));

    case ADD_TODO: {
      const { title, user } = action.data;

      const todo = {
        title,
        id: getId(),
        completed: false,
        userId: user.id,
        user,
      };

      return [...state, todo];
    }

    default: return state;
  }
};

export default todosReducer;

function idFactory() {
  let id = 0;

  return () => {
    id += 1;

    return id;
  };
}

const getId = idFactory();
