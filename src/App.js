import React from 'react';
import './App.css';

import Input from './Input';
import List from './List';

class App extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      list: [],
    };

    this.addElement = this.addElement.bind(this);
  }

  addElement(newLine) {
    this.setState(prevState => ({
      list: [...prevState.list, newLine],
    }));
  }

  render() {
    return (
      <div className="App">
        <h1>list of todos</h1>
        <Input onSubmitted={this.addElement} />
        <List item={this.state.list} />
      </div>
    );
  }
}

export default App;
