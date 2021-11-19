<template>
	<v-container
		fill-height
	>
		<v-row
			style="height:100%"
		>
			<v-col
				cols="4"
			>
				<Tweets />
			</v-col>
			<v-col
				v-if="show_media"
				:cols="(show_map || show_tagcloud) ? 4 : 8"
			>
				<Media />
			</v-col>
			<v-col
				v-if="show_map || show_tagcloud"
				:cols="(show_media) ? 4 : 8"
			>
				<div
					v-if="show_map"
					:style="'height:' + ( show_tagcloud ? 70 : 100 ) + '%'"
				>
					<Map />
				</div>
				<div
					v-if="show_tagcloud"
					:class="(show_map ? 'pt-6' : '')"
					:style="'height:' + ( show_map ? 30 : 100 ) + '%'"
				>
					<TagCloud />
				</div>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
export default {
	name: 'Page1',
	data () {
		return {
			show_media: true,
			show_map: true,
			show_tagcloud: true,
		}
	},
	created() {
		this.$nuxt.$on('toggle-media', ( toggle ) => {
			this.show_media = toggle
		})
		this.$nuxt.$on('toggle-map', ( toggle ) => {
			this.show_map = toggle
		})
		this.$nuxt.$on('toggle-tagcloud', ( toggle ) => {
			this.show_tagcloud = toggle
		})
	},
}
</script>
