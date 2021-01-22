const userModel = require('../../../model/user')

const getUserByEmail = (req, res)=>{
    const email = req.body.email
    userModel.findOne({email}, (err, doc)=>{
        if(err)console.log(err)
        else res.json(doc)
    })
}

module.exports = getUserByEmail