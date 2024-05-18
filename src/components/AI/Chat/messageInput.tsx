"use client";

/*This Defines an AI Powered Textarea component that will be used in the application
- The component will have a text area that will allow the user to type in a message
- It Has AI capabities such as: 
  * A toggle button to make that makes the AI to be "Context Aware" 
  * A toggle button for co-pilot mode that allows the AI to suggest completions
  * A Button for Rewriting the text in the text area to make it more coherent and AI friendly
  * And a Button to send the message to the AI for processing
*/

import * as React from "react";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Textarea from "@mui/joy/Textarea";
import IconButton from "@mui/joy/IconButton";
import Menu from "@mui/joy/Menu";
import MenuItem from "@mui/joy/MenuItem";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import { ButtonGroup } from "@mui/joy";
import { IconifyIcon, InlineIcon } from "@iconify/react";
import { useAIStore } from "@/stores/useAIStoreProvider";

interface SAGE_TextAreaProps {
  //context awareness
  isContextAware: boolean | null;
  CA_option: string | null;
  CA_change: (option: string) => void;
  //co-pilot mode
  isCoPilot: boolean | null;
  toggleCoPilot: () => void;
  //rewrite
  rewrite: () => void;
  rewriteSuggestions: string[];
  //send
  send: () => void;
}


export default function MessageInput({
  isContextAware,
  CA_option,
  CA_change,
  isCoPilot,
  toggleCoPilot,
  rewrite,
  rewriteSuggestions,
  send,
}: SAGE_TextAreaProps) {
  //CONSTANTS

  //AI STORE
  //-- this contains all the states, functions and data shared by the AI components
  const {
    isContextAware,
    getContextAware,
    useContextAware,

    isCoPilot,
    useCoPilot,
    useCoPilotOptions,
    
    useRewrite,

    useSend
  } = useAIStore((state) => ({
    isContextAware: state.isContextAware,
    getContextAware: state.getContextAware,
    useContextAware: state.useContextAware,

    isCoPilot: state.isCoPilot,
    useCoPilot: state.useCoPilot,
    useCoPilotOptions: state.useCoPilotOptions,

    useRewrite: state.useRewrite,

    useSend: state.useSend
  }));
  
  //STATE


  //REFS


  //HANDLERS


  //RENDER
  return (
    <FormControl>
      <Textarea
        placeholder="Type something here…"
        minRows={2}
        sx={{
          width: "100%",
          borderRadius: "var(--Textarea-borderRadius)",
          borderColor: "divider",
          "&:focus": {
            borderColor: "primary",
            boxShadow: "0 0 0 1px var(--palette-primary-main)",
          },
        }}
        endDecorator={
          <Box
            sx={{
              display: "flex",
              gap: "var(--Textarea-paddingBlock)",
              pt: "var(--Textarea-paddingBlock)",
              borderTop: "1px solid",
              borderColor: "divider",
              flex: "auto",
            }}
          >
            <ContextAwareButton 
              CA_active={false} 
              CA_option="conversation" 
              CA_change={(option) => console.log(option)}
            />

            <CoPilotButton
              CP_active={false}
              CP_toggle={() => console.log("toggled")}
              selected_CA="conversation"
            />
            <Button sx={{ ml: "auto" }}>Send</Button>
          </Box>
        }
      />
    </FormControl>
  );
}

/*The ContextAwareButton component is a button that allows the user to choose the Level of Awareness of the AI
N.B: *context awareness is the level of Data that the AI has access to when processing the user's message*
By Default. The AI is only has access to the following context:
 * The Current User's Profile

The button has a dropdown that allows the user to select the level of context awareness that the AI should have when processing the user's message.
the options are:
* Conversation: The AI has access only to the current conversation
* Activity: Conversation + current activity based on the screen or route
* Project: Conversation + Activity + Current Project
* Global: Conversation + Activity + Project + Organization
* Genius: Conversation + Activity + Project + Organization + Web Search
*/

interface ContextAwareButtonProps {
  CA_active: boolean;
  CA_option: string;
  CA_change: (option: string) => void;
}

interface IOption {
  label: string;
  value: string;
  icon: string | IconifyIcon;
  description: string;
}

const ContextAwareButton = ({ CA_active, CA_option, CA_change }: ContextAwareButtonProps) => {

  //CONSTANTS
  const options = [
    {
      label: "Conversation",
      value: "conversation",
      icon: "fluent:chat-24-filled",
      description: "The AI has access only to the current conversation",
    },
    {
      label: "Activity",
      value: "activity",
      icon: "fluent:location-ripple-20-filled",
      description:
        "Conversation + current activity based on the screen or route",
    },
    {
      label: "Project",
      value: "project",
      icon: "fluent:briefcase-24-filled",
      description:
        "Conversation + Activity + All the Data related to the current Active Project",
    },
    {
      label: "Organization",
      value: "global",
      icon: "fluent:mail-all-accounts-24-filled",
      description: "All the Data related to the current Organization",
    },
    {
      label: "Genius",
      value: "genius",
      icon: "fluent:brain-circuit-24-filled",
      description:
        "All the Data related to the current Organization + context from the Web",
    },
  ] as IOption[];

  //STATE
  const [active, setActive] = React.useState(CA_active);
  const [open, setOpen] = React.useState(false);
  const [selectedCA, setSelectedCA] = React.useState(CA_option);
  

  //REFS
  const actionRef = React.useRef<() => void | null>(null);
  const anchorRef = React.useRef<HTMLDivElement>(null);

  //HANDLERS
  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    setSelectedCA(options[index].value);
    CA_change(options[index].value);
    setOpen(false);
  };

  const toggleCA = () => {
    setActive((bool) => !bool);
  }

  return (
    <React.Fragment>
      <ButtonGroup
        size="sm"
        ref={anchorRef}
        variant="solid"
        color={open ? "primary" : "neutral"}
        aria-label="split button"
      >
        <InlineIcon icon={options.find((o) => o.value === selectedCA)?.icon || ""} />
        <IconButton
          variant="plain"
          color="neutral"
          onClick={() => setOpen((bool) => !bool)}
        >
          <InlineIcon icon="fluent:chevron-down-24-filled" />
        </IconButton>
      </ButtonGroup>
      <Menu
        anchorEl={anchorRef.current}
        open={open}
        onClose={() => setOpen(false)}
        onClick={() => setOpen(false)}
      >
        {options.map((option, index) => (
          <MenuItem
            key={option.value}
            selected={option.value === selectedCA}
            onClick={(event) => handleMenuItemClick(event, index)}
            
          >
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </React.Fragment>
  );
};

/*The CoPilotButton component is a button that allows the user to toggle the Co-Pilot mode of the AI.
N.B: *Co-Pilot mode is a feature that allows the AI to suggest auto-completions to the user while typing*
By Default. The AI is only has access to the current conversation.
it uses the current context awareness level for the suggestions if the AI is context aware.
Its a toggle button group that allows the user to enable or disable the Co-Pilot mode. And also cycle through the suggestions it provides.
And is disabled while the AI is Responding to the user's message
Its options include:
- debounce time: The time to wait before the AI starts suggesting completions
- suggest After: The number of characters to type before the AI create a suggestion
- min/Max Words per suggestion: The minimum and maximum number of words the AI can suggest
*/

interface CoPilotButtonProps {
  CP_active: boolean;
  CP_toggle: () => void;
  CP_isBusy: boolean;
  CP_Options: {
    debounceTime: number;
    suggestAfter: number;
    minWords: number;
    maxWords: number;
  };
  CP_suggestions: string[];
  CP_onRequest: () => void;
  CP_onSelect: (suggestion: string) => void;
}

const CoPilotButton = ({
  CP_active,
  CP_toggle,
  CP_isBusy,
  CP_Options,
  CP_suggestions,
  CP_onRequest,
  CP_onSelect,
}: CoPilotButtonProps) => {
  
  //CONTEXT
  const { isContextAware, CA_option } = useAIStore((state) => ({
    isContextAware: state.isContextAware,
    CA_option: state.CA_option,
  }));

  //STATE
  const [active, setActive] = React.useState(CP_active);
  const [currentSetOfSuggestions, setCurrentSetOfSuggestions] = React.useState(CP_suggestions);
  const [currentlySelectedSuggestion, setCurrentlySelectedSuggestion] = React.useState("");
  const [isBusy, setIsBusy] = React.useState(CP_isBusy);


  //HANDLERS
  const toggleCP = () => {
    CP_toggle();
    setActive((bool) => !bool);
  };

  const cycleSuggestions = () => {
    const index = currentSetOfSuggestions.indexOf(currentlySelectedSuggestion);
    const nextIndex = index + 1;
    if (nextIndex === currentSetOfSuggestions.length) {
      setCurrentlySelectedSuggestion(currentSetOfSuggestions[0]);
    } else {
      setCurrentlySelectedSuggestion(currentSetOfSuggestions[nextIndex]);
    }
  };

  const requestSuggestions = () => {
    CP_onRequest();
    setIsBusy(true);
  };

  const selectSuggestion = () => {
    CP_onSelect(currentlySelectedSuggestion);
    setCurrentlySelectedSuggestion("");
  };

  //RENDER
  return (
    <React.Fragment>
      <ButtonGroup size="sm" 
        variant={active ? "solid" : "outline"}
        color={active ? "primary" : "neutral"}>
        <Button
          onClick={toggleCP}
          disabled={isBusy}
          sx={{ borderRight: "1px solid", borderColor: "divider" }}
        >
          Co-Pilot
        </Button>
        <IconButton
          onClick={cycleSuggestions}
          disabled={isBusy}
          loading={isBusy}
        >
          {
            isBusy ? 
            <InlineIcon icon="svg-spinners:3-dots-fade" />
            :
            <InlineIcon icon="fluent:chevron-right-24-filled" />
          }
        </IconButton>
        
      </ButtonGroup>
    </React.Fragment>
  );
}
