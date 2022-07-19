import React from 'react';
import { Todo } from '../../types/types';
import TodoInfo from '../TodoInfo/TodoInfo';
import UserInfo from '../UserInfo/UserInfo';

type Props = {
  todos: Todo[]
};

const TodoList: React.FC<Props> = ({ todos }) => (
  <div className="list">
    {todos.map(el => (
      <div className="item" key={el.id}>
        <UserInfo user={el.user} />
        <div>{'-'.repeat(60)}</div>
        <TodoInfo
          title={el.title}
          completed={el.completed}
          userId={el.userId}
        />
      </div>
    ))}
  </div>
);

export default TodoList;
