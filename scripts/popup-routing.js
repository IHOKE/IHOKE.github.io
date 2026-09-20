(function () {
	function getPopupRoute() {
		const hashRoute = window.location.hash.replace(/^#\/?/, '');
		if (hashRoute) {
			return hashRoute
				.split('/')
				.filter(Boolean)
				.map(segment => decodeURIComponent(segment));
		}

		const routeMarker = '/index.html/';
		const routeStart = window.location.pathname.indexOf(routeMarker);

		if (routeStart === -1) {
			return [];
		}

		return window.location.pathname
			.slice(routeStart + routeMarker.length)
			.split('/')
			.filter(Boolean)
			.map(segment => decodeURIComponent(segment));
	}

	function applyPopupRoute() {
		const popupNames = getPopupRoute();

		if (popupNames.length === 0) {
			return;
		}

		document.querySelectorAll('.pop-t.active').forEach(popup => {
			popup.classList.remove('active');
		});

		popupNames.forEach(popupName => {
			if (!/^[a-z0-9-]+$/i.test(popupName)) {
				return;
			}

			const popup = document.querySelector(`.pop-t.${CSS.escape(popupName)}`);
			if (popup) {
				popup.classList.add('active');
			}
		});
	}

	window.addEventListener('DOMContentLoaded', applyPopupRoute);
	window.addEventListener('hashchange', applyPopupRoute);
})();
