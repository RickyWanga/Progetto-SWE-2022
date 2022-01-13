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
					hide-details
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
		<v-row class="ma-0 mr-3">
			<v-menu
				ref="menu"
				v-model="dateMenu"
				:close-on-content-click="false"
				:return-value.sync="dateRangeInput"
				transition="scale-transition"
				offset-y
				min-width="auto"
			>
				<template #activator="{ on, attrs }">
					<v-text-field
						v-model="dateRangeText"
						dense
						placeholder="Date range"
						prepend-icon="mdi-calendar"
						readonly
						v-bind="attrs"
						v-on="on"
					/>
				</template>
				<v-date-picker
					v-model="dateRangeInput"
					:max="dateMaxDay"
					first-day-of-week="1"
					no-title
					range
					scrollable
				>
					<v-spacer />
					<v-btn
						text
						color="primary"
						@click="dateRangeInput = []"
					>
						Clear
					</v-btn>
					<v-btn
						text
						color="primary"
						@click="dateMenu = false"
					>
						Cancel
					</v-btn>
					<v-btn
						text
						color="primary"
						@click="$refs.menu.save(dateRangeInput)"
					>
						OK
					</v-btn>
				</v-date-picker>
			</v-menu>
		</v-row>
	</v-form>
</template>

<script src="./SearchForm.js" />
<style src="./SearchForm.css" />
