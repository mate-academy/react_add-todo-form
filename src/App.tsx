export const App = () => {
  const maxId = todosFromServer.reduce(
    (max, todo) => (todo.id > max ? todo.id : max),
    0,
  );

  const [todosArray, setTodosArray] = useState(
    todosFromServer.map(createTodoArray),
  );
  const [todoTitle, setTodoTitle] = useState('');
  const [todoUser, setTodoUser] = useState('0');
  const [valueTitleEnter, setValueTitleEnter] = useState(true);
  const [valueUserSelekted, setValueUserSelekted] = useState(true);
  const handlerAdd: FormEventHandler = event => {
    event.preventDefault();
    const valueEnter = !(todoTitle === '');
    const valueSelekted = !(todoUser === '0');

    if (!valueEnter) {
      setValueTitleEnter(valueEnter);
    }

    if (!valueSelekted) {
      setValueUserSelekted(valueSelekted);
    }

    if (valueEnter && valueSelekted) {
      const newTodo = createTodoArray({
        id: maxId + 1,
        title: todoTitle,
        completed: false,
        userId: +todoUser,
      });

      setTodosArray([...todosArray, newTodo]);

      setTodoTitle('');
      setTodoUser('0');
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handlerAdd}>
        <div className="field">
          <label>
            Title:{' '}
            <input
              placeholder="Enter a title"
              type="text"
              data-cy="titleInput"
              value={todoTitle}
              onChange={event => {
                setValueTitleEnter(true);
                setTodoTitle(event.target.value);
              }}
            />
          </label>
          {!valueTitleEnter && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label>
            User:{' '}
            <select
              data-cy="userSelect"
              value={todoUser}
              onChange={event => {
                setValueUserSelekted(true);
                setTodoUser(event.target.value);
              }}
            >
              <option value="0" disabled>
                Choose a user
              </option>
              {usersFromServer.map(user => {
                return (
                  <option value={user.id} key={user.id}>
                    {user.name}
                  </option>
                );
              })}
            </select>
          </label>

          {!valueUserSelekted && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todosArray} />
    </div>
  );
};
