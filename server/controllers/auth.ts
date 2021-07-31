import express, { Request, Response, NextFunction } from 'express';
import SpotifyWebApi from 'spotify-web-api-node';

export const getAuthorizeUrl = (req: Request, res: Response) => {
  const { CLIENT_ID, REDIRECT_URI } = process.env;

  const scopes = ['user-read-private', 'user-read-email'];
  const credentials = {
    redirectUri: REDIRECT_URI,
    clientId: CLIENT_ID,
  };

  const spotifyApi = new SpotifyWebApi(credentials);

  const authorizeURL = spotifyApi.createAuthorizeURL(scopes);

  res.redirect(authorizeURL);
  // res.json({ authorizeURL });
};

export const getTokens = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } = process.env;

  const credentials = {
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    redirectUri: REDIRECT_URI,
  };

  const spotifyApi = new SpotifyWebApi(credentials);

  const code = (req.query as { code: string }).code;

  try {
    // Retrieve an access token and a refresh token
    const data = await spotifyApi.authorizationCodeGrant(code);

    res.json({
      expiresIn: data.body.expires_in,
      accessToken: data.body.access_token,
      refreshToken: data.body.refresh_token,
    });
  } catch (error) {
    next(error);
  }
};

export const getUserInfo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const credentials = { accessToken: req.headers.authorization };

  const spotifyApi = new SpotifyWebApi(credentials);

  try {
    const data = await spotifyApi.getMe();
    res.json(data);
  } catch (error) {
    next(error);
  }
};
