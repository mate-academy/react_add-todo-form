export const handleChooseUser = (
  event: React.ChangeEvent<HTMLSelectElement>,
  setValue: React.Dispatch<React.SetStateAction<number>>,
  setShowErrorUserIsNotChoosen: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  setValue(+event.target.value);
  if (event.target.value.length === 0) {
    setShowErrorUserIsNotChoosen(true);
  }
};
