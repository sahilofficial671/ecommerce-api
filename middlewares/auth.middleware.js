const { StatusCodes } = require('http-status-codes')
const jwt = require('jsonwebtoken');
const {versionUrlPrefix} = require('../core/version');

const auth = async(req, res, next) => {

  const authRoute = versionUrlPrefix + '/auth';

  // If auth routes then pass
  if(req.url.startsWith(authRoute)){
    next();
    return;
  }

  let _token = null;

  if(process.env.APP_ENV === "production"){
    _token = req.cookies._token;
  }else{
    const authorization = req.headers.authorization;

    if(authorization && authorization.startsWith('Bearer ')){
      _token = authorization.split(" ")[1];
    }
  }

  // If authorization is not passed in headers
  if(_token === "" || _token === undefined){
    res.status(StatusCodes.UNAUTHORIZED)
      .json({
        message: "Unauthorized request!"
      })

      return;
  }

  try {
    const decoded = jwt.verify(_token, process.env.JWT_SECRET);

    // Verified
    if(decoded.userId){
      next();
      return;
    }
  } catch (error) {
    console.log(error);
  }

  // Unauthorized response
  res.status(StatusCodes.UNAUTHORIZED)
    .json({
      message: "Unauthorized request!"
    })
};


module.exports = auth