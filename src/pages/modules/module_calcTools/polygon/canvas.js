/* eslint-disable indent */
/* eslint-disable no-trailing-spaces */
import Calc from './calc'
class Canvas {
    constructor (domId) {
        this.domId = domId
        this.padding = { top: 25, right: 25, bottom: 25, left: 25 }
        this.arrow = { width: 10, height: 10 }
        this.aixsPadding = 30
        this.errMessage = ''
    }

    execute (parameter) {
        let calc = new Calc()
        calc.execute(parameter)
        this.getDotListsEl(calc)
        this.errMessage = calc.getError()
        this.canvasDraw()
    };

    getError () {
        return this.errMessage
    }

    // 坐标轴和点相关参数
    getDotListsEl (calc) {
        this.axisExtremum = calc.axisExtremum
        this.gradientNum = calc.gradientNum
        this.xGradient = calc.xGradient
        this.yGradient = calc.yGradient
        this.dotLists = calc.dotLists
        this.curIndex = calc.curIndex
        this.area = calc.area
        this.perimeter = calc.perimeter
        // console.log(
        //     'axisExtremum', this.axisExtremum, 
        //     'gradientNum', this.gradientNum, 
        //     'dotLists', this.dotLists,
        //     'area', this.area,
        //     'perimeter', this.perimeter
        //     )
    }

    // 画梯度线
    drawGradientLines (width, height) {
        const vertexTop = {
            x: this.padding.left,
            y: this.padding.top
        }
        const vertexRight = {
            x: width - this.padding.left,
            y: height - this.padding.bottom
        }
        this.ctx.beginPath()
        this.ctx.setLineWidth(1)
        let yStart = height - this.padding.bottom
        let yEnd = this.padding.top + this.aixsPadding // y轴留白20px
        let xStart = this.padding.left
        let xEnd = width - this.padding.left - this.aixsPadding // x轴留白20px
        if (this.gradientNum.x && this.gradientNum.x > 1 && this.gradientNum.x <= 11) { // 画x轴梯度线
            let xPerGradientPixels = (width - this.padding.right - this.padding.left - this.aixsPadding) / (this.gradientNum.x - 1)
            for (let i = 0; i < this.gradientNum.x - 1; i++) {
                this.ctx.moveTo(this.padding.left + (i + 1) * xPerGradientPixels, yStart)
                this.ctx.lineTo(this.padding.left + (i + 1) * xPerGradientPixels, yEnd)
                this.ctx.stroke()
                this.ctx.setStrokeStyle('#d9d9d9')
                this.ctx.fillText((i + 1) * this.xGradient, this.padding.left + (i + 1) * xPerGradientPixels, yStart + 10)
            }
        } else if (this.gradientNum.x > 11) {
            this.ctx.setFillStyle('#ff5252')
            this.ctx.setTextBaseline('middle')
            this.ctx.fillText('最大数值和梯度的除数限制为10以内', (vertexTop.x + vertexRight.x) / 2, vertexTop.y - 10)
        }
        if (this.gradientNum.y && this.gradientNum.y > 1 && this.gradientNum.y <= 11) { // 画y轴梯度线
            let yPerGradientPixels = (height - this.padding.top - this.padding.bottom - this.aixsPadding) / (this.gradientNum.y - 1)
            for (let i = 0; i < this.gradientNum.y - 1; i++) {
                this.ctx.moveTo(xStart, (height - this.padding.bottom - (i + 1) * yPerGradientPixels))
                this.ctx.lineTo(xEnd, (height - this.padding.bottom - (i + 1) * yPerGradientPixels))
                this.ctx.stroke()
                this.ctx.setStrokeStyle('#d9d9d9')
                this.ctx.fillText((i + 1) * this.yGradient, xStart - 15, height - this.padding.bottom - (i + 1) * yPerGradientPixels)
            }
        } else if (this.gradientNum.y > 11) {
            this.ctx.setFillStyle('#ff5252')
            this.ctx.fillText('最大数值和梯度的除数限制为10以内', (vertexTop.x + vertexRight.x) / 2, vertexTop.y - 10)
        }
        this.ctx.closePath()
    }

    // 画数据线和点
    drawLineAndDot (width, height) {
        if (this.gradientNum.x && this.gradientNum.x > 1 && this.gradientNum.y && this.gradientNum.y > 1) {
            // 画数据线
            this.ctx.beginPath()
            this.ctx.setLineWidth(1)
            this.ctx.setStrokeStyle('#5abaff')
            let xPerPixels = (width - this.padding.right - this.padding.left - this.aixsPadding) / ((this.gradientNum.x - 1) * this.xGradient)
            let yPerPixels = (height - this.padding.top - this.padding.bottom - this.aixsPadding) / ((this.gradientNum.y - 1) * this.yGradient)
            for (let i = 0; i < this.dotLists.length; i++) {
                if (this.dotLists[i].x && this.dotLists[i].y) {
                    let x = this.padding.left + this.dotLists[i].x * xPerPixels
                    let y = height - this.padding.bottom - this.dotLists[i].y * yPerPixels
                    this.ctx.lineTo(x, y)
                }
            }
            // 填充区域
            if (this.area) {
                this.ctx.setFillStyle('rgba(90, 186, 255, 0.1)')
                this.ctx.fill()
            }
            this.ctx.stroke()
            this.ctx.closePath()
            // 画数据点
            this.ctx.beginPath()
            this.ctx.setFillStyle('#5abaff')
            for (let i = 0; i < this.dotLists.length; i++) {
                if (this.dotLists[i].x && this.dotLists[i].y) {
                    let x = this.padding.left + this.dotLists[i].x * xPerPixels
                    let y = height - this.padding.bottom - this.dotLists[i].y * yPerPixels
                    this.ctx.moveTo(x, y)
                    // eslint-disable-next-line eqeqeq
                    if (this.curIndex == i) {
                        this.ctx.arc(x, y, 4, 0, Math.PI * 2, true)
                    } else {
                        this.ctx.arc(x, y, 2, 0, Math.PI * 2, true)
                    }
                    this.ctx.fill()
                }
            }
            this.ctx.closePath()
        }
    }

    // 画出计算结果
    drawResText (width, height) {
        const vertexTop = {
            x: this.padding.left,
            y: this.padding.top
        }
        const vertexRight = {
            x: width - this.padding.left,
            y: height - this.padding.bottom
        }
        if (this.area && this.perimeter) {
            this.ctx.setFillStyle('#ff5c7b')
            this.ctx.setTextAlign('center')
            this.ctx.setTextBaseline('middle')
            this.ctx.fillText('面积' + this.area, (vertexTop.x + vertexRight.x) / 4, vertexTop.y + 15)
            this.ctx.fillText('周长' + this.perimeter, (vertexTop.x + vertexRight.x) * 3 / 4, vertexTop.y + 15)
        }
    }

    drawCoordinate (width, height) {
        const vertexTop = {
            x: this.padding.left,
            y: this.padding.top
        }
        const origin = {
            x: this.padding.left,
            y: height - this.padding.bottom
        }
        const vertexRight = {
            x: width - this.padding.left,
            y: height - this.padding.bottom
        }
        this.ctx.setLineWidth(1)
        this.ctx.beginPath()
        this.ctx.setStrokeStyle('#d2d2d2')
        this.ctx.moveTo(vertexTop.x, vertexTop.y)
        this.ctx.lineTo(origin.x, origin.y)
        this.ctx.lineTo(vertexRight.x, vertexRight.y)
        this.ctx.stroke()
        this.ctx.closePath()

        this.ctx.beginPath()
        this.ctx.setFillStyle('#d2d2d2')
        this.ctx.moveTo(vertexTop.x, vertexTop.y)
        this.ctx.lineTo(vertexTop.x - this.arrow.width / 2, vertexTop.y + this.arrow.height)
        this.ctx.lineTo(vertexTop.x, vertexTop.y + this.arrow.height / 2)
        this.ctx.lineTo(vertexTop.x + this.arrow.width / 2, vertexTop.y + this.arrow.height)
        this.ctx.fill()
        this.ctx.closePath()

        this.ctx.beginPath()
        this.ctx.setFillStyle('#d2d2d2')
        this.ctx.moveTo(vertexRight.x, vertexRight.y)
        this.ctx.lineTo(vertexRight.x - this.arrow.height, vertexRight.y - this.arrow.width / 2)
        this.ctx.lineTo(vertexRight.x - this.arrow.height / 2, vertexRight.y)
        this.ctx.lineTo(vertexRight.x - this.arrow.height, vertexRight.y + this.arrow.width / 2)
        this.ctx.fill()
        this.ctx.closePath()

        this.ctx.font = 'normal 14px sans-serif'
        this.ctx.setFillStyle('#d2d2d2')
        this.ctx.setTextAlign('center')
        this.ctx.setTextBaseline('middle')
        this.ctx.fillText('x', vertexRight.x, vertexRight.y + 10)
        this.ctx.fillText('y', vertexTop.x - 10, vertexTop.y + 5)
        this.ctx.fillText('0', origin.x - 5, origin.y + 10)
        this.ctx.fillText('最大数值和梯度的除数限制为10以内', (vertexTop.x + vertexRight.x) / 2, vertexTop.y - 10)
    };

    canvasRun (width, height) {
        this.drawCoordinate(width, height)
        this.drawGradientLines(width, height)
        this.drawLineAndDot(width, height)
        this.drawResText(width, height)
        this.ctx.draw()
    };

    canvasDraw () {
        this.ctx = wx.createCanvasContext(this.domId)
        const that = this
        wx.createSelectorQuery().select('#' + this.domId).boundingClientRect(function (rect) { // 监听canvas的宽高
            var width = parseInt(rect.width)
            var height = parseInt(rect.height)
            that.canvasRun(width, height)
        }).exec()
    };
}

export default Canvas
