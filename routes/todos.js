var express = require("express"); 
var router = express.Router();

router.get('/', (req, res) => {
    res.json({text: "hello world from todo app autoreloaded!!!"});
});

router.post('/', (req, res) => {

});

router.put('/', (req, res) => {

});

router.delete('/', (req, res) => {

});

module.exports = router;