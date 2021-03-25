importScripts('https://cdn.jsdelivr.net/npm/workbox-cdn/workbox/workbox-sw.js');
   
if (workbox) {
    console.log(`Yay! Workbox is loaded 🎉`);
   
    workbox.core.setCacheNameDetails({
        prefix: "Your Username"
    });
   
    workbox.core.skipWaiting();
    workbox.core.clientsClaim();
   
    workbox.precaching.precacheAndRoute([
        {
            "url": "/index.html",
            "revision": "MD5 of your index.html"
        },
        {
            "url": "/css/style.min.css",
            "revision": "MD5 of your style.css"
        }
    ], {});
   
    workbox.routing.registerRoute(/(?:\/)$/,
        new workbox.strategies.StaleWhileRevalidate({
            cacheName: "html",
            plugins: [
                new workbox.expiration.ExpirationPlugin({
                    maxAgeSeconds: 60 * 60 * 24 * 7,
                    // purgeOnQuotaError: !0
                })
            ]
        }), "GET");
   
    workbox.routing.registerRoute(
        /\.(?:js|css)$/,
        new workbox.strategies.StaleWhileRevalidate({
            cacheName: 'static-resources'
        })
    )
   
    workbox.routing.registerRoute(
        /\.(?:png|jpg|jpeg|gif|bmp|webp|svg|ico)$/,
        new workbox.strategies.CacheFirst({
            cacheName: "images",
            plugins: [new workbox.expiration.ExpirationPlugin({
                maxEntries: 100,
                maxAgeSeconds: 7 * 24 * 60 * 60,
                // purgeOnQuotaError: !0
            })]
        }), "GET");
   
    // Fonts
    workbox.routing.registerRoute(
        /\.(?:eot|ttf|woff|woff2)$/,
        new workbox.strategies.CacheFirst({
            cacheName: "fonts",
            plugins: [
                new workbox.expiration.ExpirationPlugin({
                    maxEntries: 1000,
                    maxAgeSeconds: 60 * 60 * 24 * 30
                }),
                new workbox.cacheableResponse.CacheableResponsePlugin({
                    statuses: [0, 200]
                })
            ]
        })
    );
   
    workbox.routing.registerRoute(
        /^https:\/\/fonts\.googleapis\.com/,
        new workbox.strategies.StaleWhileRevalidate({
            cacheName: 'google-fonts-stylesheets'
        })
    );
   
    workbox.routing.registerRoute(
        /^https:\/\/fonts\.gstatic\.com/,
        new workbox.strategies.CacheFirst({
            cacheName: 'google-fonts-webfonts',
            plugins: [
                new workbox.cacheableResponse.CacheableResponsePlugin({
                    statuses: [0, 200]
                }),
                new workbox.expiration.ExpirationPlugin({
                    maxAgeSeconds: 60 * 60 * 24 * 365,
                    maxEntries: 30
                })
            ]
        })
    );
   
    // external resources
    workbox.routing.registerRoute(
        /(^https:\/\/cdn\.jsdelivr\.net.*?(\.js|\.css))|(^https:\/\/cdnjs\.cloudflare\.com)/,
        new workbox.strategies.CacheFirst({
            cacheName: "external-resources",
            plugins: [
                new workbox.expiration.ExpirationPlugin({
                    maxEntries: 1000,
                    maxAgeSeconds: 60 * 60 * 24 * 30
                }),
                new workbox.cacheableResponse.CacheableResponsePlugin({
                    statuses: [0, 200]
                })
            ]
        })
    );
   
    workbox.googleAnalytics.initialize({});
} else {
    console.log(`Boo! Workbox didn't load 😬`)
}
