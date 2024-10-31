import { useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';
import TodosForm from './components/TodosForm/TodosForm';

import todosFromServer from './api/todos';

import { ITodo } from './types/todo';
import todosWithUser from './utils/todo/todosWithUser';

export const App = () => {
  const [todos, setTodos] = useState<ITodo[]>([...todosFromServer]);

  const addTodo = (todo: ITodo) => setTodos(state => [...state, todo]);

  return (
    <div className="App">
      <h1>Add todo form</h1>
      addTodo
      <TodosForm todos={todos} addTodo={addTodo} />
      {/* <form action="/api/todos" method="POST">
        <div className="field">
          <input type="text" data-cy="titleInput" />
          <span className="error">Please enter a title</span>
        </div>

        <div className="field">
          <select data-cy="userSelect">
            <option value="0" disabled>
              Choose a user
            </option>
          </select>

          <span className="error">Please choose a user</span>
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form> */}
      <TodoList todos={todosWithUser(todos)} />
      {/* <section className="TodoList">
        <article data-id="1" className="TodoInfo TodoInfo--completed">
          <h2 className="TodoInfo__title">delectus aut autem</h2>

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
