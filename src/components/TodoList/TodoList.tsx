import { Todo, TodoInfo } from '../TodoInfo';

interface TodoProps {
  todoList: Todo[],
}

export const TodoList: React.FC<TodoProps> = ({ todoList }) => {
  return (
    <section className="TodoList">
      {todoList.map(elem => (
        <TodoInfo todo={elem} key={elem.id} />
      ))}
    </section>
  );
};
