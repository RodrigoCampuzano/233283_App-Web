module.exports = app =>{
    var router = require("express").Router();
    const authMiddleware = require('../middleware/auth');
    const authController = require('../controllers/authController');

    router.post('/register', authController.register);
    router.get('/login', authController.login);
    router.post('/login', authController.login);
    router.get('/me', authMiddleware.verifyToken, authController.getUser)
    router.put('/update-password', authMiddleware.verifyToken, (req, res) => {
    const { newPassword } = req.body;
    const userId = req.userId;
    
    authController.updatePassword(userId, newPassword, (err, data) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.status(200).send(data);
    });
  });


    app.use('/api/auth', router);
}
