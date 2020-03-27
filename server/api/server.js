const express = require("express");// 创建服务
const bodyParser = require("body-parser");// 接收POST数据
const path = require("path");
const {json} = require("../modules/tools");
const db = require("../modules/db");
const app = express();
// 连接数据的方法. 当你的函数只是在当前环境当中使用时，建议以下划线开头。
// 将连接的数据库进行返回
app.use(bodyParser.json());// json jsonp
// 静态资源。
app.use(express.static(path.resolve(__dirname,"../")));
app.all("*",(req,res,next)=>{
    res.header("Access-Control-Allow-Origin","*");
    // 支持头部信息当中携带content-type的请求方式 。 token:令牌
    res.header("Access-Control-Allow-Headers","content-type");
    res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET")
    next();
})
// 添加微博
app.post("/weibo",(req,res)=>{
    // 将所有的站点全部放入白 94 名单（将允许所有的外部站点访问）
    const comment = req.body.comment;
    db.insertOne("commentList",{
        comment,
        topNum:0,
        downNum:0,
        addTime:Date.now()//getNowTime()
    },(err,results)=>{
        if(err) json(res);
        else json(res,1,"发布评论成功")
    })
})
// 获取微博 Promise
app.get("/weibo",(req,res)=>{
    // 将所有的站点全部放入白名单（将允许所有的外部站点访问）
    res.header("Access-Control-Allow-Origin","*")
    // 当前的页数
    let pageIndex = req.query.pageIndex/1;
    const limit = 4;// 每页显示4条
    let  pageSum = 1;// 总页条
    db.count("commentList",{},count=>{
        // 计算总页数
        pageSum = Math.ceil(count/limit);
        if(pageSum<1)
            pageSum = 1;
        if(pageIndex < 1) pageIndex = 1;
        if(pageIndex > pageSum) pageIndex = pageSum;
        db.find("commentList",{
            limit,
            skip:(pageIndex-1)*limit,
            sort:{addTime:-1}
        },(err,commentList)=>{
            if(err) json(res);
            else {
                res.json({
                    code:1,
                    msg:"成功",
                    commentList,
                    pageSum,
                    pageIndex
                })
            }
        })
    })

})
// 删除  ?id=xxx
app.delete("/weibo",(req,res)=>{
    const id = req.query.id;
    db.deleteOneById("commentList",id,function (err,results) {
        if(err) json(res);
        else json(res,1,"删除成功")
    })
})
// 修改  ?id=xxx&type=1
app.put("/weibo",(req,res) => {
    const id = req.query.id;
    const type = req.query.type/1;
    if(type === 1 || type === 0){
        const typeEnum = {
            1:"topNum",
            0:"downNum"
        }
        db.upDateOneById("commentList",id,{
            $inc:{
                // [type === 1?"topNum":"downNum"]:1
                [typeEnum[type]]:1
            }
        },(err,results)=>{
            if(err) json(res);
            else json(res,1,"修改成功")
        })
    }else json(res);
})
app.listen(80,function () {
    console.log("Listening on port 80!");
})