const userModel = require('../../../model/user')


const getAll = (req, res)=>{
    userModel.find({}, (err, doc)=>{
        if(err)console.log(err)
        else res.json(doc)
    })
}

module.exports = getAll