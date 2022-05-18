type Todo = {
  userId: number,
  id: number,
  title: string,
  completed: boolean,
  user: string | undefined,
};

interface Props {
  todos: Todo[],
}

export const TodoList = ({ todos }: Props) => {
  return (
    <div>
      <span className="todo__title">ToDo list</span>
      <div className="todo__list">
        <ul className="todo">
          {
            [...todos].reverse().map((todo) => (
              <li className="todo__list-item" key={todo.id}>
                <p>{todo.user || 'anonymus'}</p>
                <p>{todo.title}</p>
                <label>
                  <input
                    className="task"
                    type="checkbox"
                    checked={todo.completed}
                  />
                  Done
                </label>
              </li>
            ))
          }
        </ul>
      </div>
    </div>
  );
};
