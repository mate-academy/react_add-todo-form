import { Todo } from '../../types/todosTypes';
import { User } from '../../types/userTypes';
import { FC, useState } from 'react';
import React from 'react';

type NewTodoFormProps = {
  todoList: Todo[];
  users: User[];
  setTodoList?: React.Dispatch<React.SetStateAction<Todo[]>>;
  onAdd?: (payload: { title: string; userId: number }) => void;
};

export const NewTodoForm: FC<NewTodoFormProps> = ({
  todoList,
  setTodoList,
  users,
  onAdd,
}) => {
  //Const
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState<number | ''>('');
  //Errors
  const isTitleValid = title.trim() !== '';
  const isUserValid = userId !== '';
  const [showTitleError, setShowTitleError] = useState(false);
  const [showUserError, setShowUserError] = useState(false);
  //Submit
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = event => {
    event.preventDefault();

    setShowTitleError(true);
    setShowUserError(true);

    if (!isTitleValid || !isUserValid) {
      return;
    }

    const maxId = todoList.length ? Math.max(...todoList.map(t => t.id)) : 0;
    const newId = maxId + 1;

    const user = users.find(u => u.id === Number(userId)) || null;
    const newToDo = {
      id: newId,
      title: title.trim(),
      userId: +userId,
      completed: false,
      user,
    };

    if (typeof setTodoList === 'function') {
      setTodoList(prev => [...prev, newToDo]);
    }

    if (typeof onAdd === 'function') {
      onAdd(newToDo);
    }

    setTitle('');
    setUserId('');
    setShowTitleError(false);
    setShowUserError(false);
  };

  return (
    <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
      <div className="field">
        <input
          /*Title*/
          type="text"
          placeholder="Title"
          data-cy="titleInput"
          value={title}
          onChange={event => {
            setTitle(event.target.value);
            if (showTitleError) {
              setShowTitleError(false);
            }
          }}
        />
        {showTitleError && !isTitleValid && (
          <span className="error">Please enter a title</span>
        )}
      </div>
      <div className="field">
        <select
          data-cy="userSelect"
          value={userId === '' ? '' : String(userId)}
          onChange={event => {
            setUserId(+event.target.value);
            if (showUserError) {
              setShowUserError(false);
            }
          }}
        >
          <option value="">Choose a user</option>
          {users.map(u => (
            <option key={u.id} value={u.id}>
              {u.name}
            </option>
          ))}
        </select>
        {showUserError && !isUserValid && (
          <span className="error">Please choose a user</span>
        )}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
