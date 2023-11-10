import React from 'react';
import { TodoInfo } from '../TodoInfo';
import { getUserNameByUserId } from '../function/getUserNameByUserId';
import { Todo, User } from '../types/types';

type TodoListProps = {
  todos: Todo[];
  users: User[];
};

export const TodoList: React.FC<TodoListProps> = ({ todos, users }) => {
  return (
    <section className="TodoList">
      {todos.map((todo) => {
        const user = getUserNameByUserId(todo.userId, todos, users);

        if (!user) {
          return null;
        }

        return (
          <React.Fragment key={todo.id}>
            <TodoInfo todo={todo} user={user} />
          </React.Fragment>
        );
      })}
    </section>
  );
};
