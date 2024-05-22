import { Box, Button, CircularProgress, IconButton, LinearProgress, List, ListItem, ListItemIcon, ListItemText, Stack, Typography } from '@mui/material';
import React, { useState, useMemo } from 'react';
import { Icon } from '@iconify/react';
import { createWorkerFactory, useWorker } from '@shopify/react-web-worker';
import { v4 } from 'uuid';

//Web Worker
const createAIWorker = createWorkerFactory(() => import('../workers/AIworker'));

export function AIFileUploader({ purpose, onUploadComplete }) {
  //CONSTANTS
  const AIworker = useWorker(createAIWorker);

  //STATES
  //--upload
  const [files, setFiles] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);
  const [progress, setProgress] = useState(0);

  //HOOKS

  //FUNCTIONS
  //--Each file upload
  const uploadFile = (_eachFile) => {

    console.log("Uploading file to OpenAI", _eachFile);

    //Set the file to uploading
    setFiles((prevFiles) =>
      prevFiles.map((prevFile) =>
        prevFile.uploadId === _eachFile.uploadId ? { ...prevFile, uploading: true } : prevFile
      )
    );

    //Upload the file
    AIworker.UploadToOpenAIFiles(_eachFile.file, purpose)
      .then((res) => {
        //Set the file to success
        setFiles((prevFiles) =>
          prevFiles.map((prevFile) =>
            prevFile.uploadId === _eachFile.uploadId ? { ...prevFile, success: true } : prevFile
          )
        );
        //Add the file to the uploaded files array
        setUploadedFiles((prevFiles) => [...prevFiles, res]);
      })
      .catch((err) => {
        //Set the file to error
        setFiles((prevFiles) =>
          prevFiles.map((prevFile) =>
            prevFile.uploadId === _eachFile.uploadId ? { ...prevFile, error: err} : prevFile
          )
        );
      });
  };

  //__on file select
  const onFileSelect = (e) => {
    const files = e.target.files;

    if (files.length > 0) {
      const newFiles = Array.from(files).map((file) => {
        return {
          file: file,
          name: file.name,
          size: file.size,
          uploading: false,
          success: false,
          error: false,
          uploadId: v4(),
        };
      });

      setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    }
  };

  //__on file remove
  const onRemove = (file) => {
    const newFiles = files.filter((f) => f.name !== file.name);
    setFiles(newFiles);
  };

  //__on upload
  const beginUpload = async () => {
    //Set uploading to true
    setUploading(true);
    //Set error to false
    setError(false);
    //Set success to false
    setSuccess(false);
    //Set progress to 0
    setProgress(0);
    
    //promise to ensure all files are uploaded one by one
    const uploadPromises = files.map((file) => uploadFile(file));
    //await all the promises
    await Promise.all(uploadPromises);
    //Set uploading to false
    setUploading(false);
    //Set success to true
    setSuccess(true);

    //log the uploaded files
    console.log("Finished uploading files to OpenAI", uploadedFiles);

    //Call the onComplete function
    onUploadComplete(uploadedFiles);
  }

  //__on cancel
  const onCancel = () => {
    setFiles([]);
    setProgress(0);
    setUploading(false);
    setError(false);
    setSuccess(false);
  };

  //__on Complete
  const onComplete = () => {
    //Get the uploaded files
    const files = uploadedFiles.map((file) => file);
    //Clear the uploaded files array
    setUploadedFiles([]);
    //Clear the files array
    setFiles([]);
    //Set the progress to 0
    setProgress(0);
    //Set uploading to false
    setUploading(false);
    //Set success to false
    setSuccess(false);
    //Set error to false
    setError(false);
    //Return the uploaded files
    onUploadComplete(files);
  };

  return (
    <>
      {/**Selected Files List**/}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          borderBottom: '1px solid #ccc',
        }}
      >
        <List>
          {files.map((file, index) => (
            <>
              <ListItem
                key={index}
                secondaryAction={
                  <IconButton 
                    edge="end" 
                    aria-label="delete" 
                    size='small'
                    onClick={() => onRemove(file)}
                  >
                    <Icon icon="bi:trash" color="#ff1744" width="20" height="20" />
                  </IconButton>
                }
                sx={{
                  width: '100%'
                }}
              >
                <ListItemIcon>
                  {file.uploading ? (
                    <CircularProgress />
                  ) : file.success ? (
                    <Icon icon="bi:check-circle-fill" color="#2196f3" width="35" height="35" />
                  ) : file.error ? (
                    <Icon icon="bi:exclamation-triangle-fill" color="#ff1744" width="35" height="35" />
                  ) : (
                    <Icon icon="bi:file-earmark-arrow-up-fill" color="#2196f3" width="35" height="35" />
                  )}
                </ListItemIcon>
                <ListItemText primary={file.file.name} secondary={file.file.size} />
              </ListItem>
            </>
          ))}
        </List>
      </Box>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          height: '100%',
          width: '100%',
          border: '1px dashed #ccc',
          borderRadius: '5px',
          cursor: 'pointer',
          marginBottom: 2
        }}
      >
        <Typography
          variant="subtitle2"
          sx={{
            marginLeft: 1
          }}
        >
          Drag 'n' drop some files here, or click to select files
        </Typography>

        {files.length > 0 &&
          <Button
            variant="contained"
            color={
              uploading
              ? 'primary'
              : error
              ? 'error'
              : success
              ? 'success'
              : 'primary'
            }
            size="small"
            startIcon={
              uploading
              ? <CircularProgress size={15} />
              : error
              ? <Icon icon="bi:exclamation-triangle-fill" color="#fff" width="20" height="20" />
              : success
              ? <Icon icon="bi:check-circle-fill" color="#fff" width="20" height="20" />
              : <Icon icon="bi:file-earmark-arrow-up-fill" color="#fff" width="20" height="20" />
            }
            onClick={
              uploading
              ? onCancel
              : error
              ? null
              : success
              ? null
              : beginUpload
            }
            disabled={files.length === 0}
          >
            {uploading ? 'Uploading' : error ? 'Error' : success ? 'Success' : 'Upload'}
          </Button>
        }

        {uploading && (
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
              width: '100%'
            }}
          />
        )}
        {error && (
          <Typography
            color="error"
            variant="subtitle2"
            sx={{
              marginLeft: 1
            }}
          >
            {errMsg}
          </Typography>
        )}
      </Box>
    </>
  );
}
