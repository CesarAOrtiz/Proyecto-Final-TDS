import { Field, ErrorMessage } from "formik";

export const CustomError = (props) => (
  <ErrorMessage component={"span"} style={{ color: "red" }} {...props} />
);

export const CustomField = ({ name, messageProps, ...props }) => {
  return (
    <>
      <Field size="small" variant="outlined" fullWidth name={name} {...props} />
      <CustomError name={name} {...messageProps} />
    </>
  );
};

export default CustomField;
