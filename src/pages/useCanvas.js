import { useRef, useEffect } from 'react'

const useCanvas = (draw, onmouseover, onclick) => {

    const canvasRef = useRef(null)

    function setupCanvas(canvas) {
        const dpr = window.devicePixelRatio || 1
        const rect = canvas.getBoundingClientRect()

        canvas.width = rect.width * dpr
        canvas.height = rect.height * dpr
        canvas.dpr = dpr

        const ctx = canvas.getContext('2d')
        ctx.scale(dpr, dpr)

        ctx.fillStyle = 'rgba(245, 245, 245)';
        ctx.fillRect(0, 0, rect.width, rect.height);

        // function drawLine(x1, y1, x2, y2) {
        //     ctx.strokeStyle = 'red';
        //     ctx.beginPath();
        //     ctx.moveTo(x1, y1);
        //     ctx.lineTo(x2, y2);
        //     ctx.stroke();
        // }

        // drawLine(rect.width / 2, 0, rect.width / 2, rect.height)
        // drawLine(0, rect.height / 2, rect.width, rect.height / 2)

        return ctx
    }

    useEffect(() => {
        const canvas = canvasRef.current
        const context = setupCanvas(canvas)
        draw(context, canvas)
        if (onmouseover) {
            canvas.addEventListener('mousemove', (event) => onmouseover(event, context, canvas));
        }
        if (onclick) {
            canvas.addEventListener('click', (event) => onclick(event, context, canvas));
        }
    }, [draw, onmouseover, onclick])

    return canvasRef
}

export default useCanvas