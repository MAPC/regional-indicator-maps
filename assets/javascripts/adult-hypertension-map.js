import * as legend from './legend.js'

const hypertensionProjection = d3.geoAlbers()
  .scale(17500)
  .rotate([71.057, 0])
  .center([-0.35,42.1])
  .translate([960 / 2, 500 / 2])


function hypertensionHtmlValue(data) {
  if (data.properties.right_hyp_arte) {
    return '<p class="info-window__section"><span class="info-window__category">Municipality</span><br />' 
    + data.properties.municipal 
    + '</p> <p class="info-window__section"><span class="info-window__category">Year</span><br />'
    + data.properties.right_cal_years
    + '</p> <p class="info-window__section"><span class="info-window__category">Age-adjusted rate per 100,000</span><br />'
    + data.properties.right_hyp_arte
    + '</p>'
  }
  else {
    return '<p class="info-window__section"><span class="info-window__category">Municipality (no data)</span><br />' 
    + data.properties.municipal
  }
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
    .on("mousemove", (d) => {
        tooltip.transition()
        .duration(50)
        .style("opacity", .9);
        tooltip.html(hypertensionHtmlValue(d))
        .style("left", tooltipLeft(d3.event, document.getElementsByClassName('tooltip')[0]))
        .style("top", tooltipTop(d3.event,  document.getElementsByClassName('tooltip')[0]))
      })
    .on("mouseleave", d => {
      tooltip.transition()
      .duration(200)
      .style("opacity",0)
    })
}

d3.json('/regional-indicator-maps/assets/data/hypertension-hospitalization-rate.json').then((data) => {
  hypertensionCreateHeatmap(data);
  legend.addLegend(data, "right_hyp_arte", "Age-Adjusted Rate per 100,000")
})
