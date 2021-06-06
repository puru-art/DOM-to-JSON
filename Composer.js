module.exports = class DOMScrapper{
    constructor($){
        this.$ = $
    }

    domToJSON(){
        const topParents = ['head', 'body']
        return topParents.map((name) => ({
            name,
            childrenCount: this.childrenArr(name).length,
            children: this.getChilddata(this.childrenArr(name))
        }))
    }

    childrenArr(element){
        return this.$(element).children().toArray()
    }

    getChilddata(arr){
        return arr.map(element => {
            const len = this.childrenArr(element).length
            const nodeInfo = {
                name: this.$(element).prop('tagName'),
                childrenCount: len
            }
            if(len >= 1){
                nodeInfo.children = [...this.getChilddata(this.childrenArr(element))]
            }
            return nodeInfo
        })
    }
}