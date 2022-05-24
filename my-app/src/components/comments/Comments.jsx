import { React, useState } from "react";
import { DateTime } from "luxon";
import "./comments.css";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";

export default function Comments({ allComments, aComment, setComments }) {
  const [user, setUser] = useState(1);

  const handleDelete = async (e) => {
    try {
      await fetch(`http://localhost:9001/comments/${allComments.comment_id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const filtered = aComment.filter(
        (c) => c.comment_id != allComments.comment_id
      );
      setComments(filtered);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <List sx={{ width: "100%" }}>
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="" src={allComments.profile_pic} />
          </ListItemAvatar>
          <ListItemText
            className="comment-body"
            primary={allComments.comment_body}
            secondary={
              <>
                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                ></Typography>
                {allComments.username}{" "}
                {DateTime.fromISO(allComments.time_posted).toRelative()}
                {allComments.user_id === user && (
                  <IconButton aria-label="delete" className="delete-comment">
                    <DeleteIcon
                      className="delete-comment"
                      type="submit"
                      onClick={handleDelete}
                    />
                  </IconButton>
                )}
              </>
            }
          />
        </ListItem>
        <Divider variant="inset" component="li" />
      </List>
    </div>
  );
}
