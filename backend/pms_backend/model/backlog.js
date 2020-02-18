var mongoose = require('mongoose');
var backlogSchema = mongoose.Schema({
    projectId: {
        type: mongoose.Schema.Types.String,
        ref: 'project.projectId'
    },
    backlogId: {
        type: String,
        required: true
    },
      requirement: [{
        type: String,
        required: true
    }],
    start_At: {
        type: Date,
        required: "Must be enetered"
    },
    end_At: {
        type: Date,
        required: "Must be enetered"
    }
  
});

const backlog = mongoose.model('backlog', backlogSchema);
module.exports = backlog;