import React, { useState } from 'react';
import './App.css';

import { AddTodoForm } from './components/AddTodoForm';
import { TodoList } from './components/TodoList';

import users from './api/users';
import { todos } from './api/todos';

const preparedTodos = todos.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId),
}));

function App() {
  const [todoList, setTodoList] = useState(preparedTodos);

  const addTodo = (newTodo) => {
    setTodoList(prevTodoList => [newTodo, ...prevTodoList]);
  };

  return (
    <div className="App">
      <h1 className="App-title">Add todo form</h1>
      <div className="App-form">
        <AddTodoForm
          addTodo={addTodo}
          users={users}
          lastTodoIndex={todoList.length}
        />
      </div>

      <TodoList todoList={todoList} />
    </div>
  );
}

export default App;
