// var svgWidth = 960;
var svgWidth = 800;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 60,
  bottom: 60,
  // left: 100
  left: 80
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
// var svg = d3.select(".chart")
var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);
console.log(svg);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Initial data - based on selected xaxis values
var chosenXaxis = "income"
var chosenYaxis = "smokes"
// added this line of code
var chosenXmin = xMin1
var chosenXmax = xMax1

var chosenYmin = yMin1
var chosenYmax = yMax1

// function for selecting xaxis scale based on chosenXaxis data
function xScale(healthData, chosenXaxis) {
  // create scales 
  var xLinearScale = d3.scaleLinear()
    .domain([d3.min(healthData, record => record[chosenXaxis]) * 0.8,
      d3.max(healthData, record => record[chosenXaxis]) * 1.2
    ])
    // .range([0, width])
    .range([chosenXmin, width])
  return xLinearScale;
}

function yScale(healthData, chosenYaxis) {
  // create scales 
  var yLinearScale = d3.scaleLinear()
    .domain([d3.min(healthData, record => record[chosenYaxis]) * 0.8,
      d3.max(healthData, record => record[chosenYaxis]) * 1.2
    ])
    // .range([0, width])
    .range([chosenYmin, height])
  return yLinearScale;
}

// function used for updating xAxis var upon click on axis label
function renderXaxis(newXscale, xAxis) {
  var bottomAxis = d3.axisBottom(newXscale);
  xAxis.transition()
    .duration(1000)
    .call(bottomAxis);
  return xAxis;
}

// function used for updating yAxis var upon click on axis label
function renderYaxis(newYscale, yAxis) {
  var leftAxis = d3.axisLeft(newYscale);
  yAxis.transition()
    .duration(1000)
    .call(leftAxis);
  return yAxis;
}

// function used for updating circles group with new tooltip
function updateToolTip(chosenXaxis, circlesGroup) {
  var label;
  if (chosenXaxis === "income") {
    label = "Income:";
  }
  else {
    label = "Age:";
  }

  var toolTip = d3.tip()
  .attr("class", ".d3-tip")
    // .offset([80, -60])
    // .attr ("text", "center")
    .style("font", "14px arial")
    .style("font", "bold")
    .style("border", "2px solid purple")
    .style("border-radius", "5px")
    .style("text-align", "center")
    // .style("background-color", "#6F257F")
    .style("background-color", "lavender")
    .html(function(record) {
      return (`${record.state}<br>${label} ${d[chosenXaxis]}`);
    });

  circlesGroup.call(toolTip);

  circlesGroup.on("click", function(record) {
    toolTip.show(record);
  })
    // onmouseout event
    .on("mouseout", function(record, index) {
      toolTip.hide(record);
    });
  return circlesGroup;
}

// Import Data and execute functions
d3.csv("assets/data/data.csv").then(function(healthData) {

    // Parse Data/Cast as numbers. I selected smoking as a function of income 
    healthData.forEach(function(record) {
      record.income = +record.income;
      record.smokes = +record.smokes;
      record.age = +record.age;
      record.poverty = +record.poverty;
    });

  // define variables for chart limits based on data needs. 
  var xMin1 = d3.min(healthData, record => record.income - 2000)
  var xMax1 = d3.max(healthData, record => record.income + 2000)

  var xMin2 = d3.min(healthData, record => record.age - 1)
  var xMax2 = d3.max(healthData, record => record.age + 1)


  var yMin1 = d3.min(healthData, record => record.smokes - 2)
  var yMax1 = d3.max(healthData, record => record.smokes + 2)

  var yMin2 = d3.min(healthData, record => record.poverty - 2)
  var yMax2 = d3.max(healthData, record => record.poverty + 2)

  // console.log(xMax);
  // console.log(yMin);


    // Create scale functions
    // var xLinearScale = d3.scaleLinear()
    //   .domain([20, d3.max(healthData, record => record.income)])
    //   .range([0, width]);

    // var yLinearScale = d3.scaleLinear()
    //   .domain([0, d3.max(healthData, record => record.smokes)])
    //   .range([height, 0]);


    // Create scale functions for axis length; try zero to start
    // xAxis - income
    // var xLinearScale = d3.scaleLinear()
    var xLinearScale = xScale(healthData, chosenXaxis)
    
    // check out the inversion of the yaxis range here. may need to change
    // var yLinearScale = d3.scaleLinear()
    //   .domain([0, d3.max(healthData, record => record.smokers)])
    //   .range([height, yMin1]);
    
      // xAxis - income
    var xLinearScale = d3.scaleLinear()
    .domain([xMin1, xMax1])
    .range([0, width]);

    // yAxis - smokes
    var yLinearScale = d3.scaleLinear()
    .domain([yMin1, yMax1])
    .range([0, height]); 


      
    // Create initial axis functions:

    // yAxis - smokes
    // var yLinearScale = d3.scaleLinear()
    // .domain([yMin, yMax])
    // .range([0, height]); 

    // Create axis functions
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    // Append Axes to the chart
    // chartGroup.append("g")
    var xAxis = chartGroup.append("g")
      .classed("x-axis", true)
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis);

    chartGroup.append("g")
      .call(leftAxis);

    // Create initial circles and append to chart
    var circlesGroup = chartGroup.selectAll("circle")
    .data(healthData)
    .enter()
    .append("circle")
    .attr("cx", record => xLinearScale(record.income))
    .attr("cy", record => yLinearScale(record.smokes))
    .attr("r", "15")
    .attr("fill", "seagreen")
    .attr("opacity", ".5");

    // create group for two x-axis labels
    var labelsGroup = chartGroup.append("g")
    // .attr("transform", `translate(${width / 2}, ${height + 20})`);
    .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)

    var incomeLabel = labelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 0 - margin.left + 20)
    .attr("value", "income") // value to grab for event listener
    .classed("active", true)
    .text("Income (USD)");

  var ageLabel = labelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 40)
    .attr("value", "num_albums") // value to grab for event listener
    .classed("inactive", true)
    .text("# of Albums Released");

    .attr("y", 0 - margin.left + 20)
    .attr("x", 0 - (height / 2))





    var incomeLabel = chartGroup.append("text")
    .attr("class", "aText")
    .text("Income (USD");

    var ageLabel = 

    

    // Initialize tool tip
    // .d3-tip
    // var toolTip = d3.tip()
    var toolTip = d3.tip()
    .attr("class", ".d3-tip")
      // .offset([80, -60])
      // .attr ("text", "center")
      .style("font", "14px arial")
      .style("font", "bold")
      .style("border", "2px solid purple")
      .style("border-radius", "5px")
      .style("text-align", "center")
      // .style("background-color", "#6F257F")
      .style("background-color", "lavender")
      .html(function(record) {
        return (`${record.state}<br>% Who Smoke: ${record.smokes}<br>Income (USD): ${record.income}`);
      });

    // Create tooltip in the chart
    // ==============================
    chartGroup.call(toolTip);

    // Create event listeners to display and hide the tooltip
    // ==============================
    circlesGroup.on("click", function(record) {
      toolTip.show(record, this);
    })
      // onmouseout event
      .on("mouseout", function(record, index) {
        toolTip.hide(record);
      });

    // Create axes labels
    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      // .attr("y", 0 - margin.left + 40)
      .attr("y", 0 - margin.left + 20)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .attr("class", "aText")
      .text("% Who Smoke");

    chartGroup.append("text")
      .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
      .attr("class", "aText")
      .text("Income (USD");

  }).catch(function(error) {
    console.log(error);
  });
