interface Props extends NumberField {}

const Number = (props: Props) => {
  return (
    <div>
      <span>{props.title}</span>
      <input type="number" min={props.min} max={props.max} />
    </div>
  );
};

export default Number;
