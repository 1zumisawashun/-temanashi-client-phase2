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

interface ButtonIconProps {
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

export const ButtonIconClose: React.VFC<ButtonIconProps> = ({
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

export const ButtonIconDelete: React.VFC<ButtonIconProps> = ({
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

export const ButtonIconCountUp: React.VFC<ButtonIconProps> = ({
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

export const ButtonIconCountDown: React.VFC<ButtonIconProps> = ({
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

export const ButtonIconFavorite: React.VFC<ButtonIconProps> = ({
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

export const ButtonIconNoFavirute: React.VFC<ButtonIconProps> = ({
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

export const ButtonIconPerson: React.VFC<ButtonIconProps> = ({
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

export const ButtonIconThumbDown: React.VFC<ButtonIconProps> = ({
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

export const ButtonIconThumbUp: React.VFC<ButtonIconProps> = ({
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

export const ButtonIconUndo: React.VFC<ButtonIconProps> = ({
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

export const ButtonIconStore: React.VFC<ButtonIconProps> = ({
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
