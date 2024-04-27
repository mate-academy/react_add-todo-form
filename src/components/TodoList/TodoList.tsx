import { TodoItem } from '../../types/todoItem';
import { TodoInfo } from '../TodoInfo';

interface Props {
  todos: TodoItem[];
}

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo key={todo.id} todo={todo} />
      ))}
    </section>
  );
};

/**
Validation to the form:
- before creating a todo, check if a `user` was selected; if not, show an error message next to the `select` (`Please choose a user`);
- if the `title` is empty, show an error message next to the `title` field (`Please enter a title`);
- errors should appear only after clicking the `Add` button;
- hide the message immediately after any change of the field with an error;
1. If the form is valid, add a todo to the list and clear the form.
*/
