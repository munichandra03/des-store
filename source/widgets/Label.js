export const Label = (props) => {
  return (
    <>
      {props.children ? (
        <label className="" {...props}>
          {props.children}
        </label>
      ) : (
        ""
      )}
      {props.content ? (
        <label className="" {...props}>
          {props.content}
        </label>
      ) : (
        ""
      )}
    </>
  );
};
