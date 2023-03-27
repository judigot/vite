import React from "react";

import Text from "./components/fields/Text";
import Number from "./components/fields/Number";
import Boolean from "./components/fields/Boolean";
import Dropdown from "./components/fields/Dropdown";

interface Props {
  form: MasterField[];
}

const FormBuilder: React.FC<Props> = ({}: Props) => {
  const form: MasterField[] = props.form;

  return (
    <>
      {form &&
        form.map((field: MasterField, i: number) => {
          switch (field.type) {
            case "text":
              return <Text key={i} {...field} />;

            case "number":
              return <Number key={i} {...field} />;

            case "boolean":
              return <Boolean key={i} {...field} />;

            case "dropdown":
              return <Dropdown key={i} {...field} />;

            default:
              break;
          }
        })}
    </>
  );
};

export default FormBuilder;
