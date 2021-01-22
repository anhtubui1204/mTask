const userModel = require('../../../model/user')

const deleteUser = (req, res)=>{
    const email = req.body.email
    userModel.findOneAndDelete({email}, (err, doc)=>{
        if(err)console.log(err)
        else res.json(doc)
    })
}

module.exports = deleteUser