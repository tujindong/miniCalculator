/* eslint-disable indent */
/* eslint-disable no-unused-vars */
/* eslint-disable no-trailing-spaces */
/* eslint-disable eqeqeq */
class Calc {
    constructor () {
        this.errMessage = ''
        this.scale = 200
        this.toRad = Math.PI / 180
    };

    execute (parameter) {
        if (this.processValid(parameter)) {
            return this.buildRes(parameter)
        } else {
            return false
        }
    };

    getError () {
        return this.errMessage
    };

    // 判断是否合法
    processValid (parameter) {
        if (parameter && parameter.size) { // 边长
        let size = parameter.size.map(item => parseFloat(item))
        if (size[0] == 0 || size[1] == 0 || size[2] == 0) {
            this.errMessage = '边长不可以为0'
        } else if (size[0] + size[1] <= size[2]) {
            this.errMessage = '边长1，边长2之和须大于边长3'
            return false
        } else if (size[0] + size[2] <= size[1]) {
            this.errMessage = '边长1，边长3之和须大于边长2'
            return false
        } else if (size[1] + size[2] <= size[0]) {
            this.errMessage = '边长2，边长3之和须大于边长1'
            return false
        } else {
            return true
        }
        } else if (parameter && parameter.s2a1) { // 两边和夹角
        let s2a1 = parameter.s2a1.map(item => parseFloat(item))
        if (s2a1[2] > 180) {
            this.errMessage = '夹角不能大于180度'
            return false
        } else if (s2a1[0] == 0 || s2a1[0] == 0) {
            this.errMessage = '边长不可以为0'
            return false
        } else if (s2a1[2] == 0) {
            this.errMessage = '夹角不能为0'
            return false
        } else {
            return true
        }
        } else if (parameter && parameter.a2s1) { // 两角和一边
        let a2s1 = parameter.a2s1.map(item => parseFloat(item))
        if (a2s1[0] == 0 || a2s1[1] == 0) {
            this.errMessage = '角度不可以为0'
            return false
        } else if (a2s1[2] == 0) {
            this.errMessage = '边长不可以为0'
            return false
        } else if (a2s1[0] + a2s1[1] > 180) {
            this.errMessage = '两角之和不可以大于180度'
            return false
        } else {
            return true
        }
        } else {
            return true
        }
    };

    // 处理边长, 返回[a, b, c, A, B, C, area, perimeter, ratio, precision]
    /* cosA = (b^2+c^2-a^2) / 2bc
        cosB = (a^2+c^2-b^2) / 2ac
        cosC = (a^2+b^2-c^2) / 2ab 
        a^2 = b^2 + c^2 - 2bc * cosA
        b^2 = a^2 + c^2 - 2ac * cosB
        c^2 = a^2 + b^2 - 2ab * cosC 
        a / sinA = b / sinB = c / sinC */
    buildRes (parameter) {
        if (parameter && parameter.size) { // 三边长
            let size = parameter.size.map(item => parseFloat(item)).slice(0, 3)
            let precision = parseFloat(parameter.size.pop())
            return this.processSize(size[0], size[1], size[2], precision)
        } else if (parameter && parameter.s2a1) { // 两边和一角  
            let s2a1 = parameter.s2a1.map(item => parseFloat(item)).slice(0, 3)
            let precision = parseFloat(parameter.s2a1.pop())
            let thirdSize = Math.sqrt(Math.pow(s2a1[0], 2) + Math.pow(s2a1[1], 2) - 2 * s2a1[0] * s2a1[1] * Math.cos(s2a1[2] * this.toRad))
            return this.processSize(s2a1[0], s2a1[1], thirdSize, precision)
        } else if (parameter && parameter.a2s1) { // 两夹角和一边
            let a2s1 = parameter.a2s1.map(item => parseFloat(item)).slice(0, 3)
            let precision = parseFloat(parameter.a2s1.pop())
            let C = 180 - a2s1[0] - a2s1[1]
            let a = a2s1[2] * Math.sin(a2s1[0] * this.toRad) / Math.sin(C * this.toRad)
            let b = a2s1[2] * Math.sin(a2s1[1] * this.toRad) / Math.sin(C * this.toRad)
            let c = a2s1[2]
            return this.processSize(a, b, c, precision)
        } else {
            return false  
        }
    };

    processSize (_a, _b, _c, precision) {
        let size = [_a, _b, _c]  
        size.sort((a, b) => { return b - a })
        let ratio = parseFloat(this.scale / size[0])
        let a = size[0] * ratio
        let b = size[1] * ratio 
        let c = size[2] * ratio
        let A = Math.acos((Math.pow(b, 2) + Math.pow(c, 2) - Math.pow(a, 2)) / (2 * b * c))
        let B = Math.acos((Math.pow(a, 2) + Math.pow(c, 2) - Math.pow(b, 2)) / (2 * a * c))
        let C = Math.acos((Math.pow(a, 2) + Math.pow(b, 2) - Math.pow(c, 2)) / (2 * a * b))
        let area = b * c * Math.sin(A) / (2 * Math.pow(ratio, 2))
        let perimeter = (a + b + c) / ratio
        let res = [a, b, c, A, B, C, area, perimeter, ratio, precision]
        return res
    }
};

export default Calc
