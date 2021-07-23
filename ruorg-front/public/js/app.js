Vue.use(vuelidate.default)

new Vue({
	el: '#app',
	data: {
		form: {
			amount: null,
			initialFee: null,
			rate: null,
			months: null,
		},
		differentiated: [],
		annuity: []
	},
	validations: {
		form: {
			amount: {
				required: validators.required,
				decimal: validators.decimal,
				min: validators.minValue(1),
				moreThanInitial: function (value) {
					return !this.form.initialFee || value > this.form.initialFee
				}
			},
			initialFee: {
				required: validators.required,
				decimal: validators.decimal,
				min: validators.minValue(0),
				lessThanAmount: function (value) {
					return !this.form.amount || value < this.form.amount
				}
			},
			rate: {
				required: validators.required,
				decimal: validators.decimal,
				between: validators.between(0.01, 100)
			},
			months: {
				required: validators.required,
				integer: validators.integer,
				min: validators.minValue(1)
			}
		}
	},
	computed: {
		annuityRepaymentTotal() {
			return this.sum(this.annuity, 'repayment')
		},
		annuityInterestTotal() {
			return this.sum(this.annuity, 'interest')
		},
		annuityPrincipalTotal() {
			return this.sum(this.annuity, 'principal')
		},
		differentiatedRepaymentTotal() {
			return this.sum(this.differentiated, 'repayment')
		},
		differentiatedInterestTotal() {
			return this.sum(this.differentiated, 'interest')
		},
		differentiatedPrincipalTotal() {
			return this.sum(this.differentiated, 'principal')
		}
	},
	methods: {
		calculate() {
			if (!this.$v.form.$invalid) {
				this.clearCalculations()
				this.calculateDifferentiated()
				this.calculateAnnuity()
			} else {
				console.log('Invalid Form Data')
			}
		},
		calculateDifferentiated() {
			let total = this.getTotal()
			let rate = this.normalizeRate()
			let principal = total / this.form.months

			for (let i = 1; i <= this.form.months; i++) {
				let row = {}
				row.month = i
				row.principal = principal
				row.interest = total * rate
				row.repayment = row.principal + row.interest
				row.debt = Math.abs(total - row.principal)

				this.differentiated.push(row)
				total -= row.principal
			}
		},
		calculateAnnuity() {
			let total = this.getTotal()
			let rate = this.normalizeRate()
			let repayment = total * rate * (1 + 1 / (Math.pow(1 + rate, this.form.months) - 1))

			for (let i = 1; i <= this.form.months; i++) {
				let row = {}
				row.month = i
				row.repayment = repayment
				row.interest = total * rate
				row.principal = repayment - row.interest
				row.debt = Math.abs(total - row.principal)

				this.annuity.push(row)
				total -= row.principal
			}
		},
		getTotal() {
			return this.form.amount - this.form.initialFee
		},
		normalizeRate() {
			return this.form.rate / 100 / 12
		},
		clearCalculations() {
			this.differentiated = []
			this.annuity = []
		},
		sum(items, prop) {
			return items.reduce(function(total, item) {
				return total + item[prop]
			}, 0)
		}
	}
})