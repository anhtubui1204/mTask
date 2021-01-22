const userModel = require('../../../model/user')
const assignStatus = require('./assign-status')

/**  partial search with Regex. mongoose query.
  *  search fields: first name, last name and email. 
  *  limit results with only 8
  *   handle string == '', which gives all results.
  * 
 */
const searchMembers = (req, res) => {
    var searchTerm = req.body.searchTerm
    if (searchTerm !== '') {
        var query = { $or: [{ fName: new RegExp(searchTerm, "i") }, { lName: new RegExp(searchTerm, "i") }] }
        console.log('search ' + searchTerm)
        var returnField = ' fName lName email displayPhoto expoPushToken '
        userModel.find(query, returnField, function (err, doc) {
            if (err) {
                console.log(err)
                res.json('error')
            }
            else {
                var docResult = doc.slice(0, 9)
                console.log(doc.length)
                docResult = assignStatus(docResult)
                res.json(docResult)
            }
        }).lean()
    }else{
        res.json([])
    }
}

module.exports = searchMembers