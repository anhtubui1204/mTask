const getAll = require('./get-all')
const postList = require('./post-list')
const editList = require('./edit-list')
const deleteList = require('./delete-list')
const getListsByUserId = require('./get-list-by-user-id')
const listDetails = require('./list-details')
const deleteTaskItem = require('./delete-task')

const crud = {
    getAll,
    postList,
    editList,
    deleteList,
    getListsByUserId,
    listDetails,
    deleteTaskItem
}

module.exports = crud