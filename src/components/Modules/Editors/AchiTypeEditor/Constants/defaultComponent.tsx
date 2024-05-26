/* Defines the Component Composer List of Components 
N.B: Because the canvas utilizes the react-grid-layout library, We dont need to define Layout components
*/

import React from "react";
import { Container } from "@mui/material";
import { Icon } from "@iconify/react";
import DraggableContainer from "../draggableItem";
import {
  Breadcrumbs,
  TextField,
  Label,
  Input,
  Button,
  Checkbox,
  RadioGroup,
  Radio,
  Select,
  Slider,
  Switch,
  ComboBox,
  ListBox,
  Menu,
  Table,
  TagGroup,
  Calendar,
  DateField,
  DatePicker,
  DateRangePicker,
  RangeCalendar,
  TimeField,
  DropZone,
  Dialog,
  Modal,
  Popover,
  Tooltip,
  Meter,
  ProgressBar,
  Group,
  Toolbar,
  FileTrigger,
  ToggleButton,
  DateInput,
  DateSegment,
  GridList,
  GridListItem,
  ListBoxItem,
  MenuTrigger,
  MenuItem,
  TableHeader,
  Column,
  TableBody,
  Row,
  Cell,
  TagList,
  Tag,
  CalendarGrid,
  CalendarCell,
  Tabs,
  TabList,
  Tab,
  TabPanel,
  Separator,
  OverlayArrow,
  SliderOutput,
  SliderTrack,
  SliderThumb,
  ColorArea,
  ColorThumb,
  ColorField,
  ColorPicker,
  ColorSlider,
  ColorSwatch,
  ColorSwatchPicker,
  ColorSwatchPickerItem,
  ColorWheel,
  ColorWheelTrack,
  DialogTrigger,
  Heading,
  Text,
  CheckboxGroup,
  Form,
  FieldError,
  NumberField,
  SearchField,
  Breadcrumb,
  Link,
  TooltipTrigger,
  SelectValue
} from "react-aria-components";

export interface ComponentCategory {
  id: string;
  name: string;
  icon: string;
  components: ComponentItem[];
}

export interface ComponentItem {
  id: string;
  name: string;
  icon: string;
  component: React.ReactNode;
  properties: any;
}

export const AllElementsByCategory = [
  {
    id: "buttons",
    name: "Buttons",
    icon: "fluent:button-20-filled",
    components: [
      {
        id: "button",
        name: "Button",
        icon: "fluent:button-20-filled",
        component: (
          <Button onPress={() => alert("Hello world!")}>Press me</Button>
        ),
        properties: [],
      },
      {
        id: "file-trigger",
        name: "File Trigger",
        icon: "fluent:file-20-filled",
        component: (
          <FileTrigger
            onSelect={(e) => {
              console.log(e?.item);
            }}
          >
            <Button>Select a file</Button>
          </FileTrigger>
        ),
        properties: [],
      },
      {
        id: "toggle-button",
        name: "Toggle Button",
        icon: "fluent:toggle-20-filled",
        component: <ToggleButton>Pin</ToggleButton>,
        properties: [],
      },
    ],
  },
  {
    id: "collections",
    name: "Collections",
    icon: "fluent:grid-20-filled",
    components: [
      {
        id: "grid-list",
        name: "Grid List",
        icon: "fluent:grid-20-filled",
        component: (
          <GridList aria-label="Favorite pokemon" selectionMode="multiple">
            <GridListItem textValue="Charizard">
              <Checkbox slot="selection" />
              Charizard
              <Button aria-label="Info">ⓘ</Button>
            </GridListItem>
            <GridListItem textValue="Blastoise">
              <Checkbox slot="selection" />
              Blastoise
              <Button aria-label="Info">ⓘ</Button>
            </GridListItem>
            <GridListItem textValue="Venusaur">
              <Checkbox slot="selection" />
              Venusaur
              <Button aria-label="Info">ⓘ</Button>
            </GridListItem>
            <GridListItem textValue="Pikachu">
              <Checkbox slot="selection" />
              Pikachu
              <Button aria-label="Info">ⓘ</Button>
            </GridListItem>
          </GridList>
        ),
        properties: [],
      },
      {
        id: "list-box",
        name: "List Box",
        icon: "fluent:grid-20-filled",
        component: (
          <ListBox aria-label="Favorite animal" selectionMode="single">
            <ListBoxItem>Aardvark</ListBoxItem>
            <ListBoxItem>Cat</ListBoxItem>
            <ListBoxItem>Dog</ListBoxItem>
            <ListBoxItem>Kangaroo</ListBoxItem>
            <ListBoxItem>Panda</ListBoxItem>
            <ListBoxItem>Snake</ListBoxItem>
          </ListBox>
        ),
        properties: [],
      },
      {
        id: "menu",
        name: "Menu",
        icon: "fluent:grid-20-filled",
        component: (
          <MenuTrigger>
            <Button aria-label="Menu">☰</Button>
            <Popover>
              <Menu>
                <MenuItem onAction={() => alert("open")}>Open</MenuItem>
                <MenuItem onAction={() => alert("rename")}>Rename…</MenuItem>
                <MenuItem onAction={() => alert("duplicate")}>
                  Duplicate
                </MenuItem>
                <MenuItem onAction={() => alert("share")}>Share…</MenuItem>
                <MenuItem onAction={() => alert("delete")}>Delete…</MenuItem>
              </Menu>
            </Popover>
          </MenuTrigger>
        ),
        properties: [],
      },
      {
        id: "table",
        name: "Table",
        icon: "fluent:grid-20-filled",
        component: (
          <Table aria-label="Files" selectionMode="multiple">
            <TableHeader>
              <Column>
                <Checkbox slot="selection" />
              </Column>
              <Column isRowHeader>Name</Column>
              <Column>Type</Column>
              <Column>Date Modified</Column>
            </TableHeader>
            <TableBody>
              <Row>
                <Cell>
                  <Checkbox slot="selection" />
                </Cell>
                <Cell>Games</Cell>
                <Cell>File folder</Cell>
                <Cell>6/7/2020</Cell>
              </Row>
              <Row>
                <Cell>
                  <Checkbox slot="selection" />
                </Cell>
                <Cell>Program Files</Cell>
                <Cell>File folder</Cell>
                <Cell>4/7/2021</Cell>
              </Row>
              <Row>
                <Cell>
                  <Checkbox slot="selection" />
                </Cell>
                <Cell>bootmgr</Cell>
                <Cell>System file</Cell>
                <Cell>11/20/2010</Cell>
              </Row>
              <Row>
                <Cell>
                  <Checkbox slot="selection" />
                </Cell>
                <Cell>log.txt</Cell>
                <Cell>Text Document</Cell>
                <Cell>1/18/2016</Cell>
              </Row>
            </TableBody>
          </Table>
        ),
        properties: [],
      },
      {
        id: "tag-group",
        name: "Tag Group",
        icon: "fluent:grid-20-filled",
        component: (
          <TagGroup selectionMode="multiple">
            <Label>Categories</Label>
            <TagList>
              <Tag>News</Tag>
              <Tag>Travel</Tag>
              <Tag>Gaming</Tag>
              <Tag>Shopping</Tag>
            </TagList>
          </TagGroup>
        ),
        properties: [],
      },
    ],
  },
  {
    id: "color",
    name: "Color",
    icon: "fluent:color-20-filled",
    components: [
      {
        id: "color-area",
        name: "Color Area",
        icon: "fluent:color-20-filled",
        component: (
          <ColorArea>
            <ColorThumb />
          </ColorArea>
        ),
        properties: [],
      },
      {
        id: "color-field",
        name: "Color Field",
        icon: "fluent:color-20-filled",
        component: (
          <ColorField defaultValue="#ff0">
            <Label>Primary Color</Label>
            <Input />
          </ColorField>
        ),
        properties: [],
      },
      {
        id: "color-picker",
        name: "Color Picker",
        icon: "fluent:color-20-filled",
        component: (
          <ColorPicker defaultValue="#5100FF">
            <DialogTrigger>
              <Button className="color-picker">
                <ColorSwatch />
                <span>Fill color</span>
              </Button>
              <Popover placement="bottom start">
                <Dialog className="color-picker-dialog">
                  <ColorArea
                    colorSpace="hsb"
                    xChannel="saturation"
                    yChannel="brightness"
                  />
                  <ColorSlider colorSpace="hsb" channel="hue" />
                  <ColorField/>
                </Dialog>
              </Popover>
            </DialogTrigger>
          </ColorPicker>
        ),
        properties: [],
      },
      {
        id: "color-slider",
        name: "Color Slider",
        icon: "fluent:color-20-filled",
        component: (
          <ColorSlider channel="hue" defaultValue="hsl(0, 100%, 50%)">
            <Label />
            <SliderOutput />
            <SliderTrack>
              <ColorThumb />
            </SliderTrack>
          </ColorSlider>
        ),
        properties: [],
      },
      {
        id: "color-swatch",
        name: "Color Swatch",
        icon: "fluent:color-20-filled",
        component: <ColorSwatch color="#f00" />,
        properties: [],
      },
      {
        id: "color-swatch-picker",
        name: "Color Swatch Picker",
        icon: "fluent:color-20-filled",
        component: (
          <ColorSwatchPicker>
            <ColorSwatchPickerItem color="#A00">
              <ColorSwatch />
            </ColorSwatchPickerItem>
            <ColorSwatchPickerItem color="#f80">
              <ColorSwatch />
            </ColorSwatchPickerItem>
            <ColorSwatchPickerItem color="#080">
              <ColorSwatch />
            </ColorSwatchPickerItem>
            <ColorSwatchPickerItem color="#08f">
              <ColorSwatch />
            </ColorSwatchPickerItem>
            <ColorSwatchPickerItem color="#088">
              <ColorSwatch />
            </ColorSwatchPickerItem>
            <ColorSwatchPickerItem color="#008">
              <ColorSwatch />
            </ColorSwatchPickerItem>
          </ColorSwatchPicker>
        ),
        properties: [],
      },
      {
        id: "color-wheel",
        name: "Color Wheel",
        icon: "fluent:color-20-filled",
        component: (
          <ColorWheel outerRadius={100} innerRadius={74}>
            <ColorWheelTrack />
            <ColorThumb />
          </ColorWheel>
        ),
        properties: [],
      },
    ],
  },
  {
    id: "date-time",
    name: "Date and Time",
    icon: "fluent:calendar-20-filled",
    components: [
      {
        id: "calendar",
        name: "Calendar",
        icon: "fluent:calendar-20-filled",
        component: (
          <Calendar aria-label="Appointment date">
            <header>
              <Button slot="previous">◀</Button>
              <Heading />
              <Button slot="next">▶</Button>
            </header>
            <CalendarGrid>
              {(date) => <CalendarCell date={date} />}
            </CalendarGrid>
          </Calendar>
        ),
        properties: [],
      },
      {
        id: "date-field",
        name: "Date Field",
        icon: "fluent:calendar-20-filled",
        component: (
          <DateField>
            <Label>Birth date</Label>
            <DateInput>
              {(segment) => <DateSegment segment={segment} />}
            </DateInput>
          </DateField>
        ),
        properties: [],
      },
      {
        id: "date-picker",
        name: "Date Picker",
        icon: "fluent:calendar-20-filled",
        component: (
          <DatePicker>
            <Label>Date</Label>
            <Group>
              <DateInput>
                {(segment) => <DateSegment segment={segment} />}
              </DateInput>
              <Button>▼</Button>
            </Group>
            <Popover>
              <Dialog>
                <Calendar>
                  <header>
                    <Button slot="previous">◀</Button>
                    <Heading />
                    <Button slot="next">▶</Button>
                  </header>
                  <CalendarGrid>
                    {(date) => <CalendarCell date={date} />}
                  </CalendarGrid>
                </Calendar>
              </Dialog>
            </Popover>
          </DatePicker>
        ),
        properties: [],
      },
      {
        id: "date-range-picker",
        name: "Date Range Picker",
        icon: "fluent:calendar-20-filled",
        component: (
          <DateRangePicker>
            <Label>Trip dates</Label>
            <Group>
              <DateInput slot="start">
                {(segment) => <DateSegment segment={segment} />}
              </DateInput>
              <span aria-hidden="true">–</span>
              <DateInput slot="end">
                {(segment) => <DateSegment segment={segment} />}
              </DateInput>
              <Button>▼</Button>
            </Group>
            <Popover>
              <Dialog>
                <RangeCalendar>
                  <header>
                    <Button slot="previous">◀</Button>
                    <Heading />
                    <Button slot="next">▶</Button>
                  </header>
                  <CalendarGrid>
                    {(date) => <CalendarCell date={date} />}
                  </CalendarGrid>
                </RangeCalendar>
              </Dialog>
            </Popover>
          </DateRangePicker>
        ),
        properties: [],
      },
      {
        id: "range-calendar",
        name: "Range Calendar",
        icon: "fluent:calendar-20-filled",
        component: (
          <RangeCalendar aria-label="Trip dates">
            <header>
              <Button slot="previous">◀</Button>
              <Heading />
              <Button slot="next">▶</Button>
            </header>
            <CalendarGrid>
              {(date) => <CalendarCell date={date} />}
            </CalendarGrid>
          </RangeCalendar>
        ),
        properties: [],
      },
      {
        id: "time-field",
        name: "Time Field",
        icon: "fluent:calendar-20-filled",
        component: (
          <TimeField>
            <Label>Event time</Label>
            <DateInput>
              {(segment) => <DateSegment segment={segment} />}
            </DateInput>
          </TimeField>
        ),
        properties: [],
      },
    ],
  },
  {
    id: "drag-and-drop",
    name: "Drag and Drop",
    icon: "fluent:drop-20-filled",
    components: [
      {
        id: "drop-zone",
        name: "Drop Zone",
        icon: "fluent:drop-20-filled",
        component: () => {
          let [dropped, setDropped] = React.useState(false);

          return (
            <DropZone
              onDrop={() => {
                setDropped(true);
              }}
            >
              <Text slot="label">
                {dropped ? "You dropped something" : "Drop object here"}
              </Text>
            </DropZone>
          );
        },
        properties: [],
      },
    ],
  },
  {
    id: "forms",
    name: "Forms",
    icon: "fluent:checkbox-20-filled",
    components: [
      {
        id: "checkbox",
        name: "Checkbox",
        icon: "fluent:checkbox-20-filled",
        component: (
          <Checkbox>
            <div className="checkbox">
              <svg viewBox="0 0 18 18" aria-hidden="true">
                <polyline points="1 9 7 14 15 4" />
              </svg>
            </div>
            Unsubscribe
          </Checkbox>
        ),
        properties: [],
      },
      {
        id: "checkbox-group",
        name: "Checkbox Group",
        icon: "fluent:checkbox-20-filled",
        component: (
          <CheckboxGroup>
            <Label>Favorite sports</Label>
            <Checkbox value="soccer">
              <div className="checkbox" aria-hidden="true">
                <svg viewBox="0 0 18 18">
                  <polyline points="1 9 7 14 15 4" />
                </svg>
              </div>
              Soccer
            </Checkbox>
            <Checkbox value="baseball">
              <div className="checkbox" aria-hidden="true">
                <svg viewBox="0 0 18 18">
                  <polyline points="1 9 7 14 15 4" />
                </svg>
              </div>
              Baseball
            </Checkbox>
            <Checkbox value="basketball">
              <div className="checkbox" aria-hidden="true">
                <svg viewBox="0 0 18 18">
                  <polyline points="1 9 7 14 15 4" />
                </svg>
              </div>
              Basketball
            </Checkbox>
          </CheckboxGroup>
        ),
        properties: [],
      },
      {
        id: "form",
        name: "Form",
        icon: "fluent:checkbox-20-filled",
        component: (
          <Form>
            <TextField name="email" type="email" isRequired>
              <Label>Email</Label>
              <Input />
              <FieldError />
            </TextField>
            <Button type="submit">Submit</Button>
          </Form>
        ),
        properties: [],
      },
      {
        id: "number-field",
        name: "Number Field",
        icon: "fluent:checkbox-20-filled",
        component: (
          <NumberField defaultValue={1024} minValue={0}>
            <Label>Width</Label>
            <Group>
              <Button slot="decrement">-</Button>
              <Input />
              <Button slot="increment">+</Button>
            </Group>
          </NumberField>
        ),
        properties: [],
      },
      {
        id: "radio-group",
        name: "Radio Group",
        icon: "fluent:checkbox-20-filled",
        component: (
          <RadioGroup>
            <Label>Favorite pet</Label>
            <Radio value="dogs">Dog</Radio>
            <Radio value="cats">Cat</Radio>
            <Radio value="dragon">Dragon</Radio>
          </RadioGroup>
        ),
        properties: [],
      },
      {
        id: "search-field",
        name: "Search Field",
        icon: "fluent:checkbox-20-filled",
        component: (
          <SearchField>
            <Label>Search</Label>
            <Input />
            <Button>✕</Button>
          </SearchField>
        ),
        properties: [],
      },
      {
        id: "slider",
        name: "Slider",
        icon: "fluent:checkbox-20-filled",
        component: (
          <Slider defaultValue={30}>
            <Label>Opacity</Label>
            <SliderOutput />
            <SliderTrack>
              <SliderThumb />
            </SliderTrack>
          </Slider>
        ),
        properties: [],
      },
      {
        id: "switch",
        name: "Switch",
        icon: "fluent:checkbox-20-filled",
        component: (
          <Switch>
            <div className="indicator" />
            Low power mode
          </Switch>
        ),
        properties: [],
      },
      {
        id: "text-field",
        name: "Text Field",
        icon: "fluent:checkbox-20-filled",
        component: (
          <TextField>
            <Label>First name</Label>
            <Input />
          </TextField>
        ),
        properties: [],
      },
    ],
  },
  {
    id: "navigation",
    name: "Navigation",
    icon: "fluent:arrow-circle-up-20-filled",
    components: [
      {
        id: "breadcrumbs",
        name: "Breadcrumbs",
        icon: "fluent:arrow-circle-up-20-filled",
        component: (
          <Breadcrumbs>
            <Breadcrumb>
              <Link href="/">Home</Link>
            </Breadcrumb>
            <Breadcrumb>
              <Link href="/react-aria/">React Aria</Link>
            </Breadcrumb>
            <Breadcrumb>
              <Link>Breadcrumbs</Link>
            </Breadcrumb>
          </Breadcrumbs>
        ),
        properties: [],
      },
      {
        id: "link",
        name: "Link",
        icon: "fluent:arrow-circle-up-20-filled",
        component: (
          <Link href="https://www.imdb.com/title/tt6348138/" target="_blank">
            The missing link
          </Link>
        ),
        properties: [],
      },
      {
        id: "tabs",
        name: "Tabs",
        icon: "fluent:arrow-circle-up-20-filled",
        component: (
          <Tabs>
            <TabList aria-label="History of Ancient Rome">
              <Tab id="FoR">Founding of Rome</Tab>
              <Tab id="MaR">Monarchy and Republic</Tab>
              <Tab id="Emp">Empire</Tab>
            </TabList>
            <TabPanel id="FoR">
              Arma virumque cano, Troiae qui primus ab oris.
            </TabPanel>
            <TabPanel id="MaR">Senatus Populusque Romanus.</TabPanel>
            <TabPanel id="Emp">Alea jacta est.</TabPanel>
          </Tabs>
        ),
        properties: [],
      },
    ],
  },
  {
    id: "overlays",
    name: "Overlays",
    icon: "fluent:alert-20-filled",
    components: [
      {
        id: "dialog",
        name: "Dialog",
        icon: "fluent:alert-20-filled",
        component: (
          <DialogTrigger>
            <Button>Sign up…</Button>
            <Modal>
              <Dialog>
                {({ close }) => (
                  <form>
                    <Heading slot="title">Sign up</Heading>
                    <TextField autoFocus>
                      <Label>First Name</Label>
                      <Input />
                    </TextField>
                    <TextField>
                      <Label>Last Name</Label>
                      <Input />
                    </TextField>
                    <Button onPress={close} style={{ marginTop: 8 }}>
                      Submit
                    </Button>
                  </form>
                )}
              </Dialog>
            </Modal>
          </DialogTrigger>
        ),
        properties: [],
      },
      {
        id: "modal",
        name: "Modal",
        icon: "fluent:alert-20-filled",
        component: (
          <DialogTrigger>
            <Button>Sign up…</Button>
            <Modal>
              <Dialog>
                {({ close }) => (
                  <form>
                    <Heading slot="title">Sign up</Heading>
                    <TextField autoFocus>
                      <Label>First Name:</Label>
                      <Input />
                    </TextField>
                    <TextField>
                      <Label>Last Name:</Label>
                      <Input />
                    </TextField>
                    <Button onPress={close}>Submit</Button>
                  </form>
                )}
              </Dialog>
            </Modal>
          </DialogTrigger>
        ),
        properties: [],
      },
      {
        id: "popover",
        name: "Popover",
        icon: "fluent:alert-20-filled",
        component: (
          <DialogTrigger>
            <Button>Settings</Button>
            <Popover>
              <OverlayArrow>
                <svg width={12} height={12} viewBox="0 0 12 12">
                  <path d="M0 0 L6 6 L12 0" />
                </svg>
              </OverlayArrow>
              <Dialog>
                <div className="flex-col">
                  <Switch defaultSelected>
                    <div className="indicator" /> Wi-Fi
                  </Switch>
                  <Switch defaultSelected>
                    <div className="indicator" /> Bluetooth
                  </Switch>
                  <Switch>
                    <div className="indicator" /> Mute
                  </Switch>
                </div>
              </Dialog>
            </Popover>
          </DialogTrigger>
        ),
        properties: [],
      },
      {
        id: "tooltip",
        name: "Tooltip",
        icon: "fluent:alert-20-filled",
        component: (
          <TooltipTrigger>
            <Button>✏️</Button>
            <Tooltip>
              <OverlayArrow>
                <svg width={8} height={8} viewBox="0 0 8 8">
                  <path d="M0 0 L4 4 L8 0" />
                </svg>
              </OverlayArrow>
              Edit
            </Tooltip>
          </TooltipTrigger>
        ),
        properties: [],
      },
    ],
  },
  {
    id: "pickers",
    name: "Pickers",
    icon: "fluent:calendar-20-filled",
    components: [
      {
        id: "combo-box",
        name: "Combo Box",
        icon: "fluent:calendar-20-filled",
        component: (
          <ComboBox>
            <Label>Favorite Animal</Label>
            <div>
              <Input />
              <Button>▼</Button>
            </div>
            <Popover>
              <ListBox>
                <ListBoxItem>Aardvark</ListBoxItem>
                <ListBoxItem>Cat</ListBoxItem>
                <ListBoxItem>Dog</ListBoxItem>
                <ListBoxItem>Kangaroo</ListBoxItem>
                <ListBoxItem>Panda</ListBoxItem>
                <ListBoxItem>Snake</ListBoxItem>
              </ListBox>
            </Popover>
          </ComboBox>
        ),
        properties: [],
      },
      {
        id: "select",
        name: "Select",
        icon: "fluent:calendar-20-filled",
        component: (
          <Select>
            <Label>Favorite Animal</Label>
            <Button>
              <SelectValue />
              <span aria-hidden="true">▼</span>
            </Button>
            <Popover>
              <ListBox>
                <ListBoxItem>Aardvark</ListBoxItem>
                <ListBoxItem>Cat</ListBoxItem>
                <ListBoxItem>Dog</ListBoxItem>
                <ListBoxItem>Kangaroo</ListBoxItem>
                <ListBoxItem>Panda</ListBoxItem>
                <ListBoxItem>Snake</ListBoxItem>
              </ListBox>
            </Popover>
          </Select>
        ),
        properties: [],
      },
    ],
  },
  {
    id: "status",
    name: "Status",
    icon: "fluent:checkmark-20-filled",
    components: [
      {
        id: "meter",
        name: "Meter",
        icon: "fluent:checkmark-20-filled",
        component: (
          <Meter value={25}>
            {({ percentage, valueText }) => (
              <>
                <Label>Storage space</Label>
                <span className="value">{valueText}</span>
                <div className="bar">
                  <div className="fill" style={{ width: percentage + "%" }} />
                </div>
              </>
            )}
          </Meter>
        ),
        properties: [],
      },
      {
        id: "progress-bar",
        name: "Progress Bar",
        icon: "fluent:checkmark-20-filled",
        component: (
          <ProgressBar value={80}>
            {({ percentage, valueText }) => (
              <>
                <Label>Loading…</Label>
                <span className="value">{valueText}</span>
                <div className="bar">
                  <div className="fill" style={{ width: percentage + "%" }} />
                </div>
              </>
            )}
          </ProgressBar>
        ),
        properties: [],
      },
    ],
  },
  {
    id: "content",
    name: "Content",
    icon: "fluent:group-20-filled",
    components: [
      {
        id: "group",
        name: "Group",
        icon: "fluent:group-20-filled",
        component: (
          <TextField>
            <Label>Email</Label>
            <Group>
              <Input />
              <Button aria-label="Add email">+</Button>
            </Group>
          </TextField>
        ),
        properties: [],
      },
      {
        id: "toolbar",
        name: "Toolbar",
        icon: "fluent:group-20-filled",
        component: (
          <Toolbar aria-label="Text formatting">
            <Group aria-label="Style">
              <ToggleButton aria-label="Bold">
                <b>B</b>
              </ToggleButton>
              <ToggleButton aria-label="Italic">
                <i>I</i>
              </ToggleButton>
              <ToggleButton aria-label="Underline">
                <u>U</u>
              </ToggleButton>
            </Group>
            <Separator orientation="vertical" />
            <Group aria-label="Clipboard">
              <Button>Copy</Button>
              <Button>Paste</Button>
              <Button>Cut</Button>
            </Group>
            <Separator orientation="vertical" />
            <Checkbox>
              <div className="checkbox">
                <svg viewBox="0 0 18 18" aria-hidden="true">
                  <polyline points="1 9 7 14 15 4" />
                </svg>
              </div>
              Night Mode
            </Checkbox>
          </Toolbar>
        ),
        properties: [],
      },
    ],
  },
];

