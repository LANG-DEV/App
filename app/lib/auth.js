/**
 * @flow
 */

import store from 'react-native-simple-store';

export default {
    // Attemp to login. 'cb' is called after, with 'true' if authentication
    // succeeds, 'false' otherwise.
    login : async function(username : string, password : string, cb : Function) {
        // Check if token already exists
        console.log('attempting login with: ' + username + "\t" + password);
        store.get('authToken').then(authToken => {
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
    logout : function() {
        return store.delete('authToken').catch(error => console.error(error.message));
    },

    signup: async function(firstname : string, lastname : string,
                            username : string, password : string,
                            password_confirmation : string, cb : Function) {
        console.log('attempting signup with: ' + firstname + "\t" + lastname
                    + "\t" + username + "\t" + password);

        let obj = await this.getSignupResult(firstname, lastname, username,
                                            password, password_confirmation);

        //try {
            // let response = await fetch('https://hostingsite/endpoint', {
            //     method: 'POST',
            //     headers: {
            //         'Accept': 'application/json',
            //         'Content-Type': 'application/json'
            //     },
            //     body: JSON.stringify({
            //         user: {
            //             firstname: firstname,
            //             lastname: lastname,
            //             username: username,
            //             password: password,
            //             password_confirmation: password_confirmation
            //         }
            //     })
            // });
            //
            // let res = await response.json();
            // return { success: true, body: response.statusText };
            //obj = {success: true, body: response.statusText};

            // if (response.status >= 200 && response.status <= 300) {
            //     console.log("res success is " + res);
            // } else {
            //     let errors = res;
            //     throw errors;
            // }
        //} catch(errors) {
            // console.log("catch errors: " + errors);
            //
            // let formErrors = JSON.parse(errors);
            // let errorsArray = [];
            // for(let key in formErrors) {
            //     if (formErrors[key].length > 1) {
            //         formErrors[key].map(error => errorsArray.push('${key} #{error}'))
            //     } else {
            //         errorsArray.push('${key} ${formErrors[key]}')
            //     }
            // }
            // this.setState({errors: errorsArray});

            // return {
            //     success: false,
            //     body: 'Network request failed. Please check your connection.'
            // };

        //     obj = {success: false, body: 'Network request failed. Please check your connection.'}
        // }
        console.log("token response: " + JSON.stringify(obj));
        cb(obj);
    },

    // Return a Promise to return the token
    loggedIn : function() {
        return store.get('authToken').then(authToken => {
            return authToken
        }).catch(error => console.error(error.message));
    },

    // Retrieve the authToken from server. On success, callback function 'cb'
    // will be called with the state of authentication and authToken
    getToken : async function(username : string, password : string) {
        try {
            let response = await fetch('http://localhost:8000/identity/login/', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: this.serializeJSON({'username': username, 'password': password})
            });
            let responseJson = await response.json();
            return {success: true, body: responseJson.statusText};
        } catch (error) {
            return {success: false, body: 'Network request failed. Please check your connection.'};
        }
    },

    getSignupResult: async function(firstname : string, lastname : string,
                            username : string, password : string,
                            password_confirmation : string) {
        try {
            let response = await fetch('https://hostingsite/endpoint', {
                method: 'POST',
                message: 'signup/obtain-result-status',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user: {
                        firstname: firstname,
                        lastname: lastname,
                        username: username,
                        password: password,
                        password_confirmation: password_confirmation
                    }
                })
            });

            let res = await response.json();
            return { success: true, body: response.statusText };
        } catch(error) {
            return {
                success: false,
                body: 'Network request failed. Please check your connection.'
            }
        }
    },

    serializeJSON : function(data: Object) {
        let formData = new FormData();
        formData.append('username', String(data.username));
        formData.append('password', String(data.password));
        return formData;
    }
}
