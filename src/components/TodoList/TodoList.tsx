import React from 'react';
import { TodoInfo } from '../TodoInfo';
import { Todo } from '../Types/Todo';

interface TodoListProps {
  todos: Todo[];
}

export const TodoList: React.FC<TodoListProps> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo
          todo={todo}
          key={todo.id}
        />
      ))}
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
  );
};
