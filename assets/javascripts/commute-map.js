const projection = d3.geoAlbers()
  .scale(19000)
  .rotate([71.057, 0])
  .center([-0.55, 42.38])
  .translate([960 / 2, 500 / 2]);


function htmlValue(data) {
  return data.properties.municipal + '<br />' + 'Years: ' + data.properties.right_years + '<br /> Value: ' + data.properties.right_all_art
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
    .on("mouseover", (d) => {
        tooltip.transition()
        .duration(200)
        .style("opacity", .9);
        tooltip.html(htmlValue(d))
        .style("left", (d3.event.pageX) + "px")
        .style("top", (d3.event.pageY - 28) + "px");
      }) ;
}

d3.json('/assets/data/premature-mortality-3.geojson').then((data) => {
  console.log(data);
  createHeatmap(data);
})
