import React from 'react';
import { TodoInfo } from '../TodoInfo';

export interface UserType {
  id: number;
  name: string;
  username: string;
  email: string;
}

export interface TodoType {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
  user: UserType;
}

interface TodoListType {
  todos: TodoType[];
}

export const TodoList: React.FC<TodoListType> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => {
        return (
          <React.Fragment
            key={todo.id + Math.ceil(Math.random() * 1000) / 1000}
          >
            <TodoInfo todo={todo} />
          </React.Fragment>
        );
      })}
    </section>
  );
};
