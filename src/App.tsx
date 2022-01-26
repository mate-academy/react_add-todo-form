import React from 'react';
import './App.scss';

import { TodosList } from './components/TodosList/TodosList';
import { AddTodosForm } from './components/AddTodosForm/AddTodosForm';
import { preparedTodos } from './helpers';

type Props = {};
type State = {
  visibleTodos: Todo[],
};

class App extends React.PureComponent<Props, State> {
  state: State = {
    visibleTodos: [...preparedTodos],
  };

  addNewTodo = (newTodo: Todo) => {
    this.setState((prevState) => ({
      visibleTodos: [...prevState.visibleTodos, newTodo],
    }));
  };

  render(): React.ReactNode {
    const { visibleTodos } = this.state;

    return (
      <div className="App">
        <h1 className="App__title">Add todo form</h1>

        <AddTodosForm todos={visibleTodos} addNewTodo={this.addNewTodo} />
        <TodosList todos={visibleTodos} />
      </div>
    );
  }
}

export default App;
