class Graph {
    constructor(edges) {
        this.edges = Object.create(null);
        edges.forEach(ele => {
            let firstLocation = ele.slice(0, ele.indexOf('-'))
            let secondLocation = ele.slice(ele.indexOf('-') + 1)
            this.edges[firstLocation] ? this.edges[firstLocation].push(secondLocation) : this.edges[firstLocation] = [secondLocation]
            this.edges[secondLocation] ? this.edges[secondLocation].push(firstLocation) : this.edges[secondLocation] = [firstLocation]
        })
        // console.log(this.edges)
    }

    get(item) {
        return this.edges[item]
    }

    keys() {
        return Object.keys(this.edges)
    }
}


module.exports = Graph;