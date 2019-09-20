import * as legend from './legend.js'

const projection = d3.geoAlbers()
  .scale(19000)
  .rotate([71.057, 0])
  .center([-0.50,42.15])
  .translate([960 / 2, 500 / 2]);


function htmlValue(data) {
  return '<p class="info-window__section"><span class="info-window__category">Municipality</span><br />' 
    + data.properties.municipal
    + '</p> <p class="info-window__section"><span class="info-window__category">Age-adjusted rate per 100,000</span><br />'
    + data.properties.right_all_art
    + '</p> <p class="info-window__section"><span class="info-window__category">Years</span><br />'
    + data.properties.right_years
    + '</p>'
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
        .style("left", (d3.event.pageX + 10) + "px")
        .style("top", (d3.event.pageY + 10) + "px");
      })
      .on("mouseleave", d => {
        tooltip.transition()
        .duration(200)
        .style("opacity",0)
      })
}

d3.json('/regional-indicator-maps/assets/data/premature-mortality.json').then((data) => {
  createHeatmap(data);
  legend.addLegend(data, "right_all_art", "Premature Mortality", "Age-Adjusted rate per 100,000")
})
