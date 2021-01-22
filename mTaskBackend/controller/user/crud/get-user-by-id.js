const userModel = require('../../../model/user')

const getUserById = (req, res)=>{
    const userId = req.params.id
    userModel.findOne({_id: userId}, (err, doc)=>{
        if(err)console.log(err)
        else res.json(doc)
    })
}

module.exports = getUserById