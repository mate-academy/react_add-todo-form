import React, { useState } from 'react';
import './App.css';

import users from './api/users';
import todos from './api/todos';

import { Todolist } from './TodoList';

const App: React.FC = () => {
  const preparedTodos = todos.map(todo => {
    return {
      ...todo,
      user: users.find(user => user.id === todo.userId),
    };
  });

  const [title,setTitle] = useState('');
  const [nameUser, setUser] = useState('');
  const [todoList, setTodoList] = useState(preparedTodos);

  const addNewTodo = () => {
    const newTodo = {
      userId: users.find(person => person.name === nameUser).id,
      id: todoList.length + 1,
      title: title,
      completed: false,
      user: users.find(person => person.name === nameUser)
    }

    setTodoList([...todoList, newTodo])
  }
  addNewTodo
  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="">
        <div>
          <input
            type="text"
            placeholder="Add todos"
            value={title}
            onChange={(event) =>
              setTitle(event.target.value)
            }
          />
        </div>
        <div>
          <select
            name="userList"
            id="userList"
            value={nameUser}
            onChange={(event) =>
              setUser(event.target.value)
            }
          >
            <option value="">Choose user</option>
            {users.map(user => (
              <option
                value={user.name}
              >
                {user.name}
              </option>
            ))}

          </select>
        </div>
        <button
          type="button"

        >
          Add
        </button>
      </form>

      <Todolist todos={todoList} />
    </div>
  );
};

export default App;
