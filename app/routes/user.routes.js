
const userController = require("../controllers/user.controller");

module.exports = function(app) {

        app.use(function(req, res, next) {
            res.header(
                "Access-Control-Allow-Headers",
                "access-token, Origin, Content-Type, Accept"

            );
                 next();
            });
        
        app.post(
            "/api/post",
            userController.createTransaction
        );

        app.put(
            "/api/transaction/:transaction_id",
            userController.updateTransaction
        );
        app.get(
            "/api/getAllTrans",
            userController.getall
        );
        app.get(
            "/api/types/:type",
            userController.getByType
        );
        app.get(
            "/api/getAllTransWithHierarchy",
            userController.transactions
        );
        app.get(
            "/api/transWithAncestors/:transaction_id",
            userController.transWithAncestors
        );

        app.get(
            "/api/transWithDescendents/:transaction_id",
            userController.transWithDescendents
        );
        app.get(
            "/api/sum/:id",
            userController.getSumOfDescendents
        );

        app.get(
            "/api/transaction/:transaction_id",
            userController.getTransaction
        );

};