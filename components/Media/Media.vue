<template>
	<div class="flex-grow-0" style="overflow:hidden;">
		<v-row class="flex-grow-0">
			<v-col
				v-for="(image, index) in media"
				:key="index"
				class="flex-grow-0"
				cols="4"
			>
				<v-img
					:src="image[1]"
					aspect-ratio="1"
				/>
			</v-col>
		</v-row>
	</div>
</template>

<script src="./Media.js"></script>
