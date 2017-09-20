const googleAuth = require('google-auth-library');

const createClient = ({ credentials }) => {
    return new Promise((resolve, reject) => {
        try {
            const { 
                client_secret, 
                client_id, 
                redirect_uris,
            } = credentials.installed;

            const auth = new googleAuth();
            
            const oauth2Client = new auth.OAuth2(
                client_id, 
                client_secret, 
                redirect_uris[0]
            );

            resolve({ oauth2Client });
        } catch(err) {
            reject(err);
        }
    });
};

module.exports = { 
    createClient
};
