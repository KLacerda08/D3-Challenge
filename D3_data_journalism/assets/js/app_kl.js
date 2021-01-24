//set up svg layout. first get attribute widths of the container housing the scatter id:
// note that the container width changes with window size. May need to resize chart and 
// bubble radius in the media query   
var elWidth = document.getElementById("scatter").clientWidth;
var elHeight = document.getElementById("scatter").clientHeight;

console.log (elWidth);
console.log(elHeight); 
// width is 510 px.  Height is zero. Does that mean not specified / any height works? 

var svgWidth = elWidth;
var svgHeight = 350;

// var svgWidth = 960;
// var svgHeight = 500;

// add chart margins
var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100
};

// var margin = {
//   top: 50,
//   right: 50,
//   bottom: 50,
//   left: 0
// };

//testing this out without margins first 
// var width = svgWidth;
// var height = svgHeight;

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group to hold the chart,
var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", width)
  .attr("height", height);
console.log(svg);

// shift the chart location on the page by left and top margins.
// var chartGroup = svg.append("g")
//   .attr("transform", `translate(${margin.left}, ${margin.top})`);

var chartGroup = svg.append("g")

// Import Data
d3.csv("assets/data/data.csv").then(function(healthData) {
    console.log("data is here");


    // Get data and parse (cast as numbers) for plotting. I will use smokes vs. income
    healthData.forEach(function(record) {
        record.smokes = +record.smokes;
        record.income = +record.income;
      });
    
    // define variables for chart limits based on data needs. 
    var xMin = d3.min(healthData, r => r.income - 2000)
    var xMax = d3.max(healthData, r => r.income + 2000)
    var yMin = d3.min(healthData, r => r.smokes - 2)
    var yMax = d3.max(healthData, r => r.smokes + 2)

    console.log(xMax);
    console.log(yMin);
    // Create scale functions for axis length; try zero to start
    // xAxis - income
    var xLinearScale = d3.scaleLinear()
    .domain([xMin, xMax])
    .range([0, width]);

    // yAxis - smokes
    var yLinearScale = d3.scaleLinear()
    .domain([yMin, yMax])
    .range([0, height]); 

    // Create axis functions
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    // Append Axes to the chart; shift location of axis down page by height based on data 
    chartGroup.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis);
    
    chartGroup.append("g")
      .call(leftAxis);
    
    // console.log(chartGroup);

    // create circle markers
    var circlesGroup = chartGroup.selectAll("circle")
    // var circlesGroup = chartGroup.selectAll(".stateCircle")
    .data(healthData)
    .enter()
    .append("circle")
    // .append("state.Circle")
    //assitn center of circle x,y values
    .attr("cx", r => xLinearScale(r.income))
    .attr("cy", r => yLinearScale(r.smokes))
    //assign circle radius, color, opacity
    .attr("r", "15")
    .attr("fill", "seagreen")
    .attr("opacity", ".5");

    // Create axes labels
      chartGroup
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left + 40)
      .attr("x", 0 - (height / 2))
      .attr("y")
      .attr("x")
      .attr("dy", "1em")
      .attr("class", "aText")
      .text("Percentage Who Smoke");    

      chartGroup.append("text")
      .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
      .attr("class", "aText")
      .text("Income (USD)");

      // Create axes labels
      console.log(chartGroup)
      console.log(d3)
      //chartGroup
      // .append("text")
      // .attr("transform", "rotate(-90)")
      // // .attr("y", 0 - margin.left + 40)
      // // .attr("x", 0 - (height / 2))
      // .attr("y")
      // .attr("x")
      // .attr("dy", "1em")
      // .attr("class", "axisText")
      // .text("Number of Billboard 100 Hits");    




});
