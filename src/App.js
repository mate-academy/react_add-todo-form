import React, { useState } from 'react';
import './App.css';
import Form from './components/Form/Form';
import TodoList from './components/TodoList/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

function App() {
  const [list, setList] = useState(todosFromServer);

  const addTodo = (title, person) => {
    const selectedUser = usersFromServer.find(user => (
      user.name === person));

    setList([...list, {
      userId: selectedUser.id,
      id: list.length + 1,
      title,
      completed: false,
    }]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <p>{`Number of task: ${list.length}`}</p>

      <Form
        users={usersFromServer}
        todoAdd={addTodo}
      />
      <TodoList list={list} users={usersFromServer} />
    </div>
  );
}

export default App;
