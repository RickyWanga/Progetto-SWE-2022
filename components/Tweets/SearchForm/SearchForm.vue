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
		<v-row>
			<v-menu
				ref="menu"
				v-model="menu"
				:close-on-content-click="false"
				:return-value.sync="dates"
				transition="scale-transition"
				offset-y
				min-width="auto"
			>
				<template #activator="{ on, attrs }">
					<v-combobox
						v-model="dates"
						multiple
						chips
						small-chips
						readonly
						label="Multiple picker in menu"
						prepend-icon="mdi-calendar"
						v-bind="attrs"
						v-on="on"
					/>
				</template>
				<v-date-picker
					v-model="dates"
					:allowed-dates="allowedDates"
					max="dates"
					range
					no-title
					scrollable
				>
					<v-spacer />
					<v-spacer />
					<v-btn
						text
						color="primary"
						@click="dates = []"
					>
						Clear
					</v-btn>
					<v-btn
						text
						color="primary"
						@click="menu = false"
					>
						Cancel
					</v-btn>
					<v-btn
						text
						color="primary"
						@click="$refs.menu.save(dates)"
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
