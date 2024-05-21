import * as React from "react";
import Box from "@mui/joy/Box";
import Sheet from "@mui/joy/Sheet";
import Stack from "@mui/joy/Stack";
import AvatarWithStatus from "@/components/AI/ChatUI/components/AvatarWithStatus";
import ChatBubble from "@/components/AI/ChatUI/components/ChatBubble";
import MessageInput from "@/components/AI/ChatUI/components/MessageInput";
import MessagesPaneHeader from "@/components/AI/ChatUI/components/MessagesPaneHeader";
import { ChatProps, MessageProps } from "@/components/AI/ChatUI/types";

type T_SageAIProps = {
  chat: ChatProps | undefined;
};

export default function SageAI(props: T_SageAIProps) {

  //AI Identity
  const AI={
    name: "SAGE",
    username: "sage_ai",
    avatar: "/images/logo-md.png",
    online: true
  }

  const { chat } = props;

  const [chatMessages, setChatMessages] = React.useState(chat?.messages);

  const [textAreaValue, setTextAreaValue] = React.useState("");

  React.useEffect(() => {
    setChatMessages(chat ? chat.messages : []);
  }, [chat?.messages]);

  return (
    <Sheet
      sx={{
        height: { xs: "calc(100dvh - var(--Header-height))", lg: "100dvh" },
        display: "flex",
        flexDirection: "column",
        backgroundColor: "background.level1",
      }}
    >
      <MessagesPaneHeader sender={AI} />
      <Box
        sx={{
          display: "flex",
          flex: 1,
          minHeight: 0,
          px: 2,
          py: 3,
          overflowY: "scroll",
          flexDirection: "column-reverse",
        }}
      >
        <Stack spacing={2} justifyContent="flex-end">
          {chatMessages?.map((message: MessageProps, index: number) => {
            const isYou = message.sender === "You";
            return (
              <Stack
                key={index}
                direction="row"
                spacing={2}
                flexDirection={isYou ? "row-reverse" : "row"}
              >
                {message.sender !== "You" && (
                  <AvatarWithStatus
                    online={message.sender.online}
                    src={message.sender.avatar}
                  />
                )}
                <ChatBubble
                  variant={isYou ? "sent" : "received"}
                  {...message}
                />
              </Stack>
            );
          })}
        </Stack>
      </Box>
      <MessageInput
        textAreaValue={textAreaValue}
        setTextAreaValue={setTextAreaValue}
        onSubmit={() => {
          const newId = chatMessages && chatMessages.length + 1;
          const newIdString = newId ? newId.toString() : "1";
          setChatMessages([
            ...(chatMessages || []),
            {
              id: newIdString,
              sender: "You",
              content: textAreaValue,
              timestamp: "Just now",
            },
          ]);
        }}
      />
    </Sheet>
  );
}
