<template>
	<v-form
		v-model="valid"
		class="tweets-form"
		@submit.prevent="submit"
	>
		<v-row>
			<v-col class="flex-grow-1">
				<v-text-field
					v-model="query"
					class="expanding-search rounded-pill"
					clearable
					dense
					outlined
					persistent-placeholder
					placeholder="Search Tweets"
					required
					:rules="queryRules"
					@click:clear="$nuxt.$emit( 'query-cleared' )"
				/>
			</v-col>
			<v-col class="flex-grow-0">
				<v-btn
					color="primary"
					elevation="3"
					icon
					type="submit"
					x-large
					:disabled="!valid"
					:loading="loading"
				>
					<v-icon>
						mdi-magnify
					</v-icon>
				</v-btn>
			</v-col>
		</v-row>
	</v-form>
</template>

<script src="./SearchForm.js" />
<style src="./SearchForm.css" />
