---
layout: post
title: "Streets and Roads with Sidewalks"
---
<main class="map__container">
    <aside class="legend">
        <p class="legend-title">Streets and Roads with Sidewalks</p>
        <svg width="465" height="70">
            <text transform="translate(1,10)" class="legend-subtitle">Sidewalks</text>
            <rect width="30" height="10" style="fill:#bd4289; stroke:black;" transform="translate(1,20)"></rect>
            <text transform="translate(41,28)" class="legend-data">Left and right sidewalks</text>

            <rect width="30" height="10" style="fill:#ffc0cb; stroke:black;" transform="translate(249,20)"></rect>
            <text transform="translate(289,30)" class="legend-data">Left or right sidewalk</text>

            <rect width="30" height="10" style="fill:#fff; stroke:black;" transform="translate(1,40)"></rect>
            <text transform="translate(41,50)" class="legend-data">No sidewalk</text>
        </svg>

         <svg width="465" height="60">

         <text transform="translate(1,10)" class="legend-subtitle">Community Types</text>
            <rect width="30" height="10" style="fill:#5271a3; stroke:black;" transform="translate(1,20)"></rect>
            <text transform="translate(41,30)" class="legend-data">Inner Core</text>

            <rect width="30" height="10" style="fill:#87bad9; stroke:black;" transform="translate(249,20)"></rect>
            <text transform="translate(289,30)" class="legend-data">Regional Urban Centers</text>

            <rect width="30" height="10" style="fill:#558f49; stroke:black;" transform="translate(1,40)"></rect>
            <text transform="translate(41,50)" class="legend-data">Maturing Suburbs</text>

            <rect width="30" height="10" style="fill:#feb64b; stroke:black;" transform="translate(249,40)"></rect>
            <text transform="translate(289,50)" class="legend-data">Developing Suburbs</text>
        </svg>
    </aside>
    <div id="map" style='width: 740px; height: 460px;'></div>
</main>
<script src="{{'assets/javascripts/sidewalks.js' | absolute_url }}" type="module"></script>
