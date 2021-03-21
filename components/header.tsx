import * as React from 'react';
import { StyleSheet, Image, SafeAreaView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { Text, View } from '../components/Themed';

export default function Header ({title, onPressLeft, onPressRight}) {
    return (
        <View style={styles.container_header}>
            <TouchableOpacity onPress={onPressLeft}>
                <Text style={styles.title}>Back</Text>
            </TouchableOpacity>
            <Text style={styles.title}>{title}</Text>
            <TouchableOpacity onPress={onPressRight}>
                <Text style={styles.title}>Menu</Text>
            </TouchableOpacity>
        </View>
    )
}

Header.defaultProps = {
    title: "default"
    , onPressLeft: ()=>{}
    , onPressRight: ()=>{}
  };

const styles = StyleSheet.create({
    container_header: {
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 60,
        flexDirection: 'row',
        paddingHorizontal: 25,
        width: "100%",
        backgroundColor: 'transparent'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});