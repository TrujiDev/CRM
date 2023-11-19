(function () {
	let DB;

	document.addEventListener('DOMContentLoaded', function () {
		createDB();
	});

	/**
	 * Creates an indexedDB database named 'crm' with the specified version.
	 * @function createDB
	 */
	function createDB() {
		const createDB = window.indexedDB.open('crm', 1);

		createDB.onerror = function () {
			console.log('Something went wrong');
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
			objectStore.createIndex("Customer's Phone", 'phone', { unique: false });
			objectStore.createIndex("Customer's Company", 'company', { unique: false });
			objectStore.createIndex("Customer's ID", 'id', { unique: true });

			console.log('DB created successfully');
		};
	}
})();
