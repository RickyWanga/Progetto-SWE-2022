<template>
	<v-card
		class="pa-2"
		height="100%"
		style="display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; grid-template-rows: 1fr; position: relative"
	>
		<div
			class="pa-4"
			style="grid-column: 1 / span 2; grid-row: 1 / span 1; z-index: 1"
		>
			<div
				class="text-caption grey--text text-uppercase"
			>
				Counts
			</div>
			<div>
				<span
					class="text-h3 font-weight-black"
					v-text="tweets.length || '—'"
				/>
				<strong v-if="tweets.length">
					Tweet<span v-if="tweets.length > 1">s</span>
				</strong>
			</div>
		</div>
		<div
			class="text-caption grey--text text-uppercase text-right mt-2 mr-2"
			style="grid-column: 3 / span 1; grid-row: 1 / span 1"
		>
			Sentiment Analysis
		</div>
		<div
			style="grid-column: 4 / span 1; grid-row: 1 / span 1"
		>
			<DiagramProgressCircular
				:loading="loading"
				:progress1="sentiment.positive"
				:progress2="sentiment.negative"
			/>
		</div>
		<div
			style="height:60%;width:100%;position:absolute;bottom:0;left:0;z-index:0"
		>
			<slot />
		</div>
	</v-card>
</template>

<script src="./Analytics.js"></script>
