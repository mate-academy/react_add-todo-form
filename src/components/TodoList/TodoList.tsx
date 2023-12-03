import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo';

type Props = {
  todosToView: Todo[]
};

export const TodoList: React.FC<Props> = ({ todosToView }) => {
  return (
    <section className="TodoList">
      {todosToView.map(todo => (
        <TodoInfo todo={todo} />
      ))}
    </section>
  );
};
