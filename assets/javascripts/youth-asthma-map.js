const projection2 = d3.geoAlbers()
  .scale(50000)
  .rotate([71.057, 0])
  .center([0, 42.475])
  .translate([960 / 2, 500 / 2]);

//{"cartodb_id":2,"municipal":"Acton","right_muni_id":2,"right_municipal":"Acton","right_cal_years":"2008-2012","right_yasth_arte":77.76}}
//Municipality
//Age-adjusted rate per 100,000
//Year
function htmlValue2(data) {
  if (data.properties.right_yasth_arte){
    return data.properties.municipal + '<br />' + 'Age-adjusted rate per 100,000: ' + data.properties.right_yasth_arte + '<br /> Year: ' + data.properties.right_cal_years
  }
  else {
    return data.properties.municipal + '<br /> Year: ' + data.properties.right_cal_years
  }
}

// function htmlValue2(data) {
//   return data.properties.municipal + '<br />' + 'Years: ' + data.properties.right_years + '<br /> Value: ' + data.properties.right_all_art
// }


function createHeatmap2(data) {
  const tooltip = d3.select("body").append("div")
                   .attr("class", "tooltip")
                   .style("opacity", 0);
  const colors = d3.scaleSequentialQuantile()
      .interpolator(d3.interpolateRdPu)
      .domain(data.features.map(feature => (feature.properties.right_all_art)));
  const youthAsthma = d3.select('.youth-asthma-map');
  const path = d3.geoPath().projection(projection2);
 youthAsthma.append('g')
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
        tooltip.html(htmlValue2(d))
        .style("left", (d3.event.pageX) + "px")
        .style("top", (d3.event.pageY - 28) + "px");
      }) ;
}

d3.json('/assets/data/youth-asthma-hosp.geojson').then((data) => {
  console.log(data);
  createHeatmap2(data);
})
