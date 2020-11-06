import * as d3 from "d3";
import curry from "lodash/curry";

export default curry(function d3ChordDiagram(speakers, interactions, node) {
  //FIXME should be the innerwidth of the tab container, not the entire window
  var width = window.innerWidth / 2;
  var height = width;
  var innerRadius = Math.min(width, height) * 0.4;
  var outerRadius = innerRadius * 1.1;
  var color = d3.scaleOrdinal(d3.schemeCategory10);

  var chord = d3.chord().padAngle(0.05).sortSubgroups(d3.descending);

  var arc = d3.arc().innerRadius(innerRadius).outerRadius(outerRadius);

  var ribbon = d3.ribbon().radius(innerRadius);

  var svg = d3
    .select(node)
    .attr("id", "visual")
    .attr("width", width)
    .attr("height", height)
    .attr("preserveAspectRatio", "xMinYMid")
    .attr("viewBox", "0 0 " + width + " " + height);

  //FIXME janky positioning fix with '((width / 2) - 40)'
  var g = svg
    .append("g")
    .attr("transform", "translate(" + (width / 2 - 40) + "," + height / 2 + ")")
    .datum(chord(interactions));

  var group = g
    .append("g")
    .attr("class", "groups")
    .selectAll("g")
    .data(function (chords) {
      return chords.groups;
    })
    .enter()
    .append("g")
    .style("fill", function (d) {
      return color(d.index);
    });

  group
    .append("path")
    .style("fill", function (d) {
      return color(d.index);
    })
    .style("stroke", function (d) {
      return d3.rgb(color(d.index)).darker();
    })
    .attr("d", arc);

  var groupTick = group
    .selectAll(".group-tick")
    .data(function (d) {
      return groupTicks(d, 1e3);
    })
    .enter()
    .append("g")
    .attr("class", "group-tick")
    .attr("transform", function (d) {
      return (
        "rotate(" +
        ((d.angle * 180) / Math.PI - 90) +
        ") translate(" +
        outerRadius +
        ",0)"
      );
    });

  groupTick
    .append("text")
    .attr("y", 26)
    .attr("transform", "rotate(90)")
    .style("fill", "#000000")
    .style("stroke", "#000000")
    .style("font-size", "1.5em")
    .style("font-weight", "bold")
    .style("text-anchor", "middle")
    .text(function (d) {
      return d.label;
    });

  g.append("g")
    .attr("class", "ribbons")
    .selectAll("path")
    .data(function (chords) {
      return chords;
    })
    .enter()
    .append("path")
    .attr("d", ribbon)
    .style("fill", function (d) {
      return color(d.target.index);
    })
    .style("stroke", function (d) {
      return d3.rgb(color(d.target.index)).darker();
    })
    .style("opacity", 0.7);

  function groupTicks(d, step) {
    var k = (d.endAngle - d.startAngle) / d.value;
    return d3.range(0, d.value, step).map(function (v) {
      return {
        angle: v * k + d.startAngle + (d.endAngle - d.startAngle) / 2,
        label: speakers[d.index],
      };
    });
  }

  function resize() {
    var targetWidth = window.innerWidth / 2;
    var svg = d3.select("#visual");
    svg.attr("width", targetWidth);
    svg.attr("height", targetWidth / (width / height));
  }
  window.onresize = resize;
});

//d3.select(self.frameElement).style("height", outerRadius * 2 + "px");
