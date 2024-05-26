import * as React from "react";
import AccordionGroup from "@mui/joy/AccordionGroup";
import Accordion from "@mui/joy/Accordion";
import AccordionDetails, {
  accordionDetailsClasses,
} from "@mui/joy/AccordionDetails";
import AccordionSummary, {
  accordionSummaryClasses,
} from "@mui/joy/AccordionSummary";

// AccordionWrapper Component
const AccordionWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <AccordionGroup
      variant="outlined"
      transition="0.2s"
      sx={{
        maxWidth: 400,
        borderRadius: "lg",
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
      {children}
    </AccordionGroup>
  );
};

// AccordionItem Component
const AccordionItem: React.FC<{
  defaultExpanded?: boolean;
  children: React.ReactNode;
}> = ({ defaultExpanded, children }) => {
  return <Accordion defaultExpanded={defaultExpanded}>{children}</Accordion>;
};

// AccordionSummaryContent Component
const AccordionSummaryContent: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <AccordionSummary>{children}</AccordionSummary>;
};

// AccordionDetailsContent Component
const AccordionDetailsContent: React.FC<{
  variant?: "soft" | "standard";
  children: React.ReactNode;
}> = ({ variant, children }) => {
  return <AccordionDetails variant={variant}>{children}</AccordionDetails>;
};

// AccordionDepthPanel Component
const AccordionDepthPanel: React.FC = () => {
  return (
    <AccordionWrapper>
      <AccordionItem defaultExpanded>
        <AccordionSummaryContent>First accordion</AccordionSummaryContent>
        <AccordionDetailsContent variant="soft">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </AccordionDetailsContent>
      </AccordionItem>
      <AccordionItem>
        <AccordionSummaryContent>Second accordion</AccordionSummaryContent>
        <AccordionDetailsContent variant="soft">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </AccordionDetailsContent>
      </AccordionItem>
      <AccordionItem>
        <AccordionSummaryContent>Third accordion</AccordionSummaryContent>
        <AccordionDetailsContent variant="soft">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </AccordionDetailsContent>
      </AccordionItem>
    </AccordionWrapper>
  );
};

export default AccordionDepthPanel;
