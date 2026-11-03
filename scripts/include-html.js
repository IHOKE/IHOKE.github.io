(function () {
	const container = document.getElementById('popup-container');
	const scriptUrl = document.currentScript.src;
	const includePromises = [];

	window.htmlIncludesReady = Promise.resolve();
	window.includeHTML = function (filename) {
		if (!/^[a-z0-9][a-z0-9._-]*\.html$/i.test(filename)) {
			throw new Error(`Invalid HTML fragment filename: ${filename}`);
		}
		if (!container) {
			throw new Error('Missing #popup-container in index.html.');
		}

		const placeholder = document.createComment(` ${filename} `);
		container.appendChild(placeholder);

		const url = new URL(`../html/${filename}`, scriptUrl);
		const includePromise = fetch(url).then(response => {
			if (!response.ok) {
				throw new Error(`Could not load ${url}: ${response.status} ${response.statusText}`);
			}
			return response.text();
		}).then(fragment => {
			const template = document.createElement('template');
			template.innerHTML = fragment;
			const scripts = Array.from(template.content.querySelectorAll('script'));
			placeholder.replaceWith(template.content);

			scripts.forEach(existingScript => {
				const script = document.createElement('script');
				Array.from(existingScript.attributes).forEach(attribute => {
					script.setAttribute(attribute.name, attribute.value);
				});
				script.textContent = existingScript.textContent;
				existingScript.replaceWith(script);
			});
		}).catch(error => {
			console.error(`Could not load HTML fragment "${filename}".`, error);
			container.textContent = 'Popup content could not be loaded. Please reload the page.';
			throw error;
		});

		includePromises.push(includePromise);
		window.htmlIncludesReady = Promise.all(includePromises);
		return includePromise;
	};
})();
