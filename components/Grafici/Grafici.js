const gradients = [
  ['#222'],
  ['#42b3f4'],
  ['red', 'orange', 'yellow'],
  ['purple', 'violet'],
  ['#00c6ff', '#F0F', '#FF0'],
  ['#f72047', '#ffd200', '#1feaea'],
]


export default {
	props: [ "days" ],
	data() {
		return{
			show: true,
			loading: true,
			width: 2,
			radius: 0,
			padding: 8,
			lineCap: 'round',
			gradient: ['#222'],
			value: [0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 0],
			gradientDirection: 'top',
			gradients,
			fill: false,
			type: 'trend',
			autoLineWidth: false,
		}
  	},
	mounted() {
		this.show = true
	},
}
