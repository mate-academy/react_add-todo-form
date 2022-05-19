import React from 'react';

type Props = {
  [name: string]: boolean,
};

export const FormErrors:React.FC<Props> = (props) => {
  return (
    <div className="formErrors">
      {Object.keys(props).map((fieldName) => {
        if (!props[fieldName]) {
          switch (fieldName) {
            case 'isTitleValid':
              return (
                <p key={fieldName}>
                  title is empty
                </p>
              );
            case 'isUserValid':
              return (
                <p key={fieldName}>
                  please choose user
                </p>
              );
            default:
              break;
          }
        }

        return '';
      })}
    </div>
  );
};
