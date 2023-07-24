function copmareAll(prevProps, nextProps) {
  return Object.keys(nextProps).every(
    key => prevProps[key] === nextProps[key],
  );
}

export function memo(Component, arePropsEqual = copmareAll) {
  let prevProps;
  let prevJSX;

  return (nextProps) => {
    if (!prevProps || !arePropsEqual(prevProps, nextProps)) {
      prevJSX = Component(nextProps);
    }

    prevProps = nextProps;

    return prevJSX;
  };
}
