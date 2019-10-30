import React from 'react';
import PropTypes from 'prop-types';

class TodoRows extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <tr>
        <td className="cell">{this.props.todo.textTodo}</td>
        <td className="cell">{this.props.todo.selectName}</td>
        <td className="negative">
          <i className="icon close" />
          {this.props.todo.complete.toString()}
        </td>
      </tr>
    );
  }
}

TodoRows.propTypes = {
  todo: PropTypes.shape({
    textTodo: PropTypes.string,
    selectName: PropTypes.string,
    complete: PropTypes.bool,
  }).isRequired,
};

export default TodoRows;
