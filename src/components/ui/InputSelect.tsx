import FormControl from "@mui/material/FormControl";
import styled from "@emotion/styled";
import Select, { MultiValue } from "react-select";
import { CSSProperties } from "react";

const StyledFormControl = styled(FormControl)`
  width: 100%;
  font-size: 16px;
  margin-top: 6px;
`;

const StyledLabel = styled("label")`
  margin-bottom: 4px;
  font-size: 12px;
  font-weight: bold;
`;

const ErrorText = styled("p")`
  font-weight: 400;
  font-size: 0.75rem;
  line-height: 1.66;
  letter-spacing: 0.03333em;
  text-align: left;
  margin-top: 3px;
  margin-right: 14px;
  margin-bottom: 0;
  margin-left: 14px;
  color: #d32f2f;
`;

// https://react-select.com/styles#style-object
const customStyles = (error = false) => {
  return {
    control: (provided: CSSProperties) => ({
      ...provided,
      color: "#84bcb4",
      height: "56px",
      marginTop: "6px",
      borderColor: error ? "#d32f2f" : "#999",
    }),
  };
};

export type OptionProps = {
  value: string;
  label: string;
};

export type SelectFormProps = {
  // value: string;
  label?: string;
  onChange: (event: MultiValue<OptionProps>) => void;
  options: OptionProps[];
  placeholder?: string;
  disabled?: boolean;
  isLoading?: boolean;
  error?: boolean;
  helperText?: string;
};

const InputSelect: React.VFC<SelectFormProps> = ({
  // value,
  label,
  onChange,
  options,
  placeholder = "カテゴリーを選択してください。",
  disabled = false,
  isLoading = false,
  error = false,
  helperText,
}) => {
  return (
    <StyledFormControl>
      {label && <StyledLabel htmlFor={label}>{label}</StyledLabel>}
      <Select
        // value={value}
        id={label}
        placeholder={placeholder}
        options={options}
        onChange={onChange}
        isMulti
        isDisabled={disabled}
        isLoading={isLoading}
        styles={customStyles(error)}
      />
      {error && <ErrorText>{helperText}</ErrorText>}
    </StyledFormControl>
  );
};

export default InputSelect;
