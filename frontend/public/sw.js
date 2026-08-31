// Cyber Kit Police — Service Worker for Background Push Notifications
// This runs in the background even when the app/browser is closed

const CACHE_NAME = 'cyberkit-police-v1';

// Install event
self.addEventListener('install', (event) => {
  console.log('[CyberKit SW] Service Worker installed');
  self.skipWaiting();
});

// Activate event
self.addEventListener('activate', (event) => {
  console.log('[CyberKit SW] Service Worker activated');
  event.waitUntil(self.clients.claim());
});

// PUSH EVENT — This fires even when phone is locked/sleeping!
self.addEventListener('push', (event) => {
  console.log('[CyberKit SW] Push notification received!');

  let data = {
    title: '🚨 DIAL 100/112 EMERGENCY SOS ALERT',
    body: 'CRITICAL: Emergency distress alert received! Open Cyber Kit immediately.',
    crime_category: 'EMERGENCY_SOS',
    location: 'Unknown',
    victim_phone: 'Unknown'
  };

  if (event.data) {
    try {
      data = event.data.json();
    } catch (e) {
      data.body = event.data.text();
    }
  }

  const options = {
    body: data.body || `${data.crime_category} at ${data.location}. Victim: ${data.victim_phone}. Officer dispatched!`,
    icon: '/pwa-icon-192.png',
    badge: '/pwa-icon-192.png',
    vibrate: [300, 100, 300, 100, 500, 200, 300],
    tag: 'cyberkit-sos-' + Date.now(),
    renotify: true,
    requireInteraction: true,
    actions: [
      { action: 'open', title: '🚔 OPEN DISPATCH' },
      { action: 'acknowledge', title: '✔ ACKNOWLEDGE' }
    ],
    data: data
  };

  event.waitUntil(
    self.registration.showNotification(data.title || '🚨 CYBER KIT SOS ALERT', options)
  );
});

// Notification click — opens the app
self.addEventListener('notificationclick', (event) => {
  console.log('[CyberKit SW] Notification clicked:', event.action);
  event.notification.close();

  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clients) => {
      // If app is already open, focus it
      for (const client of clients) {
        if (client.url.includes('/') && 'focus' in client) {
          return client.focus();
        }
      }
      // Otherwise open new window
      return self.clients.openWindow('/');
    })
  );
});
