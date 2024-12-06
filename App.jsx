import { Linking, StyleSheet, Text, TouchableOpacity, View, FlatList } from 'react-native';
import React, { useRef, useState } from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';

const App = () => {
  const qrcodeRef = useRef(null);
  const [links, setLinks] = useState([]);

  const handleLink = (link) => {
    if (link) {
      Linking.openURL(link).catch((err) => {
        console.error("Failed to open link:", err);
      });
      qrcodeRef.current.reactivate();
    }
  };

  const onScan = ({ data }) => {
    setLinks((prevLinks) => [...prevLinks, data]);
  };

  return (
    <QRCodeScanner
      ref={qrcodeRef}
      onRead={onScan}
      flashMode={RNCamera.Constants.FlashMode.off}
      topContent={
        <View>
          <Text>Scanned Links:</Text>
          <FlatList
            data={links}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleLink(item)} style={styles.link}>
                <Text style={styles.linkText}>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      }
    />
  );
};

const styles = StyleSheet.create({
  link: {
    padding: 12,
    backgroundColor: "#0277BD",
    marginVertical: 5,
    borderRadius: 5
  },
  linkText: {
    color: "#FFFFFF"
  }
});

export default App;
