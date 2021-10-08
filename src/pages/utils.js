const utils = {}

const PI = Math.PI;

const BOX_MARGIN = 10;
const BOX_HEIGHT = 30;
const BOX_R = 5;
const BOX_BGCIKIR = 'rgba(19, 155, 237)';

const TEXT_WIDTH = 30;
const TEXT_FONT = '20px Courier'
const TEXT_COLOR = 'rgba(70, 70, 70)'

function getTextBoxWidth(ctx, text) {
    ctx.font = TEXT_FONT;
    const metrics = ctx.measureText(text);
    const textWidth = metrics.width;
    const textHeight = metrics.fontBoundingBoxAscent - metrics.fontBoundingBoxDescent;
    const boxWidth = Math.ceil(textWidth / 10) * 10 + 2 * BOX_MARGIN;
    console.log(text, textWidth, boxWidth, Math.ceil(textWidth / 10))
    return [boxWidth, textWidth, textHeight];
}

utils.drawRectText = (ctx, left, top, text) => {
    const [boxWidth, textWidth, textHeight] = getTextBoxWidth(ctx, text);

    ctx.beginPath();
    ctx.arc(left + BOX_R, top + BOX_R, BOX_R, - PI, -PI / 2);
    ctx.arc(left + boxWidth - BOX_R, top + BOX_R, BOX_R, -PI / 2, 0);
    ctx.arc(left + boxWidth - BOX_R, top + BOX_HEIGHT - BOX_R, BOX_R, 0, PI / 2);
    ctx.arc(left + BOX_R, top + BOX_HEIGHT - BOX_R, BOX_R, PI / 2, PI);
    ctx.closePath();
    ctx.fillStyle = BOX_BGCIKIR;
    ctx.fill();

    ctx.fillStyle = '#fff';
    ctx.fillText(text, left + boxWidth / 2 - textWidth / 2, top + BOX_HEIGHT / 2 + textHeight / 2);
    return left + boxWidth;
}

utils.drawText = (ctx, left, top, text, center = true) => {
    ctx.font = TEXT_FONT;
    ctx.fillStyle = TEXT_COLOR;
    let metrics = ctx.measureText(text);
    let fontHeight = metrics.fontBoundingBoxAscent - metrics.fontBoundingBoxDescent;

    const textLeft = left + (center ? TEXT_WIDTH / 2 : 0)
    const textTop = top + BOX_HEIGHT / 2 + fontHeight / 2;
    ctx.fillText(text, textLeft, textTop);
    return left + TEXT_WIDTH + metrics.width;
}

utils.drawQuadrilateral = (ctx, p1, p2, p3, p4, color) => {
    ctx.moveTo(p1[0], p1[1]);
    ctx.lineTo(p2[0], p1[1]);
    ctx.lineTo(p3[0], p3[1]);
    ctx.lineTo(p4[0], p4[1]);
    ctx.lineTo(p1[0], p1[1]);
    ctx.fillStyle = color;
    ctx.fill();
}

utils.drawLine = (ctx, color, x1, y1, x2, y2) => {
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}

utils.getMaxLeft = (ctx, list) => {
    let maxLeft = 0;
    list.forEach((shortcut, idx) => {
        let left = 0;
        if (shortcut.type === 'seq') {
            return;
        }

        shortcut.key.forEach((item, index) => {
            if (index !== 0) {
                ctx.font = TEXT_FONT;
                let metrics = ctx.measureText('+');
                left += TEXT_WIDTH + metrics.width;
            }

            const [boxWidth] = getTextBoxWidth(ctx, item);
            left += boxWidth;
        })
        maxLeft = Math.max(maxLeft, left);
    })
    return maxLeft;
}

export default utils