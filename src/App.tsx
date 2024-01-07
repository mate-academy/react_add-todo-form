import { useState } from 'react';
import './App.scss';
import { Render } from './rendering/Render';
import { Todo } from './types/Todo';
import todos from './api/todos';

export const App = () => {
  const [list, setList] = useState<Todo[]>(todos);

  const addList = (newList: Todo) => {
    setList((currentList) => [...currentList, newList]);
  };

  return (
    <div>
      <div className="App">
        <h1>Add todo form</h1>
        <Render
          todoList={list}
          onSubmit={addList}
        />
        <section className="TodoList">
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
        </section>
      </div>
    </div>
  );
};
