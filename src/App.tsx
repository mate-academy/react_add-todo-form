import React, { useState } from 'react';

import './App.scss';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
// import { User } from './types/User';
//import { Todo } from './types/Todo';
//import { Todos } from './types/Todos';
interface Todo {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
}

export const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [isTitle, setIsTitle] = useState(false);
  const [userId, setUserId] = useState(0);
  const [isUserId, setIsUserId] = useState(false);
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([
    ...todosFromServer,
  ]);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setIsTitle(false);
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setIsUserId(false);
  };

  const addSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!title || userId === 0) {
      return;
    }

    setVisibleTodos([
      ...visibleTodos,
      {
        id: visibleTodos.length + 1,
        title: title,
        completed: false,
        userId: userId,
      },
    ]);

    setTitle('');
    setUserId(0);
    setIsTitle(true);
    setIsUserId(true);
  };

  /**  const todos = visibleTodos.map((item, index) => {
    return (
      <article
        key={index}
        data-id="1"
        className={cn('TodoInfo', {
          'TodoInfo--completed': item.completed,
        })}
      >
        <h2 className="TodoInfo__title">{item.title}</h2>

        <a className="UserInfo" href="mailto:Sincere@april.biz">
          {getUserById(item.userId)?.name}
        </a>
      </article>
    );
  }); */

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={addSubmit}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            value={title}
            onChange={handleTitleChange}
          />

          {isTitle && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={userId}
            onChange={handleUserChange}
          >
            {usersFromServer.map(item => (
              <option value={item.id} key={item.id}>
                {item.name}
              </option>
            ))}
          </select>

          {isUserId && (
            <span className="error">Please choose a user{userId}</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
      <TodoList todos={visibleTodos} />
    </div>
  );
};
/**
 * <article data-id="1" className="TodoInfo TodoInfo--completed">
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
 */
