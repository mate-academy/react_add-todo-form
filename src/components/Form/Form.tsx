import { useState } from "react";
import usersFromServer from '../../api/users';
import todosFromServer from '../../api/todos';
import { Todo } from "../../types/types";

type Props = {
    addNewTodo: (todo: Todo) => void;
}

export const Form = ({ addNewTodo }: Props) => {
    const [title, setTitle] = useState('');
    const [hasTitleError, setHasTitleError] = useState(false);
    const [chooseUser, setChooseUser] = useState(0);
    const [hasUserError, setHasUserError] = useState(false);

    const todos: Todo[] = todosFromServer.map(todo => ({
        ...todo,
        user: usersFromServer.find(user => user.id === todo.userId) || null,
    }));

    function createGetNextId() {
        let maxId = 0;

        return () => {
            if (!maxId) {
                maxId = todos.reduce((acc, curr) => Math.max(acc, curr.id), maxId);
            }
            maxId++;

            return maxId;
        };
    }

    const getNextId = createGetNextId();

    const reset = () => {
        setTitle('');
        setChooseUser(0);
    };

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
        setHasTitleError(false);
    }

    const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setChooseUser(+event.target.value);
        setHasUserError(false);
    }

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        setHasTitleError(!title);
        setHasUserError(!chooseUser);

        const isValid = title && chooseUser;

        if (!isValid) {
            return;
        }
        
        addNewTodo({
            id: getNextId(),
            title,
            completed: false,
            userId: chooseUser,
        })

        reset();
    };

    return (
        <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
            <div className="field">
                <label htmlFor='post-title'>Title: </label>
                <input
                    id='post-title'
                    name="title"
                    type="text"
                    data-cy="titleInput"
                    value={title}
                    placeholder='Enter a title'
                    onChange={handleTitleChange}
                />
                {hasTitleError && (<span className="error">Please enter a title</span>)}
            </div>

            <div className="field">
                <label htmlFor='user'>User: </label>
                <select
                    id='user'
                    name="chooseUser"
                    data-cy="userSelect"
                    value={chooseUser}
                    onChange={handleUserChange}
                >
                    <option value='0' disabled>Choose a user</option>
                    {
                        usersFromServer.map(user =>
                            <option value={user.id} key={user.id}>
                                {user.name}
                            </option>
                        )
                    }
                </select>
                {hasUserError && (<span className="error">Please choose a user</span>)}
            </div>

            <button type="submit" data-cy="submitButton">
                Add
            </button>
        </form>
    )
}
