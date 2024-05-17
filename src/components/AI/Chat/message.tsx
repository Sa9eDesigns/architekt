import React from "react";
import {
  Box,
  Typography,
  Sheet,
  Stack,
  Badge,
  badgeClasses,
  Divider,
  Avatar,
} from "@mui/joy";

interface IMessageProps {
  message: string;
  type: "user" | "bot";
}

const Message = ({ message, type }: IMessageProps) => {
  //COMPONENTS
  //--User Message
  const UserMessage = () => {
    return (
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="flex-end"
        alignItems="center"
        width="100%"
        p={1}
        bgcolor="background.paper"
        borderRadius={16}
        boxShadow={2}
        my={1}
      >
        <Typography level="body-sm" color="neutral">
          {message}
        </Typography>
      </Box>
    );
  };

  //--Bot Message
  const BotMessage = () => {
    return (
      <Sheet
        variant="soft"
        sx={{
          borderRadius: 16,
          my: 1,
          p: 1,
          boxShadow: 2,
        }}
      >
        <Stack direction="row" spacing={1}>
          <Badge
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            badgeInset="14%"
            color="success"
            sx={{
              [`& .${badgeClasses.badge}`]: {
                "&::after": {
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  animation: "ripple 1.2s infinite ease-in-out",
                  border: "2px solid",
                  borderColor: "success.500",
                  content: '""',
                },
              },
              "@keyframes ripple": {
                "0%": {
                  transform: "scale(1)",
                  opacity: 1,
                },
                "100%": {
                  transform: "scale(2)",
                  opacity: 0,
                },
              },
            }}
          >
            <Avatar alt="Remy Sharp" src="/images/logo-md.png" />
          </Badge>
          <Typography level="title-lg" color="neutral">
            SAGE AI
          </Typography>
        </Stack>
        <Divider />
        <Typography level="body-sm" color="neutral">
          {message}
        </Typography>
      </Sheet>
    );
  };

  //RENDER
  return type === "user" ? <UserMessage /> : <BotMessage />;
};

export default Message;
