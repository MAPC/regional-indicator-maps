export function addLegend(data, legendVariable, title, subtitle){
  let nonNulls = 0
  let min = data.features[0].properties[legendVariable.valueOf()]
  let max = data.features[0].properties[legendVariable.valueOf()]
  let avg = 0
    
  data.features.forEach(dataPoint => {
    if (dataPoint.properties[legendVariable.valueOf()] !== null ){
      nonNulls++
      avg += dataPoint.properties[legendVariable.valueOf()]

      if (dataPoint.properties[legendVariable.valueOf()] > max){
        max = dataPoint.properties[legendVariable.valueOf()]
      }
      if (dataPoint.properties[legendVariable.valueOf()] < min){
        min = dataPoint.properties[legendVariable.valueOf()]
      }
    }
  })
  avg = (avg/nonNulls).toFixed(1)
  min = min.toFixed(1)
  max = max.toFixed(1)
  
  const w = 345, h = 100;
  
  const key = d3.select(".legend")
  .append("svg")
  .attr("width", w)
  .attr("height", h)

  const legend = key.append("defs")
  .append("svg:linearGradient")
  .attr("id", "gradient")

  legend.append("stop")
  .attr("offset", "0%")
  .attr("stop-color", "#fff7f3")
  .attr("stop-opacity", 1);

  legend.append("stop")
  .attr("offset", "10%")
  .attr("stop-color", "#fde2df")
  .attr("stop-opacity", 1)

  legend.append("stop")
  .attr("offset", "30%")
  .attr("stop-color", "#fccac8")
  .attr("stop-opacity", 1)

  legend.append("stop")
  .attr("offset", "40%")
  .attr("stop-color", "#fbabb8")
  .attr("stop-opacity", 1)

  legend.append("stop")
  .attr("offset", "50%")
  .attr("stop-color", "#f880aa")
  .attr("stop-opacity", 1)

  legend.append("stop")
  .attr("offset", "60%")
  .attr("stop-color", "#ea519d")
  .attr("stop-opacity", 1)

  legend.append("stop")
  .attr("offset", "70%")
  .attr("stop-color", "#cc238e")
  .attr("stop-opacity", 1)

  legend.append("stop")
  .attr("offset", "80%")
  .attr("stop-color", "#a2057e")
  .attr("stop-opacity", 1)

  legend.append("stop")
  .attr("offset", "90%")
  .attr("stop-color", "#750175")
  .attr("stop-opacity", 1)

  legend.append("stop")
  .attr("offset", "100%")
  .attr("stop-color", "#49006a")
  .attr("stop-opacity", 1);

  key.append("text")
  .attr("class", "legend-title")
  .attr("transform", "translate(5,5)")
  .attr("y", 0)
  .attr("x", -5)
  .attr("dy", ".71em")
  .style("text-anchor", "start")
  .text(title);

  key.append("text")
  .attr("class", "legend-subtitle")
  .attr("transform", "translate(5,35)")
  .attr("y", 0)
  .attr("x", -5)
  .attr("dy", ".71em")
  .style("text-anchor", "start")
  .text(subtitle);

  key.append("rect")
  .attr("width", 300)
  .attr("height", 30)
  .style("fill", "url(#gradient)")
  .attr("transform", "translate(0,75)");

  const y = d3.scaleLinear()
    .range([300, 0])
    .domain([max,min]);

  const yAxis = d3.axisTop()
    .scale(y)
    .ticks([max,min])
      
  key.append("g")
    .attr("class", "y-axis")
    .attr('width', 300)
    .attr("height", h  - 50)
    .attr("transform", "translate(0,75)")
    .call(yAxis)

  key.append("g")
    .append("text")
    .attr("class", "legend-data")
    .text(min)
    .attr("transform", "translate(0,60)")
  
    key.append("g")
    .append("text")
    .attr("class", "legend-data")
    .text(max)
    .attr("transform", "translate(290,60)")
}