<template>
	<v-container fill-height class="pa-0">
		<client-only>
			<l-map
				ref="map"
				style="z-index: 0;"
				:center="center"
				:max-bounds="maxBounds"
				:min-zoom="minZoom"
				:zoom="zoom"
			>
				<l-tile-layer :url="url" :attribution="attribution" />
				<l-marker
					v-for="point in geo"
					:key="point.target"
					:lat-lng="point.latlng"
				>
					<l-tooltip>
						{{ point.tooltip }}
					</l-tooltip>
				</l-marker>
			</l-map>
		</client-only>
	</v-container>
</template>

<script src="./Map.js"></script>
