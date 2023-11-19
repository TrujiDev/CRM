(function () {
    const nameInput = document.querySelector('#name');
    const emailInput = document.querySelector('#email');
    const phoneInput = document.querySelector('#phone');
    const companyInput = document.querySelector('#company');

	let DB;

	document.addEventListener('DOMContentLoaded', function () {
		const urlParams = new URLSearchParams(window.location.search);
		const customerID = urlParams.get('id');

		if (customerID) {
			setTimeout(() => {
				getCustomer(customerID);
			}, 100);
		}
	});

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
        const { name, email, phone, company, id } = customer;

        nameInput.value = name;
        emailInput.value = email;
        phoneInput.value = phone;
        companyInput.value = company;
        idInput.value = id;
    }
})();
