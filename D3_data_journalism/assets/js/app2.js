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

// Import Data
d3.csv("assets/data/data.csv").then(function(healthData) {


    // Parse Data/Cast as numbers. I selected smoking as a function of income 
    healthData.forEach(function(record) {
      record.income = +record.income;
      record.smokes = +record.smokes;
      record.abbr = record.abbr;
      // console.log(record.abbr)
    });


  // define variables for chart limits based on data needs. 
  var xMin = d3.min(healthData, record => record.income - 2000)
  var xMax = d3.max(healthData, record => record.income + 2000)
  var yMin = d3.min(healthData, record => record.smokes - 2)
  var yMax = d3.max(healthData, record => record.smokes + 2)

  console.log(xMax);
  console.log(yMin);


    // Create scale functions
    // var xLinearScale = d3.scaleLinear()
    //   .domain([20, d3.max(healthData, record => record.income)])
    //   .range([0, width]);

    // var yLinearScale = d3.scaleLinear()
    //   .domain([0, d3.max(healthData, record => record.smokes)])
    //   .range([height, 0]);


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

    // Append Axes to the chart
    chartGroup.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis);

    chartGroup.append("g")
      .call(leftAxis);

    // Create Circles and append to chart
    // var circlesGroup = chartGroup.selectAll("circle")
    // .data(healthData)
    // .enter()
    // .append("circle")
    // .attr("cx", record => xLinearScale(record.income))
    // .attr("cy", record => yLinearScale(record.smokes))
    // .attr("r", "15")
    // .attr("fill", "seagreen")
    // .attr("opacity", ".5");

    // var circlesGroup = chartGroup.selectAll("circle").data(healthData).enter();
    //  append circle markers to circles group 
    var circlesGroup = chartGroup.selectAll("circle");
    circlesGroup
    .data(healthData)
    .enter()
    .append("circle")
    .attr("cx", record => xLinearScale(record.income))
    .attr("cy", record => yLinearScale(record.smokes))
    .attr("r", "15")
    .attr("fill", "seagreen")
    .attr("opacity", ".5");

    // add circle labels 
    chartGroup
    .select("g")
    .selectAll("circle")
    .data(healthData)
    .enter()
    .append("text")
    .text(function(record) {return (record.abbr);
    })
    // .text(healthData, record => record.abbr)
    .attr("cx", record => xLinearScale(record.income))
    .attr("cy", record => yLinearScale(record.smokes))
    .attr("text-anchor", "middle")
    .attr("font-family", "sans-serif")
    .attr("font-size", "10px")
    .attr("font-color", "black")
    .attr("class", "stateText")
    .attr("class", "stateCircle")
    // .attr("dy",-395)
    ;

// console.log(healthData)
    // // var circleLabels = chartGroup.selectAll("circle")
    // var circleLabels = chartGroup.selectAll("circle")
    // // .data(healthData)
    // .enter()
    // .append("text")
    // .attr("cx", record => xLinearScale(record.income))
    // .attr("cy", record => yLinearScale(record.smokes))
    // .attr("font-family", "sans-serif")
    // .attr("font-size", "5px")
    // .attr("fill", "white")
    // .html(function(record) {return (`${record.abbr}`)
    //   });
    // .text(function(record) {return (`${record.abbr}`)
    // });
  // console.log(circleLabels)
    
    // circleLabels
    //   .attr("x", function(record) { return record.income; })
    //   .attr("y", function(record) { return record.smokes; })
    //   .text(function(record) { return record.abbr; })
    //   .attr("font-family", "sans-serif")
    //   .attr("font-size", "5px")
    //   .attr("fill", "white");

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

    


    
    // var toolTip = d3.tip()
    // .attr("class", ".d3-tip")
    //   // .offset([80, -60])
    //   // .attr ("text", "center")
    //   .style("font", "14px arial")
    //   .style("font", "bold")
    //   .style("border", "2px solid purple")
    //   .style("border-radius", "5px")
    //   .style("text-align", "center")
    //   // .style("background-color", "#6F257F")
    //   .style("background-color", "lavender")
    //   .html(function(record) {
    //     return (`${record.state}<br>% Who Smoke: ${record.smokes}<br>Income (USD): ${record.income}`);
    //   });


    // // Create tooltip in the chart
    // // ==============================
    // chartGroup.call(toolTip);

    // // Create event listeners to display and hide the tooltip
    // // ==============================
    // circlesGroup.on("click", function(record) {
    //   toolTip.show(record, this);
    // })
    //   // onmouseout event
    //   .on("mouseout", function(record, index) {
    //     toolTip.hide(record);
    //   });

    // // Create axes labels
    // chartGroup.append("text")
    //   .attr("transform", "rotate(-90)")
    //   // .attr("y", 0 - margin.left + 40)
    //   .attr("y", 0 - margin.left + 20)
    //   .attr("x", 0 - (height / 2))
    //   .attr("dy", "1em")
    //   .attr("class", "aText")
    //   .text("% Who Smoke");

    // chartGroup.append("text")
    //   .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
    //   .attr("class", "aText")
    //   .text("Income (USD");
    
  // })
  // }).catch(function(error) {
  //   console.log(error);
  });
