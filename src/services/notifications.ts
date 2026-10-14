import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

// Permite exibir a notificação mesmo com o app aberto.
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export const sendTestNotification = async (): Promise<void> => {
  // No Android, cria o canal antes de solicitar a permissão.
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("mustache-default", {
      name: "Notificações do Mustache Finance",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      sound: "default",
    });
  }

  // Verifica a permissão atual.
  const { status: currentStatus } = await Notifications.getPermissionsAsync();

  let finalStatus = currentStatus;

  // Solicita permissão somente se ainda não estiver concedida.
  if (currentStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== "granted") {
    throw new Error(
      "Permissão de notificação negada. Ative-a nas configurações do celular.",
    );
  }

  // Dispara uma notificação local imediatamente.
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Mustache Finance 🥸",
      body: "Tudo certo! Suas notificações estão funcionando.",
      sound: "default",
      data: {
        type: "notification-test",
      },
    },
    trigger: null,
  });
};
