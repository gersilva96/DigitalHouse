module.exports = {
    home: (req,res) => {
        res.render("index", {style: req.session.style, color: req.session.color});
    },
    color: (req,res) => {
        let style = `style=background-color:${req.body.color}`;
        let color = req.body.color;
        req.session.color = color;
        req.session.style = style;
        if (req.body.recordarColor != undefined) {
            res.cookie("style", style, {maxAge: Date.now()});
            res.cookie("color", color, {maxAge: Date.now()});
        }
        res.redirect("/");
    }
}