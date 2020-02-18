const backlog = require('../model/backlog')
exports.getBacklogs = (req, res, next) => {
    backlog.find((err, item) => {
        if (err) {
            throw err;
        }
        else {
            res.json(item);
        }
    })
};

exports.getBacklogsByProjectId=(req,res,next)=>{
    backlog.find({"projectId":req.params.projectId},(err,result)=>{
      if(err)
      res.json(err);
      res.json(result);
    })
}

    exports.addBacklog = (req, res, next) => {

        let newBacklog = new backlog({
            projectId: req.body.projectId,
            backlogId: req.body.backlogId,
            requirement: req.body.requirement,
            start_At: req.body.start_At,
            end_At: req.body.end_At
        });

        newBacklog.save((err, item) => {
            if (err)
                res.json(err)

            res.json(item);

        });
    };