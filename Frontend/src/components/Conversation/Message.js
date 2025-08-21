import { Box, Stack } from "@mui/material";
import React from "react";
import { Chat_History } from "../../data";
import {
  LinkMsg,
  MediaMsg,
  ReplyMsg,
  TextMsg,
  Timeline,
  DocMsg,
} from "./MsgTypes";

const Message = ({ menu }) => {
  return (
    <Box p={3}>
      <Stack spacing={3}>
        {Chat_History.map((el, index) => {
          // Add unique ID to each message element
          const messageWithId = { ...el, id: `msg-${index}` };

          switch (el.type) {
            case "divider":
              // Timeline
              return <Timeline key={`divider-${index}`} el={messageWithId} />;

            case "msg":
              switch (el.subtype) {
                case "img":
                  // img msg
                  return (
                    <MediaMsg
                      key={`img-${index}`}
                      el={messageWithId}
                      menu={menu}
                    />
                  );

                case "doc":
                  // Doc msg
                  return (
                    <DocMsg
                      key={`doc-${index}`}
                      el={messageWithId}
                      menu={menu}
                    />
                  );

                case "link":
                  // Link msg
                  return (
                    <LinkMsg
                      key={`link-${index}`}
                      el={messageWithId}
                      menu={menu}
                    />
                  );

                case "reply":
                  // reply msg
                  return (
                    <ReplyMsg
                      key={`reply-${index}`}
                      el={messageWithId}
                      menu={menu}
                    />
                  );

                default:
                  // text msg
                  return (
                    <TextMsg
                      key={`text-${index}`}
                      el={messageWithId}
                      menu={menu}
                    />
                  );
              }
              break;

            default:
              return <></>;
          }
        })}
      </Stack>
    </Box>
  );
};

export default Message;
