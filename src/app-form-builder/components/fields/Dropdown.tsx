import React from "react";
interface Props extends DropdownField {}

const Dropdown = (props: Props) => {
  const [selected, setSelected] = React.useState<number | undefined>(
    props.default
  );

  const options: string[] | undefined = props?.options;

  return (
    <div>
      <label>{props.title}</label>
      <select name="" id="" defaultValue={options![selected!]}>
        {options &&
          options.map((option: string, i: number) => {
            return (
              <option key={i} value={option}>
                {option}
              </option>
            );
          })}
      </select>
    </div>
  );
};

export default Dropdown;
