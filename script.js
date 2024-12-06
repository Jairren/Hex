let segmentId = 0;
let polygonId = 0;

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
        { x1: startX + offsetX,                 y1: startY + offsetY,                               x2: centerX, y2: centerY },
        { x1: startX + size + offsetX,          y1: startY + offsetY,                               x2: centerX, y2: centerY },
        { x1: startX + 1.5 * size + offsetX,    y1: startY + Math.sqrt(3) / 2 * size + offsetY,     x2: centerX, y2: centerY },
        { x1: startX + size + offsetX,          y1: startY + Math.sqrt(3) * size + offsetY,         x2: centerX, y2: centerY },
        { x1: startX + offsetX,                 y1: startY + Math.sqrt(3) * size + offsetY,         x2: centerX, y2: centerY },
        { x1: startX - 0.5 * size + offsetX,    y1: startY + Math.sqrt(3) / 2 * size + offsetY,     x2: centerX, y2: centerY },
    ];

    const centerPolyAngles =  [0, 60, 120, 180, 240, 300];
    
    hexLines.forEach(line => {
        const hexLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
        hexLine.setAttribute("x1", line.x1);
        hexLine.setAttribute("y1", line.y1);
        hexLine.setAttribute("x2", line.x2);
        hexLine.setAttribute("y2", line.y2);
        hexLine.setAttribute("id", `stroke-${segmentId++}`);
        hexLine.classList.add("line", "hex-line");
        hexLine.addEventListener('click', () => {
            hexLine.classList.toggle('active');
        });
        svg.appendChild(hexLine);
    });

    centerLines.forEach(line => {
        const centerLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
        centerLine.setAttribute("x1", line.x1);
        centerLine.setAttribute("y1", line.y1);
        centerLine.setAttribute("x2", line.x2);
        centerLine.setAttribute("y2", line.y2);
        centerLine.setAttribute("id", `stroke-${segmentId++}`);
        centerLine.classList.add("line", "center-line");
        centerLine.addEventListener('click', () => {
            centerLine.classList.toggle('active');
        });
        svg.appendChild(centerLine);
    });
    centerPolyAngles.forEach(angle => {
        const centerPoly = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
        const CenterPolyPoints = {x1: startX + (size /3) + offsetX, y1: startY + offsetY + Math.sqrt(3) / 2 * (size /3),x2: startX + (size * (1- 1/3)) + offsetX, y2: startY + offsetY + Math.sqrt(3) / 2 * (size /3),x3: centerX, y3: centerY - (size /2.7)}
        centerPoly.setAttribute("points", `${CenterPolyPoints.x1},${CenterPolyPoints.y1} ${CenterPolyPoints.x2},${CenterPolyPoints.y2} ${CenterPolyPoints.x3},${CenterPolyPoints.y3}`);
        centerPoly.classList.add("polygon", "center-poly");
        centerPoly.setAttribute("transform", `rotate(${angle},${centerX},${centerY})`);
        centerPoly.addEventListener('click', () => {
            centerPoly.classList.toggle('active');
        });
        centerPoly.setAttribute("id", `stroke-${polygonId++}`);
        svg.appendChild(centerPoly);
    });
}

function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        rows: parseInt(params.get('rows')) || 8,
        cols: parseInt(params.get('cols')) || 8,
        size: parseInt(params.get('size')) || 64,
        spacing: parseInt(params.get('spacing')) || 22
    };
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
    const { rows, cols, size, spacing } = getQueryParams();
    createHoneycomb(svgCanvas, rows, cols, size, spacing);
});