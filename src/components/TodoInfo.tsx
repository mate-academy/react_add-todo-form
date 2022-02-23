type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => (
  <>
    <h2>
      {`task: ${todo.title}`}
    </h2>
    <h3>
      {`completed: ${todo.completed}`}
    </h3>
    {todo.user && (
      <div>
        <span>{`Name: ${todo.user.name}`}</span>
        <br />
        <span>{`Email: ${todo.user.email}`}</span>
      </div>
    )}
  </>
);
