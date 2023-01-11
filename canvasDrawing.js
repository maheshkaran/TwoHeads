// Set up the canvas context and drawing tools

const canvas = document.getElementById('whiteboard');
const context = canvas.getContext('2d');
let isDrawing = false;

canvas.addEventListener('mousedown', () => isDrawing = true);
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);
canvas.addEventListener('mousemove', draw);

function draw(event) {
if (!isDrawing) return;

context.lineWidth = 2;
context.lineCap = 'round';
context.strokeStyle = 'black';

context.beginPath();
context.moveTo(event.offsetX, event.offsetY);
context.lineTo(event.offsetX + 1, event.offsetY + 1);
context.stroke();
context.closePath();

// Send the drawing data to the other peer using the signaling server
sendToServer({
    type: 'drawing',
    data: {
    x: event.offsetX,
    y: event.offsetY
    }
});
}