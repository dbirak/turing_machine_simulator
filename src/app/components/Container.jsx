const Container = (props) => {
  return (
    <div className="max-w-[1250px] p-7 mx-auto align-middle">
      {props.children}
    </div>
  );
};

export default Container;
