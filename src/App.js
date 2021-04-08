import React from 'react';
import './App.css';

import users from './api/users';
import todos from './api/todos';

import { TodoList } from './components/TodoList';
import { Form } from './components/Form';

const preparedTodos = todos.map(todo => ({
  ...todo,
  user: users.find(person => person.id === todo.userId),
}));

export class App extends React.Component {
  state = {
    visibleList: preparedTodos,
  }

  addInList = (newTodo) => {
    const { visibleList } = this.state;
    const newVisiblelist = [...visibleList];
    const preparedTodo = newTodo;

    preparedTodo.id = visibleList[visibleList.length - 1].id + 1;

    newVisiblelist.push(preparedTodo);

    this.setState({
      visibleList: newVisiblelist,
    });
  }

  render() {
    const { visibleList } = this.state;

    return (
      <div className="App">
        <h1>Add todo form</h1>
        <Form
          visibleList={visibleList}
          users={users}
          addInList={this.addInList}
        />
        <TodoList visibleList={visibleList} />
      </div>
    );
  }
}

export default App;
