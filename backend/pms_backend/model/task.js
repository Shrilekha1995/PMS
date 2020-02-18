var mongoose = require('mongoose');
var taskSchema = mongoose.Schema({
    backlogId: {
        type: mongoose.Schema.Types.String,
        ref: 'backlog.backlogId'
    },
    taskId: {
        type: String,
        required: "unique ID required",
        unique: true
    },
    name: {
        type: String,
        required: true,
    },
    start_At: {
        type: Date,
        required: "Must be enetered"
    },
    end_At: {
        type: Date,
        required: "Must be enetered"
    },
    status: {
        type: String,
        required: true
    },
    priority: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.String,
        ref: 'user.id'
    },
});

const task = mongoose.model('task', taskSchema);
module.exports = task;