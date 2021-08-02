import React from 'react';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';

const Message = ({ titleLength, isItChoosen, checkedLengthWord }) => (
  <div className="card__container">
    <Card.Text
      className="card__warning-title"
    >
      {(checkedLengthWord) && 'Enter the title!!! '}
    </Card.Text>
    <Card.Text
      className="card__warning-name"
    >
      {(isItChoosen) && 'Choose the name!!! '}
    </Card.Text>
    <Card.Text
      className="card__warning-title_length"
    >
      {(titleLength >= 30) && 'Max lenght is 30 !!!'}
    </Card.Text>
  </div>
);

Message.propTypes = {
  isItChoosen: PropTypes.bool.isRequired,
  titleLength: PropTypes.number.isRequired,
  checkedLengthWord: PropTypes.bool.isRequired,
};

export default Message;
