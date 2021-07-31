import React from 'react';
import { Button, Container, Grid, Typography } from '@material-ui/core';

function Login() {
  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justify="center"
      spacing={5}
      style={{ minHeight: '100vh' }}
    >
      <Grid item>
        <Typography variant="h2" align="center">
          Spotify Audio Player
        </Typography>
        <Typography align="center">
          Log in with your Spotify account to use the app
        </Typography>
      </Grid>

      <Grid item>
        <Button variant="contained" color="primary">
          Log In With Spotify
        </Button>
      </Grid>
    </Grid>
  );
}

export default Login;
