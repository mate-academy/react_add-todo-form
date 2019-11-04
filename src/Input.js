import React from 'react';

class Input extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      text: '',
    }

    this.textChang = this.textChang.bind(this);
    this.cliked = this.cliked.bind(this);
  }

  textChang (event) {
    this.setState({
      text: event.target.value,
    })
  }

  cliked (event) {
    event.preventDefault();
    this.props.onSubmitted(this.state.text);
    this.setState({
      text: '',
    });
  }

  render () {
    return (
      <>
        <form onSubmit={this.cliked}>
          <input type='text' value={this.state.text} onChange={this.textChang} />
        </form>
      </>
    );
  }
}

export default Input;
