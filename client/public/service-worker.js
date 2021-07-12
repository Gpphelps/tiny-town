const CACHE_NAME = 'tiny-town';

const FILES_TO_CACHE = [
    '/',
    '/index.html',
    '/style.css',
    '/city.js',
    '/classes.js',
    '/editor.js',
    '/index.js',
    '/loader.js',
    '/orbit.js',
    '/tools.js',
    '/db.js',
    '/cityEngine/Objects/Commercial/onebyoneshop.glb',
    '/cityEngine/Objects/Commercial/shopbase2.glb',
    '/cityEngine/Objects/Commercial/shopmid.glb',
    '/cityEngine/Objects/Commercial/shoproof.glb',
    '/cityEngine/Objects/Office/modernofficebase.glb',
    '/cityEngine/Objects/Office/modernofficemid.glb',
    '/cityEngine/Objects/Office/modernofficeroof.glb',
    '/cityEngineObjects/Park/park-1x1-01.glb',
    '/cityEngineObjects/Park/park.glb',
    '/cityEngine/Objects/Residential/apartment.glb',
    '/cityEngine/Objects/Residential/apartmentbase2.glb',
    '/cityEngine/Objects/Residential/apartmentmid.glb',
    '/cityEngine/Objects/Residential/apartmentroof.glb',
    '/cityEngine/Objects/Roads/road-pholder-3way.mtl',
    '/cityEngine/Objects/Roads/road-pholder-3way.obj',
    '/cityEngine/Objects/Roads/road-pholder-4way.mtl',
    '/cityEngine/Objects/Roads/road-pholder-4way.obj',
    '/cityEngine/Objects/Roads/road-pholder-corner.mtl',
    '/cityEngine/Objects/Roads/road-pholder-corner.obj',
    '/cityEngine/Objects/Roads/road-pholder-straight.mtl',
    '/cityEngine/Objects/Roads/road-pholder-straight.obj',
    '/cityEngine/Objects/Roads/road-pholder.png',
    '/cityEngine/Objects/Roads/road2way.glb',
    '/cityEngine/Objects/Roads/road3way.glb',
    '/cityEngine/Objects/Roads/road4way.glb',
    '/cityEngine/Objects/Roads/roadCorner.glb',
    'cityEngine/Objects/Skyscraper/skyscraperbase.gbl',
    'cityEngine/Objects/Skyscraper/skyscrapermid.gbl',
    'cityEngine/Objects/Skyscraper/skyscraperroof.gbl',
    '/cityEngine/Assets/roundshadow.png'
];

// Installs the service worker
self.addEventListener('install', function (event) {
    // Caches static assets
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then((cache) => cache.addAll(FILES_TO_CACHE))
    );
    // Tells browser to activate the service worker immediately once it has finished installing
    self.skipWaiting();
});

// Activates cache
self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys().then(keyList => {
            return Promise.all(
                keyList.map(key => {
                    if (key !== CACHE_NAME) {
                        console.log('Removing old cache data', key);
                        return caches.delete(key);
                    }
                })
            );
        })
    );
    
    self.clients.claim();
});

// Sends cached static files to the indexDB if offline
self.addEventListener('fetch', async (event) => {
    if (event.request.method === 'POST') {
        event.respondWith(
            staleWhileRevalidate(event)
        );
    }
});