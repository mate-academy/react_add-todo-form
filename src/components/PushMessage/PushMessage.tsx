import React from 'react';
import './PushMessage.scss';

type Props = {
  title: string,
  chooseUser: string,
  isShownErrorMessageUser: boolean,
  isShownErrorMessageTitle: boolean,
};

export const PushMessage: React.FC<Props> = React.memo(
  ({
    title,
    chooseUser,
    isShownErrorMessageUser,
    isShownErrorMessageTitle,
  }) => (
    <div className="push-title">
      <h2>
        Please enter correct data
      </h2>
      {isShownErrorMessageUser && (
        <p>
          {chooseUser}
        </p>
      )}
      {isShownErrorMessageTitle && (
        <p>
          {title}
        </p>
      )}
    </div>
  ),
);
