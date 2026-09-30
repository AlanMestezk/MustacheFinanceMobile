import { Image, Text, View } from "react-native";

//@ts-ignore
import appIcon from "../../../../../assets/logo/icon.png";

import { styles } from "./styles/NewTransactionHeader.styles";

export const NewTransactionHeader = () => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Adicionar</Text>

        <Text style={styles.userName}>Alan</Text>

        <Text style={styles.subtitle}>Adicione novas transações ou metas</Text>
      </View>

      <Image source={appIcon} style={styles.appIcon} />
    </View>
  );
};
