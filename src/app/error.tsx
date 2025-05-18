'use client';

import {Button} from "@mui/material";

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }){
  return (<div style={{width: '100%', textAlign: 'center'}}>
    <h1>We have faced an issue...</h1>
    <p>{error.message}</p>
    <Button onClick={() => reset()} variant={'outlined'} color={'error'}>Go back</Button>
  </div>);
}