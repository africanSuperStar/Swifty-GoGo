import { select } from 'd3';

const svg = select('#caps_correlation');

console.log(svg)

svg.style('background-color', 'red');

const circle = svg.append('circle');

circle.attr('r', 200);

console.log(circle);