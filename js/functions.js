/**
 * Connects to the indexedDB database named 'crm'.
 */
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
