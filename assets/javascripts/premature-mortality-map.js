import * as legend from './legend.js'

const projection = d3.geoAlbers()
  .scale(17500)
  .rotate([71.057, 0])
  .center([-0.35,42.1])
  .translate([960 / 2, 500 / 2])

function htmlValue(data) {
  return '<p class="info-window__section"><span class="info-window__category">Municipality</span><br />' 
    + data.properties.municipal
    + '</p> <p class="info-window__section"><span class="info-window__category">Age-adjusted rate per 100,000</span><br />'
    + data.properties.right_all_art
    + '</p> <p class="info-window__section"><span class="info-window__category">Years</span><br />'
    + data.properties.right_years
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
      .interpolator(d3.interpolateRdPu)
      .domain(data.features.map(feature => (feature.properties.right_all_art)));
  const prematureMortalityMap = d3.select('.premature-mortality-map');
  const path = d3.geoPath().projection(projection);
  prematureMortalityMap.append('g')
    .attr('class', 'heatmap')
    .selectAll('path')
    .data(data.features)
    .enter()
    .append('path')
    .attr('fill', d => colors(d.properties.right_all_art))
    .attr('stroke', '#ffffff')
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

d3.json('/regional-indicator-maps/assets/data/premature-mortality.json').then((data) => {
  createHeatmap(data);
  legend.addLegend(data, "right_all_art", "Age-Adjusted rate per 100,000")
})
