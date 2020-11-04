var orgData;
var cDATA;
var DATA;

function init(data){
    let dYear = [];
    for(let i=0; i<data.length; i++){
        dYear.push(data[i].Year)
    }
    dYear.sort().reverse();
    const seld = d3Select.select('#selDataset');
    dYear.forEach(d=>{
        seld.append('option')
            .attr('value', d)
            .text(d);
    })

    let dCountry =[];
    const tempTrade = orgData[0].Trade;
    for(let i=0; i<tempTrade.length; i++){
        dCountry.push(tempTrade[i].Country)
    }
    console.log(dCountry);
    dCountry.sort();
    const selc = d3Select_Line.select('#selCountry');
    dCountry.forEach(d=>{
        selc.append('option')
            .attr('value', d)
            .text(d)
    })

    optionChanged(seld.node().value);
    countryChanged(selc.node().value)
}

function dataFilter(fval){
    let fData = orgData.filter(d=>d.Year == Number(fval))[0]['Trade'];
    fData = fData.filter(d=>!(d.Export==0 && d.Import==0))

    return fData
}


// ===== Bubble Scatter ==========================================================================================
const svgHeight = 450;
const svgWidth = 500;
const svgMargin = {
    top : 25,
    right : 25,
    bottom : 75,
    left : 75
}
const width = svgWidth - svgMargin.left - svgMargin.right;
const height = svgHeight - svgMargin.top - svgMargin.bottom;

const d3Select = d3.select('#bscatter');
const svg = d3Select.append('svg')
    .attr('height', svgHeight)
    .attr('width', svgWidth);
var chartGroup = svg.append('g').attr('transform', `translate(${svgMargin.left}, ${svgMargin.top})`);

var xLinearScale = d3.scaleLinear().range([0, width]);
var yLinearScale = d3.scaleLinear().range([height, 0]);
var zLinearScale = d3.scaleLinear().range([1, 25]);
var colorScaleOrdinal = d3.scaleOrdinal().range(['red', 'black', 'green']).domain([-1, 0, 1]);

var gButtomAxis = chartGroup.append('g').attr('transform', `translate(0,${height})`);
var gLeftAxis = chartGroup.append('g');

const tooltip = d3Select.append("use")
    .attr("class", "tooltip")
    .style("position", "absolute")
    .style("opacity", 0)
    .style("background-color", "black")
    .style("border-radius", "5px")
    .style("padding", "10px")
    .style("color", "white");

chartGroup.append("text")
    .attr("x", (width / 2))
    .attr("y", height+50)
    .attr("text-anchor", "middle")
    .style("font-size", "16px")
    .text("Export (Million Au$)");

// chartGroup.append("text")
//     .attr("x", svgMargin.left-250)
//     .attr("y", 1)
//     .attr("text-anchor", "middle")
//     .attr('transform', `rotate(-90)`)
//     .style("font-size", "16px")
//     .text("Import (Million Au$)");

function showTooltip(d) {
    tooltip
        .style("top", `${d3.mouse(this)[1]}px`)
        .style("left", `${d3.mouse(this)[0]}px`)
        .style("opacity", 0.5)
        .html(`Country : ${d.Country}<br>Balance : ${d.Balance.toFixed(2)}mil<br>Export : ${d.Export.toFixed(2)}mil<br>Import : ${d.Import.toFixed(2)}mil<br>Total : ${d.Total.toFixed(2)}mil`)
        .on('click', hideTooltip)

}

function hideTooltip(d) {
    tooltip
        .transition()
        .duration(200)
        .style("opacity", 0)
}

function moveTooltip(d) {
    tooltip
        .style("left", (d3.mouse(this)[0]+30) + "px")
        .style("top", (d3.mouse(this)[1]+30) + "px")
}

function bscatter(DATA){

    xLinearScale.domain([-2000, d3.max(DATA, d=>d.Export)]);
    yLinearScale.domain([-2000, d3.max(DATA, d=>d.Import)]);
    zLinearScale.domain([d3.min(DATA, d=>d.Balance), d3.max(DATA, d=>d.Balance)]);

    gButtomAxis.call(d3.axisBottom(xLinearScale));
    gLeftAxis.call(d3.axisLeft(yLinearScale));

    var gCircle = chartGroup.selectAll("circle").data(DATA)
    gCircle
        .enter()
        .append("circle")
        .merge(gCircle)
        .attr("cx", d => xLinearScale(d.Export))
        .attr("cy", d => yLinearScale(d.Import))
        .attr("r", d => zLinearScale(d.Total))
        .attr("fill", d => colorScaleOrdinal((d.Balance>0)?1:(d.Balance<0)?-1:0))
        .attr("opacity", "0.3")
        .attr("stroke", "black")
        .on("click", showTooltip)
        // .on("mouseleave", hideTooltip )
        // .on("mousemove", moveTooltip )
    gCircle.exit().remove()
}
// ===============================================================================================================

// ===== Barchart ==========================================================================================
const svgHeight_Bar = 450;
const svgWidth_Bar = 500;
const svgMargin_Bar = {
    top : 25,
    right : 25,
    bottom : 75,
    left : 75
}
const width_Bar = svgWidth_Bar - svgMargin_Bar.left - svgMargin_Bar.right;
const height_Bar = svgHeight_Bar - svgMargin_Bar.top - svgMargin_Bar.bottom;

const d3Select_Bar = d3.select('#barchartx');
const svg_Bar = d3Select_Bar.append('svg')
    .attr('height', svgHeight_Bar)
    .attr('width', svgWidth_Bar);
var chartGroup_Bar = svg_Bar.append('g').attr('transform', `translate(${svgMargin_Bar.left}, ${svgMargin_Bar.top})`);

var xLinearScale_Bar = d3.scaleBand()
                        .range([0, width_Bar])
                        .padding(0.2);
var yLinearScale_Bar = d3.scaleLinear()
                        .range([height_Bar, 0]);
var gButtomAxis_Bar = chartGroup_Bar.append('g')
                                    .attr("transform", `translate(0, ${height_Bar})`);
var gLeftAxis_Bar = chartGroup_Bar.append('g');

// const key_Bar = ['Top Deficit', 'Top Surplus', 'Top Export', 'Top Import', 'Top Total'];
// chartGroup_Bar.selectAll("mylabels")
//     .data(key_Bar)
//     .enter()
//     .append("text")
//     .attr("x", 45)
//     .attr("y", (d,i)=>35 + i*25)
//     .attr('opacity', 0.5)
//     .style("fill", d=>color(d))
//     .text(d=>d)
//     .attr("text-anchor", "left")
//     .style("alignment-baseline", "middle")

chartGroup_Bar.append("text")
    .attr("x", (width_Bar / 2))
    .attr("y", height_Bar+50)
    .attr("text-anchor", "middle")
    .style("font-size", "16px")
    .text("Export (Country Trade Partner)");

// chartGroup_Bar.append("text")
//     .attr("x", svgMargin.left-250)
//     .attr("y", 0)
//     .attr("text-anchor", "middle")
//     .attr('transform', `rotate(-90)`)
//     .style("font-size", "16px")
//     .text("Import (Million Au$)");

function barchart(DATA, topx){
    const topSlice = 10;
    let topDATA = [];
    let col = '';
    switch (topx){
        case 0: // Top Deficit
            let temp = DATA.sort((a, b) => a.Balance - b.Balance).slice(0,topSlice);
            for(let i=0; i<temp.length; i++){
                topDATA.push(Object.assign({}, temp[i]))
            }
            for(let i=0; i<topDATA.length; i++){
                topDATA[i].Balance *= -1
            }
            col = 'Balance';
            break
        case 1: // Top Surplus
            topDATA = DATA.sort((a, b) => b.Balance - a.Balance).slice(0,topSlice);
            col = 'Balance';
            break
        case 2: // Top Export
            topDATA = DATA.sort((a, b) => b.Export - a.Export).slice(0,topSlice);
            col = 'Export';
            break
        case 3: // Top Import
            topDATA = DATA.sort((a, b) => b.Import - a.Import).slice(0,topSlice);
            col = 'Import';
            break
        default: // Top Total
            topDATA= DATA.sort((a, b) => b.Total - a.Total).slice(0,topSlice);
            col = 'Total'
    }

    xLinearScale_Bar.domain(topDATA.map(d=>d.Country));
    yLinearScale_Bar.domain([d3.min(topDATA, d=>d[col]), d3.max(topDATA, d=>d[col])]);

    gButtomAxis_Bar.call(d3.axisBottom(xLinearScale_Bar))
                    .selectAll("text")
                    .attr("transform", "translate(-10,0)rotate(-45)")
                    .style("text-anchor", "end");
    gLeftAxis_Bar.call(d3.axisLeft(yLinearScale_Bar));

    var gBar = chartGroup_Bar.selectAll("rect").data(topDATA)
    gBar
        .enter()
        .append("rect")
        .merge(gBar)
        .transition().duration(1000)
        .attr("x", d => xLinearScale_Bar(d.Country))
        .attr("y", d => yLinearScale_Bar(d[col]))
        .attr("width", xLinearScale_Bar.bandwidth())
        .attr("height", d=>height_Bar-yLinearScale_Bar(d[col]))
        .attr("fill", "orange")
    gBar.exit().remove()
}
// ===============================================================================================================

// ===== Treemap ==========================================================================================
const svgHeight_TMap = 700;
const svgWidth_TMap = 900;
const svgMargin_TMap = {
    top : 25,
    right : 25,
    bottom : 75,
    left : 75
}
const width_TMap = svgWidth_TMap - svgMargin_TMap.left - svgMargin_TMap.right;
const height_TMap = svgHeight_TMap - svgMargin_TMap.top - svgMargin_TMap.bottom;

const d3Select_TMap = d3.select('#treemapx');
const svg_TMap = d3Select_TMap.append('svg')
    .attr('height', svgHeight_TMap)
    .attr('width', svgWidth_TMap);
var chartGroup_TMap = svg_TMap.append('g').attr('transform', `translate(${svgMargin_TMap.left}, ${svgMargin_TMap.top})`);


function Treemap(DATA, tradex){
    const tradeX = ['Balance', 'Balance', 'Export', 'Import', 'Total'];
    let arrSurplus = [];
    let arrDeficit = [];
    for(let i=0; i<DATA.length; i++){
        let dt = Object.assign({}, DATA[i]);
        dt["colname"] = "level3";
        if(dt.Balance < 0){
            dt.Balance *= -1;
            arrDeficit.push(dt)
        }else{
            arrSurplus.push(dt)
        }
    }
    let newDATA = {'children':[{'colname':'level2', 'name':'Surplus', 'children':arrSurplus}, {'colname':'level2', 'name':'Deficit', 'children':arrDeficit}]};

    const root = d3.hierarchy(newDATA).sum(d=>d[tradeX[tradex]]);

    d3.treemap().size([width_TMap, height_TMap]).paddingInner(4)(root);

    const color = d3.scaleOrdinal()
        .domain(['Deficit', 'Surplus'])
        .range(['red', 'green']);

    var gTMap1 = chartGroup_TMap.selectAll('rect').data(root.leaves())
    gTMap1
        .enter()
        .append('rect')
        .merge(gTMap1)
        .attr('x', d=>d.x0)
        .attr('y', d=>d.y0)
        .attr('width', d=>d.x1-d.x0)
        .attr('height', d=>d.y1-d.y0)
        .style('stroke', 'black')
        .style('fill', d=>(tradeX[tradex]=='Balance')?color(d.parent.data.name):'blue');

    gTMap1.exit().remove()

    var gTMap2 = chartGroup_TMap.selectAll('text').data(root.leaves())
    gTMap2
        .enter()
        .append('text')
        .merge(gTMap2)
        .text(d=>d.data.Country)
        .attr('x', d=>d.x0+7)
        .attr('y',d=>d.y0+20)
        .attr('font-size', '15px')
        .attr('fill', 'white');
    gTMap2.exit().remove()

    var gTMap3 = chartGroup_TMap.selectAll('trades').data(root.leaves())
    gTMap3
        .enter()
        .append('text')
        .merge(gTMap3)
        .text(d=>d.data.Total)
        .attr('x', d=>d.x0+7)
        .attr('y',d=>d.y0+35)
        .attr('font-size', '10px')
        .attr('fill', 'white');
    gTMap3.exit().remove()

}
// ===============================================================================================================

// ===== Line Chart ==========================================================================================
const svgHeight_Line = 700;
const svgWidth_Line = 900;
const svgMargin_Line = {
    top : 25,
    right : 25,
    bottom : 75,
    left : 75
}
const width_Line = svgWidth_Line - svgMargin_Line.left - svgMargin_Line.right;
const height_Line = svgHeight_Line - svgMargin_Line.top - svgMargin_Line.bottom;

const d3Select_Line = d3.select('#linechartx');
const svg_Line = d3Select_Line.append('svg')
    .attr('height', svgHeight_Line)
    .attr('width', svgWidth_Line);
var chartGroup_Line = svg_Line.append('g').attr('transform', `translate(${svgMargin_Line.left}, ${svgMargin_Line.top})`);

var xLinearScale_Line = d3.scaleLinear().range([0, width_Line]);
var yLinearScale_Line = d3.scaleLinear().range([height_Line, 0]);

var gButtomAxis_Line = chartGroup_Line.append('g').attr('transform', `translate(0,${height_Line})`);
var gLeftAxis_Line = chartGroup_Line.append('g');


var keys = ["Export", "Import", "Balance", "Total"];

var color = d3.scaleOrdinal()
    .domain(keys)
    .range(['red', 'green', 'blue', 'orange']);

chartGroup_Line.selectAll("mydots")
    .data(keys)
    .enter()
    .append("circle")
    .attr("cx", 35)
    .attr("cy", function(d,i){ return 35 + i*25})
    .attr("r", 7)
    .style("fill", function(d){ return color(d)})


chartGroup_Line.selectAll("mylabels")
    .data(keys)
    .enter()
    .append("text")
    .attr("x", 45)
    .attr("y", (d,i)=>35 + i*25)
    .attr('opacity', 0.5)
    .style("fill", d=>color(d))
    .text(d=>d)
    .attr("text-anchor", "left")
    .style("alignment-baseline", "middle")

chartGroup_Line.append("text")
    .attr("x", (width_Line / 2))
    .attr("y", height_Line+50)
    .attr("text-anchor", "middle")
    .style("font-size", "16px")
    .text("Year");

// chartGroup_Line.append("text")
//     .attr("x", svgMargin.left-250)
//     .attr("y", 0)
//     .attr("text-anchor", "middle")
//     .attr('transform', `rotate(-90)`)
//     .style("font-size", "16px")
//     .text("Import (Million Au$)");

var lineExp = chartGroup_Line
    .append('g')
    .append("path")
var lineImp = chartGroup_Line
    .append('g')
    .append("path")
var lineBal = chartGroup_Line
    .append('g')
    .append("path")
var lineTot = chartGroup_Line
    .append('g')
    .append("path")


function LineChart(DATA, tradex){

    xLinearScale_Line.domain([d3.min(DATA, d=>d.Year), d3.max(DATA, d=>d.Year)]);
    yLinearScale_Line.domain([d3.min(DATA, d=>d.Trade.Balance), d3.max(DATA, d=>d.Trade.Total)]);
    gButtomAxis_Line.call(d3.axisBottom(xLinearScale_Line));
    gLeftAxis_Line.call(d3.axisLeft(yLinearScale_Line));
    let expDATA = [];
    let impDATA = [];
    let balDATA = [];
    let totDATA = [];
    for(let i=0; i<DATA.length; i++){
        expDATA.push({time:DATA[i].Year, value:DATA[i].Trade.Export})
        impDATA.push({time:DATA[i].Year, value:DATA[i].Trade.Import})
        balDATA.push({time:DATA[i].Year, value:DATA[i].Trade.Balance})
        totDATA.push({time:DATA[i].Year, value:DATA[i].Trade.Total})
    }
    lineExp
        .datum(expDATA)
        .transition()
        .duration(1000)
        .attr("d", d3.line()
            .x(function(d) { return xLinearScale_Line(+d.time) })
            .y(function(d) { return yLinearScale_Line(+d.value) })
        )
        .attr("stroke", 'red')
        .attr("stroke-width", 4)
        .attr('fill', 'none')
        .attr('stroke-opacity', 0.5)
    lineImp
        .datum(impDATA)
        .transition()
        .duration(1000)
        .attr("d", d3.line()
            .x(function(d) { return xLinearScale_Line(+d.time) })
            .y(function(d) { return yLinearScale_Line(+d.value) })
        )
        .attr("stroke", 'green')
        .attr("stroke-width", 4)
        .attr('fill', 'none')
        .attr('stroke-opacity', 0.5)
    lineBal
        .datum(balDATA)
        .transition()
        .duration(1000)
        .attr("d", d3.line()
            .x(function(d) { return xLinearScale_Line(+d.time) })
            .y(function(d) { return yLinearScale_Line(+d.value) })
        )
        .attr("stroke", 'blue')
        .attr("stroke-width", 4)
        .attr('fill', 'none')
        .attr('stroke-opacity', 0.5)
    lineTot
        .datum(totDATA)
        .transition()
        .duration(1000)
        .attr("d", d3.line()
            .x(function(d) { return xLinearScale_Line(+d.time) })
            .y(function(d) { return yLinearScale_Line(+d.value) })
        )
        .attr("stroke", 'orange')
        .attr("stroke-width", 4)
        .attr('fill', 'none')
        .attr('stroke-opacity', 0.5)
}
// ===============================================================================================================


function optionChanged(svalue){
    DATA = dataFilter(svalue);
    bscatter(DATA);
    barchart(DATA,0);
    Treemap(DATA,0)
}

function countryChanged(svalue){
    const tempData = orgData;
    cDATA = [];
    for(let i=0; i<tempData.length; i++){
        cDATA.push({'Year':tempData[i].Year, 'Trade':tempData[i].Trade.find(({Country})=>Country==svalue)})
    }
    for(let i=0; i<cDATA.length; i++){
        delete cDATA[i].Trade.Country
    }
    LineChart(cDATA, 0)
}


d3.json('../data/aus_trade.json').then(data =>{
    orgData = data;
    init(orgData)
})