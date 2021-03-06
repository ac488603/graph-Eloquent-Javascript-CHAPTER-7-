let Graph = require('./graph')
let {
    VillageState,
    randomRobot,
} = require('./villageState')

function runRobot(state, robot, memory) {
    for (let turn = 0;; turn++) {
        if (state.parcels.length == 0) {
            console.log(`Done in ${turn} turns`);
            break;
        }
        let action = robot(state, memory);
        state = state.move(action.direction);
        memory = action.memory;
        console.log(`Moved to ${action.direction}`);
    }
}
const roads = [
    "Alice's House-Bob's House", "Alice's House-Cabin",
    "Alice's House-Post Office", "Bob's House-Town Hall",
    "Daria's House-Ernie's House", "Daria's House-Town Hall",
    "Ernie's House-Grete's House", "Grete's House-Farm",
    "Grete's House-Shop", "Marketplace-Farm",
    "Marketplace-Post Office", "Marketplace-Shop",
    "Marketplace-Town Hall", "Shop-Town Hall"
]

const mailRoute = [
    "Alice's House", "Cabin", "Alice's House", "Bob's House",
    "Town Hall", "Daria's House", "Ernie's House",
    "Grete's House", "Shop", "Grete's House", "Farm",
    "Marketplace", "Post Office"
];

function routeRobot(state, memory) {
    if (memory.length == 0) {
        memory = mailRoute;
    }
    return {
        direction: memory[0],
        memory: memory.slice(1)
    };
}

function findRoute(graph, from, to) {
    let work = [{
        at: from,
        route: []
    }];
    for (let i = 0; i < work.length; i++) {
        let {
            at,
            route
        } = work[i];
        for (let place of graph.get(at)) {
            if (place == to) return route.concat(place);
            if (!work.some(w => w.at == place)) {
                work.push({
                    at: place,
                    route: route.concat(place)
                });
            }
        }
    }
}

function goalOrientedRobot({
    place,
    parcels
}, route) {
    if (route.length == 0) {
        let parcel = parcels[0];
        if (parcel.place != place) {
            route = findRoute(goalOrientedRobot.graph, place, parcel.place);
        } else {
            route = findRoute(goalOrientedRobot.graph, place, parcel.address);
        }
    }
    return {
        direction: route[0],
        memory: route.slice(1)
    };
}

let graph = new Graph(roads)


randomRobot.graph = graph
runRobot(VillageState.random(graph), randomRobot);

/*
routeRobot.graph = graph;
runRobot(VillageState.random(graph), routeRobot, []);
*/
/*
goalOrientedRobot.graph = graph;
runRobot(VillageState.random(graph), goalOrientedRobot, []);
*/