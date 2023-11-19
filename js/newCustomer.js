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
	}

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
