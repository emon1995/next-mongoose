import { useTheme } from '@emotion/react';
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import { useMediaQuery } from '@mui/material';
import { useEffect, useState } from 'react';
import {useRouter} from 'next/router';

const ViewNote = ({ note }) => {
  const [confirm, setConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const router = useRouter();

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(()=>{
    if(isDeleting){
        deleteNote();
    }
}, [isDeleting]);


  const open = () => setConfirm(true);
  const close = () => setConfirm(false);

  const deleteNote = async () => {
      const noteId = router.query.id;
      try{
          const deleted = await fetch(`http://localhost:3000/api/Note/${noteId}`, {
              method: 'DELETE'
          })
          router.push("/")
      }catch(error){
          console.log(error);
      }
  }

  const handleDelete = async () => {
      setIsDeleting(true);
      close();
  }

  return (
    <div className='note-container'>
      {isDeleting ? (
        <CircularProgress color='secondary' />
      ) : (
        <>
          <h1>{note.title}</h1>
          <p>{note.description}</p>
          <Button variant='contained' color='secondary' onClick={open}>
            Delete
          </Button>
        </>
      )}

      <Dialog
        fullScreen={fullScreen}
        open={confirm}
        onClose={close}
        aria-labelledby='responsive-dialog-title'>
        <DialogTitle id='responsive-dialog-title'>
          {'Are you sure?'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>{note.title} is Deleted?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={close}>
            Disagree
          </Button>
          <Button autoFocus onClick={handleDelete}>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

ViewNote.getInitialProps = async ({ query: { id } }) => {
  const res = await fetch(`http://localhost:3000/api/Note/${id}`);
  const { data } = await res.json();

  return {
    note: data,
  };
};

export default ViewNote;
