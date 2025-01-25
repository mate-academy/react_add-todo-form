import { useForm, SubmitHandler } from 'react-hook-form';
import { User } from '../../types/User';
import { Todos } from '../../types/Todos';

type Props = {
  users: User[];
  onAdd: (newTodo: Omit<Todos, 'id' | 'user'>) => void;
};

type FormValue = {
  title: string;
  userId: string;
};

export const AppForm: React.FC<Props> = ({ users, onAdd }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValue>();

  const onSubmit: SubmitHandler<FormValue> = data => {
    const newTodo = {
      userId: Number(data.userId),
      title: data.title,
      completed: false,
    };

    onAdd(newTodo);
    reset();
  };

  return (
    <form action="/api/todos" method="POST" onSubmit={handleSubmit(onSubmit)}>
      <div className="field">
        <label>
          Title:
          <input
            type="text"
            placeholder="Please enter a title"
            data-cy="titleInput"
            {...register('title', { required: 'Please enter a title' })}
          />
        </label>
        {errors.title?.message && (
          <span className="error">{errors.title.message}</span>
        )}
      </div>

      <div className="field">
        <label>
          User:
          <select
            data-cy="userSelect"
            {...register('userId', { required: 'Please choose a user' })}
          >
            <option value="">Choose a user</option>

            {users.map(user => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </label>

        {errors.userId?.message && (
          <span className="error">{errors.userId.message}</span>
        )}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
