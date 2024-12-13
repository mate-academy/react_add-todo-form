import './App.scss';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { useState } from 'react';

import { TodoList } from './components/TodoList';
import { NewTodo } from './components/NewTodo';

import { Todo } from './Types/Todo';

export const App = () => {
  const [todos, setTodos] = useState(todosFromServer);

  const addTodo = (todo: Todo) => {
    setTodos(currentTodo => [...currentTodo, todo]);
  };

  const todosWithUser: Todo[] = todos.map(todo => {
    const foundedUser = usersFromServer.find(user => user.id === todo.userId);

    return { ...todo, foundedUser };
  });

  const arrayTodosId: number[] = todosWithUser.map(todo => todo.id);
  const maxTodoId = Math.max(...arrayTodosId);

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <NewTodo onAdd={addTodo} users={usersFromServer} max={maxTodoId} />

      <TodoList todos={todosWithUser} />
    </div>
  );
};

{
  /* <form action="/api/todos" method="POST">
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
  </form> */
}

{
  /* <section className="TodoList">
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
    <h2 className="TodoInfo__title">quis ut nam facilis et officia qui</h2>

    <a className="UserInfo" href="mailto:Julianne.OConner@kory.org">
      Patricia Lebsack
    </a>
  </article>
</section>; */
}
