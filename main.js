const express = require('express');
const app = express();
const session = require('express-session');
const fs = require('fs');
const port = 3000;
const hostName = '127.0.0.1';
const path = require('path');

app.use(express.json());

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
}))

app.route('/')
.get(function(req,res){
    res.sendFile(path.join(__dirname,"public/home/index.html"));
})

app.get("/index.css",function(req,res){
    res.sendFile(path.join(__dirname,"public/home/index.css"));

})

app.get("/index.js",function(req,res){
    res.sendFile(path.join(__dirname,"public/index.js"));
});

app.get("/userCheck.js",function(req,res){
    res.sendFile(path.join(__dirname,"public/home/userCheck.js"));
})

app.route('/user')
.get(function(req,res){
    if(req.session.is_logged_in){
        res.setHeader("Content-Type","text/html");
        res.sendFile(path.join(__dirname,'public/user/user.html'))
    }else{
        res.redirect('/login');
    }
});

app.get('/user.js',function(req,res){
    res.sendFile(path.join(__dirname,'public/user/user.js'));
})

app.route('/login')
.get(function(req,res){
    
    if(req.session.is_logged_in){
        res.statusCode = 302;
        res.setHeader("Content-Type","text/plain");
        res.send("/user");
    }else{
        res.sendFile(path.join(__dirname , 'public/login/login.html'));
    }
})
.post(function(req,res){
    console.log(req.body);
    fs.readFile(path.join(__dirname,'user.json'),function(err,data){
       if(!err){
            data = JSON.parse(data);
            let match = false;
            data.forEach((element)=>{
                if(element.user == req.body.user && element.password == req.body.password){
                    match = true;
                    req.session.is_logged_in = true;
                    res.statusCode = 200;
                    res.setHeader("Content-Type",'text/plain');
                    res.send(req.body.user);
                    // res.redirect('/user');
                }
            })
            if(!match){
                res.statusCode = 300;
                res.send("Username or password is wrong");
            }
       }
    })
});

app.route('/signup')
.get(function(req,res){
    if(req.session.is_logged_in){
        res.redirect('/user');
    }else{
        res.sendFile(path.join(__dirname,'public/signup/signup.html'));
    }
})
.post(function(req,res){
    console.log(req.body);
    // req.body.userNmae = req.body.userName.trim();
    // req.body.password = req.body.password.trim();
    if(req.body.user == "" || req.body.password == ""){
        res.statusCode = 406;
        res.setHeader("Content-Type","plain/text");
        res.send("User or passwrd is not valid");
    }else{
        fs.readFile(path.join(__dirname,'user.json'),function(err,data){
            if(!err){
                data = JSON.parse(data);
                let match = false;
                data.forEach((element)=>{
                    if(element.user == req.body.user){
                        res.statusCode = 403;
                        res.setHeader("Content-Type","plain/text");
                        res.send("User Already Exist");
                        match = true;
                    }
                })
                if(!match){
                    let newUser = {
                        user: req.body.user,
                        password: req.body.password
                    }
                    data.push(newUser);
                    fs.writeFile(path.join(__dirname,"user.json"),JSON.stringify(data),function(err){
                        if(!err){
                            req.session.is_logged_in = true;
                            res.setHeader('Content-Type','application/JSON');
                            res.send(newUser.user);
                        }
                    });
                }
            }else{
                res.send("Error Occured");
            }
        })
    }
})


app.route('/logout')
.get(function(req,res){
    req.session.destroy();
})

app.listen(port,hostName);









// const express =  require('express');
// const session = require('express-session');
// const fs = require('fs');
// const path = require('path');
// const app = express();
// const port = 3000;
// const hostName = '127.0.0.1';
// app.use(express.urlencoded({extended: true}));
// app.use(express.static("public"));
// app.use(express.json());
// app.use(session({
//     secret: 'keyboard cat',
//     resave: false,
//     saveUninitialized: true,
//   }))

// app.route("/user")
//   .get(function(req,res){
//     console.log(req.url);
//     if(req.session.is_loged_in){
//         res.send("Loged in");
//     }else{
//         res.redirect('/login');
//     }
// });

// app.route('/login')
// .get(function(req,res){
//     if(req.session.is_loged_in){
//         res.redirect("/user");
//     }else{
//         res.sendFile((__dirname+"/login.html"));
//     }
// }).post(function(req,res){
//     console.log(req.body);
//     fs.readFile("./user.json","utf8",function(err,data){
//         if(err){
//             res.send("Server Error");
//         }else{
//             data = JSON.parse(data);
//             // console.log(dat00a);
//             let match = false;
//             data.forEach((element)=>{
//                 if(element.user == req.body.userNmae && element.password == req.body.password){
//                     req.session.is_loged_in = true;
//                     res.redirect('/user');
//                     match = true;
//                     true;
//                 }
//             })
//             if(!match){
//                 res.setHeader("Content-Type","plain/text");
//                 res.send("NO match");
//             }
//         }
//     })
// });

// app.route('/signup')
// .get(function(req,res){
//     if(req.session.is_loged_in){
//         res.redirect('/user')
//     }else{
//         res.sendFile(path.join(__dirname,"signup.html"));
//     }
// }).post(function(req,res){

// });

// app.listen(port,hostName);