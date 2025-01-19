import { useForm, SubmitHandler } from 'react-hook-form';
import { User } from '../../Types/User';
import { maxId } from '../../App';
import { getUserById } from '../../App';

type Props = {
  users: User[];
  onAdd: (newTodo: any) => void;
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
      id: maxId,
      title: data.title,
      userId: Number(data.userId),
      completed: false,
      user: getUserById(+data.userId),
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
          <span className="error">Please enter a title</span>
        )}
      </div>

      <div className="field">
        <label>
          User:
          <select
            data-cy="userSelect"
            {...register('userId', { required: 'Please choose a user' })}
          >
            <option value="0">Choose a user</option>

            {users.map(user => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </label>

        {errors.userId?.message && (
          <span className="error">Please choose a user</span>
        )}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
