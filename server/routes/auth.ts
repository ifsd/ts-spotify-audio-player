import express, { Request, Response, NextFunction } from 'express';
import SpotifyWebApi from 'spotify-web-api-node';

const router = express.Router();

router.get('/spotify', (req: Request, res: Response, next: NextFunction) => {
  const { CLIENT_ID, REDIRECT_URI } = process.env;

  const scopes = ['user-read-private', 'user-read-email'];
  const credentials = {
    redirectUri: REDIRECT_URI,
    clientId: CLIENT_ID,
  };

  const spotifyApi = new SpotifyWebApi(credentials);

  const authorizeURL = spotifyApi.createAuthorizeURL(scopes);

  res.redirect(authorizeURL);
});

router.get(
  '/spotify/callback',
  (req: Request, res: Response, next: NextFunction) => {
    const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } = process.env;

    const credentials = {
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      redirectUri: REDIRECT_URI,
    };

    const spotifyApi = new SpotifyWebApi(credentials);

    const code = req.query.code as string;

    // Retrieve an access token and a refresh token
    spotifyApi.authorizationCodeGrant(code).then(
      function (data) {
        console.log('The token expires in ' + data.body['expires_in']);
        console.log('The access token is ' + data.body['access_token']);
        console.log('The refresh token is ' + data.body['refresh_token']);

        // Set the access token on the API object to use it in later calls
        spotifyApi.setAccessToken(data.body['access_token']);
        spotifyApi.setRefreshToken(data.body['refresh_token']);
        res.send('Sucess!!!');
      },
      function (err) {
        console.log('Something went wrong!', err.message);
      }
    );
  }
);

export default router;
