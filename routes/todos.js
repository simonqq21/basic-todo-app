var express = require("express"); 
var router = express.Router();

/**
 * todo list schema:
 *  date created    -   datetime
 *  date modified   -   datetime
 *  name of writer  -   string
 *  title   -   string
 *  text    -   string
 *  completed   -    bool
 *  image   -   blob
 */

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