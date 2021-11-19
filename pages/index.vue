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
				<Tweets :loading="loading" :tweets="tweets" />
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
					<Map :geo="geo" />
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

<script src="./index.js"></script>
