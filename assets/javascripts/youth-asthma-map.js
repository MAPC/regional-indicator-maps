import * as legend from './legend.js'

const asthmaProjection = d3.geoAlbers()
.scale(45000)
.rotate([71.057, 0])
.center([-.1, 42.45])
.translate([960 / 2, 500 / 2]);

function asthmaHtmlValue(data) {

    if (data.properties.right_yasth_arte) {
      return '<p class="info-window__section"><span class="info-window__category">Municipality</span><br />' 
      + data.properties.municipal
      + '</p> <p class="info-window__section"><span class="info-window__category">Age-adjusted rate per 100,000</span><br />'
      + data.properties.right_yasth_arte
      + '</p> <p class="info-window__section"><span class="info-window__category">Year</span><br />'
      + data.properties.right_cal_years
      + '</p>'
    }
    else { 
      return '<p class="info-window__section"><span class="info-window__category">Municipality (no data)</span><br />' 
    + data.properties.town.slice(0,1) + data.properties.town.slice(1).toLowerCase()
    + '</p>' 
  }
}

function asthmaCreateHeatmap(data) {
  const tooltip = d3.select("body").append("div")
                   .attr("class", "tooltip")
                   .style("opacity", 0);
                  
  const colors = d3.scaleSequentialQuantile([50.6,495])
      .interpolator(d3.interpolateRdPu)
      .domain(data.features.map(feature => (feature.properties.right_yasth_arte)));
  const youthAsthma = d3.select('.youth-asthma-map');
  const path = d3.geoPath().projection(asthmaProjection);
 youthAsthma.append('g')
    .attr('class', 'heatmap')
    .selectAll('path')
    .data(data.features)
    .enter()
    .append('path')
    .attr('fill', d => colors(d.properties.right_yasth_arte))
    .attr('stroke', '#ffffff')
    .attr('stroke-width', '1')
    .attr('stroke-opacity', 0.6)
    .attr('d', path)
    .on("mousemove", (d) => {
      tooltip.transition()
      .duration(50)
      .style("opacity", .9);
      tooltip.html(asthmaHtmlValue(d))
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
  const baseMap = d3.select('.youth-asthma-map');
  const path = d3.geoPath().projection(asthmaProjection);
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
        tooltip.html(asthmaHtmlValue(d))
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
  d3.json('/assets/data/youth-asthma-hosp.json')
]).then(data => {
  createBasemap(data[0]);
  asthmaCreateHeatmap(data[1])
  legend.addLegend(data[1], "right_yasth_arte", "Youth Asthma Hospitalization Rate", "Age-Adjusted Rate per 100,000")
})