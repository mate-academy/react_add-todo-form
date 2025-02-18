import './App.scss';
import { TodoList } from './components/TodoList';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import React, { useState } from 'react';
import { todo } from './components/types';

export const App = () => {
  const editedTodos = todosFromServer.map(todo => ({
    ...todo,
    user: usersFromServer.find(user => user.id === todo.userId) || {
      id: 0,
      name: 'Unknown User',
      username: 'unknown',
      email: 'unknown@example.com',
    },
  }));
  
  const [todos, setTodos] = useState<todo[]>(editedTodos)
  const [title, setTitle] = useState('')
  const [userId, setUserId] = useState(0)
  const [titleError, setTitleError] = useState(false)
  const [userError, setUserError] = useState(false)

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    let isError = false;

    if (title.trim() === '') {
      setTitleError(true);
      isError = true;
    }
    if (userId === 0) {
      setUserError(true);
      isError = true;
    }

    if( isError) {
      return;
    }

    const newTodo: todo = {
      id: Math.max(...todos.map(todo => todo.id)) + 1,
      title: title,
      completed: false,
      userId: userId,
      user:   usersFromServer.find(user => user.id === userId) || {
          id: 0,
          name: 'Unknown User',
          username: 'unknown',
          email: 'unknown@example.com',
        },
    } 

    setTodos(previous => [...previous, newTodo]);
    setTitle('');
    setUserId(0);
    return;
  }
  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={onSubmit}>
        <div className="field">
        <label htmlFor="titleInput">Todo title</label>
          <input type="text" 
          data-cy="titleInput"  
          value={title}
          onChange={(event)=> {
            setTitle(event.target.value)
            if (titleError) setTitleError(false)
          }}
          placeholder='enter title'
          />
          {titleError && <span className="error">Please enter a title</span>}
          
        </div>

        <div className="field">
          <label htmlFor="userSelect">User</label>
          <select data-cy="userSelect" value={userId} onChange={ 
            (event)=>{
              setUserId(+event.target.value)
              if (userError) {
                setUserError(false)
              }
            }
            
            }>
          <option value="0">
              Choose a user
            </option>
            {usersFromServer.map(user => {
              
                return(<option value= {user.id} key = {user.id}>
                  {user.name}
                </option>)
              
            })}
            
          </select>
            {userError && <span className="error">Please choose a user</span>}
          
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos}/>
    </div>
  );
};
