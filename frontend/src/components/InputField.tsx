import { ErrorMessage, Field, useField } from "formik";
import { InputHTMLAttributes } from "react";
import { useClient } from "urql";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
    name: string;
}

const InputField: React.FC<InputFieldProps> = (props) => {
    useClient();
    const [] = useField(props);
    return (
        <div>
        <label htmlFor="name">Name:</label>
        <Field type="text" id="name" name="name" />
        <ErrorMessage name="name" component="div" />
      </div>
    );
};

export default InputField;