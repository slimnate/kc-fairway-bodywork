(function () {
	function sendGaEvent() {
		if (typeof window.gtag === 'function') {
			window.gtag.apply(null, arguments);
		} else {
			window.dataLayer = window.dataLayer || [];
			window.dataLayer.push(arguments);
		}
	}

	document.addEventListener(
		'click',
		function (event) {
			var link = event.target && event.target.closest && event.target.closest('a[href]');
			if (!link) return;

			var hrefAttr = link.getAttribute('href') || '';
			var linkUrl = link.href || hrefAttr;

			if (hrefAttr.indexOf('massagebook.com') !== -1 || linkUrl.indexOf('massagebook.com') !== -1) {
				sendGaEvent('event', 'book_now_click', {
					link_text: (link.textContent || '').trim(),
					link_url: linkUrl,
					page_path: location.pathname,
					page_location: location.href
				});
				return;
			}

			if (hrefAttr.indexOf('tel:') === 0 || linkUrl.indexOf('tel:') === 0) {
				sendGaEvent('event', 'phone_click', {
					link_url: linkUrl,
					page_path: location.pathname
				});
			}
		},
		true
	);

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
