const express=require("express");
const app=express();
//app.use(express.static("weatherapi"));
const bodyParser=require("body-parser")
const https=require("https")
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname));
app.get("/",function(req,res){
    res.sendFile(__dirname +'/lay.html')
});
app.post("/",function(req,res){
    const cityName=req.body.cityName
    const url="https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&appid=aabb6827d5ca960cce0ea57fc6901cc9&units=metric"
    https.get(url,function(response){
        response.on("data",function(data){
            const jsondata=JSON.parse(data);
            const temps=jsondata.main.temp
            const des=jsondata.weather[0].description
            const icon=jsondata.weather[0].icon
            const imageurl="https://openweathermap.org/img/wn/"+icon+"@2x.png"
            res.write("<h1>The temp in "+cityName+" is "+temps+" degree celsius</h1>");
            res.write("<p>the weather description is "+des+"</p>");
            res.write("<img src="+imageurl+">");
            res.send();
        })
    })
})
app.listen(8080)