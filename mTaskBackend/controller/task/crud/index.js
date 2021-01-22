const getAll = require('./get-all')
const postTask = require('./post-task')
const editTask = require('./edit-task')
const deleteTask = require('./delete-task')
const getTasksByUserId = require('./get-task-by-user-id')
const getTasksSpecificDate = require('./get-task-specific-date')
const getTaskById = require('./get-task-by-id')
const deleteListItem = require('./delete-listItem')

const CRUD = {
    getAll,
    editTask,
    postTask,
    deleteTask,
    getTasksSpecificDate,
    getTasksByUserId,
    getTaskById,
    deleteListItem
}

module.exports = CRUD