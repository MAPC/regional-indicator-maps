const asthmaProjection = d3.geoAlbers()
  .scale(50000)
  .rotate([71.057, 0])
  .center([0, 42.475])
  .translate([960 / 2, 500 / 2]);

function asthmaHtmlValue(data) {
  if (data.properties.right_yasth_arte){
    return data.properties.municipal + '<br />' + 'Age-adjusted rate per 100,000: ' + data.properties.right_yasth_arte + '<br /> Year: ' + data.properties.right_cal_years
  }
  else {
    return data.properties.municipal + '<br /> Year: ' + data.properties.right_cal_years
  }
}

function asthmaCreateHeatmap(data) {
  const tooltip = d3.select("body").append("div")
                   .attr("class", "tooltip")
                   .style("opacity", 0);
                  
  const colors = d3.scaleSequentialQuantile([50.6,495])
      .interpolator(d3.interpolateRdPu)
      .domain(data.features.map(feature => (feature.properties.right_all_art)));
      console.log(colors)
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
    .on("mouseover", (d) => {
        tooltip.transition()
        .duration(200)
        .style("opacity", .9);
        tooltip.html(asthmaHtmlValue(d))
        .style("left", (d3.event.pageX) + "px")
        .style("top", (d3.event.pageY - 28) + "px");
      }) ;
}

d3.json('/assets/data/youth-asthma-hosp.geojson').then((data) => {
  console.log(data);
  asthmaCreateHeatmap(data);
})
