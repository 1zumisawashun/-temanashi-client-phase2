import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

interface IconButtonProps {
  styleName?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const CloseButton: React.VFC<IconButtonProps> = ({ styleName, onClick }) => {
  return (
    <div className={styleName}>
      <IconButton aria-label="delete" onClick={onClick}>
        <CloseIcon />
      </IconButton>
    </div>
  );
};

const DeleteButton: React.VFC<IconButtonProps> = ({ styleName, onClick }) => {
  return (
    <div className={styleName}>
      <IconButton aria-label="delete" onClick={onClick}>
        <DeleteIcon />
      </IconButton>
    </div>
  );
};

const CountUpButton: React.VFC<IconButtonProps> = ({ styleName, onClick }) => {
  return (
    <div className={styleName}>
      <IconButton aria-label="delete" onClick={onClick}>
        <AddCircleOutlineIcon />
      </IconButton>
    </div>
  );
};

const CountDownButton: React.VFC<IconButtonProps> = ({
  styleName,
  onClick,
}) => {
  return (
    <div className={styleName}>
      <IconButton aria-label="delete" onClick={onClick}>
        <RemoveCircleOutlineIcon />
      </IconButton>
    </div>
  );
};

export { CloseButton, DeleteButton, CountUpButton, CountDownButton };
