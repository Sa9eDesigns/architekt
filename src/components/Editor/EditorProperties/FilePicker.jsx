/*File Uploader: Uploads files to a server by sending form data with the file to the server.
The Server is expected to return a JSON object with the file URL and other details.
Server: WordPress
*/

import React, { useState } from "react";
import {
  AspectRatio,
  Card,
  CardContent,
  IconButton,
  Typography,
  Button,
  Box,
  Divider,
  Sheet,
  Stack,
  ButtonGroup,
  Input,
  CardActions,
  LinearProgress,
} from "@mui/joy";
import { Icon } from "@iconify/react";
import { Dialog } from "@mui/material";
import * as _ from "lodash";

export const FilePicker = ({ type, onSelected }) => {
  //STATES
  const [mode, setMode] = useState("library");
  //--library
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [allFiles, setAllFiles] = useState([]);
  //--uploader
  const [selectedUploadFile, setSelectedUploadFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  //--Pixabay
  const [pixabaySearchTerm, setPixabaySearchTerm] = useState("");
  const [pixabayQuery, setPixabayQuery] = useState("");
  const [pixabayImages, setPixabayImages] = useState([]);
  const [pixabayLoading, setPixabayLoading] = useState(false);
  const [pixabayError, setPixabayError] = useState("");


  //FUNCTIONS
  //--library: get files and media
  function getFilesAndMedia({ page, per_page, mime_type }) {
    setLoading(true);
    /* FileApi.queryMedia({ page, per_page, mime_type })
      .then((res) => {
        //if all files is empty
        if (allFiles.length === 0) {
          setAllFiles(res.data);
          setCurrentPage(page + 1);
        }

        //if all files is not empty
        else {
          setAllFiles([...allFiles, ...res.data]);
          setCurrentPage(page + 1);
        }

        console.log("FILES\n" + res.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);

        console.log(error);
      }); */
  }

  //--uploader: upload file
  function uploadFileToServer(file) {}

  //--Pixabay: search images
  function searchPixabayImages(query) {}

  //--On File Select
  const onFileSelect = (file) => {
    setFile(file);

    //pass the selected file to the parent component
    onSelected(file);
  };

  //EFFECTS
  React.useEffect(() => {
    getFilesAndMedia({ page: 1, per_page: 10, mime_type: type });
  }, []);

  return (
    <Card sx={{ width: "100%" }}>
      <CardContent>
        {/** Header */}
        <Stack spacing={2} direction="row" alignItems="center">
          <Typography level="title">Select a file</Typography>
          <Stack spacing={1} direction="row" alignItems="center">
            <Button
              onClick={() => setMode("library")}
              variant={mode === "library" ? "contained" : "outlined"}
            >
              Library
            </Button>

            <Button
              onClick={() => setMode("uploader")}
              variant={mode === "uploader" ? "contained" : "outlined"}
            >
              Upload
            </Button>

            <Button
              onClick={() => setMode("pixabay")}
              variant={mode === "pixabay" ? "contained" : "outlined"}
            >
              Pixabay
            </Button>
          </Stack>
        </Stack>


        <Divider sx={{ margin: "1rem 0" }} />

        {
          mode === "library"
          ?
          <>
          <Box sx={{ display: "flex", flexWrap: "wrap" }}>
          {loading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "100%",
              }}
            >
              <Icon icon="svg-spinners:eclipse" width="50" height="50" />
            </Box>
          ) : (
            allFiles.map((file) => (
              <>
                <FilePickerItem
                  key={file.id}
                  file={file}
                  selected={file}
                  onSelect={onFileSelect}
                />

                {loadingMore && (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "100%",
                      height: "100%",
                    }}
                  >
                    <Icon icon="svg-spinners:eclipse" width="50" height="50" />
                  </Box>
                )}
              </>
            ))
          )}
        </Box>

        {!loadingMore && (
          <Button
            onClick={() =>
              getFilesAndMedia({
                page: currentPage,
                per_page: 10,
                mime_type: type,
              })
            }
            disabled={loading}
            variant="contained"
          >
            Load More
          </Button>
        )}
          </>
          :

          mode === "uploader"
          ?
          <>
          <Card
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "100%",
            }}
            >
            <Typography level="title-lg">Upload a file</Typography>
            <Divider sx={{ margin: "1rem 0" }} />

            <CardContent>
              {
                _.isEmpty(selectedUploadFile)
                ?
                <Input
                  type="file"
                  onChange={(e) => setSelectedUploadFile(e.target.files[0])}
                />
                :
                <Sheet
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    height: "100%",
                    border: "1px dashed #ccc",
                    borderRadius: 4,
                    "&:hover": {
                      backgroundColor: "(--var(--surface-color))",
                      color: "var(--primary-color)",
                    },
                    transition: "background-color 0.3s",
                    cursor: "pointer",
                  }}
                  >
                    {
                      //use lodash to check if the file is an image
                      _.get(selectedUploadFile, "type", "").includes("image")
                      ?
                      <img src={URL.createObjectURL(selectedUploadFile)} alt="file" />
                      :
                      <Icon icon="akar-icons:file" style={{ fontSize: "3rem" }} />
                    }
                  </Sheet>
              }
            </CardContent>
            
            <Divider sx={{ margin: "1rem 0" }} />
            <CardActions>
              <Button
                onClick={() => {
                  uploadFileToServer(selectedUploadFile);
                }}
                variant="contained"
                disabled={uploading}
              >
                Upload
              </Button>

              {
                uploading
                &&
                <LinearProgress
                  variant="determinate"
                  value={uploadProgress}
                  sx={{ width: "100%" }}
                />
              }
            </CardActions>
            </Card>
          </>
          :

          mode === "pixabay"
          ?
          <>
          <Input
          variant="outlined"
          placeholder="Search images on Pixabay"
          value={pixabaySearchTerm}
          onChange={(e) => setPixabaySearchTerm(e.target.value)}
          endDecorator={
            <Button
              onClick={() => searchPixabayImages(pixabaySearchTerm)}
            >
              Search
            </Button>
          }
          />
          {
            pixabayLoading
            ?
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "100%",
              }}
            >
              <Icon icon="svg-spinners:eclipse" width="50" height="50" />
            </Box>
            :
            <Box sx={{ display: "flex", flexWrap: "wrap" }}>
              {
                pixabayImages.map((image) => (
                  <FilePickerItem
                    key={image.id}
                    file={image}
                    selected={image}
                    onSelect={onFileSelect}
                  />
                ))
              }
            </Box>
          }
          </>
          :
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "100%",
            }}
          >
            {
              !_.isEmpty(error)
              ?
              <>
              <Typography level="title-lg" color="error">
                {error?.message ? error.message : JSON.stringify(error)}
              </Typography>

              <Icon 
                icon="material-symbols:error" 
                style={{ fontSize: "3rem", color: "red" }}
              /> 
              </>
              :
              <>
              <Typography level="title-lg" color="error">
                Select a mode to get started
              </Typography>
              </>
            }
            
          </Box>
        }
      </CardContent>
    </Card>
  );
};

export const FilePickerOpener = ({ onSelected, currentFile }) => {
  //STATES
  const [pickerOpen, setPickerOpen] = useState(false);
  const [file, setFile] = useState(null);

  //FUNCTIONS
  const handleOpenPicker = () => {
    setPickerOpen(true);
  };

  const onFileSelect = (file) => {
    setFile(file);
    onSelected(file);
  };

  //RETURN
  return (
    <Sheet
      sx={{
        width: "100%",
      }}
      onClick={handleOpenPicker}
    >
      <Stack spacing={2} direction="row" alignItems="center">
        {file || currentFile ? (
          <Sheet
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              borderRadius: 4,
              boxShadow: 2,
              cursor: "pointer",
              flexDirection: "column",
            }}
            onClick={handleOpenPicker}
          >
            <Stack spacing={1} direction="row" alignItems="center">
              <FileIcon
                mime_type={
                  file
                    ? file.mime_type
                    : mediaMimeTypeFromExtension(currentFile.split(".").pop())
                }
                url={file ? file.url : currentFile}
              />
              <Divider orientation="vertical" flexItem />

              <Box>
                <Typography level="body-sm">
                  {file ? file.title : currentFile}
                </Typography>
                <ButtonGroup>
                  <Button
                    onClick={() => setFile(null)}
                    variant="outlined"
                    size={"sm"}
                  >
                    <Icon icon="akar-icons:cross" />
                  </Button>
                  <Button
                    onClick={handleOpenPicker}
                    variant="outlined"
                    size={"sm"}
                  >
                    <Icon icon="akar-icons:edit" />
                  </Button>
                </ButtonGroup>
              </Box>
            </Stack>
          </Sheet>
        ) : (
          <Sheet
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: 90,
              border: "1px dashed #ccc",
              borderRadius: 4,
              "&:hover": {
                backgroundColor: "(--var(--surface-color))",
                color: "var(--primary-color)",
              },
              transition: "background-color 0.3s",
              cursor: "pointer",
            }}
            onClick={handleOpenPicker}
          >
            <Icon icon={"akar-icons:upload"} style={{ fontSize: "2rem" }} />
            <Typography level="body-sm">Select a file</Typography>
          </Sheet>
        )}
      </Stack>

      <Dialog
        open={pickerOpen}
        onClose={() => setPickerOpen(false)}
        fullWidth
        maxWidth="md"
      >
        <FilePicker type="image" onSelected={onFileSelect} />
      </Dialog>
    </Sheet>
  );
};

export const ImagePicker = ({ image, onSelect, onRemove }) => {

  //STATES
  const [file, setFile] = useState(image);
  const [details, setDetails] = useState({});
  //--events
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");


  //FUNCTIONS
  const handleSelect = (file) => {

    //validate if the file is an image
    if (file.mime_type.includes("image")) {
      setFile(file);
      onSelect(file);
    } else {
      setError("Invalid file type. Please select an image file.");
    }
  };

  const handleRemove = () => {
    setFile(null);
    onRemove();
  }

  //RETURN
  return (
    <Stack spacing={2} direction="row" alignItems="center">
      <FilePickerOpener
        onSelected={handleSelect}
        currentFile={file ? file.url : ""}
      />

      {file && (
        <IconButton onClick={handleRemove}>
          <Icon icon="akar-icons:cross" />
        </IconButton>
      )}
    </Stack>
  );
};

const FilePickerItem = ({ file, selected, onSelect }) => {
  //PROPS
  const { id, title, caption, alt, description, url, mime_type, date } = file;

  //STATES
  const [isSelected, setIsSelected] = useState(selected);

  //FUNCTIONS
  const generateThumbnail = (mime_type, url) => {
    //images
    if (mime_type.includes("image")) {
      return <img src={url} alt={alt} />;
    }

    //videos
    else if (mime_type.includes("video")) {
      return <video src={url} controls />;
    }

    //audios
    else if (mime_type.includes("audio")) {
      return <audio src={url} controls />;
    }

    //Rest
    else {
      return <FileIcon mime_type={mime_type} />;
    }
  };

  const handleSelect = () => {
    onSelect(file);
    setIsSelected(file);
  };

  return (
    <Card
      variant={isSelected.id === id ? "outlined" : "solid"}
      onClick={handleSelect}
      sx={{
        width: 200,
        margin: 1,
        cursor: "pointer",
      }}
    >
      <CardContent>
        <AspectRatio ratio={16 / 9}>
          {generateThumbnail(mime_type, url)}
        </AspectRatio>

        <Typography level="title-sm" sx={{ marginTop: 1 }}>
          {title}
        </Typography>

        <Typography level="body-xs">
          type:
          <Typography level="body-xs" color="primary">
            {mime_type}
          </Typography>
        </Typography>

        <Typography level="body-xs">
          date:
          <Typography level="body-xs" color="primary">
            {date}
          </Typography>
        </Typography>
      </CardContent>
    </Card>
  );
};

const FileIcon = ({ mime_type, url = "" }) => {
  //a list of file types and their corresponding icons
  const fileTypes = {
    image: "akar-icons:image",
    video: "akar-icons:video",
    audio: "akar-icons:music",
    document: "akar-icons:file",
    archive: "carbon:zip",
    code: "carbon:code",
  };

  //get the icon based on the mime type
  const icon = fileTypes[mime_type.split("/")[0]];

  return mime_type === "image" && url !== "" ? (
    <img src={url} alt="file" width="50" height="50" />
  ) : (
    <Icon icon={icon} />
  );
};

const mediaMimeTypeFromExtension = (extension) => {
  const mediaMimeTypes = {
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    png: "image/png",
    gif: "image/gif",
    mp4: "video/mp4",
    m4a: "audio/mp4",
    mp3: "audio/mpeg",
    pdf: "application/pdf",
    zip: "application/zip",
    doc: "application/msword",
    docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    xls: "application/vnd.ms-excel",
    xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ppt: "application/vnd.ms-powerpoint",
    pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  };

  return mediaMimeTypes[extension]
    ? mediaMimeTypes[extension]
    : "application/octet-stream";
};

export default FilePicker;
