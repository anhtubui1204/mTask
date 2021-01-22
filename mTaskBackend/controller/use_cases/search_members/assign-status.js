const assignStatus = (arr)=>{
    for(let i=0; i<arr.length; i++){
        var user = arr[i]
        user.isAccepted = false
        user.isDeclined = false
        user.isConflict = false
    }
    return arr
}

module.exports = assignStatus