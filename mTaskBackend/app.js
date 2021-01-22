const mongoose = require('mongoose')
const express = require('express')
const app = express()
var bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')

app.use(bodyParser.json({ limit: '10mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }))
// app.use(cors())

//Test Server
app.get('/', (req, res) => {
  res.status(200).send('Hello, world!').end();
});

const uri = "mongodb+srv://admin:123@cluster0-ym27l.mongodb.net/mtask-app?retryWrites=true";
mongoose.connect(uri, { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true, useCreateIndex: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const task_API = require('./controller/task')
const user_API = require('./controller/user')
const auth_API = require('./controller/user/authentication')
const rsvp_API = require('./controller/rsvp')
const list_API = require('./controller/list')
const useCase_API = require('./controller/use_cases')

app.route('/task')
  .get(task_API.crud.getAll)
  .post(task_API.crud.postTask)

app.route('/task/:id')
  .get(task_API.crud.getTaskById)
  .put(task_API.crud.editTask)
  .delete(task_API.crud.deleteTask)

app.route('/del-list-from-task/:id')
  .put(task_API.crud.deleteListItem)

app.route('/tasks-by-user-id/:id')
  .get(task_API.crud.getTasksByUserId)

app.route('/tasks-on-specific-date')
  .post(task_API.crud.getTasksSpecificDate)

app.route('/user')
  .get(user_API.crud.getAll)
  .post(user_API.crud.createUser)
  .delete(user_API.crud.deleteUser)

app.route('/user/:id')
  .get(user_API.crud.getUserById)

app.route('/get-user-by-email')
  .post(user_API.crud.getUserByEmail)

app.route('/simple-facebook-login')
  .post(auth_API.simpleFbLogin)

app.route('/search-members')
  .post(useCase_API.searchMembers)

app.route('/rsvp/:userId')
  .get(rsvp_API.crud.getNotifByUserId)

app.route('/accept-tagging-add-task')
  .post(rsvp_API.responseAction.addTask.accept)

app.route('/decline-tagging-add-task')
  .post(rsvp_API.responseAction.addTask.decline)

app.route('/list')
  .get(list_API.crud.getAll)
  .post(list_API.crud.postList)

app.route('/list/:id')
  .put(list_API.crud.editList)
  .delete(list_API.crud.deleteList)
  .get(list_API.crud.listDetails)

app.route('/del-task-from-list/:id')
  .put(list_API.crud.deleteTaskItem)

app.route('/lists-by-user-id/:id')
  .get(list_API.crud.getListsByUserId)

app.route('/save-expo-push-token/:userid')
  .post(useCase_API.pushNotification.savePushTokenToUser)

var port = process.env.PORT || 19003
app.listen(port, () => {
  console.log('server running at port: ' + port)
})