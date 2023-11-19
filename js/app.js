(function () {
	const customerList = document.querySelector('#customers-list');

	let DB;

	document.addEventListener('DOMContentLoaded', function () {
		createDB();

		if (window.indexedDB.open('crm', 1)) {
			getCustomers();
		}

		customerList.addEventListener('click', deleteCustomer);
	});

	/**
	 * Creates an indexedDB database named 'crm' with the specified version.
	 * @function createDB
	 */
	function createDB() {
		const createDB = window.indexedDB.open('crm', 1);

		createDB.onerror = function () {
			console.error('Something went wrong');
		};

		createDB.onsuccess = function () {
			DB = createDB.result;
		};

		createDB.onupgradeneeded = function (event) {
			const db = event.target.result;

			const objectStore = db.createObjectStore('crm', {
				keyPath: 'id',
				autoIncrement: true,
			});

			objectStore.createIndex("Customer's Name", 'name', { unique: false });
			objectStore.createIndex("Customer's Email", 'email', { unique: true });
			objectStore.createIndex("Customer's Phone", 'phone', { unique: true });
			objectStore.createIndex("Customer's Company", 'company', { unique: false });
			objectStore.createIndex("Customer's ID", 'id', { unique: true });
		};
	}

	/**
	 * Gets the customers from the database.
	 * @function getCustomers
	 */
	function getCustomers() {
		const openConnection = window.indexedDB.open('crm', 1);

		openConnection.onerror = function () {
			console.error('Something went wrong');
		};

		openConnection.onsuccess = function () {
			DB = openConnection.result;

			const objectStore = DB.transaction('crm').objectStore('crm');

			objectStore.openCursor().onsuccess = function (event) {
				const cursor = event.target.result;

				if (cursor) {
					const { name, email, phone, company, id } = cursor.value;

					customerList.innerHTML += `
						<tr>
							<td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
								<p class="text-sm leading-5 font-medium text-gray-700 text-lg font-bold"> ${name} </p>
								<p class="text-sm leading-10 text-gray-700"> ${email} </p>
							</td>
							<td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 ">
								<p class="text-gray-700">${phone}</p>
							</td>
							<td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 leading-5 text-gray-700">
								<p class="text-gray-600">${company}</p>
							</td>
							<td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5">
								<a href="editCustomer.html?id=${id}" class="text-teal-600 hover:text-teal-900 mr-5">Edit</a>
								<a href="#" data-customer="${id}" class="text-red-600 hover:text-red-900 delete">Delete</a>
							</td>
						</tr>
					`;

					cursor.continue();
				}
			};
		};
	}

	/**
	 * Deletes a customer from the database.
	 * @function deleteCustomer
	 * @param {object} event - The event object.
	 */
	function deleteCustomer(event) {
		if (event.target.classList.contains('delete')) {
			const id = Number(event.target.dataset.customer);

			const confirmation = confirm(
				'Are you sure you want to delete this customer?'
			);

			if (confirmation) {
				const transaction = DB.transaction(['crm'], 'readwrite');
				const objectStore = transaction.objectStore('crm');

				objectStore.delete(id);

				transaction.oncomplete = function () {
					event.target.parentElement.parentElement.remove();
				};

				transaction.onerror = function () {
					console.error('Something went wrong');
				};
			}
		}
	}
})();
