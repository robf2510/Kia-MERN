const IndexController = {};

IndexController.index = (req, res)=>{
    //res.send("Hola Mundo");
    res.render("index", {});
}

module.exports = IndexController;