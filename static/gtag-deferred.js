(function () {
	function loadGtag() {
		var script = document.createElement('script');
		script.async = true;
		script.src = 'https://www.googletagmanager.com/gtag/js?id=G-LLJEJD5KB6';
		document.head.appendChild(script);

		window.dataLayer = window.dataLayer || [];
		function gtag() {
			window.dataLayer.push(arguments);
		}
		window.gtag = gtag;
		gtag('js', new Date());
		gtag('config', 'G-LLJEJD5KB6');
	}

	if ('requestIdleCallback' in window) {
		requestIdleCallback(loadGtag, { timeout: 3000 });
	} else {
		window.setTimeout(loadGtag, 2000);
	}
})();
