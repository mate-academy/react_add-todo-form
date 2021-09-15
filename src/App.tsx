import React from 'react';
import { uuid } from 'uuidv4';
import TodoList from './component/TodoList';
import users from './api/users';
import todos from './api/todos';
import { NewTodo } from './component/NewTodo';

interface State {
  formSubmitted: boolean,
  todosState: Todo[],
  title: string,
  user: User | null,
}

const preparedTodos: Todo[] = todos.map(todo => ({
  ...todo,
  id: uuid(),
  user: users.find(person => person.id === todo.userId) || null,
}));

class App extends React.Component<{}, State> {
  state: State = {
    formSubmitted: false,
    todosState: preparedTodos,
    title: '',
    user: null,
  };

  onChange = (event: { target: { value: string; }; }) => {
    const { value } = event.target;

    this.setState({
      title: value,
    });
  };

  addTodo = (newTodo: Todo) => {
    this.setState((prevState) => ({
      todosState: [...prevState.todosState, newTodo],
    }));
  };

  render() {
    const {
      todosState,
      formSubmitted,
      title,
      user,
    } = this.state;

    return (
      <div className="App">

        <div className="form">

          {formSubmitted && !user && (
            <div
              className="notification"
            >
              <span>
                Please choose a user
              </span>
            </div>
          )}

          {formSubmitted && !title && (
            <div
              className="notification"
            >
              <span>
                Please enter the title
              </span>
            </div>
          )}

          <NewTodo addTodo={this.addTodo} />
        </div>

        <table className="table">
          <thead>
            <tr>
              <th>Todo</th>
              <th>Status</th>
              <th>User Name</th>
            </tr>
          </thead>

          <tbody>
            <TodoList todoList={todosState} usersList={users} />
          </tbody>
        </table>
      </div>
    );
  }
}
export default App;
