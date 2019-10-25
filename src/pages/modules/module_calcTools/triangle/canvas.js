/* eslint-disable indent */
/* eslint-disable no-trailing-spaces */
import Calc from './calc'

class Canvas {
    constructor (domId) {
        this.domId = domId
        this.errMessage = ''
        this.padding = { top: 25, right: 25, bottom: 25, left: 25 } // 坐标系和画布距离
        this.arrow = { width: 10, height: 10 } // 箭头长宽
        this.toAngle = 180 / Math.PI
    };

    execute (parameter) {
        const calc = new Calc()
        const res = calc.execute(parameter)
        this.canvasDraw(res)
        if (!res) {
            this.errMessage = calc.getError()
            return false
        }
    };

    getError () {
        return this.errMessage
    }

    // 画三角形
    drawTriangle (width, height, res) { // res = [a, b, c, A, B, C, area, perimeter, ratio, precision]
        // 坐标轴原点的坐标
        const origin = {
            x: this.padding.left,
            y: height - this.padding.bottom
        }
        const coorRight = {
            x: this.padding.left + width - 100,
            y: this.padding.top + 20
        }
        const pointB = {
            x: (origin.x + width) / 5,
            y: origin.y
        }
        const pointC = {
            x: pointB.x + res[0],
            y: pointB.y
        }
        const pointA = {
            x: pointB.x + res[2] * Math.cos(res[4]),
            y: pointB.y - res[2] * Math.sin(res[4])
        }
        let a = parseFloat(res[0] / res[8]).toFixed(res[9])
        let b = parseFloat(res[1] / res[8]).toFixed(res[9])
        let c = parseFloat(res[2] / res[8]).toFixed(res[9])
        let A = parseFloat(res[3] * this.toAngle).toFixed(res[9])
        let B = parseFloat(res[4] * this.toAngle).toFixed(res[9])
        let C = parseFloat(res[5] * this.toAngle).toFixed(res[9])
        let area = parseFloat(res[6]).toFixed(res[9])
        let perimeter = parseFloat(res[7]).toFixed(res[9])
        
        this.ctx.setLineWidth(2)
        this.ctx.beginPath()
        this.ctx.setStrokeStyle('#5abaff')
        this.ctx.moveTo(pointB.x, pointB.y)
        this.ctx.lineTo(pointC.x, pointC.y)
        this.ctx.lineTo(pointA.x, pointA.y)
        this.ctx.lineTo(pointB.x, pointB.y)
        this.ctx.stroke()

        this.ctx.font = 'normal 12px sans-serif'
        this.ctx.setFillStyle('#ff5252')
        this.ctx.setTextAlign('left')
        this.ctx.setTextBaseline('middle')
        this.ctx.fillText('面积:' + area, coorRight.x, coorRight.y)
        this.ctx.fillText('周长:' + perimeter, coorRight.x, coorRight.y + 18)
        this.ctx.setTextAlign('center')
        this.ctx.fillText(a, (pointB.x + pointC.x) / 2, (pointB.y + pointC.y) / 2)
        this.ctx.fillText(b, (pointA.x + pointC.x) / 2, (pointA.y + pointC.y) / 2)
        this.ctx.fillText(c, (pointA.x + pointB.x) / 2 - 4, (pointA.y + pointB.y) / 2 - 4)
        this.ctx.setFillStyle('#ff8247')
        this.ctx.fillText(A + '°', pointA.x, pointA.y)
        this.ctx.fillText(B + '°', pointB.x, pointB.y)
        this.ctx.fillText(C + '°', pointC.x, pointC.y)
    };

    // 画坐标系
    drawCoordinate (width, height) {
        // 坐标轴上顶点的坐标
        const vertexTop = {
            x: this.padding.left,
            y: this.padding.top
        }
        // 坐标轴原点的坐标
        const origin = {
            x: this.padding.left,
            y: height - this.padding.bottom
        }
        // 坐标轴右顶点的坐标
        const vertexRight = {
            x: width - this.padding.left,
            y: height - this.padding.bottom
        }

        this.ctx.setLineWidth(1)

        // 画坐标轴的两条线
        this.ctx.beginPath()
        this.ctx.setStrokeStyle('#d2d2d2')
        this.ctx.moveTo(vertexTop.x, vertexTop.y)
        this.ctx.lineTo(origin.x, origin.y)
        this.ctx.lineTo(vertexRight.x, vertexRight.y)
        this.ctx.stroke()

        // 上箭头
        this.ctx.beginPath()
        this.ctx.setFillStyle('#d2d2d2')
        this.ctx.moveTo(vertexTop.x, vertexTop.y)
        this.ctx.lineTo(vertexTop.x - this.arrow.width / 2, vertexTop.y + this.arrow.height)
        this.ctx.lineTo(vertexTop.x, vertexTop.y + this.arrow.height / 2)
        this.ctx.lineTo(vertexTop.x + this.arrow.width / 2, vertexTop.y + this.arrow.height)
        this.ctx.fill()

        // 右箭头
        this.ctx.beginPath()
        this.ctx.setFillStyle('#d2d2d2')
        this.ctx.moveTo(vertexRight.x, vertexRight.y)
        this.ctx.lineTo(vertexRight.x - this.arrow.height, vertexRight.y - this.arrow.width / 2)
        this.ctx.lineTo(vertexRight.x - this.arrow.height / 2, vertexRight.y)
        this.ctx.lineTo(vertexRight.x - this.arrow.height, vertexRight.y + this.arrow.width / 2)
        this.ctx.fill()
    };

    canvasRun (width, height, res) {
        this.drawCoordinate(width, height)
        if (res) {
            this.drawTriangle(width, height, res)
        }
        this.ctx.draw()
    };

    canvasDraw (res) {
        this.ctx = wx.createCanvasContext(this.domId)
        const that = this
        wx.createSelectorQuery().select('#' + this.domId).boundingClientRect(function (rect) { // 监听canvas的宽高
            var width = parseInt(rect.width)
            var height = parseInt(rect.height)
            that.canvasRun(width, height, res)
        }).exec()
    };
};

export default Canvas
