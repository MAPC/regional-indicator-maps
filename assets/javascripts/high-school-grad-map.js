import * as legend from './legend.js'

const highSchoolProjection = d3.geoAlbers()
    .scale(17500)
    .rotate([71.057, 0])
    .center([-0.35,42.1])
    .translate([960 / 2, 500 / 2])

function highSchoolHtmlValue(data){
    if (data.properties.right_all_grad_p) { 
      return '<p class="info-window__section"><span class="info-window__category">District</span><br />' 
      + data.properties.right_district
      + '</p> <p class="info-window__section"><span class="info-window__category">4-Year High School Graduation Rate</span><br />'
      + data.properties.right_all_grad_p
      + '</p> <p class="info-window__section"><span class="info-window__category">School Year</span><br />'
      + data.properties.right_schoolyear
      + '</p>'
    }
    else { 
      return '<p class="info-window__section"><span class="info-window__category">Municipality (no data)</span><br />' 
    + data.properties.town
    + '</p>' 
  }
}

function highSchoolCreateHeatmap(data){
    const tooltip = d3.select("body").append("div")
                    .attr("class","tooltip")
                    .style("opacity",0)
    const colors = d3.scaleSequentialQuantile()
                    .interpolator(d3.interpolateRdPu)
                    .domain(data.features.map(feature => feature.properties.right_all_grad_p))
    const highSchoolhMap = d3.select('.high-school-grad-map')
    const path = d3.geoPath().projection(highSchoolProjection)
    highSchoolhMap.append('g')
            .attr('class','heatmap')
            .selectAll('path')
            .data(data.features)
            .enter()
            .append('path')
            .attr('fill', d => { return colors(d.properties.right_all_grad_p)})
            .attr('stroke','#ffffff')
            .attr('stroke-width','1')
            .attr('stroke-opacity', 0.6)
            .attr('d', path)
            .on("mousemove", d => {
                tooltip.transition()
                .duration(50)
                .style("opacity",.9)
                tooltip.html(highSchoolHtmlValue(d))
                .style("left", tooltipLeft(d3.event, document.getElementsByClassName('tooltip')[1]))
                .style("top", tooltipTop(d3.event,  document.getElementsByClassName('tooltip')[1]))
            })
            .on("mouseleave", d => {
                tooltip.transition()
                .duration(200)
                .style("opacity",0)
            })
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

function createBasemap(data) {
    const tooltip = d3.select("body").append("div")
                   .attr("class", "tooltip")
                   .style("opacity", 0);

    const baseMap = d3.select('.high-school-grad-map');
    const path = d3.geoPath().projection(highSchoolProjection);
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
        tooltip.html(highSchoolHtmlValue(d))
          .style("left", tooltipLeft(d3.event, document.getElementsByClassName('tooltip')[0]))
          .style("top", tooltipTop(d3.event,  document.getElementsByClassName('tooltip')[0]))
      })
      .on("mouseleave", d => {
        tooltip.transition()
        .duration(200)
        .style("opacity",0)
      })
      
  }

Promise.all([
  d3.json('/regional-indicator-maps/assets/data/base-map.json'),
  d3.json('/regional-indicator-maps/assets/data/Graduation_Rates_by_Districts.json')
]).then(data => {
  createBasemap(data[0])
  highSchoolCreateHeatmap(data[1])
  legend.addLegend(data[1], "right_all_grad_p", "% 4-Year High School Graduation")
})