/* eslint-disable indent */
class Canvas {
    constructor (domId) {
        this.domId = domId
    }

    canvasRun (x0, y0, parameter) {
        // 设置配置参数
        const lineWidthByShadow = 1
        const lineWidthByArc = 2
        const radiusByShadow = x0 - lineWidthByShadow
        const radiusByArc = x0 - lineWidthByArc / 2
        const startAngle = 0 // 起始角设置在x轴上
        let endAngle = (2 * Math.PI / 360 * parameter[0]) - startAngle // 360°等分

        // 画圆环阴影
        this.ctx.setLineWidth(lineWidthByShadow)
        this.ctx.setStrokeStyle('#d2d2d2')
        this.ctx.setLineCap('round')
        this.ctx.arc(x0, y0, radiusByShadow, 0, 2 * Math.PI, false)
        this.ctx.stroke()

        // 画扇形
        this.ctx.beginPath()
        this.ctx.setLineWidth(lineWidthByArc)
        this.ctx.setStrokeStyle('#5abaff')
        this.ctx.setLineCap('round')
        this.ctx.arc(x0, y0, radiusByArc, startAngle, endAngle, false) // 顺时针
        if (parameter[0] || parameter[1]) {
            // 1.2 画第一条线
            this.ctx.lineTo(x0, y0)
            // 1.3 画第二条线
            this.ctx.lineTo(radiusByArc + x0, y0)
            this.ctx.stroke()
        };
        this.canvasAngleTextShow(x0, parameter)
        this.canvasRadTextShow(x0, parameter)
        this.ctx.draw()
    }

    canvasAngleTextShow (x0, parameter) {
        // 设置环心字体 角度
        this.ctx.beginPath()
        this.ctx.font = 'normal 16px sans-serif'
        this.ctx.setFillStyle('#ff5c7b')
        this.ctx.setTextAlign('center')
        this.ctx.setTextBaseline('middle')
        this.ctx.fillText('角度' + parameter[0] + '°', x0, 40)
    }

    canvasRadTextShow (x0, parameter) {
        // 设置环心字体 弧度
        this.ctx.beginPath()
        this.ctx.font = 'normal 16px sans-serif'
        this.ctx.setFillStyle('#ff5252')
        this.ctx.setTextAlign('center')
        this.ctx.setTextBaseline('middle')
        this.ctx.fillText('弧度' + parameter[1] + 'r', x0, 160)
    }

    canvsDraw (parameter) {
        this.ctx = wx.createCanvasContext(this.domId)
        const that = this
        wx.createSelectorQuery().select('#' + this.domId).boundingClientRect(function (rect) { // 监听canvas的宽高
            // 获取圆心坐标
            var x0 = parseInt(rect.width / 2)
            var y0 = parseInt(rect.height / 2)
            that.canvasRun(x0, y0, parameter)
        }).exec()
    }
}
export default Canvas
