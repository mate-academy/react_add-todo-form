import React from 'react';
import { Grid } from 'semantic-ui-react';
import TodoList from './components/todoList/TodoList';
import 'semantic-ui-css/semantic.min.css';
import './App.css';

function App() {
  return (
    <Grid container centered className="App">
      <TodoList />
    </Grid>
  );
}

export default App;
