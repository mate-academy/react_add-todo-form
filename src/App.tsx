import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
// import { useState } from 'react';
import { TodoList } from './components/TodoList';
import { UsersToDos } from './types/ToDo';
// import { TodoForm } from './components/TodoForm/TodoForm';

function getUserById(userId: number) {
  return usersFromServer.find(user => user.id === userId)
      || null;
}

export const todos: UsersToDos[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));


export const App = () => {
  // const [task, setTask] = useState('');
  // const [hasError, setHasError] = useState(false);

  // const [toDos, setToDos] = useState(todosFromServer);

  // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();

  //   if (!task) {
  //     setHasError(true);

  //     return;
  //   }

  //   // const newToDo: UsersToDos = {
  //   //   id:
  //   //   title,
  //   //   completed: boolean,
  //   //   userId: getUserById(userId),
  //   // }
  // }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      {/* <TodoForm/> */}

      <form action="/api/todos" method="POST">
        <div className="field">
          <input type="text" data-cy="titleInput" />
          <span className="error">Please enter a title</span>
        </div>

        <div className="field">
          <select data-cy="userSelect">
            <option value="0" disabled>Choose a user</option>
          </select>

          <span className="error">Please choose a user</span>
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
      <TodoList todos={todos} />

      {/* <section className="TodoList">
        <article data-id="1" className="TodoInfo TodoInfo--completed">
          <h2 className="TodoInfo__title">
            delectus aut autem
          </h2>

          <a className="UserInfo" href="mailto:Sincere@april.biz">
            Leanne Graham
          </a>
        </article>

        <article data-id="15" className="TodoInfo TodoInfo--completed">
          <h2 className="TodoInfo__title">delectus aut autem</h2>

          <a className="UserInfo" href="mailto:Sincere@april.biz">
            Leanne Graham
          </a>
        </article>

        <article data-id="2" className="TodoInfo">
          <h2 className="TodoInfo__title">
            quis ut nam facilis et officia qui
          </h2>

          <a className="UserInfo" href="mailto:Julianne.OConner@kory.org">
            Patricia Lebsack
          </a>
        </article>
      </section> */}
    </div>
  );
};
