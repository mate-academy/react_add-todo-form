import React from 'react';
import { Todo } from '../../types/types';
import TodoInfo from '../TodoInfo/TodoInfo';

type Props = {
  todos: Todo[]
};

const TodoList: React.FC<Props> = ({ todos }) => (
  <div className="list">
    {todos.map(el => (
      <div className="item" key={el.id}>
        <TodoInfo
          user={el.user}
          title={el.title}
          completed={el.completed}
          userId={el.userId}
        />
      </div>
    ))}
  </div>
);

export default TodoList;
