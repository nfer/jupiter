
import React from 'react'
import { withRouter } from 'react-router-dom'
import useCanvas from './useCanvas'
import utils from './utils';
import './PageContainer.style.css';

const w = 300;
const h = 60;
const sepH = 50;
const sepW = 50;
const x = 430;
const y = 300;
const sepText = 100;

const Content = ({history}) => {
    const contents = ['VSCode', 'Docker', 'VSCode', 'Docker', 'VSCode'];
    const menus = contents.map((value, i) => {
        const idx = Math.floor(i / 2);
        const isRight = i % 2;

        return {
            value,
            idx,
            isRight,
        }
    });
    let lastMenu;

    function createPatternCanvas() {
        // Create a pattern, offscreen
        const patternCanvas = document.createElement('canvas');
        const patternContext = patternCanvas.getContext('2d');

        patternCanvas.width = 15;
        patternCanvas.height = 15;

        // Give the pattern a background color and draw an arc
        patternContext.fillStyle = 'rgb(245, 245, 245)';
        patternContext.fillRect(0, 0, patternCanvas.width, patternCanvas.height);
        patternContext.moveTo(0, patternCanvas.width);
        patternContext.lineTo(patternCanvas.width, 0);
        patternContext.strokeStyle = 'rgba(97, 204, 233, 0.12)';
        patternContext.stroke();

        return patternCanvas;
    }

    function drawMenu(context, menu, focus = false) {
        context.fillStyle = 'rgb(235, 235, 235)';
        const path = new Path2D();
        path.rect(x + (menu.isRight ? (w + sepW) : 0), y + (h + sepH) * menu.idx, w, h)
        context.fill(path);
        menu.path = path
        context.strokeStyle = focus ? 'rgb(97, 204, 233)' : 'rgb(235, 235, 235)';
        context.stroke(path);

        context.fillStyle = 'black';
        context.font = '20px Georgia';
        const metrics = context.measureText(menu.value);
        const fontHeight = metrics.fontBoundingBoxAscent - metrics.fontBoundingBoxDescent;
        context.fillText(menu.value, x + (menu.isRight ? (w + sepW) : 0) + sepText, y + (h + sepH) * menu.idx + fontHeight / 2 + h / 2);

        return path;
    }

    function draw(context, canvas) {
        const topW = canvas.width * 0.1;
        const bottomW = canvas.width * 0.24;
        const sep = canvas.width * 0.0125;
        const color = 'rgb(97, 204, 233)';

        utils.drawQuadrilateral(context, [0, 0], [topW, 0], [bottomW, canvas.height], [0, canvas.height], color)

        utils.drawLine(context, color, topW + sep, 0, bottomW + sep, canvas.height)

        const path2 = new Path2D();
        path2.arc(canvas.width * 0.13, canvas.width * 0.08, canvas.width * 0.04, 0, 2 * Math.PI);
        const pattern = context.createPattern(createPatternCanvas(), 'repeat');
        context.fillStyle = pattern;
        context.fill(path2);

        context.font = '80px Georgia';
        context.fillStyle = 'black';
        context.fillText('Content', canvas.width * 0.11, canvas.width * 0.09);

        menus.forEach(menu => drawMenu(context, menu))
    }

    function onmouseover(event, context, canvas) {
        const menu = menus.find(item => context.isPointInPath(item.path, event.offsetX * canvas.dpr, event.offsetY * canvas.dpr))
        if (lastMenu && lastMenu !== menu) {
            drawMenu(context, lastMenu, false);
            lastMenu = null;
        }

        if (menu) {
            event.target.style.cursor = 'pointer'
            drawMenu(context, menu, true);
            lastMenu = menu;
        } else {
            event.target.style.cursor = 'initial'
        }
    }

    function onclick(event, context, canvas) {
        if (lastMenu) {
            history.push(`/${lastMenu.value.toLowerCase()}`)
        }
    }

    const canvasRef = useCanvas(draw, onmouseover, onclick)

    return (
        <div className="page">
            <canvas ref={canvasRef} className="pageCanvas"></canvas>
        </div>
    )
}

export default withRouter(Content)
