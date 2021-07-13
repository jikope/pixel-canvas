const path = require("path");
const cors = require("cors");
const express = require("express")();
const http = require("http").createServer(express);
const io = require("socket.io")(http, {
    cors: {
        origin: "http://localhost:8080",
        method: ["GET", "POST"],
    },
});

express.use(cors());

const PORT = process.env.PORT || 3000;

// Used colors
const colors = {
    red: {
        text: "Red",
        hexCode: "#DF5B5A",
    },
    green: {
        text: "Green",
        hexCode: "#2E8B57",
    },
    yellow: {
        text: "Yellow",
        hexCode: "#FFC300 ",
    },
    white: {
        text: "White",
        hexCode: "#FFFFFF",
    },
    grey: {
        text: "Grey",
        hexCode: "#F0F0F0",
    },
    pink: {
        text: "Pink",
        hexCode: "#E91E63",
    },
    black: {
        text: "Black",
        hexCode: "#000000",
    },
};

var width = 48;
var height = 48;

var drawing = [width];

for (var i = 0; i < width; i++) {
    drawing[i] = new Array(height);
}

for (var i = 0; i < width; i++) {
    for (var j = 0; j < height; j++) {
        drawing[i][j] = colors.grey;
    }
}

var canvases = {
    main: {
        drawing: drawing,
        width: 48,
        height: 48,
    },
};

express.get("/canvas/main", (req, res) => {
    res.send({ canvas: canvases.main, colors: colors });
});

io.on("connection", (socket) => {
    socket.join("main");
    socket.emit("init", { canvas: canvases.main, colors: colors });
    console.log(canvases.main.drawing[0][0].hexCode);

    socket.on("draw", (canvas, draw) => {
        console.log(draw);
        let c = canvases[canvas];
        c.drawing[draw.x][draw.y] = draw.color;
        io.to(canvas).emit("update_drawing", draw);
    });
});

http.listen(PORT, () => {
    console.log("listening on port", PORT);
});
