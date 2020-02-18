const task = require('../model/task')
const project = require('../model/project')
const backlog = require('../model/backlog')

exports.getTasksByBacklogId=(req,res,next)=>{
    task.find({"backlogId":req.params.backlogId},(err,result)=>{
        if(err)
        res.json(err);
        res.json(result);
    }).sort({"priority":-1})
}



exports.addTask = (req, res, next) => {

    let newTask = new task({
        backlogId: req.body.backlogId,
        taskId: req.body.taskId,
        name: req.body.name,
        start_At: req.body.start_At,
        end_At: req.body.end_At,
        status: req.body.status,
        priority: req.body.priority,
        userId: null
    });

    newTask.save((err, item) => {
        if (err)
            res.json(err)

        res.json(item);

    });
};

exports.updateTaskById = (req, res, next) => {
    console.log(req.params.taskId)
    console.log(req.body)
    task.findOneAndUpdate({ "taskId": req.params.taskId }, {
        $set:
        {
            backlogId: req.body.backlogId,
            taskId: req.body.taskId,
            name: req.body.name,
            start_At: req.body.start_At,
            end_At: req.body.end_At,
            status: req.body.status,
            priority: req.body.priority

        }
    },
        function (err, result) {
            if (err) {
                res.json(err);
            }
            else {
                res.json({ msg: "task updated successfully" });
            }
        });
}



exports.deleteTaskById = (req, res, next) => {
    task.remove({ "taskId": req.params.taskId },
        function (err, result) {
            if (err) {
                res.json(err);
            }
            else {
                res.json({ msg: "task deleted successfully by id" });
            }
        })
}

exports.assignTaskByDeveloperId = (req, res, next) => {
    console.log("******")
    console.log(req.params.taskId)
    console.log();
    var id = req.body.developerId

    task.findOneAndUpdate({ taskId: req.params.taskId },
        {
            $set:
            {
                userId: id
            }
        }
        , (err, result) => {
            if (err)
                res.json(err)
            else
                res.json(result)
        })

}
