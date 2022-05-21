import FormControl from "@mui/material/FormControl";
import styled from "@emotion/styled";
import Select, { SingleValue } from "react-select";

const StyledFormControl = styled(FormControl)`
  width: 100%;
  // background-color: white;
`;

const StyledLabel = styled("p")`
  margin-bottom: 4px;
  font-size: 12px;
  font-weight: 600;
`;

export type SelectFormProps = {
  className?: string;
  id?: string;
  labelId?: string;
  label?: string;
  // value: string;
  onChange: (event: SingleValue<OptionProps>) => void;
  options: OptionProps[];
  placeholder?: string;
  disabled?: boolean;
  isLoading?: boolean;
  defaultValue?: string;
};

export interface OptionProps {
  value: string;
  label: string;
}

const InputSelect: React.VFC<SelectFormProps> = ({
  className,
  id,
  labelId,
  label,
  // value,
  onChange,
  options,
  placeholder,
  disabled = false,
  isLoading = false,
  defaultValue = "",
}) => {
  return (
    <StyledFormControl className={className}>
      {label && <StyledLabel id={labelId}>{label}</StyledLabel>}
      <Select
        // id={id}
        // labelId={labelId}
        // value={value}
        options={options}
        onChange={onChange}
        // disabled={disabled || options.length === 0 || isLoading}
        // defaultValue={defaultValue}
        // displayEmpty
        // renderValue={() => {
        //   // NOTE: 下記コードが原因で不必要なレンダリング起きているかもしれない
        //   if (isLoading) return <CircularProgress size={20} />;
        //   if (value === "") return <Placehoplder>{placeholder}</Placehoplder>;
        //   return options.find((option) => option.value === value)?.label;
        // }}
      />
    </StyledFormControl>
  );
};

export default InputSelect;
