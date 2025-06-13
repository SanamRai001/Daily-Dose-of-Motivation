const express = require('express');
const app = express();
const axios = require('axios');
const cors = require('cors');
app.use(cors());
app.use(express.json());
const port = 3000;
const {createCanvas, loadImage} = require('canvas');

const width = 1200;
const height = 650;

app.get('/quote-images',async(request, respond)=>{
    const apiURL = "https://zenquotes.io/api/random";
    const quote = await axios.get(apiURL);
    const text = quote.data[0].q;
    
    const canvas= createCanvas(width,height);
    const context = canvas.getContext("2d");
    context.font= "30px sans-serif";
    
    let rdm = Math.floor(Math.random()*10);
        let bg = await loadImage(`images/image${rdm}.jpg`);
        context.drawImage(bg, 0, 0, width, height);
    
    // context.fillStyle= "white";
    // context.fillRect(0,0, width, height);
    
    //warp
    let word = text.split(" ");
    let line = "";
    let x = width/6, y=height/5;
    let verticalLine = 50;
    context.fillStyle = "white";


    for(let i =0;i<word.length;i++){
        let testline= line + word[i] + " ";
        let testwidth = context.measureText(testline).width;
        if (testwidth > width-200 || (i > 0 && (word[i-1].includes(",") || word[i-1].includes(".")))){
            context.fillText(line, x, y);
            line =  word[i] + " ";
            y +=verticalLine;
        }else{
            line = testline;
        }
    }
    context.fillText(line,x,y);
    

    respond.set('Content-Type', 'image/png');
    if(request.query.download){
            respond.set('content-disposition', 'attachment; filename="qoute.png"');
    }
    else{
            respond.set('content-disposition', 'inline');
    }
    respond.set('Cache-Control', 'no-cache');
    respond.send(canvas.toBuffer());
});
app.listen(port,()=>{console.log(`The server is running in : http://localhost:${port}/quote-images`);});