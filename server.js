import express from "express";
import fs from "fs";
import path from "path";
import cors from "cors";
import jwt from "jsonwebtoken"
var token = jwt.sign({
    foo: 'bar'
}, 'shhhhh');
let app = express();

let datas = JSON.parse(fs.readFileSync(path.join(process.cwd(), "data", "datas.json")))
datas = datas.sort((a, b) => {
    if (a.time < b.time) {
        return -1;
    } else if (a.time > b.time) {
        return 1;
    } else {
        return 0;
    }
});
let viewPath = (fileName) => {
    return path.join(process.cwd(), "public", "views", fileName + ".ejs");
};
// set the view engine to ejs
app.use(cors("*"));
app.set("view engine", "ejs");
app.use(express.urlencoded({
    extended: true
}));
app.use(express.static(path.join(process.cwd(), "public")));
app.use(express.json());
// GET method for getting the content of the application
app.get("/", (req, res) => {
    
    // datas = datas.sort((a, b) => {
    //     if (a.time < b.time) {
    //         return -1;
    //     } else if (a.time > b.time) {
    //         return 1;
    //     } else {
    //         return 0;
    //     }
    // })

    // res.render(viewPath("index"), {
    //     title: "Todo",
    //     todos: datas,
    //     test: "12"
    // })
});
app.get("/todos", (req, res) => {
    res.end(JSON.stringify(datas))
})
app.get("/home", (req, res) => {
    datas = datas.sort((a, b) => {
        if (a.time < b.time) {
            return -1;
        } else if (a.time > b.time) {
            return 1;
        } else {
            return 0;
        }
    })
    res.render(viewPath("index"), {
        title: "Todo",
        todos: datas,
        test: "12"
    })
});
app.post("/todo", (req, res) => {

    req.body.id = datas.length ? datas[datas.length - 1].id + 1 : 1;
    datas.push(req.body)
    fs.writeFileSync(process.cwd() + "/data/datas.json", JSON.stringify(datas, null, 4));
    res.send({
        status: 200,
        location: "/"
    })
});
app.delete("/todos/:id", (req, res) => {
    datas = datas.sort((a, b) => {
        if (a.time < b.time) {
            return -1;
        } else if (a.time > b.time) {
            return 1;
        } else {
            return 0;
        }
    })
    datas = datas.filter((u) => u.id != req.params.id);
    fs.writeFileSync(process.cwd() + "/data/datas.json", JSON.stringify(datas, null, 4));
    res.send({
        status: 200,
        location: "/"
    })
});
app.put("/update/:id", (req, res) => {
    const {
        task
    } = req.body
    console.log('req.body :', req.body);
    const {
        id
    } = req.params
    if (!datas.find(el => el.id == id)) {
        res.send("Bu idlik telefon yo'q")
        return
    }
    datas = datas.map(todo => {
        if (todo.id == id) {
            todo.task = task ? task : todo.task
            return todo
        } else {
            return todo
        }
    });
    fs.writeFileSync(process.cwd() + "/data/datas.json", JSON.stringify(datas, null, 4));
    res.send({
        status: 200,
        location: "/"
    })
})
app.listen(3000, console.log("port", 3000));