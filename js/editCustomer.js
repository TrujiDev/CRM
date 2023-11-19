(function () {
	const form = document.querySelector('#form');
	const nameInput = document.querySelector('#name');
	const emailInput = document.querySelector('#email');
	const phoneInput = document.querySelector('#phone');
	const companyInput = document.querySelector('#company');

	let DB;
	let customerID;

	document.addEventListener('DOMContentLoaded', function () {
		connectDB();

		form.addEventListener('submit', updateCustomer);

		const urlParams = new URLSearchParams(window.location.search);
		customerID = urlParams.get('id');

		if (customerID) {
			setTimeout(() => {
				getCustomer(customerID);
			}, 100);
		}
	});

	function updateCustomer(event) {
		event.preventDefault();

		if (
			nameInput.value === '' ||
			emailInput.value === '' ||
			phoneInput.value === '' ||
			companyInput.value === ''
		) {
			printAlert('All fields are required', 'error');
			return;
		}

		const updatedCustomer = {
			name: nameInput.value,
			email: emailInput.value,
			phone: phoneInput.value,
			company: companyInput.value,
			id: Number(customerID),
		};

		const transaction = DB.transaction(['crm'], 'readwrite');
		const objectStore = transaction.objectStore('crm');

		objectStore.put(updatedCustomer);

		transaction.oncomplete = function () {
			printAlert('Updated successfully');

			setTimeout(() => {
				window.location.href = 'index.html';
			}, 2000);
        };
        
        transaction.onerror = function () {
            printAlert('There was an error', 'error');
        };
	}

	/**
	 * Gets a customer from the database.
	 * @function getCustomer
	 * @param {number} id - The customer's ID.
	 */
	function getCustomer(id) {
		const openConnection = window.indexedDB.open('crm', 1);

		openConnection.onerror = function () {
			console.log('Something went wrong');
		};

		openConnection.onsuccess = function () {
			DB = openConnection.result;

			const objectStore = DB.transaction('crm').objectStore('crm');

			const customer = objectStore.openCursor();

			customer.onsuccess = function (event) {
				const cursor = event.target.result;

				if (cursor) {
					if (cursor.value.id === Number(id)) {
						fillForm(cursor.value);
					}

					cursor.continue();
				}
			};
		};
	}

	/**
	 * Fills the form with the customer's data.
	 * @function fillForm
	 * @param {object} customer - The customer object.
	 */
	function fillForm(customer) {
		const { name, email, phone, company } = customer;

		nameInput.value = name;
		emailInput.value = email;
		phoneInput.value = phone;
		companyInput.value = company;
	}
})();
