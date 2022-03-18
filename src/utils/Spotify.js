// TODO: Get Client ID from https://developer.spotify.com/dashboard/ and put it here
const clientId = '4996c585948d473fb2ba3acbe5501b52';

const redirectUri = 'http://localhost:3000/';
const spotifyUrl = `https://accounts.spotify.com/authorize?response_type=token&scope=playlist-modify-public&client_id=${clientId}&redirect_uri=${redirectUri}`;
let accessToken = undefined;
let expiresIn = undefined;

const Spotify = {

  // savePlayList(playListName, tracksUri){
  //   if(!playListName || !tracksUri.length){ 
  //     return
  //   }
  //   accessToken = Spotify.getAccessToken();
  //   const headers = { Authorization: `Bearer ${accessToken}` }
  //   let userId ;
  //   fetch('https://api.spotify.com/v1/me', { headers: headers})
  //     .then((response=> {response.json()}))
  //     .then((jsonResponse)=> userId = jsonResponse.id)
  // },

  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }
    // check for the access token match
    const urlAccessToken = window.location.href.match(/access_token=([^&]*)/);
    const urlExpiresIn = window.location.href.match(/expires_in=([^&]*)/);
    if (urlAccessToken && urlExpiresIn) {
      accessToken = urlAccessToken[1];
      expiresIn = urlExpiresIn[1];
      // clear parameter
      window.setTimeout(() => (accessToken = ''), expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
    } else {
      window.location = spotifyUrl;
    }
  },

  async search(term) {
    const searchUrl = `https://api.spotify.com/v1/search?type=track&q=${term.replace(' ', '%20')}`;
    // accessToken = Spotify.getAccessToken();
    // const searchUrl = `https://api.spotify.com/v1/search?type=track&q=${term}`;
    return fetch(searchUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => response.json())
      .then((jsonResponse) => {
        if (!jsonResponse.tracks) return [];
        return jsonResponse.tracks.items.map((track) => {
          return {
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            uri: track.uri,
          };
        });
      });
  },

  async savePlaylist(name, trackIds) {
    if (Array.isArray(trackIds) && trackIds.length) {
      const createPlaylistUrl = `https://api.spotify.com/v1/me/playlists`;
      const response = await fetch(createPlaylistUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          name: name,
          public: true,
        }),
      });
      const jsonResponse = await response.json();
      const playlistId = jsonResponse.id;
      if (playlistId) {
        const replacePlaylistTracksUrl = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;
        await fetch(replacePlaylistTracksUrl, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            uris: trackIds.map((id) => id),
          }),
        });
      }
    }
  },
};

export default Spotify;
