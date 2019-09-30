const projection = d3.geoAlbers()
.scale(17500)
.rotate([71.057, 0])
.center([-0.35,42.1])
.translate([960 / 2, 500 / 2])

function htmlValue(data) {
  return '<p class="info-window__section"><span class="info-window__category">Municipality</span><br />' 
  + data.properties.town + '<br />'
  + '</p> <p class="info-window__section"><span class="info-window__category">Mean Travel Time in Minutes</span><br />'
  + data.properties.avgtt
  + '</p>'
}

function tooltipLeft(event, tooltip){
  if (event.pageX > 410) {
    return event.pageX - tooltip.offsetWidth - 10 + "px"
  } else {
    return event.pageX + 10 + "px"
  }
}

function tooltipTop(event, tooltip){
  if (event.pageY > 260) {
    return event.pageY - tooltip.offsetHeight - 10 + "px"
  } else {
    return event.pageY + 10 + "px"
  }
}

function createHeatmap(data) {
  const tooltip = d3.select("body").append("div")
                   .attr("class", "tooltip")
                   .style("opacity", 0);
  const colors = d3.scaleSequentialQuantile()
      .interpolator(d3.interpolateYlOrRd)
      .domain(data.features.map(feature => (feature.properties.avgtt)));
  const commuteMap = d3.select('.commute-map');
  const path = d3.geoPath().projection(projection);
  commuteMap.append('g')
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
        .style("left", tooltipLeft(d3.event, document.getElementsByClassName('tooltip')[0]))
        .style("top", tooltipTop(d3.event,  document.getElementsByClassName('tooltip')[0]))
      })
    .on("mouseleave", d => {
        tooltip.transition()
        .duration(200)
        .style("opacity",0)
      })
}

function addLegend(data){
  var w = 345, h = 70;
  var key = d3.select(".legend")
  .append("svg")
  .attr("width", w)
  .attr("height", h)

  key.append("rect")
  .attr('width', 70)
  .attr("height", 15)
  .attr("transform", "translate(0,50)")
  .attr("fill", "#FFFFB2")

  key.append("rect")
  .attr('width', 70)
  .attr("height", 15)
  .attr("transform", "translate(70,50)")
  .attr("fill", "#FECC5C")

  key.append("rect")
  .attr('width', 70)
  .attr("height", 15)
  .attr("transform", "translate(140,50)")
  .attr("fill", "#FD8D3C")

  key.append("rect")
  .attr('width', 70)
  .attr("height", 15)
  .attr("transform", "translate(210,50)")
  .attr("fill", "#F03B20")

  key.append("rect")
  .attr('width', 70)
  .attr("height", 15)
  .attr("transform", "translate(280,50)")
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
  .attr("class", "legend-subtitle")
  .attr("transform", "translate(5,5)")
  .attr("y", 0)
  .attr("x", -5)
  .attr("dy", ".71em")
  .style("text-anchor", "start")
  .text("2010-2014 Average");

  key.append("g")
  .append("text")
  .attr("class", "legend-data")
  .text("10")
  .attr("transform", "translate(0,40)")
  
  key.append("g")
  .append("text")
  .attr("class", "legend-data")
  .text("40 minutes")
  .attr("transform", "translate(270,40)")
}


d3.json('/regional-indicator-maps/assets/data/commute-times.json').then((data) => {
  createHeatmap(data);
  addLegend(data)
})