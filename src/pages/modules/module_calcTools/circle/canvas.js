/* eslint-disable indent */
class Canvas {
    constructor (domId) {
        this.domId = domId
        this.r = 80
    }

    canvasRun (x0, y0, parameter) {
        // 设置配置参数
        const lineWidth = 1
        this.ctx.setLineWidth(lineWidth)
        this.ctx.setStrokeStyle('#d2d2d2')
        this.ctx.setLineCap('round')
        this.ctx.arc(x0, y0, this.r, 0, 2 * Math.PI, false)
        this.ctx.stroke()

        if (parameter && parameter.length) {
        this.canvasRunRadiusShow(x0, y0, parameter)
        this.canvasRunPerimeterShow(x0, y0, parameter)
        this.canvasRunAreaShow(x0, y0, parameter)
        };

        // 通过draw把上面的描述绘制出来
        this.ctx.draw()
    }

    canvasRunRadiusShow (x0, y0, parameter) {
        // *半径指示
        // **半径
        this.ctx.beginPath()
        this.ctx.moveTo(x0 - this.r, y0)
        this.ctx.setLineWidth(1)
        this.ctx.setStrokeStyle('#5abaff')
        this.ctx.lineTo(x0, y0)
        this.ctx.stroke()
        // **文字
        this.ctx.font = 'normal 12px sans-serif'
        this.ctx.setFillStyle('#ffb53f')
        this.ctx.setTextAlign('center')
        this.ctx.setTextBaseline('middle')
        this.ctx.fillText('半径:' + parameter[0], x0 - this.r / 2, y0 - 10)
    }

    canvasRunAreaShow (x0, y0, parameter) {
        // *面积指示
        // **圆内画一点（第四象限）
        this.ctx.beginPath()
        this.ctx.arc(x0 + this.r / 2, y0 + this.r / 2, 2, 0, 2 * Math.PI)
        this.ctx.setFillStyle('#5abaff')
        this.ctx.fill()
        // **画折线
        this.ctx.moveTo(x0 + this.r / 2, y0 + this.r / 2)
        this.ctx.setLineWidth(1)
        this.ctx.setStrokeStyle('#5abaff')
        this.ctx.lineTo(x0 + 4 * this.r / 5, y0 + 4 * this.r / 5)
        this.ctx.lineTo(x0 + 4 * this.r / 5 + 85, y0 + 4 * this.r / 5)
        this.ctx.stroke()
        // **文字
        this.ctx.font = 'normal 12px sans-serif'
        this.ctx.setFillStyle('#ff8247')
        this.ctx.setTextAlign('center')
        this.ctx.setTextBaseline('middle')
        this.ctx.fillText('面积:' + parameter[1], x0 + 4 * this.r / 5 + 40, y0 + 4 * this.r / 5 - 10)
    }

    canvasRunPerimeterShow (x0, y0, parameter) {
        // *周长指示
        // **圆上30度画一点（第一象限）
        this.ctx.beginPath()
        this.ctx.arc(
            x0 + this.r * Math.cos(Math.PI / 180 * 30),
            y0 - this.r * Math.sin(Math.PI / 180 * 30),
            2,
            0,
            2 * Math.PI
        )
        this.ctx.setFillStyle('#5abaff')
        this.ctx.fill()
        // **折线
        this.ctx.moveTo(
            x0 + this.r * Math.cos(Math.PI / 180 * 30),
            y0 - this.r * Math.sin(Math.PI / 180 * 30)
        )
        this.ctx.setLineWidth(1)
        this.ctx.setStrokeStyle('#5abaff')
        this.ctx.lineTo(
            x0 + this.r * Math.cos(Math.PI / 180 * 30) + 10,
            y0 - this.r * Math.sin(Math.PI / 180 * 30) - 10
        )
        this.ctx.lineTo(
            x0 + this.r * Math.cos(Math.PI / 180 * 30) + 80,
            y0 - this.r * Math.sin(Math.PI / 180 * 30) - 10
        )
        this.ctx.stroke()
        // **文字
        this.ctx.font = 'normal 12px sans-serif'
        this.ctx.setFillStyle('#ff8247')
        this.ctx.setTextAlign('center')
        this.ctx.setTextBaseline('middle')
        this.ctx.fillText(
            '周长:' + parameter[2],
            x0 + this.r * Math.cos(Math.PI / 180 * 30) + 40,
            y0 - this.r * Math.sin(Math.PI / 180 * 30) - 20
        )
    }

    // parameter:[radius, area, parameter]
    canvasDraw (parameter) {
        this.ctx = wx.createCanvasContext(this.domId)
        const that = this
        wx.createSelectorQuery().select('#' + this.domId).boundingClientRect(function (rect) { // 监听canvas的宽高
            // 获取圆心坐标
            var x0 = parseInt(rect.width / 2)
            var y0 = parseInt(rect.height / 2)
            // 开始画画
            that.canvasRun(x0, y0, parameter)
        }).exec()
    }
}

export default Canvas
