(function () {
	document.querySelector('#form');

	let DB;

	document.addEventListener('DOMContentLoaded', function () {
		connectDB();

		form.addEventListener('submit', validateCustomer);
	});

	/**
	 * Validates the customer information and creates a new customer.
	 * @param {Event} event - The event object.
	 */
	function validateCustomer(event) {
		event.preventDefault();

		const name = document.querySelector('#name').value;
		const email = document.querySelector('#email').value;
		const phone = document.querySelector('#phone').value;
		const company = document.querySelector('#company').value;

		if (name === '' || email === '' || phone === '' || company === '') {
			printAlert('All fields are required', 'error');
			return;
		}

		// Create a object with the information
		const customer = {
			name,
			email,
			phone,
			company,
			id: Date.now(),
		};

		createNewCustomer(customer);
	}

	/**
	 * Creates a new customer and adds it to the CRM database.
	 * @param {Object} customer - The customer object to be added.
	 */
	function createNewCustomer(customer) {
		const transaction = DB.transaction(['crm'], 'readwrite');

		const objectStore = transaction.objectStore('crm');

		objectStore.add(customer);

		transaction.onerror = function () {
			printAlert('There was an error', 'error');
		};

		transaction.oncomplete = function () {
			printAlert('The customer was added', 'success');

			setTimeout(() => {
				window.location.href = 'index.html';
			}, 3000);
		};
	}
})();
