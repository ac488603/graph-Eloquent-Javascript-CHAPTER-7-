class VillageState {
    constructor(place, parcels, graph) {
        this.graph = graph
        this.place = place; //current place of the robot
        this.parcels = parcels; //collection of all the parcels, the parcels have a current and destination properties
    }

    move(destination) {
        if (!this.graph.get(this.place).includes(destination)) {
            return this;
        } else {
            let parcels = this.parcels.map(p => {
                if (p.place != this.place) return p;
                return {
                    place: destination,
                    address: p.address
                };
            }).filter(p => p.place != p.address);
            return new VillageState(destination, parcels, this.graph);
        }
    }
}


//adding a method to the constructor creates a static method
VillageState.random = function (graph, parcelCount = 5) {
    let parcels = [];
    for (let i = 0; i < parcelCount; i++) {
        let address = randomPick(graph.keys());
        let place;
        do {
            place = randomPick(graph.keys());
        } while (place == address);
        parcels.push({
            place,
            address
        });
    }
    return new VillageState("Post Office", parcels, graph);
};

function randomPick(array) {
    let choice = Math.floor(Math.random() * array.length);
    return array[choice];
}


function randomRobot(state) {
    return {
        direction: randomPick(randomRobot.graph.get(state.place))
    };
}

module.exports = {
    VillageState,
    randomRobot,
};