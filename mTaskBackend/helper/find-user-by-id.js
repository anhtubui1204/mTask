const userModel = require('../model/user')

const findUserById = async (_id) =>{
    var user = await userModel.findOne({_id}, (err, doc)=>{
        if(err)console.log(err)
        // else console.log(doc)
    })
    return user
}

module.exports = findUserById