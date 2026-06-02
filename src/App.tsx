import { useState } from 'react';
import './App.scss';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import classNames from 'classnames';
import { Todo, User } from './types';
import { TodoList } from './components/TodoList';



const findTodo:Todo[] = todosFromServer.map(todo => {
  const user = usersFromServer.find((user:User) => user.id === todo.userId)
  return {
    ...todo, user
  }
})

  console.log(findTodo);
  
export const App = () => {
  const [selectedUser, setSelectedUser] = useState(0);
  const [title, setTitle] = useState('');
  const [todoList, setTodoList] = useState(findTodo);
  const [errorTitle, setErrorTitle] = useState(false);
  const [errorUser, setErrorUser] = useState(false);

  
  function handleSubmit (event:React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!title) {
      setErrorTitle(true)
    }

    if (!selectedUser) {
      setErrorUser(true)
    }

    if (errorTitle || errorTitle) {
      return
    } 

    const todo:Todo = {
      id: 0,
      title:title,
      completed: false,
      userId: selectedUser,
      user: usersFromServer.find(user => user.id === selectedUser)
    }
    setTodoList(current => [...current, todo])

    setTitle('')
    setSelectedUser(0)
  }

  function handleUserChange(id:number) {
    setSelectedUser(id)

    setErrorUser(false)
  }

  function handleTitleChange(text:string) {
    setTitle(text)
    setErrorTitle(false)
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
       action="/api/todos"
       method="POST"
       onSubmit={event => handleSubmit(event)}
        >
        <div className="field">
          <input
           type="text"
            data-cy="titleInput"
            value={title}
            onChange={event => handleTitleChange(event.target.value)}
            />
          {errorTitle &&
           <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
           data-cy="userSelect"
           value={selectedUser}
           onChange={event => handleUserChange(+event.target.value)}
           >
            <option value="0" disabled>Select User</option>

            {usersFromServer.map(user => (
              <option value={user.id}>{user.name}</option>
            ))}

          </select>
          
          {errorUser &&
            <span className="error">Please choose a user</span>
          }
          
        </div>

        <button
         type="submit"
         data-cy="submitButton"
         
         >
          Add
        </button>
      </form>

      <section className="TodoList">

      <TodoList todoList={todoList}/>

      </section>
    </div>
  );
};
