const mongoose = require('mongoose')

String.prototype.toObjectId = function () {
    var ObjectId = (mongoose.Types.ObjectId);
    return new ObjectId(this.toString());
};

const convertToObjectId = (string) => {
        
        return string.toObjectId()
    
    
}

module.exports = convertToObjectId