import express from 'express';
import SpotifyWebApi from 'spotify-web-api-node';

const router = express.Router();

router.get('/spotify', (req, res, next) => {
  const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } = process.env;
  console.log(
    'hehehehehe',
    typeof process.env.CLIENT_ID,
    process.env.CLIENT_ID
  );
  const scopes = ['user-read-private', 'user-read-email'];
  const credentials = {
    redirectUri: REDIRECT_URI,
    clientId: CLIENT_ID,
  };

  // Setting credentials can be done in the wrapper's constructor, or using the API object's setters.
  const spotifyApi = new SpotifyWebApi(credentials);

  // Create the authorization URL
  const authorizeURL = spotifyApi.createAuthorizeURL(scopes);

  // https://accounts.spotify.com:443/authorize?client_id=5fe01282e44241328a84e7c5cc169165&response_type=code&redirect_uri=https://example.com/callback&scope=user-read-private%20user-read-email&state=some-state-of-my-choice
  // console.log(authorizeURL);
  res.redirect(authorizeURL);
});

router.get('/spotify/callback', (req, res, next) => {
  const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } = process.env;

  const credentials = {
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    redirectUri: REDIRECT_URI,
  };

  const spotifyApi = new SpotifyWebApi(credentials);

  // The code that's returned as a query parameter to the redirect URI
  console.log('query', req.query, 'params', req.params, 'body', req.body);
  console.log(
    'hehehehehe',
    typeof process.env.CLIENT_ID,
    process.env.CLIENT_ID
  );

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
});

export default router;
