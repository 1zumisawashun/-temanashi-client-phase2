import {
  MenuItem,
  TextField,
  InputAdornment,
  IconButton,
  CircularProgress,
} from "@mui/material";
import styled from "@emotion/styled";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { UseFormRegisterReturn } from "react-hook-form";

const Wrapper = styled("div")`
  background-color: transparent;
  display: flex;
  color: #84bcb4;
  margin: 20px;
  font-weight: bold;
`;

const Label = styled("label")`
  width: 20%;
  margin: auto 0;
  font-size: 16px;
`;

const CustomTextField = styled(TextField)`
  width: 80%;
  .MuiOutlinedInput-root {
    padding: 0;
    /* fieldset {
      border: none;
    }
    &:hover fieldset {
      border: none;
    }
    &.Mui-focused fieldset {
      border: none;
    } */
  }
`;

const CustomInputAdornment = styled(InputAdornment)`
  position: absolute;
  padding: 0;
  right: 10px;
  top: 50%;
`;

const Placehoplder = styled("p")`
  color: gray;
`;

export type SelectFormProps = {
  // NOTE:アクション
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  // NOTE:エラーハンドリング
  register?: UseFormRegisterReturn;
  error?: boolean;
  helperText?: string;
  // NOTE:必須項目
  id?: string;
  labelId?: string;
  label?: string;
  value: string;
  options: OptionProps[];
  placeholder?: string;
  disabled?: boolean;
  isLoading?: boolean;
  //NOTE:追加項目
  defaultValue?: string;
};

export type OptionProps = {
  value: string;
  label: string;
};

export const SelectForm: React.VFC<SelectFormProps> = ({
  onChange,
  register,
  error = false,
  helperText = "",
  id,
  labelId = "select",
  label = "営業開始時間",
  value,
  options,
  placeholder,
  disabled = false,
  isLoading = false,
  defaultValue = "",
}) => {
  return (
    <Wrapper>
      <Label id={labelId}>{label}</Label>
      <CustomTextField
        id={id}
        select
        value={value}
        disabled={disabled || options.length === 0 || isLoading}
        onChange={onChange}
        helperText={helperText}
        error={error}
        SelectProps={{
          labelId,
          MenuProps: {
            // disableScrollLock: true,
          },
          defaultValue,
          IconComponent: () => null,
          renderValue: () => {
            if (isLoading)
              return <CircularProgress size={25} color="primary" />;
            if (value === "") return <Placehoplder>{placeholder}</Placehoplder>;
            return options.find((option) => option.value === value)?.label;
          },
        }}
        InputProps={{
          endAdornment: (
            <CustomInputAdornment position="end">
              <IconButton>
                <ArrowForwardIosIcon />
              </IconButton>
            </CustomInputAdornment>
          ),
        }}
        {...register}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </CustomTextField>
    </Wrapper>
  );
};
