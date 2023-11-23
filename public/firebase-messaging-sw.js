self.addEventListener('install', function (e) {
  console.log('fcm sw install..');
  self.skipWaiting();
});

self.addEventListener('activate', function (e) {
  console.log('fcm sw activate..');
});

self.addEventListener('push', function (e) {
  const resultData = e.data.json();
  if (!resultData) {
    return;
  }
  console.log('push: ', resultData);

  const notificationTitle = resultData.notification.title;
  const notificationOptions = {
    body: resultData.notification.body,
    icon: resultData.notification.image,
    ...resultData.notification
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener('notificationclick', function (event) {
  console.log('notificationclick: ', event.notification);

  // 알림을 닫습니다.
  event.notification.close();

  // event.action 값을 확인하여 해당 액션에 대한 적절한 처리를 합니다.
  let actionUrl = '/';
  switch (event.notification.actions[0].action) {
    case 'view_product':
      // 'view_product' 액션의 경우, 알림에 포함된 상품 URL을 엽니다.
      actionUrl = event.notification.data.url;
      break;
    // 다른 액션 처리를 위한 case를 추가할 수 있습니다.
    default:
      // 기본 액션의 경우, 홈페이지를 엽니다.
      actionUrl = '/';
      break;
  }
  console.log('actionUrl: ', actionUrl);

  // 액션에 맞는 URL을 열도록 클라이언트에게 지시합니다.
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then(function (windowClients) {
      // 이미 열려있는 탭이 있는지 확인하고, 있다면 포커스합니다.
      for (var i = 0; i < windowClients.length; i++) {
        var client = windowClients[i];
        if (client.url === actionUrl && 'focus' in client) {
          return client.focus();
        }
      }
      // 새 창을 열어야 할 때
      if (clients.openWindow) {
        return clients.openWindow(actionUrl);
      }
    })
  );
});
