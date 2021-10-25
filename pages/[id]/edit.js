import { Button, CircularProgress } from '@material-ui/core';
import { TextField } from '@mui/material';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import {useRouter} from 'next/router';

const EditNote = ({ note }) => {
  const [form, setForm] = useState({
    title: note.title,
    description: note.description,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const router = useRouter();

  useEffect(() => {
      if(isSubmitting){
          if(Object.keys(errors).length === 0){
              updateNote();
          }else{
              setIsSubmitting(false)
          }
      }
  }, [errors]);

  const updateNote = async () => {
      try{
        const res = await fetch(`http://localhost:3000/api/Note/${router.query.id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(form)
        })
        router.push("/");
      }catch(error){
          console.log(error);
      }
  }

  const handleSubmit = (e) => {
      e.preventDefault();
      let errs = validate();
      setErrors(errs);
      setIsSubmitting(true);
  }

  const handleChange = (e) => {
      setForm({
          ...form,
          [e.target.name]: e.target.value,
      })
  };

  const validate = () => {
      let err = {};

      if(!form.title){
          err.title = "Title is Required"
      }

      if(!form.description){
          err.description = "Description is Required"
      }
      return err;
  }

  return (
    <div className='form-container'>
        <h1>Edit Note</h1>
      {
          isSubmitting
          ?
          <CircularProgress color='secondary' />
          :
          <>
          <Box
        component='form'
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        onSubmit={handleSubmit}
        noValidate
        autoComplete='off'>
        <div>
          <TextField
            error={errors.title}
            id='outlined-error'
            label='Title'
            name='title'
            placeholder='Please enter a title'
            value={form.title}
            onChange={handleChange}
          />
          <TextField
            error={errors.description}
            id='outlined-textarea'
            label='Description'
            name='description'
            multiline
            rows={4}
            placeholder='Please enter a description'
            value={form.description}
            onChange={handleChange}
          />
          
        </div>
        <Button variant="contained" color="secondary" type="submit">Update</Button>
      </Box>
          </>
      }
    </div>
  );
};

EditNote.getInitialProps = async ({ query: { id } }) => {
  const res = await fetch(`http://localhost:3000/api/Note/${id}`);
  const { data } = await res.json();

  return {
    note: data,
  };
};

export default EditNote;
