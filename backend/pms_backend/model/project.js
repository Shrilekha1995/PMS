var mongoose = require('mongoose');
var projectSchema = mongoose.Schema({
    managerId: {
        type: mongoose.Schema.Types.String,
        ref: 'user.id'
    },
    id: {
        type: String,
        required: "unique ID required",
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true

    },
    teamMembers: [
        {
            type: mongoose.Schema.Types.String,
            ref: 'user.id'
        }
    ],
    scrumMaster: {
        type: String,
        required: true
    }
});
const project = mongoose.model('project', projectSchema);
module.exports = project;
