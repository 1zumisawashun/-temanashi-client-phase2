import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import UndoIcon from "@mui/icons-material/Undo";
import StorefrontIcon from "@mui/icons-material/Storefront";

interface IconButtonProps {
  styleName?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  color?:
    | "inherit"
    | "default"
    | "primary"
    | "secondary"
    | "error"
    | "info"
    | "success"
    | "warning";
  size?: "small" | "medium" | "large";
}

const CloseButton: React.VFC<IconButtonProps> = ({
  styleName,
  onClick,
  color,
  size,
}) => {
  return (
    <div className={styleName}>
      <IconButton
        aria-label="delete"
        onClick={onClick}
        color={color}
        size={size}
      >
        <CloseIcon />
      </IconButton>
    </div>
  );
};

const DeleteButton: React.VFC<IconButtonProps> = ({
  styleName,
  onClick,
  color,
  size,
}) => {
  return (
    <div className={styleName}>
      <IconButton
        aria-label="delete"
        onClick={onClick}
        color={color}
        size={size}
      >
        <DeleteIcon />
      </IconButton>
    </div>
  );
};

const CountUpButton: React.VFC<IconButtonProps> = ({
  styleName,
  onClick,
  color,
  size,
}) => {
  return (
    <div className={styleName}>
      <IconButton
        aria-label="delete"
        onClick={onClick}
        color={color}
        size={size}
      >
        <AddCircleOutlineIcon />
      </IconButton>
    </div>
  );
};

const CountDownButton: React.VFC<IconButtonProps> = ({
  styleName,
  onClick,
  color,
  size,
}) => {
  return (
    <div className={styleName}>
      <IconButton
        aria-label="delete"
        onClick={onClick}
        color={color}
        size={size}
      >
        <RemoveCircleOutlineIcon />
      </IconButton>
    </div>
  );
};

const FavoriteButton: React.VFC<IconButtonProps> = ({
  styleName,
  onClick,
  color,
  size,
}) => {
  return (
    <div className={styleName}>
      <IconButton
        aria-label="delete"
        onClick={onClick}
        color={color}
        size={size}
      >
        <FavoriteIcon />
      </IconButton>
    </div>
  );
};

const NoFaviruteButton: React.VFC<IconButtonProps> = ({
  styleName,
  onClick,
  color,
  size,
}) => {
  return (
    <div className={styleName}>
      <IconButton
        aria-label="delete"
        onClick={onClick}
        color={color}
        size={size}
      >
        <FavoriteBorderIcon />
      </IconButton>
    </div>
  );
};

const PersonButton: React.VFC<IconButtonProps> = ({
  styleName,
  onClick,
  color,
  size,
}) => {
  return (
    <div className={styleName}>
      <IconButton
        aria-label="delete"
        onClick={onClick}
        color={color}
        size={size}
      >
        <AccountCircleIcon />
      </IconButton>
    </div>
  );
};

const ThumbDownButton: React.VFC<IconButtonProps> = ({
  styleName,
  onClick,
  color,
  size,
}) => {
  return (
    <div className={styleName}>
      <IconButton
        aria-label="delete"
        onClick={onClick}
        color={color}
        size={size}
      >
        <ThumbDownIcon />
      </IconButton>
    </div>
  );
};

const ThumbUpButton: React.VFC<IconButtonProps> = ({
  styleName,
  onClick,
  color,
  size,
}) => {
  return (
    <div className={styleName}>
      <IconButton
        aria-label="delete"
        onClick={onClick}
        color={color}
        size={size}
      >
        <ThumbUpIcon />
      </IconButton>
    </div>
  );
};

const UndoButton: React.VFC<IconButtonProps> = ({
  styleName,
  onClick,
  color,
  size,
}) => {
  return (
    <div className={styleName}>
      <IconButton
        aria-label="delete"
        onClick={onClick}
        color={color}
        size={size}
      >
        <UndoIcon />
      </IconButton>
    </div>
  );
};

const StoreButton: React.VFC<IconButtonProps> = ({
  styleName,
  onClick,
  color,
  size,
}) => {
  return (
    <div className={styleName}>
      <IconButton aria-label="delete" onClick={onClick}>
        <StorefrontIcon />
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
  PersonButton,
  ThumbDownButton,
  ThumbUpButton,
  UndoButton,
  StoreButton,
};
