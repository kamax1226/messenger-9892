import React, { useState, useEffect } from "react";
import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { readMessages } from "../../store/utils/thunkCreators";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    marginLeft: 20,
    flexGrow: 1,
    alignItems: "center"
  },
  username: {
    fontWeight: "bold",
    letterSpacing: -0.2,
  },
  previewText: {
    fontSize: 12,
    color: "#9CADC8",
    letterSpacing: -0.17,
  },
  unreadText: (props) => ({
    color: props.color,
    fontWeight: props.fontWeight,
    fontSize: props.fontSize
  }),
  unreadMsgCount: {
    marginRight: 20,
    color: "white",
    letterSpacing: -0.2,
    padding: theme.spacing(0.5, 1.2),
    backgroundColor: theme.palette.primary.main,
    borderRadius: "45%",
    fontSize: theme.typography.fontSize,
    fontWeight: "bold"
  }
}));

const ChatContent = (props) => {

  const { conversation, activeConversation, readMessages } = props;
  const { latestMessageText, otherUser } = conversation;

  const [unreadMsgCount, setUnreadMsgCount] = useState(0);

  useEffect(() => {
    setUnreadMsgCount(conversation.unreadMsgCount);
  }, [conversation]);

  useEffect(() => {
    const updateMsgReadStatus = async () => {
      if (
        conversation.otherUser.username === activeConversation &&
        unreadMsgCount > 0
      ) {
        const reqBody = {
          senderId: otherUser.id,
          conversationId: conversation.id,
        };
        await readMessages(reqBody);
      }
    };

    updateMsgReadStatus();
  }, [
    unreadMsgCount,
    activeConversation,
    otherUser,
    conversation.otherUser.username,
    conversation.id,
    readMessages,
  ]);

  const styleProps = unreadMsgCount > 0 && {
    color: "black",
    fontWeight: "bold",
    fontSize: "theme.typography.fontSize"
  }

  const classes = useStyles(styleProps);

  return (
    <Box className={classes.root}>
      <Box>
        <Typography className={classes.username}>
          {otherUser.username}
        </Typography>
        {/* <Typography className={`${classes.previewText} ${unreadMsgCount > 0 ? classes.unreadText : ""}`}> */}
        <Typography className={`${classes.previewText} ${classes.unreadText}`}>
          {latestMessageText}
        </Typography>
      </Box>
      {unreadMsgCount > 0 && (
        <Typography className={classes.unreadMsgCount}>
          {unreadMsgCount}
        </Typography>
      )}
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    activeConversation: state.activeConversation,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    readMessages: (messagesInfo) => {
      dispatch(readMessages(messagesInfo));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatContent);
