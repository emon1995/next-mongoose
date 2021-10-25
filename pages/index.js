import { Button, Card, CardActions, CardContent, CardHeader, Typography } from '@mui/material';
import Link from 'next/link';

const Home = ({notes}) => {
  return (
    <div className="note-container">
      <h1 className="id">Notes</h1>
      <div className="grid wrapper">
        {
          notes.map(note => {
            console.log(note.title)
            return(
              <div key={note._id}>
                <Card>
                  <CardContent>
                    <Link href={`/${note._id}`} passHref>
                      <Typography gutterBottom variant="h5" component="a">{note.title}</Typography>
                    </Link>
                  </CardContent>
                  <CardContent>
                    <CardActions>
                      <Link href={`/${note._id}`} passHref>
                        <Button variant="contained" color="primary">View</Button>
                      </Link>
                      <Link href={`/${note._id}/edit`} passHref>
                        <Button variant="contained" color="success">Edit</Button>
                      </Link>
                    </CardActions>
                  </CardContent>
                </Card>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

Home.getInitialProps = async() => {
  const res = await fetch(`http://localhost:3000/api/Note`);
  const {data} = await res.json();

  return{
    notes: data
  }
}

export default Home;
