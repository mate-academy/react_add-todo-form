import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form } from 'react-bootstrap';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';

type State = {
  id: number;
  todoTitle: string;
  userId: string;
  isUserChoosed: boolean;
  isTodoInclude: boolean;
};

type Props = {
  users: User[];
  setNewTodo: (todo: Todo) => void;
};

export class TodoForm extends React.Component<Props, State> {
  state: State = {
    id: 1,
    todoTitle: '',
    userId: '0',
    isUserChoosed: false,
    isTodoInclude: false,
  };

  handleChangeUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    this.setState({
      userId: value,
      isUserChoosed: false,
    });
  };

  handleChangeTask = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    this.setState({
      todoTitle: value,
      isTodoInclude: false,
    });
  };

  addTodo = () => {
    const { id, userId, todoTitle } = this.state;
    const { users } = this.props;

    if (+userId === 0 || todoTitle.trim().length === 0) {
      this.setState(state => ({
        isUserChoosed: !+state.userId,
        isTodoInclude: !+state.todoTitle.trim().length,
      }));

      return;
    }

    const todo: Todo = {
      user: users.find(user => user.id === +userId) || null,
      userId: +userId,
      id,
      title: todoTitle.toLocaleUpperCase(),
      completed: false,
    };

    this.props.setNewTodo(todo);

    this.setState(state => (
      {
        id: state.id + 1,
        todoTitle: '',
        userId: '',
        isUserChoosed: false,
        isTodoInclude: false,
      }
    ));
  };

  render() {
    const {
      userId,
      todoTitle,
      isTodoInclude,
      isUserChoosed,
    } = this.state;

    const { users } = this.props;

    return (
      <Form
        className="form mb-3"
        onSubmit={(event) => {
          event.preventDefault();
          this.addTodo();
        }}
      >
        <Form.Label
          htmlFor="task"
          className="form__label"
        >
          <Form.Control
            className="form__todo_input"
            type="text"
            id="task"
            placeholder="Write your task"
            value={todoTitle}
            onChange={this.handleChangeTask}
          />
        </Form.Label>

        {isTodoInclude && (
          <p className="form__alert">
            Please, enter todo title
          </p>
        )}

        <Form.Label
          htmlFor="selectedUser"
          className="form__label"
        >
          <Form.Select
            name="selectedUser"
            id="selectedUser"
            value={userId}
            onChange={this.handleChangeUser}
          >
            <option value={0}>
              Choose user
            </option>
            {users.map(user => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </Form.Select>
        </Form.Label>

        {isUserChoosed && (
          <p className="form__alert">
            Please, choose user
          </p>
        )}

        <Button
          variant="primary"
          type="submit"
        >
          Add Todo
        </Button>
      </Form>
    );
  }
}
