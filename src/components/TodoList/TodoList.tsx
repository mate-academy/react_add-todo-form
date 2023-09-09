import React from 'react';
import TodoInfo from '../TodoInfo/TodoInfo';

interface Todo {
  id: number
  title: string,
  completed: boolean,
  userId: number | string,
}

interface TodoListProps {
  todos: Todo[];
  users: {
    id: number;
    name: string;
    email: string;
  }[];
}

const TodoList: React.FC<TodoListProps> = ({ todos, users }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => {
        const user = users.find(u => u.id === todo.userId);

        return (
          <TodoInfo
            key={todo.id}
            id={todo.id}
            title={todo.title}
            completed={todo.completed}
            userId={todo.userId}
            userEmail={user?.email}
            userName={user?.name}
          />
        );
      })}
    </section>
  );
};

export default TodoList;
