const projection = d3.geoAlbers()
.scale(19000)
.rotate([71.057, 0])
.center([-0.50,42.15])
.translate([960 / 2, 500 / 2]);

function htmlValue(data) {
  return '<p class="info-window__section"><span class="info-window__category">Municipality</span><br />' 
  + data.properties.town + '<br />'
  + '</p> <p class="info-window__section"><span class="info-window__category">Mean Travel Time in Minutes</span><br />'
  + data.properties.avgtt
  + '</p>'
}

function createHeatmap(data) {
  const tooltip = d3.select("body").append("div")
                   .attr("class", "tooltip")
                   .style("opacity", 0);
  const colors = d3.scaleSequentialQuantile()
      .interpolator(d3.interpolateYlOrRd)
      .domain(data.features.map(feature => (feature.properties.avgtt)));
  const prematureMortalityMap = d3.select('.commute-map');
  const path = d3.geoPath().projection(projection);
  prematureMortalityMap.append('g')
    .attr('class', 'heatmap')
    .style("border","1px solid red")
    .selectAll('path')
    .data(data.features)
    .enter()
    .append('path')
    .attr('fill', d => {
      if (!d.properties.avgtt) { return '#d9d9d9' }
      else { return colors(d.properties.avgtt) }})
    .attr('stroke', '#000000')
    .attr('stroke-width', '1')
    .attr('stroke-opacity', 0.6)
    .attr('d', path)
    .on("mousemove", (d) => {
        tooltip.transition()
        .duration(50)
        .style("opacity", .9);
        tooltip.html(htmlValue(d))
        .style("left", (d3.event.pageX + 10) + "px")
        .style("top", (d3.event.pageY + 10) + "px");
      })
    .on("mouseleave", d => {
        tooltip.transition()
        .duration(200)
        .style("opacity",0)
      })
}

function addLegend(data){
  var w = 350, h = 100;
  var key = d3.select(".legend")
  .append("svg")
  .attr("width", w)
  .attr("height", h)

  key.append("rect")
  .attr('width', 70)
  .attr("height", h  - 50)
  .attr("transform", "translate(0,75)")
  .attr("fill", "#FFFFB2")

  key.append("rect")
  .attr('width', 70)
  .attr("height", h  - 50)
  .attr("transform", "translate(70,75)")
  .attr("fill", "#FECC5C")

  key.append("rect")
  .attr('width', 70)
  .attr("height", h  - 50)
  .attr("transform", "translate(140,75)")
  .attr("fill", "#FD8D3C")

  key.append("rect")
  .attr('width', 70)
  .attr("height", h  - 50)
  .attr("transform", "translate(210,75)")
  .attr("fill", "#F03B20")

  key.append("rect")
  .attr('width', 70)
  .attr("height", h  - 50)
  .attr("transform", "translate(280,75)")
  .attr("fill", "#BD0026")

  var y = d3.scaleLinear()
  .range([300, 0])
  .domain([40,10]);

  var yAxis = d3.axisTop()
  .scale(y)
  .ticks()
      
  key.append("g")
  .attr("class", "y-axis")
  .attr('width', 300)
  .attr("height", h  - 50)
  .attr("transform", "translate(0,75)")

  key.append("text")
  .attr("class", "legend-title")
  .attr("transform", "translate(5,5)")
  .attr("y", 0)
  .attr("x", -5)
  .attr("dy", ".71em")
  .style("text-anchor", "start")
  .text("Mean Travel Time to Work from Home");

  key.append("text")
  .attr("class", "legend-subtitle")
  .attr("transform", "translate(5,35)")
  .attr("y", 0)
  .attr("x", -5)
  .attr("dy", ".71em")
  .style("text-anchor", "start")
  .text("(2010-2014 AVG)");

  key.append("g")
  .append("text")
  .attr("class", "legend-data")
  .text("10")
  .attr("transform", "translate(0,60)")
  
  key.append("g")
  .append("text")
  .attr("class", "legend-data")
  .text("40 minutes")
  .attr("transform", "translate(275,60)")
}


d3.json('/regional-indicator-maps/assets/data/commute-times.json').then((data) => {
  createHeatmap(data);
  addLegend(data)
})