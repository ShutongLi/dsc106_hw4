var svg = d3.select("#chart1").append("svg").attr("width", 1900).attr("height", 850),
    width = +svg.attr("width") - 100,
    height = +svg.attr("height");
var simulation = d3.forceSimulation()
    .force("link", d3.forceLink().id(function(d) { return d.id; }))
    //.force("charge", d3.forceManyBody().strength(-200))
    .force('charge', d3.forceManyBody()
        .strength(-4000)
        .theta(0.1)
        .distanceMax(400)
    )
    // 		.force('collide', d3.forceCollide()
    //       .radius(d => 40)
    //       .iterations(2)
    //     )
    .force("center", d3.forceCenter(width / 2, height / 2));


const graph = {
    "nodes": [
        {"id": "Spider-Man", "group": 1},
        {"id": "Aunt May", "group": 1},
        {"id": "Happy Hogan", "group": 1},
        //team tony
        {"id": "tony stark", "group": 1},
        {"id": "war machine", "group": 1},
        {"id": "Natasha", "group": 1},
        {"id": "Vision", "group": 1},
        {"id": "Black Panther", "group": 1},
        //school
        {"id": "MJ", "group": 1},
        {"id": "Ned Leeds", "group": 1},
        {"id": "Flash Thompson", "group": 1},
        {"id": "Liz", "group": 1},
        //villain
        {"id": "Vulture", "group": 3},
        {"id": "Prowler", "group": 3},
        //team cap
        {"id": "Captain America", "group": 2},
        {"id": "Falcon", "group": 2},
        {"id": "Winter Soldier", "group": 2},
        {"id": "Scarlet Witch", "group": 2},
        {"id": "Hawkeye", "group": 2},
        {"id": "Antman", "group": 2},
    ],
    "links": [
        //hero friends
        {"source": "Spider-Man", "target": "tony stark", "value": 1},
        {"source": "Spider-Man", "target": "Aunt May", "value": 1},
        {"source": "Spider-Man", "target": "Happy Hogan", "value": 1},
        {"source": "Aunt May", "target": "Happy Hogan", "value": 1},
        {"source": "tony stark", "target": "Happy Hogan", "value": 1},
        //school friends
        {"source": "Spider-Man", "target": "MJ", "value": 1},
        {"source": "Spider-Man", "target": "Ned Leeds", "value": 1},
        {"source": "Spider-Man", "target": "Flash Thompson", "value": 1},
        {"source": "Spider-Man", "target": "Liz", "value": 1},
        {"source": "MJ", "target": "Ned Leeds", "value": 1},
        {"source": "MJ", "target": "Flash Thompson", "value": 1},
        {"source": "MJ", "target": "Liz", "value": 1},
        {"source": "Ned Leeds", "target": "Flash Thompson", "value": 1},
        {"source": "Ned Leeds", "target": "Liz", "value": 1},
        {"source": "Flash Thompson", "target": "Liz", "value": 1},
        //villain rivalry
        {"source": "Spider-Man", "target": "Vulture", "value": 1},
        {"source": "Spider-Man", "target": "Prowler", "value": 1},
        {"source": "Vulture", "target": "Prowler", "value": 1},
        {"source": "Vulture", "target": "Liz", "value": 10},
        //hero rivalry (team cap)
        {"source": "Spider-Man", "target": "Captain America", "value": 1},
        {"source": "tony stark", "target": "Captain America", "value": 1},
        {"source": "Captain America", "target": "Falcon", "value": 1},
        {"source": "Captain America", "target": "Scarlet Witch", "value": 1},
        {"source": "Captain America", "target": "Hawkeye", "value": 1},
        {"source": "Captain America", "target": "Antman", "value": 1},
        {"source": "Captain America", "target": "Winter Soldier", "value": 1},
        {"source": "Winter Soldier", "target": "Falcon", "value": 1},
        //hero rivalry (team tony)
        {"source": "tony stark", "target": "war machine", "value": 1},
        {"source": "tony stark", "target": "Natasha", "value": 1},
        {"source": "tony stark", "target": "Vision", "value": 1},
        {"source": "tony stark", "target": "Black Panther", "value": 1},
        //love hate
        {"source": "Scarlet Witch", "target": "Vision", "value": 1},
        {"source": "Natasha", "target": "Hawkeye", "value": 1},
    ]
}


function run(graph) {

    graph.links.forEach(function(d){
//     d.source = d.source_id;
//     d.target = d.target_id;
    });

    var link = svg.append("g")
        .style("stroke", "#aaa")
        .selectAll("line")
        .data(graph.links)
        .enter().append("line");

    var node = svg.append("g")
        .attr("class", "nodes")
        .selectAll("circle")
        .data(graph.nodes)
        .enter().append("circle")
        .attr("r", 2)
        .call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended));

    var label = svg.append("g")
        .attr("class", "labels")
        .selectAll("text")
        .data(graph.nodes)
        .enter().append("text")
        .attr("class", "label")
        .text(function(d) { return d.id; });

    simulation
        .nodes(graph.nodes)
        .on("tick", ticked);

    simulation.force("link")
        .links(graph.links);

    function ticked() {
        link
            .attr("x1", function(d) { return d.source.x; })
            .attr("y1", function(d) { return d.source.y; })
            .attr("x2", function(d) { return d.target.x; })
            .attr("y2", function(d) { return d.target.y; });

        node
            .attr("r", 40)
            .style("fill", "#efefef")
            .style("stroke", "#424242")
            .style("stroke-width", "1px")
            .attr("cx", function (d) { return d.x+35; })
            .attr("cy", function(d) { return d.y-3; });

        label
            .attr("x", function(d) { return d.x; })
            .attr("y", function (d) { return d.y; })
            .style("font-size", "13px").style("fill", "#333");
    }
}

function dragstarted(d) {
    if (!d3.event.active) simulation.alphaTarget(0.3).restart()
    d.fx = d.x
    d.fy = d.y
//  simulation.fix(d);
}

function dragged(d) {
    d.fx = d3.event.x
    d.fy = d3.event.y
//  simulation.fix(d, d3.event.x, d3.event.y);
}

function dragended(d) {
    d.fx = d3.event.x
    d.fy = d3.event.y
    if (!d3.event.active) simulation.alphaTarget(0);
    //simulation.unfix(d);
}
run(graph)