/* eslint-disable camelcase */
/* eslint-disable indent */
/* eslint-disable no-trailing-spaces */
class calc {
    constructor () {
        this.errMessage = ''
        this.padding = arguments[0]
        this.yGradient = '' // y轴梯度值
        this.xGradient = '' // x轴梯度值
        this.axisExtremum = {max_x: '', min_x: '', max_y: '', min_y: ''}
        this.gradientNum = {x: '', y: ''}
        this.dotLists = []
        this.area = 0
        this.perimeter = 0
    }

    execute (parameter) {
        this.buildGradient(parameter)
        this.buildDotLists(parameter)
        if (parameter && parameter.sureCalc) {
            if (this.processValid(parameter)) {
                return this.buildRes(parameter)
            } else {
                return false
            }
        }
    }

    getError () {
        return this.errMessage
    }

    checkEmptyArrObj (arr) {
        return arr.map((item, index) => {
            return !Object.values(item).every(item => !!item) ? arr[index].label : false
        }).filter(item => !!item).join('，')
    }

    processValid (parameter) {
        if (parameter && parameter.dotLists) {
        let dotLists = parameter.dotLists
        if (dotLists.length < 3) {
            this.errMessage = '最少录入三个点'
            return false
        } else if (this.checkEmptyArrObj(dotLists)) {
            let emptyStr = this.checkEmptyArrObj(dotLists)
            this.errMessage = `点${emptyStr}已添加但未录入值`
            return false
        } else {
            return true
            }
        }
        return true
    }

    // 获取多边形面积
    // |x1 y1| |x2 y2| ... |xn yn| = 0.5*abs(x1*y2-y1*x2+x2*y3-y2*x3+...+xn*y1-yn*x1) 
    getPolygonArea (points) {
        let area = 0
        for (let i = 0; i < points.length; i++) {
            let j = (i + 1) % points.length
            area += points[i].x * points[j].y
            area -= points[i].y * points[j].x
        }
        area /= 2
        return Math.abs(area)
    }

    // 获取多边形周长
    // √(xn - xn-1)^2 + (yn - yn-1)^2 + ... + (x2 - x1)^2 + (y2 - y1)^2
    getPolygonPerimeter (points) {
        let perimeter = 0
        for (let i = 0; i < points.length; i++) {
            let j = (i + 1) % points.length
            perimeter += Math.sqrt(Math.pow(points[j].x - points[i].x, 2) + Math.pow(points[j].y - points[i].y, 2))
        }
        return perimeter
    }

    // 获取点的极值
    getAxisExtremum () {
        let dotLists = arguments[0]
        this.xGradient = arguments[1]
        this.yGradient = arguments[2]
        let max_x = dotLists[0].x 
        let min_x = 0
        let max_y = dotLists[0].y
        let min_y = 0
        dotLists.forEach((item) => {
            if (parseFloat(item.x) > max_x) { max_x = parseFloat(item.x) }
            if (parseFloat(item.x) < min_x) { min_x = parseFloat(item.x) }
            if (parseFloat(item.y) > max_y) { max_y = parseFloat(item.y) }
            if (parseFloat(item.y) < min_y) { min_y = parseFloat(item.y) }
        })
        this.axisExtremum.max_x = Math.ceil(max_x / parseFloat(this.xGradient)) * parseFloat(this.xGradient)
        this.axisExtremum.min_x = Math.floor(min_x / parseFloat(this.xGradient)) * parseFloat(this.xGradient)
        this.axisExtremum.max_y = Math.ceil(max_y / parseFloat(this.yGradient)) * parseFloat(this.yGradient)
        this.axisExtremum.min_y = Math.floor(min_y / parseFloat(this.yGradient)) * parseFloat(this.yGradient)
        this.getGradientNum()
    }

    // 获取梯度线数量
    getGradientNum () {
        let xGradientNum = parseInt(this.axisExtremum.max_x - this.axisExtremum.min_x) / this.xGradient + 1
        let yGradientNum = parseInt(this.axisExtremum.max_y - this.axisExtremum.min_y) / this.yGradient + 1
        this.gradientNum.x = xGradientNum
        this.gradientNum.y = yGradientNum
    }

    // 梯度线
    buildGradient (parameter) {
        if (parameter && parameter.dotLists.length) {
            let {dotLists, xGradient, yGradient} = parameter
            this.getAxisExtremum(dotLists, xGradient, yGradient)
        }  
    }

    // 数据点和数据线
    buildDotLists (parameter) {
        if (parameter && parameter.dotLists.length) {
            let {dotLists, curIndex} = parameter
            this.dotLists = dotLists
            this.curIndex = curIndex
        }
    }

    buildRes (parameter) {
        if (parameter && parameter.dotLists.length) {
            let {dotLists, precision} = parameter
            this.area = this.getPolygonArea(dotLists).toFixed(precision)
            this.perimeter = this.getPolygonPerimeter(dotLists).toFixed(precision)
        }  
        return true
    }
}
export default calc
