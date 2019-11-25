
var radar_chart_coord = {0: "Intelligence", 60: "Strength", 120:'Speed', 180: 'Durability', 240: 'Power', 300: 'Combat'}
var radar_config = {

    chart: {
        polar: true,
        backgroundColor:'#ece9e6',
    },

    title: {
        text: 'Earth-606: Spider-Man is more powerful than the Sinister Six!',
        style: {
            fontSize: "28px",
        },
    },

    subtitle: {
        text: 'Comparison of Spider Man power metrics against the average of that of sinister six'
    },

    pane: {
        startAngle: 0,
        endAngle: 360
    },

    tooltip: {
        shared:false,
        borderWidth: 0,
        backgroundColor: '#cccac9',
        opacity:0.3,
        pointFormat: '{point.y}',
        headerFormat: '',
        shadow: false,
        style: {
            fontSize: '10px'
        },
    },

    xAxis: {
        tickInterval: 60,
        min: 0,
        max: 360,
        labels: {
            formatter: function() {
                return radar_chart_coord[this.value];
                },
            enabled: true,
            style: {
                fontSize: '15px',
                fontFamily: "'Banger', cursive",
                fontWeight:'bold',
            }
        }
    },

    yAxis: {
        min: 0,
        max: 100,
    },

    plotOptions: {
        series: {
            pointStart: 0,
            pointInterval: 60
        },
        column: {
            pointPadding: 0,
            groupPadding: 0
        }
    },

    series: [{
        type: 'area',
        name: 'Spider Man',
        data: [88, 55, 60, 74, 58, 85],
        color:'#9d0b0a',
        opacity:0.5,
    }, {
        data:[59, 34.6, 40.4, 55.8, 46.2, 69.2],
        name: 'Sinister Six',
        color:'#436829',
        opacity:0.5,
        type: 'area',
    }]
};


var word_cloud_config = {
    chart: {
        backgroundColor:'#ece9e6'
    },
    series: [{
        type: 'wordcloud',
        data: [{name:'great',weight: 11},
            {name:'comes', weight: 6} ,
            {name:'power', weight: 6},
            {name:'responsibility', weight: 5},
            {name:'spider', weight: 5},
            {name: 'get', weight: 4},
            {name:'spiderman', weight: 4},
            {name:'friendly', weight: 3},
            {name:'man', weight: 3},
            {name:'father', weight: 3},
            {name:'back', weight: 2},
            {name:'know', weight: 2},
            {name:'picture', weight: 2},
            {name:'parker', weight: 2},
            {name:'ben', weight: 2},
            {name:'name', weight: 2},
            {name:'formula', weight: 2},
            {name:'neighbourhood', weight: 2},
            {name:'change', weight: 1},
            {name:'life', weight: 1}],
        name: 'Occurrences'
    }],
    title: {
        text: 'Sony Spider-Man\'s Origin Story: Uncle Ben motifs',
        style: {
            fontSize: "28px",
        }
    },
    subtitle: {
        text: 'Word Cloud of parsed famous quotes from Sam Raimi\'s Spider Man 1 ',
    }
}
Highcharts.chart(document.getElementsByClassName('Radar_chart')[0], radar_config);
Highcharts.chart(document.getElementsByClassName('word_cloud')[0], word_cloud_config);
