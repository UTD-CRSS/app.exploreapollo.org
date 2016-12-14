import * as d3 from "d3";
import curry from "lodash/curry";

export default curry(function d3ChordDiagram(data, node) {
    var indexByName = d3.map(),
      nameByIndex = d3.map(),
      matrix = [],
      n = 0;

    // Returns the Flare package name for the given class name.
    function name(name) {
      return name.substring(0, name.lastIndexOf(".")).substring(6);
    }

    // Compute a unique index for each package name.
    data.forEach(function(d) {
      if (!indexByName.has(d = name(d.name))) {
        nameByIndex.set(n, d);
        indexByName.set(d, n++);
      }
    });

    // Construct a square matrix counting package imports.
    data.forEach(function(d) {
      var source = indexByName.get(name(d.name)),
        row = matrix[source];
      if (!row) {
        row = matrix[source] = [];
        for (var i = -1; ++i < n;) row[i] = 0;
      }
      d.imports.forEach(function(d) { row[indexByName.get(name(d))]++; });
    });

  var svg = d3.select(node),
    width = +svg.attr("width"),
    height = +svg.attr("height"),
    outerRadius = Math.min(width, height) * 0.5 - 40,
    innerRadius = outerRadius - 30;

  var formatValue = d3.formatPrefix(",.0", 1e3);

  var chord = d3.chord()
    .padAngle(0.05)
    .sortSubgroups(d3.descending);

  var arc = d3.arc()
    .innerRadius(innerRadius)
    .outerRadius(outerRadius);

  var ribbon = d3.ribbon()
    .radius(innerRadius);

  var color = d3.scaleOrdinal(d3.schemeCategory20c);

  var g = svg.append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
    .datum(chord(matrix));

  var group = g.append("g")
    .attr("class", "groups")
    .selectAll("g")
    .data(function(chords) { return chords.groups; })
    .enter().append("g");

  group.append("path")
    .style("fill", function(d) { return color(d.index); })
    .style("stroke", function(d) { return d3.rgb(color(d.index)).darker(); })
    .attr("d", arc);

  var groupTick = group.selectAll(".group-tick")
    .data(function(d) { return groupTicks(d, 1e3); })
    .enter().append("g")
    .attr("class", "group-tick")
    .attr("transform", function(d) { return "rotate(" + (d.angle * 180 / Math.PI - 90) + ") translate(" + outerRadius + ",0)"; });

  groupTick.append("line")
    .attr("x2", 6);

  groupTick
    .filter(function(d) { return d.value % 5e3 === 0; })
    .append("text")
    .attr("x", 8)
    .attr("dy", ".35em")
    .attr("transform", function(d) { return d.angle > Math.PI ? "rotate(180) translate(-16)" : null; })
    .style("text-anchor", function(d) { return d.angle > Math.PI ? "end" : null; })
    .text(function(d) { return formatValue(d.value); });

  g.append("g")
    .attr("class", "ribbons")
    .selectAll("path")
    .data(function(chords) { return chords; })
    .enter().append("path")
    .attr("d", ribbon)
    .style("fill", function(d) { return color(d.target.index); })
    .style("stroke", function(d) { return d3.rgb(color(d.target.index)).darker(); });

// Returns an array of tick angles and values for a given group and step.
  function groupTicks(d, step) {
    var k = (d.endAngle - d.startAngle) / d.value;
    return d3.range(0, d.value, step).map(function (value) {
      return {value: value, angle: value * k + d.startAngle};
    });


  }
});

//d3.select(self.frameElement).style("height", outerRadius * 2 + "px");
