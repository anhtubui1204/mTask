const userModel = require('../../../model/user')
const simpleFbGGLogin = (req, res)=>{
        console.log('facebookGoogleLogin: ')
        userModel.findOne({ email: req.body.email }, (err, doc) => {
          if (doc) {
            console.log('user exists')
            doc['message'] = 'Returning user.'
            res.json(doc)
          } else {
            console.log(err)
            userModel.create(req.body, (err, result) => {
              if (!err) {
                console.log('creating new users')
                result = result.toObject()
                result['message'] = 'First time log-in user.'
                res.json(result)
              } else {
                console.log(err)
              }
    
            })
          }
        }).lean()
      }


module.exports  = simpleFbGGLogin