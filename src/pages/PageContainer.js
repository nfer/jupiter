
import React from 'react'
import useCanvas from './useCanvas'
import utils from './utils';
import './PageContainer.style.css';

const BASETOP = 75;
const TOPSEQ = 50;
const BASELEFT = 50;
const PageContainer = ({ list }) => {

    function draw(context) {
        const maxLeft = utils.getMaxLeft(context, list) + BASELEFT;
        list.forEach((shortcut, idx) => {
            if (shortcut.type === 'seq') {
                return;
            }

            const top = BASETOP + idx * TOPSEQ;
            let left = BASELEFT;
            shortcut.key.forEach((item, index) => {
                if (index !== 0) {
                    left = utils.drawText(context, left, top, '+');
                }
                left = utils.drawRectText(context, left, top, item);
            })
            left = utils.drawText(context, maxLeft, top, '=');
            left = utils.drawText(context, left, top, shortcut.val, false);
        })
    }

    const canvasRef = useCanvas(draw)

    return (
        <div className="page">
            <canvas ref={canvasRef} className="pageCanvas"></canvas>
        </div>
    )
}

export default PageContainer