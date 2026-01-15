import './App.scss'
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import React, { useState } from 'react';



  const getUserById = (userId: number) => { /* como quero achar o usuario que tem o id igual o user id do todosfromserver
    criei uma funçao para buscar dentro do todosfromserver */
   return usersFromServer.find((users) => users.id === userId) || null
  }

export const App: React.FC = () => {
  const [userId, setUserId] = useState<number>(0)
  const [hasUserError, setHasUserError] = useState<boolean>(false)

  const [title, setTtitle] = useState<string>('')
  const [hasTitleError, setHasTitleError] = useState<boolean>(false)

  const [todosFrom, setTodosFrom] = useState(
  todosFromServer.map(todo => ({
    ...todo,
    user: getUserById(todo.userId)
  }))
  )



  const reset = () => {
    setUserId(0)
    setTtitle('')
  }

  const addTodo = (newTodo) => {

     setTodosFrom([...todosFrom, newTodo])
  }

  const handleUserError = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(Number(e.target.value))
    return setHasUserError(false)
  }
  const handleTitleError = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTtitle(e.target.value)
    return setHasTitleError(false)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();


      setHasTitleError(!title)
      setHasUserError(!userId)

    if (!title || !userId) {
      return
    }

    addTodo({
      id: todosFrom.length + 1,
      title,
      userId,
      completed: false,
      user: getUserById(userId)
    })

    reset()


  }



  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
        <label htmlFor="title">Title:</label>
          <input placeholder='Enter a title' type="text" id='title' data-cy="titleInput" value={title} onChange={handleTitleError} />
          {hasTitleError && <span className="error">Please enter a title</span>}

        </div>
        <div className="field">
          <label htmlFor="user">choose a user:</label>
          <select data-cy="userSelect" id='user' value={userId} onChange={handleUserError}>
            <option value="0" disabled>
              Choose a user
            </option>
             {/* essa é a primeira opçao de usuario, tipo a default. com o userfrom
            server abaixo eu renderizei as outras opçoes */}
            {usersFromServer.map((user) => (
              <option key={user.id} value={user.id}>{user.name}</option>
            ))}
          </select>
            {hasUserError && <span className="error">Please choose a user</span>}

        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todosFrom}/>
    </div>
  );
};
