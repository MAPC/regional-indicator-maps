---
layout: post
title: "Streets and Roads with Sidewalks"
---
<main class="map__container">
    <aside class="sidewalk-legend">
        <svg width="200" height="100">
            <text transform="translate(1,12)" class="legend-subtitle">Sidewalks</text>

            <rect width="30" height="10" style="fill:#bd4289; stroke:black;" transform="translate(1,30)"></rect>
            <text transform="translate(41,40)" class="legend-data">Left and right sidewalks</text>

            <rect width="30" height="10" style="fill:#ffc0cb; stroke:black;" transform="translate(1,55)"></rect>
            <text transform="translate(41,65)" class="legend-data">Left or right sidewalk</text>

            <rect width="30" height="10" style="fill:#fff; stroke:black;" transform="translate(1,80)"></rect>
            <text transform="translate(41,90)" class="legend-data">No sidewalk</text>
        </svg>

         <svg width="200" height="140">

         <text transform="translate(1,30)" class="legend-subtitle">Community Types</text>
            <rect width="30" height="10" style="fill:#5271a3; stroke:black;" transform="translate(1,50)"></rect>
            <text transform="translate(41,60)" class="legend-data">Inner Core</text>

            <rect width="30" height="10" style="fill:#87bad9; stroke:black;" transform="translate(1,75)"></rect>
            <text transform="translate(41,85)" class="legend-data">Regional Urban Centers</text>

            <rect width="30" height="10" style="fill:#558f49; stroke:black;" transform="translate(1,100)"></rect>
            <text transform="translate(41,110)" class="legend-data">Maturing Suburbs</text>

            <rect width="30" height="10" style="fill:#feb64b; stroke:black;" transform="translate(1,125)"></rect>
            <text transform="translate(41,135)" class="legend-data">Developing Suburbs</text>
        </svg>
    </aside>
    <div id="map" style='width: 600px; height: 500px;' class="sidewalk-map"></div>
</main>
<script src="{{'assets/javascripts/sidewalks.js' | absolute_url }}" type="module"></script>
