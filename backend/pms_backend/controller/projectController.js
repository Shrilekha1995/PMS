var project = require('../model/project');
var checkToken = require('../auth/checkToken')


exports.getProjectsById = (req, res, next) => {
    checkToken.checkToken(req, res, (payload) => {
        console.log(payload);
        if (payload.role == 'manager' || payload.role == 'developer') {
            project.find({ "id": req.params.id }, (err, project) => {
                if (err) {
                    throw err;
                }
                else {
                    res.json(project);
                }
            })
        }
        else {
            res.status(403).send("Unauthorized");
        }
    })
};

exports.getProjects = (req, res, next) => {
    checkToken.checkToken(req, res, (payload) => {
        console.log(payload);
        if (payload.role == 'manager' || payload.role == 'developer') {
            project.find((err, project) => {
                if (err) {
                    throw err;
                }
                else {
                    res.json(project);
                }
            })
        }
        else {
            res.status(403).send("Unauthorized");
        }
    })
};

exports.addProject = (req, res, next) => {

    checkToken.checkToken(req, res, (payload) => {
        console.log(payload);
        if (payload.role == 'manager') {

            let newProject = new project({
                managerId: req.body.managerId,
                id: req.body.id,
                name: req.body.name,
                status: req.body.status,
                teamMembers: req.body.teamMembers,
                scrumMaster: req.body.scrumMaster
            });

            newProject.save((err, item) => {
                if (err)
                    res.json(err)
                else
                    res.json("Project inserted successfully  with id " + req.body.id);

            });
        }
        else {
            res.json("Unauthorized");
        }
    })
};

exports.updateProject = (req, res, next) => {
    project.findOneAndUpdate({ "id": req.params.id }, {
        $set:
        {

            id: req.body.id,
            name: req.body.name,
            status: req.body.status,
            teamMembers: req.body.teamMembers,
            scrumMaster: req.body.scrumMaster

        }
    },
        function (err, result) {
            if (err) {
                res.json(err);
            }
            else {
                res.json({ msg: "project updated successfully with id " + req.params.id });
            }
        });

};

exports.deleteProject = (req, res, next) => {
    project.remove({ "id": req.params.id },
        function (err, result) {
            if (err) {
                res.json(err);
            }
            else {
                res.json({ msg: "Project deleted successfully with id " + req.params.id });
            }
        });

};
