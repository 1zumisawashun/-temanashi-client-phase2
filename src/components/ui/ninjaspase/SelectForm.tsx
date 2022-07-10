import MenuItem from "@mui/material/MenuItem";
import { FormControlLabel } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import CircularProgress from "@mui/material/CircularProgress";
import styled from "@emotion/styled";

const StyledFormControl = styled(FormControlLabel)`
  background-color: transparent;
  justify-content: space-between;
  display: flex;
  color: #84bcb4;
  margin: 0 0 0 20px;
  font-weight: bold;
  text-align: end;
`;

const CustomSelect = styled(Select)`
  width: 60%;
`;

const Placehoplder = styled("p")`
  color: gray;
`;

export type SelectFormProps = {
  className?: string;
  id?: string;
  labelId?: string;
  label?: string;
  value: string;
  onChange: (event: SelectChangeEvent<unknown>) => void;
  options: OptionProps[];
  placeholder?: string;
  disabled?: boolean;
  isLoading?: boolean;
  defaultValue?: string;
};

export type OptionProps = {
  value: string;
  label: string;
};

export const SelectForm: React.VFC<SelectFormProps> = ({
  id,
  labelId,
  label = "営業開始時間",
  value,
  onChange,
  options,
  placeholder,
  disabled = false,
  isLoading = false,
  defaultValue = "",
}) => {
  return (
    <StyledFormControl
      control={
        <CustomSelect
          onChange={onChange}
          id={id}
          labelId={labelId}
          value={value}
          disabled={disabled || options.length === 0 || isLoading}
          defaultValue={defaultValue}
          displayEmpty
          variant="standard"
          disableUnderline
          sx={{ m: 2 }}
          renderValue={() => {
            // NOTE: 下記コードが原因で不必要なレンダリング起きているかもしれない
            if (isLoading) return <CircularProgress size={20} />;
            if (value === "") return <Placehoplder>{placeholder}</Placehoplder>;
            return options.find((option) => option.value === value)?.label;
          }}
        >
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </CustomSelect>
      }
      label={label}
      labelPlacement="start"
    />
  );
};
