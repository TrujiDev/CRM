(function () {
	document.querySelector('#form');

	let DB;

	document.addEventListener('DOMContentLoaded', function () {
		connectDB();

		form.addEventListener('submit', validateCustomer);
	});

	function connectDB() {
		const openConnection = window.indexedDB.open('crm', 1);

		openConnection.onerror = function () {
			console.log('There was an error');
		};

		openConnection.onsuccess = function () {
			DB = openConnection.result;
		};
	}

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

	/**
	 * Prints an alert message on the screen.
	 *
	 * @param {string} message - The message to be displayed in the alert.
	 * @param {string} type - The type of alert. Possible values are 'error' or any other value for success alert.
	 */
	function printAlert(message, type) {
		const alert = document.querySelector('.alert');

		if (!alert) {
			const divMessage = document.createElement('div');
			divMessage.classList.add(
				'px-4',
				'py-3',
				'rounded',
				'max-w-lg',
				'mx-auto',
				'mt-6',
				'text-center',
				'border',
				'alert'
			);

			if (type === 'error') {
				divMessage.classList.add('bg-red-100', 'border-red-400', 'text-red-700');
			} else {
				divMessage.classList.add(
					'bg-green-100',
					'border-green-400',
					'text-green-700'
				);
			}

			divMessage.textContent = message;
			form.appendChild(divMessage);

			setTimeout(() => {
				divMessage.remove();
			}, 3000);
		}
	}
})();
