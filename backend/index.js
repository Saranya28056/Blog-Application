const express=require('express');
const app=express();
app.set("view engine", "ejs");
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
const multer = require('multer');
const path = require('path');

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.static(path.join(__dirname, '../frontend')));

const storage = multer.diskStorage({
  destination: './uploads', 
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

// Initialize Multer
const upload = multer({ storage: storage });

let post=[];
app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname, "../frontend/index.html"));
})
app.post("/submit", upload.single('image'),(req,res)=>{
     const title=req.body.title;
    const content=req.body.content;
    let imagePath="";
    if(req.file)
    {
        imagePath='/uploads/'+req.file.filename;
    }
   post.push({title:title,content:content,image:imagePath});
    res.redirect("view-posts");
});
app.get("/view-posts",(req,res)=>{
   res.render("view-posts",{posts:post});
})
app.get("/edit",(req,res)=>{
    const index=req.query.index;
    const pos=post[index];
    res.render("edit",{index,pos});
});
app.post("/update",(req,res)=>{
    const index=req.body.index;
    const newCon=req.body.content;
    const newTitle=req.body.title;
    post[index].title=newTitle;
    post[index].content=newCon;
    res.redirect("/view-posts"); 
});
app.get("/delete",(req,res)=>{
    const index=req.query.index;
    if(post[index])
        post.splice(index,1);
    res.redirect("/view-posts");
})
app.listen(3001,()=>{console.log("running")});