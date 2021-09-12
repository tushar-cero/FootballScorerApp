var staticCacheName = 'pages-cache-v2';

self.addEventListener('install', e=>{

        e.waitUntil(
            caches.open('pages-cache-v2').then(caches => {
                return caches.addAll(['./','images/logo.png','images/team-A-logo.png','images/team-B-logo.png','images/whistle1.png','images/whistle2.png','images/redcard.png','images/yellowcard.png']);
            })
        )
    }
);

/*self.addEventListener('fetch', e=>{
        e.respondWith(
            caches.match(e.request).then(Response => {
                return Response ||fetch(e.request);
            })
        )
    }
);*/

self.addEventListener('fetch', event => {
    console.log('Fetch event for ', event.request.url);
    event.respondWith(
        caches.match(event.request)
        .then(response => {
            if (response) {
                console.log('Found ', event.request.url, ' in cache');
                return response;
            }
            console.log('Network request for ', event.request.url);
            return fetch(event.request)
  
            .then(response => {
                // TODO 5 - Respond with custom 404 page
                return caches.open(staticCacheName).then(cache => {
                    cache.put(event.request.url, response.clone());
                    return response;
                });
            });
  
        }).catch(error => {
  
            // TODO 6 - Respond with custom offline page
  
        })
    );
});

self.addEventListener('activate', event => {
    console.log('Activating new service worker...');
  
    const cacheAllowlist = [staticCacheName];
  
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheAllowlist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});