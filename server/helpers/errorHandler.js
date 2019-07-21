module.exports = (err, req, res, next) =>{
    console.log(err.message)
   if(err.name === 'MongoError' && err.code === 11000){
          var newerr = err.message.split(' ')
        res.status(400).json(`${newerr[7].split(' ')[0]} : ${newerr[12]} already exist`)
      } else if(err.name === 'ValidationError'){
        res.status(400).json(err.message)
      } else if(err.name === 'JsonWebTokenError'){
        res.status(400).json('Login First')
      } else if(err.code === 500){
        console.log(err);
        res.status(500).json(
          'Internal server error'
        );
      } else {
        res.status(err.code).json(err.message)
      }
}