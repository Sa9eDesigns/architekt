/*File Uploader: Uploads files to a server by sending form data with the file to the server.
The Server is expected to return a JSON object with the file URL and other details.
Server: WordPress
*/

import React, { useState } from "react";
import { Box, Button, Typography, CircularProgress } from "@mui/material";
import axios from "axios";
import { AspectRatio, Card, CardContent, IconButton } from "@mui/joy";


export const FileUploader = ({ url, onUpload,  }) => {
  //STATES
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");
  const [fileUrl, setFileUrl] = useState("");

  //FUNCTIONS
  //--upload file with progress
  const uploadFile = async (e) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    try {
      const res = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          setProgress(
            parseInt(
              Math.round((progressEvent.loaded * 100) / progressEvent.total)
            )
          );
        },
      });
      setFileUrl(res.data.url);
      setLoading(false);
    } catch (err) {
      setError("Error uploading file");
      setLoading(false);
    }
  };

  //--selects a file and return a dataURL 
  const fakeUpload = () => {
    let res =  new Promise((resolve, reject) => {
      const file = new Blob([""], { type: "image/png" });
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

    res.then((data) => {
      onUpload(data);
    })
    .catch((err) => {
      setError("Error uploading file");
      console.log(err);
    });
  }

  const checkFileType = (file) => {
    if (
      file.type === "image/png" ||
      file.type === "image/jpg" ||
      file.type === "image/jpeg"
    ) {
      return true;
    }
    return false;
  };

  //EFFECTS
  // --listen to file change
  React.useEffect(() => {
    if (file) {
      onUpload( file ? URL.createObjectURL(file) : null);
    }
  }, [file]);

  return (
    <Card sx={{ width: "100%" }}>
      <AspectRatio minHeight="120px" maxHeight="200px">
        {
          //check if file is image
          file && checkFileType(file) ? (
            <img
              src={URL.createObjectURL(file)}
              alt="preview"
              style={{ width: "100%", height: "100%" }}
            />
          ) : file && !checkFileType(file) ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "100%",
                backgroundColor: "grey.200",
              }}
            >
              <Typography>File Not Supported</Typography>
            </Box>
          ) :
          //if Error
          error ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "100%",
                backgroundColor: "grey.200",
              }}
            >
              <Typography>{error}</Typography>
            </Box>
          ) :
          (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "100%",
                backgroundColor: "grey.200",
              }}
            >
              <Typography>Upload Image</Typography>
            </Box>
          )
        }
      </AspectRatio>

      <CardContent orientation="horizontal">
        {loading ? (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <CircularProgress
              variant="determinate"
              value={progress}
              sx={{ marginRight: 1 }}
            />
            <Typography>{progress}%</Typography>
          </Box>
        ) : (
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        )}
        {file && (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button variant="contained" color="primary" onClick={fakeUpload}>
              Upload
            </Button>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default FileUploader;
