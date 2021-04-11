const express = require('express');
const users = require('./src/model/users');
const items = require('./src/model/items');
const cors = require('cors');
const jwt = require('jsonwebtoken');
var bodyparser = require('body-parser');

var app = new express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyparser.json());
role='Admin';
email='mayroseantony@gmail.com';
password='Rosemay#ant1';

function verifyToken(req, res, next) {
    if(!req.headers.authorization) {
      return res.status(401).send('Unauthorized request')
    }
    let token = req.headers.authorization.split(' ')[1]
    if(token === 'null') {
      return res.status(401).send('Unauthorized request')    
    }
    let payload = jwt.verify(token, 'secretKey')
    if(!payload) {
      return res.status(401).send('Unauthorized request')    
    }
    req.userId = payload.subject
    next()
  }

app.post('/login', (req, res) => {
    let userData = req.body
    if (!role) {
        res.status(401).send('Invalid Role')
      } else 
      
        if (!email) {
          res.status(401).send('Invalid Username')
        } else 
        if ( password !== userData.password) {
          res.status(401).send('Invalid Password')
        } else {
          let payload = {subject: role+email+password}
          let token = jwt.sign(payload, 'secretKey')
          res.status(200).send({token})
        }
      
    })

app.get('/items', function(req, res){
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
    items.find()
        .then(function(items){
            res.send(items);
        });
});
app.get('/users', function(req, res){
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
    users.find()
        .then(function(users){
            res.send(users);
        });
});
app.post('/add', verifyToken, function(req, res){
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
    console.log(req.body);
    var item = {
        itemTitle: req.body.item.itemTitle,
        itemAbstract: req.body.item.itemAbstract,
        itemContent : req.body.item.itemContent,
        comments_author : req.body.item.comments_author
    }
    var item = new items(item);
    item.save();
});
app.post('/register', function(req, res){
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
    console.log(req.body);
    var user = {
        Role: req.body.user.Role,
        Name: req.body.user.Name,
        email : req.body.user.email,
        Password : req.body.user.Password,
        Organisation: req.body.user.Organisation,
        location : req.body.user.location,
        phone : req.body.user.phone
    }
    var user = new users(user);
    user.save();
});

app.get('/read/:id',  (req, res) => {
  
    const id = req.params.id;
      items.findOne({"_id":id})
      .then((item)=>{
          res.send(item);
      });
  })
app.get('/readuser/:id',  (req, res) => {
  
    const id = req.params.id;
      users.findOne({"_id":id})
      .then((user)=>{
          res.send(user);
      });
  })

app.put('/edit',(req,res)=>{
    console.log(req.body)
    id=req.body.id,
    itemTitle=req.body.itemTitle,
    itemAbstract=req.body.itemAbstract,
    itemContent=req.body.itemContent,
    comments_author=req.body.comments_author,
    comments_reviewer=req.body.comments_reviewer,
    comments_editor=req.body.comments_editor
   items.findByIdAndUpdate({"_id":id},
                                {$set:{"itemTitle":itemTitle,
                                "itemAbstract":itemAbstract,
                                "itemContent":itemContent,
                                "comments_author":comments_author,
                                "comments_reviewer":comments_reviewer,
                                "comments_editor":comments_editor}})
   .then(function(){
       res.send();
   })
 })
 
 app.delete('/delete/:id',(req,res)=>{
   
    id = req.params.id;
    items.findByIdAndDelete({"_id":id})
    .then(()=>{
        console.log('success')
        res.send();
    })
  })
  app.delete('/deleteuser/:id',(req,res)=>{
   
    id = req.params.id;
    users.findByIdAndDelete({"_id":id})
    .then(()=>{
        console.log('success')
        res.send();
    })
  })

  app.get('/:id',  (req, res) => {
  
    const id = req.params.id;
      items.findOne({"_id":id})
      .then((item)=>{
          res.send(item);
      });
  })

app.listen(port, function(){
    console.log('listening to port' + port);
})