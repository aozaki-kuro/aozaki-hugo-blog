importScripts('https://cdn.jsdelivr.net/npm/workbox-cdn/workbox/workbox-sw.js');
   
if (workbox) {
    console.log(`Yay! Workbox is loaded 🎉`);
   
    workbox.core.setCacheNameDetails({
        prefix: "Aozaki's Note",
        suffix: 'v2', // 修改这里就可以更新了
        precache: 'precache',
        runtime: 'runtime'
    });
   
    // 跳过等待期
    workbox.core.skipWaiting();
    // 一旦激活就开始控制任何现有客户机（通常是与skipWaiting配合使用）
    workbox.core.clientsClaim();
    // 删除过期缓存
    workbox.precaching.cleanupOutdatedCaches();
   
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
            cacheName: "html" + workbox.core.cacheNames.suffix,
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
            cacheName: 'static-resources' + workbox.core.cacheNames.suffix
        })
    )
   
    workbox.routing.registerRoute(
        /\.(?:png|jpg|jpeg|gif|bmp|webp|svg|ico)$/,
        new workbox.strategies.CacheFirst({
            cacheName: "images" + workbox.core.cacheNames.suffix,
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
            cacheName: 'google-fonts-stylesheets' + workbox.core.cacheNames.suffix
        })
    );
   
    workbox.routing.registerRoute(
        /^https:\/\/fonts\.gstatic\.com/,
        new workbox.strategies.CacheFirst({
            cacheName: 'google-fonts-webfonts' + workbox.core.cacheNames.suffix,
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
            cacheName: "external-resources"  + workbox.core.cacheNames.suffix,
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

    // 安装阶段跳过等待，直接进入 active
    self.addEventListener('install', function (event) {
        event.waitUntil(self.skipWaiting());
    });

    // Call Activate Event to remove old cache
    self.addEventListener('activate', function (event) {
        event.waitUntil(
            Promise.all([
                // 更新客户端
                self.clients.claim(),

                // 清理旧版本
                caches.keys().then(function (cacheList) {
                    return Promise.all(
                        cacheList.map(function (cacheName) {
                            if (/(v\d+)/.test(cacheName) === false || workbox.core.cacheNames.suffix !== RegExp.$1) {
                                return caches.delete(cacheName);
                            }
                        })
                    );
                })
            ])
        );
    });
    workbox.googleAnalytics.initialize({});
} else {
    console.log(`Boo! Workbox didn't load 😬`)
}
