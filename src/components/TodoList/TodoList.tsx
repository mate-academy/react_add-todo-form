import React from 'react';
import { TodoInfo } from '../TodoInfo';
import { Todo } from '../../types/Todo';

interface Props {
  todos: Todo[]
}

export const TodoList: React.FC<Props> = ({ todos }) => (
  <>
    {todos.map(todo => <TodoInfo key={todo.id} todo={todo} />)}
  </>
);
