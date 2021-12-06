<template>
	<div
		class="diagram-progress-circular mt-2"
		:title="tooltip"
	>
		<v-progress-circular
			class="diagram-progress-circular-1"
			rotate="90"
			size="50"
			:width="!loading ? 11 : 10"
			:color="diagramColor1"
			:value="progress1"
		/>
		<v-progress-circular
			class="diagram-progress-circular-2"
			rotate="-90"
			size="50"
			:width="!loading ? 11 : 10"
			:color="diagramColor2"
			:value="progress2"
		/>
	</div>
</template>

<script src="./DiagramProgressCircular.js"></script>
<style src="./DiagramProgressCircular.css"></style>
