export function promiseAllSettledByKey(promisesMap = {}, { onlyResolved = false, onlyRejected = false } = {}) {
	const totalPromises = Object.keys(promisesMap).length;
	if (!totalPromises) {
		return Promise.resolve();
	}
	const settledPromises = {};

	function allPromisesSettled() {
		return Object.keys(settledPromises).length === totalPromises;
	}

	function applyFilters(settledPromises) {
		const filteredPromises = {
			...settledPromises
		}
		for (const key in filteredPromises) {
			if (onlyResolved && !filteredPromises[key].resolved) {
				delete filteredPromises[key];
			}
			if (onlyRejected && filteredPromises[key].resolved) {
				delete filteredPromises[key];
			}
		}
		return Object.keys(filteredPromises).length ? filteredPromises : undefined;
	}

	return new Promise((resolve, reject) => {
		// TODO: Use Promise.finally once supported in more browsers to keep the resolve() call DRY!
		Object.keys(promisesMap).forEach(promiseKey => {
			promisesMap[promiseKey].then(data => {
				settledPromises[promiseKey] = {
					resolved: true,
					value: data,
				};

				if (allPromisesSettled()) {
					return resolve(applyFilters(settledPromises));
				}
			}).catch(error => {
				settledPromises[promiseKey] = {
					resolved: false,
					value: error
				};

				if (allPromisesSettled()) {
					return resolve(applyFilters(settledPromises));
				}
			})
		});
	});
}

export default promiseAllSettledByKey