import React, { useState } from 'react';
import './App.scss';
import users from './api/users';
import todos from './api/todos';
import TodoList from './components/TodoList';
import NewTodo from './components/NewTodo';

const preparedTodos = todos.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId),
}));

const App = () => {
  const [list, setTodos] = useState(preparedTodos);
  const addTodo = (todo) => {
    setTodos(state => (
      [...state, {
        ...todo,
        id: state[state.length - 1].id + 1,
        user: users.find(user => user.id === todo.userId),
      }]
    ));
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <NewTodo users={users} addTodo={addTodo} />
      <TodoList {...{ list }} />
    </div>
  );
};

export default App;
