import React from 'react';
import './App.css';
import users from './api/users';
import todos from './api/todos';
import { TodoList } from './components/TodoList';
import { AddTodoForm } from './components/AddTodoForm';

const names = users.map(({ name, id }) => (
  {
    name, id,
  }
));

class App extends React.Component {
  state = {
    todoList: todos,
    defaultSelectValue: '0',
    nextTodoId: 3,
  }

  createId = (id) => {
    let nextId = id;

    return () => {
      const previousId = nextId;

      nextId += 1;
      this.setState({ nextTodoId: nextId });

      return previousId;
    };
  }

  handleTodoData = (title, userId) => {
    const idGenerator = this.createId(this.state.nextTodoId);
    const id = idGenerator();
    const newTodo = {
      userId: Number(userId), title, id, completed: false,
    };

    this.setState(prevState => (
      { todoList: [...prevState.todoList, newTodo] }
    ));
  }

  handleSelect = data => this.setState({ defaultSelectValue: data });

  render() {
    const { todoList, defaultSelectValue } = this.state;

    return (
      <div className="App">
        <h1>Add todo form</h1>

        <p>
          <span>Users: </span>
          {users.length}
        </p>
        <AddTodoForm
          sendTodoData={this.handleTodoData}
          names={names}
          selectValue={defaultSelectValue}
          selectOnChange={this.handleSelect}
        />
        <TodoList tasks={todoList} />
      </div>
    );
  }
}

export default App;
