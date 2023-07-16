import { ReactNode, useState } from "react";
import TextField from "./TextField";
import Button from "../Button";
import Checkbox from "./Checkbox";
import Select from "./Select";

type IObject = {
  [name: string]: string | string[];
}

type FormProps = {
  inputs: {
    name: string,
    type: string,
    label: string,
    placeholder?: string
  }[];
  title?: string;
  onSubmit: (IObject) => void;
  children?: ReactNode[] | ReactNode;
}

export default function Form({ inputs, title, onSubmit, children }: FormProps) {
  const [state, setState] = useState({});

  const onChange = (e) => {
    const type = e.target.type
    let name = e.target.name, value = e.target.value;

    if (type === 'checkbox') {
      value = e.target.checked;
    }

    setState({ ...state, [name]: value });
  };

  const getField = (input) => {
    if (input.type === 'boolean') {
      return <Checkbox key={input.name} {...input} value={state[input.name]} onChange={onChange} />;
    } else if (input.enum?.length) {
      return <Select key={input.name} {...input} value={state[input.name]} onChange={onChange} />;
    }
    return <TextField key={input.name} {...input} onChange={onChange} value={state[input.name]} />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(state);
  }

  return (
    <form onSubmit={handleSubmit} method="post">
      <div className="flex justify-between mb-8">
        <h2 className="text-2xl">{title}</h2>
      </div>
      <fieldset>
        {inputs.map(input => (
          getField(input)
        ))}
      </fieldset>
      {children
        ? children
        : (
          <Button type="submit">
            Guardar
          </Button>
        )
      }
    </form>
  );
}
