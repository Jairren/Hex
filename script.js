let lineIdCounter = 0;

function createHexagon(svg, startX, startY, size, offsetX, offsetY) {
    const hexLines = [
        { x1: startX + offsetX, y1: startY + offsetY, x2: startX + size + offsetX, y2: startY + offsetY },
        { x1: startX + size + offsetX, y1: startY + offsetY, x2: startX + 1.5 * size + offsetX, y2: startY + Math.sqrt(3) / 2 * size + offsetY },
        { x1: startX + 1.5 * size + offsetX, y1: startY + Math.sqrt(3) / 2 * size + offsetY, x2: startX + size + offsetX, y2: startY + Math.sqrt(3) * size + offsetY },
        { x1: startX + size + offsetX, y1: startY + Math.sqrt(3) * size + offsetY, x2: startX + offsetX, y2: startY + Math.sqrt(3) * size + offsetY },
        { x1: startX + offsetX, y1: startY + Math.sqrt(3) * size + offsetY, x2: startX - 0.5 * size + offsetX, y2: startY + Math.sqrt(3) / 2 * size + offsetY },
        { x1: startX - 0.5 * size + offsetX, y1: startY + Math.sqrt(3) / 2 * size + offsetY, x2: startX + offsetX, y2: startY + offsetY },
    ];
    const centerX = startX + size / 2 + offsetX;
    const centerY = startY + Math.sqrt(3) / 2 * size + offsetY;
    const centerLines = [
        { x1: startX + offsetX, y1: startY + offsetY, x2: centerX, y2: centerY },
        { x1: startX + size + offsetX, y1: startY + offsetY, x2: centerX, y2: centerY },
        { x1: startX + 1.5 * size + offsetX, y1: startY + Math.sqrt(3) / 2 * size + offsetY, x2: centerX, y2: centerY },
        { x1: startX + size + offsetX, y1: startY + Math.sqrt(3) * size + offsetY, x2: centerX, y2: centerY },
        { x1: startX + offsetX, y1: startY + Math.sqrt(3) * size + offsetY, x2: centerX, y2: centerY },
        { x1: startX - 0.5 * size + offsetX, y1: startY + Math.sqrt(3) / 2 * size + offsetY, x2: centerX, y2: centerY },
    ];

    hexLines.forEach(line => {
        const hexLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
        hexLine.setAttribute("x1", line.x1);
        hexLine.setAttribute("y1", line.y1);
        hexLine.setAttribute("x2", line.x2);
        hexLine.setAttribute("y2", line.y2);
        hexLine.setAttribute("id", `line-${lineIdCounter++}`);
        hexLine.classList.add("line", "hex-line");
        svg.appendChild(hexLine);
    });

    centerLines.forEach(line => {
        const centerLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
        centerLine.setAttribute("x1", line.x1);
        centerLine.setAttribute("y1", line.y1);
        centerLine.setAttribute("x2", line.x2);
        centerLine.setAttribute("y2", line.y2);
        centerLine.setAttribute("id", `line-${lineIdCounter++}`);
        centerLine.classList.add("line", "center-line");
        svg.appendChild(centerLine);
    });

    createTriangles(svg, centerX, centerY, size);
}

function createTriangles(svg, centerX, centerY, size) {
    const angles = [60, 120, 180, 240, 300, 360];
    angles.forEach(angle => {
        const rad = (Math.PI / 180) * angle;
        const x1 = centerX + size * Math.cos(rad);
        const y1 = centerY + size * Math.sin(rad);
        const x2 = centerX + size * Math.cos(rad + Math.PI / 3);
        const y2 = centerY + size * Math.sin(rad + Math.PI / 3);

        const triangle = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
        triangle.setAttribute("points", `${centerX},${centerY} ${x1},${y1} ${x2},${y2}`);
        triangle.classList.add("triangle");
        svg.appendChild(triangle);
    });
}

function createHoneycomb(svg, rows, cols, size, spacing) {
    const hexHeight = Math.sqrt(3) * size + spacing;
    const hexWidth = 1.5 * size + spacing;
    const offsetX = size; // Ensure x > 0
    const offsetY = size; // Ensure y > 0
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const xOffset = col * hexWidth;
            const yOffset = row * hexHeight + (col % 2 === 0 ? 0 : hexHeight / 2);
            createHexagon(svg, xOffset, yOffset, size, offsetX, offsetY);
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const svgCanvas = document.getElementById("svgCanvas");
    createHoneycomb(svgCanvas, 5, 5, 50, 10);
});