import React, { useState } from 'react';
import './App.scss';
import { TodoList } from './TodoList';
import { Todo } from '../types/Todo';

import users from '../api/users';
import todos from '../api/todos';

const preparedTodos: Todo[] = todos.map((currentTodo) => {
  const currentUser = users.find(user => currentTodo.userId === user.id);

  return {
    user: currentUser || null,
    ...currentTodo,
  };
});

const App: React.FC = () => {
  const [toDoTitle, setTodoTitle] = useState('');
  const [toDoStatus, setTodoStatus] = useState(false);
  const [selectedUser, setSelectedUser] = useState('Choose a user');
  const [isClicked, setIsClicked] = useState(false);

  const isValidTitle = toDoTitle.length > 0;
  const isValidChooseInput = selectedUser !== 'Choose a user';
  const isValidInput = isValidTitle && isValidChooseInput;

  const addNewTodo = (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    if (isValidInput) {
      const choosenUser = users.find(user => user.name === selectedUser);
      const maxID = [...preparedTodos].sort((a, b) => b.id - a.id)[0].id + 1;

      const newTodo = {
        user: choosenUser || null,
        userId: choosenUser?.id,
        id: maxID,
        title: toDoTitle.replaceAll(/[^a-zA-Z ЁёА-я ЯЄI яєі 0-9]/g, ''),
        completed: toDoStatus,
      };

      preparedTodos.push(newTodo);

      setTodoTitle('');
      setTodoStatus(false);
      setSelectedUser('Choose a user');
      setIsClicked(false);
    }
  };

  const changeTodoStatus = (event: string) => {
    if (event === 'Completed') {
      setTodoStatus(true);
    } else {
      setTodoStatus(false);
    }
  };

  return (
    <div className="App">
      <div className="form">
        <form onSubmit={addNewTodo}>
          <label>
            <textarea
              className="input_title"
              contentEditable
              value={toDoTitle}
              placeholder="Title"
              onChange={(event) => {
                setTodoTitle(event.target.value);
              }}
            />
            {(!isValidTitle && isClicked) && (
              <p className="error">Please, enter the title!</p>
            )}
          </label>

          <label>
            <select
              className="select_item"
              onChange={(event) => changeTodoStatus(event.target.value)}
              value={!toDoStatus ? 'In progress' : 'Completed'}
            >
              <option value="Completed">
                Completed
              </option>
              <option value="In progress">
                In progress
              </option>
            </select>
          </label>

          <label>
            <select
              className="select_item"
              id={selectedUser}
              value={selectedUser}
              onChange={(event) => {
                setSelectedUser(event.target.value);
              }}
            >
              <option>
                Choose a user
              </option>
              {users.map(user => (
                <option
                  key={user.id}
                  value={user.name}
                >
                  {user.name}
                </option>
              ))}
            </select>
          </label>

          {(!isValidChooseInput && isClicked) && (
            <p className="error">Please, choose a user!</p>
          )}

          <button
            className="button"
            type="submit"
            onClick={() => setIsClicked(true)}
          >
            Add new todo
          </button>
        </form>
      </div>

      <div className="todo_list">
        <TodoList todos={preparedTodos} />
      </div>
    </div>
  );
};

export default App;
