/**
 * @flow
 */

import store from 'react-native-simple-store';

export default {
    // Attemp to login. 'cb' is called after, with 'true' if authentication
    // succeeds, 'false' otherwise.
    login: async function(username : string, password : string, cb : Function) {
        // Check if token already exists
        console.log('attempting login with: ' + username + "\t" + password);
        store.get('authToken')
             .then(authToken => {
                 if (authToken && cb) {
                     cb(true);
                     return;
                 }
             }).catch(error => console.error(error.message));

        // Otherwise, request a token and run callback
        let obj = await this.getToken(username, password);
        console.log("token response: " + JSON.stringify(obj));
        cb(obj);
    },

    // Return a Promise to delete the token
    logout: function() {
        return store.delete('authToken')
                    .catch(error => console.error(error.message));
    },

    // Return a Promise to return the token
    loggedIn: function() {
        return store.get('authToken')
                    .then(authToken => { return authToken })
                    .catch(error => console.error(error.message));
    },

    // Retrieve the authToken from server. On success, callback function 'cb'
    // will be called with the state of authentication and authToken
    getToken: async function(username: string, password: string) {
        try {
            let response = await fetch('https://hostingsite/endpoint', {
                method: 'POST',
                message: 'login/obtain-auth-token',
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            });
            let responseJson = await response.json();
            return { success: true, body: responseJson.statusText };
        } catch(error) {
            return {
                success: false,
                body: 'Network request failed. Please check your connection.'
            };
        }
    }
}
