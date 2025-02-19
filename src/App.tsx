import './App.scss';
import React, { useState } from 'react';
import userList from './api/users';
import todoList from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import { User } from './types/User';

export const App = () => {
  const findUserById = (userId: number): User | undefined => {
    return userList.find(user => user.id === userId);
  };

  const newTodos: Todo[] = todoList.map(todoItem => {
    return {
      ...todoItem,
      user: findUserById(todoItem.userId),
    };
  });

  const [title, setTitle] = useState('');

  const [todos, setTodos] = useState(newTodos);

  const [userId, setUserId] = useState(0)
  const [titleError , setTitleError] = useState(false)
  const [userIdError , setUserIdError] = useState(false)



  function getNewTodoId(todoList: Todo[]): number {
    if (todoList.length === 0) return 1;
    return Math.max(...todoList.map(todo => todo.id)) + 1;
  }

  const addTodo = () => {
    if (!title.trim()) return;

    const todoNewObj = {
      id: getNewTodoId(todos),
      title,
      completed: false,
      userId: userList[0].id,
      user: findUserById(userId),
    };

    setTodos(prevTodos => [...prevTodos, todoNewObj]);
  };
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setTitleError(false)
  };


  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setUserIdError(false)
  };

  const resetForm = () => {
    setTitle('')
    setUserId(0)

  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!title) {
      setTitleError(true)
    }

    if (!userId) {
      setUserIdError(true)
    }

    if (!title || !userId){
      return
    }

    addTodo()
    resetForm()


  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor={"titleId"}>
            <input
              id="titleId"
              type="text"
              data-cy="titleInput"
              value={title}
              onChange={handleTitleChange}
              placeholder="Enter a title"
            />
          </label>
          {titleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={userId}
            onChange={handleSelectChange}
          >
            <option value="" >
              Choose a user
            </option>
            {userList.map((user: User) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {userIdError && (
            <span className="error">Please choose a user</span>
          )}

        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
      <TodoList todos={todos} />
    </div>
  );
};
