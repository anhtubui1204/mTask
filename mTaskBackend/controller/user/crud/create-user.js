const userModel = require('../../../model/user')
const createUser = (req, res)=>{
    req.body.fName = 'Justin'
    req.body.lName = 'Luu'
    
    userModel.create(req.body, (err, doc)=>{
        res.json(doc)
    })
}

module.exports = createUser