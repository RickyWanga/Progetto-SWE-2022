<template>
	<v-sparkline
		auto-draw
		class="pa-3"
		height="80"
		:auto-draw-duration="autoDrawDuration"
		:auto-line-width="autoLineWidth"
		:fill="fill"
		:gradient="gradient"
		:gradient-direction="gradientDirection"
		:labels="labels"
		:line-width="lineWidth"
		:padding="padding"
		:smooth="smooth || false"
		:stroke-linecap="strokeLineCap"
		:type="type"
		:value="values"
	>
		<template #label="label">
			{{ label.value }} ({{ values[ label.index ] }})
		</template>
	</v-sparkline>
</template>

<script src="./Diagram.js"></script>
