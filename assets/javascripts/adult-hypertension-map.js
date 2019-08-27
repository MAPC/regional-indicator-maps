const hypertensionProjection = d3.geoAlbers()
  .scale(18000)
  .rotate([71.057, 0])
  .center([-0.55, 42.38])
  .translate([960 / 2, 500 / 2]);


function hypertensionHtmlValue(data) {
  const windowWithData = '<p class="info-window__section"><span class="info-window__category">Municipality</span><br />' 
  + data.properties.municipal 
  + '</p> <p class="info-window__section"><span class="info-window__category">Year</span><br />'
  + data.properties.right_cal_years
  + '</p> <p class="info-window__section"><span class="info-window__category">Age-adjusted rate per 100,000</span><br />'
  + data.properties.right_hyp_arte
  + '</p>'

  const windowWithoutData = '<p class="info-window__section"><span class="info-window__category">Municipality (no data)</span><br />' 
  + data.properties.municipal 

    if (data.properties.right_hyp_arte) { return windowWithData }
    else { return windowWithoutData }
}
function hypertensionCreateHeatmap(data) {

  const tooltip = d3.select("body").append("div")
                   .attr("class", "tooltip")
                   .style("opacity", 0);
  const colors = d3.scaleSequentialQuantile()
      .interpolator(d3.interpolateRdPu)
      .domain(data.features.map(feature => (feature.properties.right_hyp_arte)));
  const prematureMortalityMap = d3.select('.adult-hypertension-map');
  const path = d3.geoPath().projection(hypertensionProjection);
  prematureMortalityMap.append('g')
    .attr('class', 'heatmap')
    .selectAll('path')
    .data(data.features)
    .enter()
    .append('path')
    .attr('fill', d => {
      if (!d.properties.right_hyp_arte) { return '#d9d9d9' }
      else { return colors(d.properties.right_hyp_arte) }})
    .attr('stroke', '#ffffff')
    .attr('stroke-width', '1')
    .attr('stroke-opacity', 0.6)
    .attr('d', path)
    .on("mouseover", (d) => {
        tooltip.transition()
        .duration(200)
        .style("opacity", .9);
        tooltip.html(hypertensionHtmlValue(d))
        .style("left", (d3.event.pageX) + "px")
        .style("top", (d3.event.pageY - 28) + "px");
      }) ;
}

d3.json('/assets/data/hypertension-hospitalization-rate.geojson').then((data) => {
  console.log(data);
  hypertensionCreateHeatmap(data);
})
