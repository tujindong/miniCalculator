/* eslint-disable indent */
/*
*  将对象转变为class字符串
*/
export function classes (obj) {
    let classesStr = ''
    for (let className in obj) {
        if (obj.hasOwnProperty(className) && !!obj[className]) classesStr += className
    }
    return classesStr
}

/*
  * 将对象转变为style字符串，对象属性的camel命名会转换为中划线命名
  */
export function styles (obj) {
    let stylesStr = ''
    for (let styleName in obj) {
        if (obj.hasOwnProperty(styleName)) {
            stylesStr += `${styleName.replace(/([A-Z])/g, '-$1').toLowerCase()}:${obj[styleName]};`
        }
    }
    return stylesStr
}
