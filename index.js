const express = require('express');
const app = express();
const http = require('http');

const server = http.createServer(index);
const io = require('socket.io')(server);
var nombreJoueur = 0;

app.get("/gameControl",(request,resultat)=>{
    resultat.sendFile(__dirname+"/game.control.js")
})
app.get("/gameDisplay",(request,resultat)=>{
    resultat.sendFile(__dirname+"/game.display.js")
})
app.get("/gameKeycode",(request,resultat)=>{
    resultat.sendFile(__dirname+"/game.keycode.js")
})
app.get("/game",(request,resultat)=>{
    resultat.sendFile(__dirname+"/game.js")
})
app.get("/",(request,resultat)=>{
    resultat.sendFile(__dirname+"/pong.html")
})

io.on("connection",(socket)=>{
    nombreJoueur++;
    if(nombreJoueur===1){
        socket.emit("Joueur attibution", "playerOne");
    }
    if(nombreJoueur===2){
        socket.emit("Joueur attibution", "playerTwo");
    }
    if(nombreJoueur===3){
        socket.emit("Joueur attibution", "playerThree");
    }
    if(nombreJoueur===4){
        socket.emit("Joueur attibution", "playerFour");
        nombreJoueur = 0;
    }

    socket.on("deplacement joueur 1",(player)=>{
        io.emit("Mise a jour de la position du joueur 1", player);
    })
    socket.on("deplacement joueur 2",(player)=>{
        io.emit("Mise a jour de la position du joueur 2", player);
    })
    socket.on("deplacement joueur 4",(player)=>{
        io.emit("Mise a jour de la position du joueur 3", player);
    })
    socket.on("deplacement joueur 4",(player)=>{
        io.emit("Mise a jour de la position du joueur 4", player);
    })

    socket.on("Mouvement de la balle",(ball)=>{
        io.emit("Mise a jour de la position de la balle", ball);
    })

    socket.on("disconnect",()=> {
        nombreJoueur--;
    })
})