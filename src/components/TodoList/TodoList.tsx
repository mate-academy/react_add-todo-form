import React from 'react';
import { TodosInterFace } from '../../api/todos';
import { TodoInfo } from '../TodoInfo/TodoInfo';

interface Props {
  todos: TodosInterFace[];
}

export const TodoList: React.FC<Props> = ({ todos = [] }) => (
  <section className="TodoList">
    {todos.map((card) => (
      <div>
        <TodoInfo {...card} key={card.id} />
      </div>
    ))}
  </section>
);
