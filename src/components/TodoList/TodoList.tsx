import { TodoInfo } from '../TodoInfo';

interface TodoListProps {
  todos: {
    id: number;
    title: string;
    completed: boolean;
    user?: {
      name: string
      email: string
    }
  }[];
}

export const TodoList: React.FC<TodoListProps> = ({ todos }) => (
  <section className="TodoList">
    {todos.map((item) => (
      <TodoInfo
        key={item.id}
        title={item.title}
        userName={item.user?.name || ''}
        userEmail={item.user?.email || ''}
        completed={item.completed}
        id={item.id}
      />
    ))}
  </section>
);
