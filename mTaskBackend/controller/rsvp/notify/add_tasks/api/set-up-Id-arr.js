const setUpIdArr = (taggedUsers)=>{
    var idArr = []
    for(let i =0; i < taggedUsers.length; i++){
        var user = taggedUsers[i]
        idArr.push(user._id)
    }
    return idArr

}
module.exports = setUpIdArr