import * as legend from './legend.js'

const englishProjection = d3.geoAlbers()
    .scale(19000)
    .rotate([71.057, 0])
    .center([-0.55,42.38])
    .translate([960 / 2, 500 / 2])

function englishHtmlValue(data){
  if (data.properties.right_all_pa_p) {
    return '<p class="info-window__section"><span class="info-window__category">District</span><br />' 
    + data.properties.right_district
    + '</p> <p class="info-window__section"><span class="info-window__category">% Proficient or Higher</span><br />'
    + data.properties.right_all_pa_p
    + '</p> <p class="info-window__section"><span class="info-window__category">School Year</span><br />'
    + data.properties.right_schoolyear
    + '</p>'
  }
  else { 
    return '<p class="info-window__section"><span class="info-window__category">Municipality (no data)</span><br />' 
    + data.properties.town.slice(0,1) + data.properties.town.slice(1).toLowerCase()
    + '</p>' 
  }
}

function englishCreateHeatmap(data){
    const tooltip = d3.select("body").append("div")
                    .attr("class","tooltip")
                    .style("opacity",0)
    const colors = d3.scaleSequentialQuantile()
                    .interpolator(d3.interpolateRdPu)
                    .domain(data.features.map(feature => feature.properties.right_all_pa_p))
    const englishMap = d3.select('.english-mcas-map')
    const path = d3.geoPath().projection(englishProjection)
    englishMap.append('g')
            .attr('class','heatmap')
            .selectAll('path')
            .data(data.features)
            .enter()
            .append('path')
            .attr('fill', d => { return colors(d.properties.right_all_pa_p)})
            .attr('stroke','#ffffff')
            .attr('stroke-width','1')
            .attr('stroke-opacity', 0.6)
            .attr('d', path)
            .on("mousemove", (d) => {
                tooltip.transition()
                .duration(50)
                .style("opacity", .9);
                tooltip.html(englishHtmlValue(d))
                .style("left", (d3.event.pageX + 10) + "px")
                .style("top", (d3.event.pageY + 10) + "px");
                }) 
              .on("mouseleave", d => {
                tooltip.transition()
                .duration(200)
                .style("opacity",0)
              })
}

function createBasemap(data) {
  const tooltip = d3.select("body").append("div")
                 .attr("class", "tooltip")
                 .style("opacity", 0);

  const baseMap = d3.select('.english-mcas-map');
  const path = d3.geoPath().projection(englishProjection);
  baseMap.append('g')
    .attr('class', 'heatmap')
    .selectAll('path')
    .data(data.features)
    .enter()
    .append('path')
    .attr('fill', '#d9d9d9')
    .attr('stroke', '#ffffff')
    .attr('stroke-width', '1')
    .attr('stroke-opacity', 0.6)
    .attr('d', path)
    .on("mousemove", (d) => {
      tooltip.transition()
      .duration(50)
      .style("opacity", .9);
      tooltip.html(englishHtmlValue(d))
      .style("left", (d3.event.pageX + 10) + "px")
      .style("top", (d3.event.pageY + 10) + "px");
    })
    .on("mouseleave", d => {
      tooltip.transition()
      .duration(200)
      .style("opacity",0)
    })
    
}

Promise.all([
  d3.json('/assets/data/base-map.json'),
  d3.json('/assets/data/3rd-grade-english-mcas.json')
]).then (data => {
  createBasemap(data[0])
  englishCreateHeatmap(data[1])
  legend.addLegend(data[1], "right_all_pa_p", "3rd Grade English MCAS Scores", "% Proficient or Higher")
})