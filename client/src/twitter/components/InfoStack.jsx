import Stack from "@mui/material/Stack";
import Badge from "@mui/material/Badge";
import Tooltip from "@mui/material/Tooltip";
import CachedIcon from "@mui/icons-material/Cached";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Keywords from "../../components/Keywords";

export const InfoStack = ({ tweet }) => {
  return (
    <Stack
      spacing={4}
      direction="row"
      justifyContent="flex-end"
      alignItems="center"
      sx={{ color: "action.active", py: 1 }}
    >
      <Badge style={{ flexGrow: 1 }}>
        <Keywords data={tweet} />
      </Badge>

      <Tooltip title="Likes">
        <Badge color="primary" badgeContent={tweet.public_metrics.like_count}>
          <FavoriteBorderIcon />
        </Badge>
      </Tooltip>

      <Tooltip title="Comentarios">
        <Badge color="primary" badgeContent={tweet.public_metrics.reply_count}>
          <ChatBubbleOutlineIcon />
        </Badge>
      </Tooltip>

      <Tooltip title="Retweets">
        <Badge color="primary" badgeContent={tweet.public_metrics.retweet_count}>
          <CachedIcon />
        </Badge>
      </Tooltip>
    </Stack>
  );
};

export default InfoStack;
