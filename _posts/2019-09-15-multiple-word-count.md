---
layout: disqus
title: Multiple Word Count Sample
date: 2019-09-15 22:14 +0200
comments: true
---

<style>
.node {
  cursor: pointer;
}

.node:hover {
  stroke: #000;
  stroke-width: 1.5px;
}

.node--leaf {
  fill: white;
}

.label {
  font: 11px "Helvetica Neue", Helvetica, Arial, sans-serif;
  text-anchor: middle;
  text-shadow: 0 1px 0 #fff, 1px 0 0 #fff, -1px 0 0 #fff, 0 -1px 0 #fff;
}

.label,
.node--root,
.node--leaf {
  pointer-events: none;
}
</style>
<svg width="960" height="960"></svg>
<div class="chart-container" style="max-width: 1000px;"></div>