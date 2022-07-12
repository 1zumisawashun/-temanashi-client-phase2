import MenuItem from "@mui/material/MenuItem";
import { FormControlLabel, TextField, InputAdornment } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import CircularProgress from "@mui/material/CircularProgress";
import styled from "@emotion/styled";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import IconButton from "@mui/material/IconButton";

const StyledFormControl = styled("div")`
  background-color: transparent;
  justify-content: space-between;
  display: flex;
  color: #84bcb4;
  margin: 0 0 0 20px;
  font-weight: bold;
  .MuiInput-input {
    text-align: end;
  }
`;

const Text = styled(TextField)`
  width: 70%;
`;
const Label = styled("label")`
  margin: auto auto auto 0;
  font-size: 16px;
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
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
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
  labelId = "select",
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
    <StyledFormControl>
      <Label id={labelId}>{label}</Label>
      <Text
        id={id}
        select
        variant="standard"
        sx={{ m: 2 }}
        value={value}
        disabled={disabled || options.length === 0 || isLoading}
        onChange={onChange}
        SelectProps={{
          labelId,
          MenuProps: {
            disableScrollLock: true,
          },
          defaultValue,
          IconComponent: () => null,
          renderValue: () => {
            if (isLoading) return <CircularProgress size={20} />;
            if (value === "") return <Placehoplder>{placeholder}</Placehoplder>;
            return options.find((option) => option.value === value)?.label;
          },
        }}
        inputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton>
                <ArrowForwardIosIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Text>
    </StyledFormControl>
  );
};
