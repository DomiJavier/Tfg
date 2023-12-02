import PushNotification from 'react-native-push-notification';

export const configurePushNotifications = () => {
  PushNotification.configure({
    onRegister: function (token) {
      console.log('TOKEN:', token);
    },
    onNotification: function (notification) {
      console.log('NOTIFICATION:', notification);
      // Aquí puedes manejar la notificación, por ejemplo, navegar a una pantalla específica.
    },
    // Otros eventos y configuraciones...
  });
};