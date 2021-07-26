
var accessToken; 
const clientID= '9bd6065966854728a67b6de9e5177092';
const redirectURI = 'http://localhost:3000/';

export const Spotify = {
    getAccessToken(){
        if(accessToken){
            return accessToken;
        } else{
            console.log('Calling access token');
            const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
            const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

            //check for access token match
            if(accessTokenMatch && expiresInMatch){
                accessToken = accessTokenMatch[1];
                const expiresIn = Number(expiresInMatch[1]);

                //This clears the tokens allowing us to grab a new token when it expires
                window.setTimeout(() => accessToken = '', expiresIn * 1000);
                window.history.pushState('Access Token', null, '/');
                return accessToken;
            } else{
                const accessURL = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
                window.location = accessURL;
            }
        }
    },

    search(term){
        const accessToken = Spotify.getAccessToken();
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
            headers: { 'Authorization': `Bearer ${accessToken}` }
        }).then(response => {
            console.log(response.status);
            return response.json();
        }).then(jsonResponse => {
            if(!jsonResponse.tracks){
                return [];
            } 
            return jsonResponse.tracks.items.map(track => {
                return {
                    id: track.id.toString(),
                    name: track.name.toString(), 
                    artist: track.artists[0].toString(),
                    album: track.album.name.toString(),
                    uri: track.uri.toString()}
                });
        });
    },

    savePlaylist(name, trackUris){
        if(!name || !trackUris){
            return;
        }
        const accessToken = Spotify.getAccessToken();
        const headers = {
            Authorization: `Bearer ${accessToken}`
        };
        return fetch('https://api.spotify.com/v1/me', { headers: headers}
        ).then(response => { response.json()}
        ).then(jsonResponse => {
            let userID= jsonResponse.id.toString();
            return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
                headers: headers,
                method: 'POST',
                body: JSON.stringify({name: name})
            }).then(response => response.json()
            ).then(jsonResponse => {
                const playlistID = jsonResponse.id.toString();
                return playlistID;
            })
        });
    }
};

