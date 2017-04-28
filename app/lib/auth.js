import store from 'react-native-simple-store';

export default {
    // Attemp to login. 'cb' is called after, with 'true' if authentication
    // succeeds, 'false' otherwise.
    login: function(username, pass, cb) {
        // Check if token already exists
        store.get('authToken')
             .then(authToken => {
                 if (authToken && cb) {
                     cb(true);
                     return;
                 }
             }).catch(error => console.error(error.message));

        // Otherwise, request a token
        this.getToken(username, pass, (res) => {
            if (res.authenticated) {
                localStorage.token = res.token;
                if (cb) cb(true);
            } else {
                if (cb) cb(false);
            }
        })
    },

    // Return a Promise to delete the token
    logout: function() {
        return store.delete('authToken')
                    .catch(error => console.error(error.message));
    },

    // Return a Promise to return the token
    loggedIn: function() {
        return store.get('authToken')
                    .then(authToken => return authToken)
                    .catch(error => console.error(error.message));
    },

    // Retrieve the authToken from server. On success, callback function 'cb'
    // will be called with the state of authentication and authToken
    getToken: function(username, password, cb) {
        $.ajax({
            type: 'POST',
            url: '/api/obtain-auth-token/',
            data: {
                username: username,
                password: password
            },
            success: function(res) {
                cb({authenticated: true, token: res.token})
            }
        })
    }
}
