/*This defines all the sections available in the editor*/

import * as React from "react";
import { Icon } from "@iconify/react";
import {
  AspectRatio,
  Box,
  Card,
  CardContent,
  Divider,
  ListItem,
  ListItemContent,
  ListItemDecorator,
  Typography,
  accordionDetailsClasses,
} from "@mui/joy";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "../../components/EditorAccordion";
import { accordionSummaryClasses } from "@mui/material";
import { useEditor } from "@craftjs/core";
import _ from "lodash";
//--Blocks


const AllFields = [
  {
    id: "layout",
    name: "Layout",
    description: "Layout elements like Sections and Containers.",
    items: [
      {
        id: "section",
        name: "Section",
        Icon: "material-symbols:layers",
      },
      {
        id: "container",
        name: "Container",
        Icon: "material-symbols:layers-clear",
      },
      {
        id: "grid",
        name: "Grid",
        Icon: "material-symbols:view-quilt",
      },
    ],
  },
  {
    id: "text_fields",
    name: "Text Fields",
    description: "Headings, paragraphs, and other text elements.",
    items: [
      {
        id: "heading",
        name: "Heading",
        Icon: "material-symbols:title",
      },
      {
        id: "paragraph",
        name: "Paragraph",
        Icon: "material-symbols:format-paragraph"
      },
      {
        id: "quote",
        name: "Quote",
        Icon: "material-symbols:format-quote",
      },
      {
        id: "list",
        name: "List",
        Icon: "material-symbols:format-list-bulleted",
      },
      {
        id: "code",
        name: "Code",
        Icon: "material-symbols:code",
      },
      
    ],
  },
  {
    id: "media",
    name: "Media",
    description: "Images, videos, and other media elements.",
    items: [
      {
        id: "image",
        name: "Image",
        Icon: "material-symbols:image",
      },
      {
        id: "video",
        name: "Video",
        Icon: "material-symbols:video-chat",
      },
      {
        id: "audio",
        name: "Audio",
        Icon: "material-symbols:audio-file",
      },
    ],
  },
  {
    id: "buttons",
    name: "Buttons",
    description: "Buttons, links, and other interactive elements.",
    items: [
      {
        id: "button",
        name: "Button",
        Icon: "material-symbols:link",
      },
      {
        id: "link",
        name: "Link",
        Icon: "material-symbols:link",
      },
      {
        id: "social",
        name: "Social",
        Icon: "material-symbols:share",
      },
    ],
  },
  {
    id: "forms",
    name: "Forms",
    description: "Input fields, checkboxes, and other form elements.",
    items: [
      {
        id: "input",
        name: "Input",
        Icon: "material-symbols:input",
      },
      {
        id: "checkbox",
        name: "Checkbox",
        Icon: "material-symbols:check-box",
      },
      {
        id: "radio",
        name: "Radio",
        Icon: "material-symbols:radio-button-checked",
      },
      {
        id: "select",
        name: "Select",
        Icon: "material-symbols:select-all",
      },
      {
        id: "textarea",
        name: "Textarea",
        Icon: "material-symbols:notes",
      },
    ],
  },
  {
    id: "navigation",
    name: "Navigation",
    description: "Menus, tabs, and other navigation elements.",
    items: [
      {
        id: "menu",
        name: "Menu",
        Icon: "material-symbols:menu",
      },
      {
        id: "tabs",
        name: "Tabs",
        Icon: "material-symbols:tab",
      },
      {
        id: "breadcrumbs",
        name: "Breadcrumbs",
        Icon: "material-symbols:arrow-right",
      },
      {
        id: "pagination",
        name: "Pagination",
        Icon: "material-symbols:pageview",
      },
    ],
  },
  {
    id: "icons",
    name: "Icons",
    description: "Icons, logos, and other graphical elements.",
    items: [
      {
        id: "icon",
        name: "Icon",
        Icon: "material-symbols:emoji-people",
      },
      {
        id: "logo",
        name: "Logo",
        Icon: "material-symbols:emoji-people",
      },
      {
        id: "avatar",
        name: "Avatar",
        Icon: "material-symbols:emoji-people",
      },
    ],
  },
];

/*This Defines The Design of Each Section Category*/
const FieldCategory = ({ item, expanded, handleChange }) => {
  //CONSTANTS
  const index = AllFields.findIndex((x) => x.id === item.id);

  //RETURN
  return (
    <Accordion
      variant="outlined"
      size="lg"
      expanded={expanded === `panel-${index}`}
      onChange={() => {
        expanded === `panel-${index}`
          ? handleChange(null)
          : handleChange(`panel-${index}`);
      }}
      transition="0.2s"
      sx={{
        maxWidth: 400,
        [`& .${accordionSummaryClasses.button}:hover`]: {
          bgcolor: "transparent",
        },
        [`& .${accordionDetailsClasses.content}`]: {
          boxShadow: (theme) => `inset 0 1px ${theme.vars.palette.divider}`,
          [`&.${accordionDetailsClasses.expanded}`]: {
            paddingBlock: "0.75rem",
          },
        },
      }}
    >
      <AccordionSummary
        aria-controls={`panel${0}-content`}
        id={`panel${0}-header`}
      >
        <Typography>{item.name}</Typography>
      </AccordionSummary>
      <AccordionDetails variant="soft">
        {item.items.length > 0 ? (
          <FieldList
            items={item.items}
            onSelect={(item) => console.log(item)}
          />
        ) : (
          <Box sx={{ p: 2, textAlign: "center" }}>
            <Typography level="title-md">No templates found.</Typography>
          </Box>
        )}
      </AccordionDetails>
    </Accordion>
  );
};

/*This Defines The Design of Each Section Template Item
each item can be Dragged and Dropped into the editor*/

const FieldItem = ({ item, onSelect }) => {
  //CONSTANTS

  //STATES

  //FUNCTIONS

  //EFFECTS
  //--disable text selection
  React.useEffect(() => {
    // Disable text selection for elements
    // with class "no-select"
    const noSelectElements = document.querySelectorAll(".no-select");
    noSelectElements.forEach((element) => {
      element.style.webkitUserSelect = "none";
      element.style.mozUserSelect = "none";
      element.style.msUserSelect = "none";
      element.style.userSelect = "none";
    });
  }, []);

  //RETURN
  return (
    <Card
      variant="outlined"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        transition: "0.2s",
        "&:hover": {
          bgcolor: "grey.100",
        },
        padding: 2,
        width: "100%",
      }}
      className="no-select"
    >
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            bgcolor: "grey.100",
            width: "100%",
            height: "40px",
          }}
        >
          {/* {
            _.isUndefined(item.image) || _.isNull(item.image) || item.image === ""
            ?
            <Icon icon="mdi:file-image" width="50" height="50" />
            :
            <img
              src={item.image}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          } */}
        </Box>

        <Divider sx={{ marginBlock: 1 }} />
        <Typography level="title-sm">{item.name}</Typography>
      </CardContent>
    </Card>
  );
};

/*This Defines The Section Template List | 2x2 Grid*/
const FieldList = ({ items, onSelect }) => {
  //CONSTANTS
  const { connectors, query } = useEditor();

  //RETURN
  return (
    <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1 }}>
      {items.map((item) => (
        <ListItem
          ref={(ref) => connectors.create(ref, item.renderComponent)}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            transition: "all 0.3s ease",
            //borderBlockEnd: "1px solid #eee",
            "&:hover": {
              cursor: "pointer",
              bgcolor: "primary.light",
              color: "primary.contrastText",
            },
          }}
        >
          <FieldItem item={item} />
        </ListItem>
      ))}
    </Box>
  );
};

/* Main Component | Section Templates
This is the main component that renders a list of all the section categories
each category is a collapsible accordion that contains a list of section templates 
*/
export default function Sections({ onSelect }) {
  //STATES
  const [expanded, setExpanded] = React.useState(null);

  //RETURN
  return (
    <Box>
      {AllFields.map((item) => (
        <FieldCategory
          key={item.id}
          item={item}
          expanded={expanded}
          handleChange={setExpanded}
        />
      ))}
    </Box>
  );
}
