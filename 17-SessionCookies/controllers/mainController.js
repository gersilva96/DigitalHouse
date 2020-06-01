module.exports = {
    home: (req,res) => {
        res.render("index", {style: req.session.style, color: req.session.color});
    },
    color: (req,res) => {
        req.session.color = req.body.color;
        req.session.style = `style=background-color:${req.session.color}`;
        if (req.body.recordarColor) {
            res.cookie("color",`${req.body.color}`);
        }

        if (req.cookies.color) {
            req.session.style = `style=background-color:${req.cookie.color}`
        }
        res.redirect("/");
    }
}