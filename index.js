let canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");
let x = -4;
let canvasWidth = 1000;
let canvasHeight = 500;
let xScale = 20;
let yScale = 5;
let resolution = 10000;

function square(x) {
    return x * x;
}

function prepareGrid() {
    // Setting width and height of canvas
    canvas.setAttribute("width", canvasWidth);
    canvas.setAttribute("height", canvasHeight);

    // Draw lines 
    let line = canvas.getContext("2d");
    line.moveTo(0, canvasHeight / 2);
    line.lineTo(canvasWidth, canvasHeight / 2);
    line.stroke();

    let line2 = canvas.getContext("2d");
    line2.moveTo(canvasWidth / 2, 0);
    line2.lineTo(canvasWidth / 2, canvasHeight);
    line2.lineWidth = 1;
    line2.stroke();
}

function drawGraph(color) {
    ctx.beginPath();
    ctx.moveTo(x * xScale + (canvasWidth / 2), (canvasHeight / 2) - square(x) * yScale);
    for (let i = 1; i < 8 * resolution; i++) {
        ctx.lineTo(((x + (i / resolution)) * xScale) + (canvasWidth / 2),
            (canvasHeight / 2) - square(x + (i / resolution)) * yScale);
    }
    ctx.strokeStyle = color == "" ? "red" : color;
    ctx.lineWidth = 1.5;
    ctx.stroke();
}

// Events
document.getElementById("draw-graph-btn").addEventListener("click", function() {
    let color = document.getElementById("color").value;
    drawGraph(color);
});

// Main Flow
prepareGrid();