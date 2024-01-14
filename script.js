function drawLineBresenham(x0, y0, x1, y1, thickness, color) {
    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let x = x0;
    let y = y0;

    const dx = Math.abs(x1 - x0);
    const dy = Math.abs(y1 - y0);

    const sx = (x0 < x1) ? 1 : -1;
    const sy = (y0 < y1) ? 1 : -1;

    let err = dx - dy;

    while (true) {
        drawPixelBlock(ctx, x, y, thickness, color);

        if (x === x1 && y === y1) {
            break;
        }

        const err2 = 2 * err;
        if (err2 > -dy) {
            err -= dy;
            x += sx;
        }
        if (err2 < dx) {
            err += dx;
            y += sy;
        }
    }
}

function drawPixelBlock(ctx, x, y, thickness, color) {
    for (let i = 0; i < thickness; i++) {
        for (let j = 0; j < thickness; j++) {
            ctx.fillStyle = color;
            ctx.fillRect(x + i, y + j, 1, 1);
        }
    }
}

function onDrawLineBresenham() {
    const X0 = parseFloat(document.getElementById("x0").value);
    const Y0 = parseFloat(document.getElementById("y0").value);
    const X1 = parseFloat(document.getElementById("x1").value);
    const Y1 = parseFloat(document.getElementById("y1").value);
    const THICKNESS = parseFloat(document.getElementById("thickness").value);
    const COLOR = document.getElementById("color").value;

    const canvas = document.getElementById("myCanvas");
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    if (isValidInput(X0, Y0, X1, Y1, THICKNESS)) {
        if (isInsideCanvas(X0, Y0, X1, Y1, canvasWidth, canvasHeight)) {
            drawLineBresenham(X0, Y0, X1, Y1, THICKNESS, COLOR);
        } else {
            alert("Invalid input or the line is outside the canvas boundaries.");
        }
    }
}

function isValidInput(...values) {
    return values.every(value => !isNaN(value));
}

function isInsideCanvas(x0, y0, x1, y1, canvasWidth, canvasHeight) {
    return (
        x0 >= 0 && x0 < canvasWidth &&
        y0 >= 0 && y0 < canvasHeight &&
        x1 >= 0 && x1 < canvasWidth &&
        y1 >= 0 && y1 < canvasHeight
    );
}

const defaultValues = {
    x0: 250,
    y0: 250,
    x1: 50,
    y1: 50,
    thickness: 20,
    color: '#1e671d',
};

window.onload = () => {
    const X0 = document.getElementById("x0").value = defaultValues.x0;
    const Y0 = document.getElementById("y0").value = defaultValues.y0;
    const X1 = document.getElementById("x1").value = defaultValues.x1;
    const Y1 = document.getElementById("y1").value = defaultValues.y1;
    const THICKNESS = document.getElementById("thickness").value = defaultValues.thickness;
    const COLOR = document.getElementById("color").value = defaultValues.color;


    drawLineBresenham(
        defaultValues.x0, defaultValues.y0, 
        defaultValues.x1, defaultValues.y1, 
        defaultValues.thickness, defaultValues.color
    );
};
