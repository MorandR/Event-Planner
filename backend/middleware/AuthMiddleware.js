const {verify} = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const validateToken = (req, res, next) => {
    // token stored in header for gaining access.
    const accessToken = req.header("accessToken")

    // if wrong/missing access token, user needs to login to use a feature.
    if (!accessToken) return res.json({error: "User not logged in."})

    // decodes token as well as verifying it. once decoded, inserts the user_id grabbed from token. 
    try {
        const validToken = verify(accessToken, process.env.SECRET, function(err, decodedToken) {
            if (validToken) {
                req.user_id = decodedToken.user_id
                req.email = decodedToken.email
                return next();
            }
        })
        
    } catch (e){
        return res.json({error: e})
    }
}

module.exports = {validateToken}