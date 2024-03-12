import { useState } from 'react';
import classNames from 'classnames';
import { TodoInfo } from '../TodoInfo';
import { UserInfo } from '../UserInfo';

type TodoItem = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
};

type UsersItem = {
  id: number;
  name: string;
  username: string;
  email: string;
};

interface TodoListProps {
  todos: TodoItem[];
  users: UsersItem[];
}

export const TodoList: React.FC<TodoListProps> = ({ users, todos }) => {
  const [usersData] = useState(users);
  const [todosData, setTodosData] = useState(todos);

  return (
    <>
      <TodoInfo
        usersData={usersData}
        todosData={todosData}
        setNewTodos={setTodosData}
      />
      <section className="TodoList">
        {todosData.map(item => (
          <article
            key={item.id}
            data-id={item.id}
            className={classNames('TodoInfo', {
              'TodoInfo--completed': item.completed,
            })}
          >
            <h2 className="TodoInfo__title">{item.title}</h2>
            {user && <UserInfo user={user} />}
          </article>
        ))}
      </section>
    </>
  );
};
