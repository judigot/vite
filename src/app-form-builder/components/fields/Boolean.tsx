import React from "react";

interface Props extends BooleanField {}

const Boolean = (props: Props) => {
  const [checked, setChecked] = React.useState(props.isChecked);

  const handleClick = (_e: React.ChangeEvent) => {
    setChecked(!checked);
  };
  return (
    <div>
      <span>{props.title}</span>
      <input
        type="checkbox"
        id=""
        name=""
        checked={checked}
        onChange={handleClick}
      />
    </div>
  );
};

export default Boolean;
