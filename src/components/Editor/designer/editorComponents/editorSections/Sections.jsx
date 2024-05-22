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
//--SECTION COMPONENTS
//--ABOUT
import { EditableAboutStyle2 } from "src/components/About/AboutStyle2";
import { EditableAboutStyle3 } from "src/components/About/AboutStyle3";
import { EditableAboutStyle4 } from "src/components/About/AboutStyle4";
//HERO
import { EditableHero1 } from "src/components/Hero/";
import { EditableHero2 } from "src/components/Hero/HeroStyle2";
import { EditableHero3 } from "src/components/Hero/HeroStyle3";
import { EditableHero4 } from "src/components/Hero/HeroStyle4";
import { EditableHero5 } from "src/components/Hero/HeroStyle5";
//Slider
import { EditableCarousel1 } from "src/components/Slider/BrandCarousel";
import { EditableSlider1 } from "src/components/Slider/PortfolioSlider";
import { EditableSlider2 } from "src/components/Slider/PostCarousel";
import { EditableSlider3 } from "src/components/Slider/ServiceSlider";
import { EditableSlider4 } from "src/components/Slider/TeamSlider";
import { EditableSlider5 } from "src/components/Slider/TestimonialSlider";
import { EditableSlider6 } from "src/components/Slider/TestimonialSliderStyle2";

const AllSectionTemplates = [
  {
    id: "hero_sections",
    name: "Hero Sections",
    items: [
      {
        id: "hero_1",
        name: "Hero-1",
        image: "",
        renderComponent: <EditableHero1 />,
      },
      {
        id: "hero_2",
        name: "Hero-2",
        image: "",
        renderComponent: <EditableHero2 />,
      },
      {
        id: "hero_3",
        name: "Hero-3",
        image: "",
        renderComponent: <EditableHero3 />,
      },
      {
        id: "hero_4",
        name: "Hero-4",
        image: "",
        renderComponent: <EditableHero4 />,
      },
      {
        id: "hero_5",
        name: "Hero-5",
        image: "",
        renderComponent: <EditableHero5 />,
      },
    ],
  },
  {
    id: "slider_sections",
    name: "Slider Sections",
    //1 to 8
    items: [
      {
        id: "slider_1",
        name: "Slider-1",
        image: "",
        renderComponent: <EditableCarousel1 />,
      },
      {
        id: "slider_2",
        name: "Slider-2",
        image: "",
        renderComponent: <EditableSlider1 />,
      },
      {
        id: "slider_3",
        name: "Slider-3",
        image: "",
        renderComponent: <EditableSlider2 />,
      },
      {
        id: "slider_4",
        name: "Slider-4",
        image: "",
        renderComponent: <EditableSlider3 />,
      },
      {
        id: "slider_5",
        name: "Slider-5",
        image: "",
        renderComponent: <EditableSlider4 />,
      },
      {
        id: "slider_6",
        name: "Slider-6",
        image: "",
        renderComponent: <EditableSlider5 />,
      },
      {
        id: "slider_7",
        name: "Slider-7",
        image: "",
        renderComponent: <EditableSlider6 />,
      },
    ],
  },
  {
    id: "about_sections",
    name: "About Sections",
    items: [
      {
        id: "about_1",
        name: "About-1",
        image: "",
        renderComponent: <EditableAboutStyle2 />,
      },
      {
        id: "about_2",
        name: "About-2",
        image: "",
        renderComponent: <EditableAboutStyle3 />,
      },
      {
        id: "about_3",
        name: "About-3",
        image: "",
        renderComponent: <EditableAboutStyle4 />,
      },
    ],
  },
];

/*This Defines The Design of Each Section Category*/
const SectionTemplateCategory = ({ item, expanded, handleChange }) => {
  //CONSTANTS
  const index = AllSectionTemplates.findIndex((x) => x.id === item.id);

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
          <SectionTemplateList
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

const SectionTemplateItem = ({ item, onSelect }) => {
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
const SectionTemplateList = ({ items, onSelect }) => {
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
          <SectionTemplateItem item={item} />
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
      {AllSectionTemplates.map((item) => (
        <SectionTemplateCategory
          key={item.id}
          item={item}
          expanded={expanded}
          handleChange={setExpanded}
        />
      ))}
    </Box>
  );
}
