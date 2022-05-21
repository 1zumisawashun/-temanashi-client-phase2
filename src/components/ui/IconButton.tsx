import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
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

const FavoriteButton: React.VFC<IconButtonProps> = ({ styleName, onClick }) => {
  return (
    <div className={styleName}>
      <IconButton aria-label="delete" onClick={onClick}>
        <FavoriteIcon />
      </IconButton>
    </div>
  );
};

const NoFaviruteButton: React.VFC<IconButtonProps> = ({
  styleName,
  onClick,
}) => {
  return (
    <div className={styleName}>
      <IconButton aria-label="delete" onClick={onClick}>
        <FavoriteBorderIcon />
      </IconButton>
    </div>
  );
};

export {
  CloseButton,
  DeleteButton,
  CountUpButton,
  CountDownButton,
  FavoriteButton,
  NoFaviruteButton,
};
