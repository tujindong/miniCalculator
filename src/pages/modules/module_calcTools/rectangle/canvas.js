/* eslint-disable indent */
/* eslint-disable no-trailing-spaces */
class Canvas {
    constructor (domId) {
        this.domId = domId
    }

    canvasRun (x0, y0, parameter) {
        // 设置配置参数
        const baseLength = 160
        // 基准矩形左上角坐标
        let coorBaseLeft = {
            x: x0 - baseLength / 2 + 1 / 2,
            y: 20
        }
        // 画基准矩形
        this.ctx.setLineWidth(1)
        this.ctx.setStrokeStyle('#d2d2d2')
        this.ctx.rect(coorBaseLeft.x, coorBaseLeft.y, baseLength, baseLength)
        this.ctx.stroke()
        if (parameter && parameter.length) {
            this.canvasRunRectShow(x0, y0, baseLength, parameter)
        };
        this.ctx.draw()
    }

    canvasRunRectShow (x0, y0, baseLength, parameter) {
        // 输入矩形左上角坐标
        let ratio = 0
        if (parameter[0] !== '0' && parameter[0] !== 0) {
            ratio = baseLength / parameter[0]
        };
        // eslint-disable-next-line camelcase
        let x_l = x0 - baseLength / 2 + 1 / 2
        // eslint-disable-next-line camelcase
        let y_l = y0 - parameter[1] * ratio / 2 + 1
        let L = baseLength
        let W = parameter[1] * ratio
        // 画输入矩形
        this.ctx.beginPath()
        this.ctx.setLineWidth(2)
        this.ctx.setStrokeStyle('#5abaff')
        this.ctx.rect(x_l, y_l, L, W)
        this.ctx.stroke()

        // **文字
        this.ctx.font = 'normal 12px sans-serif'
        this.ctx.setFillStyle('#ff8247')
        this.ctx.setTextAlign('center')
        this.ctx.setTextBaseline('middle')
        this.ctx.fillText('面积:' + parameter[2], x0, y0)
        this.ctx.setFillStyle('#ff5c7b')
        this.ctx.fillText('长' + parameter[0], x0, y0 + W / 2 + 10)
        this.ctx.setFillStyle('#ff5252')
        this.ctx.setTextAlign('left')
        this.ctx.fillText('宽' + parameter[1], x0 + 85, y0)
    }

    // parameter:[length, width, area]
    canvasDraw (parameter) {
        this.ctx = wx.createCanvasContext(this.domId)
        const that = this
        wx.createSelectorQuery().select('#' + this.domId).boundingClientRect(function (rect) { // 监听canvas的宽高
            var x0 = parseInt(rect.width / 2)
            var y0 = parseInt(rect.height / 2)
            that.canvasRun(x0, y0, parameter)
        }).exec()
    }
}
export default Canvas
