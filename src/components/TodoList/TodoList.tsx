interface TodoListProps {
  todos: {
    id: number;
    title: string;
    completed: boolean;
    userId: number;
    user: {
      id: number;
      name: string;
      username: string;
      email: string;
    };
  }[];
  todoComponent: React.ComponentType<{
    todo: {
      id: number;
      title: string;
      completed: boolean;
      userId: number;
      user: {
        id: number;
        name: string;
        username: string;
        email: string;
      };
    };
  }>;
}

export const TodoList = ({
  todos,
  todoComponent: TodoComponent,
}: TodoListProps) => {
  return (
    <section className="TodoList">
      {todos.map((todo) => (
        <TodoComponent key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
