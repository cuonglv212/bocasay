import { useNavigation } from '@react-navigation/core';
import { RouteProp, useRoute } from '@react-navigation/native';
import * as React from 'react';
import { StyleSheet, Image, SafeAreaView, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';

import EditScreenInfo from '../components/EditScreenInfo';
import Header from '../components/header';
import { Text, View } from '../components/Themed';
import { CommentsParamList, TabTwoParamList } from '../types';

import {
    Placeholder,
    PlaceholderMedia,
    PlaceholderLine,
    Fade
} from "rn-placeholder";
import { useDispatch, useSelector } from 'react-redux'
import Character from '../model/character';
import { getCharacterDetail, getRandomQuote, resetDetail } from '../actions/characterActions';
import AsyncStorage from "@react-native-async-storage/async-storage";

function storeData(value, key) {
    AsyncStorage.setItem(`@storage_Key_${key.toString()}`, value)
        .then(() => {
            // console.log("Stored value", value);
        })
        .catch((e) => {
            alert("Error saving to AsyncStorage:" + JSON.stringify(e));
        });
}

function getData(setData, key) {
    AsyncStorage.getItem(`@storage_Key_${key.toString()}`)
        .then((value) => {
            // console.log("Got value", value);
            setData(JSON.parse(value)|| [])
        })
        .catch((e) => {
            console.log("Error reading from AsyncStorage: " + JSON.stringify(e));
        });
}

export default function CommentsScreen() {
    const navigation = useNavigation()
    const route = useRoute<RouteProp<CommentsParamList, 'CommentsScreen'>>();
    const char_id = route.params.char_id

    const renderItem = ({ item }) => {
        return (
            <View style={{
                width: '100%'
            }}>
                <View style={styles.item_comment}>
                    <Image
                        style={styles.avatar}
                        source={{
                            uri: "https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png"
                        }}
                    />
                    <View style={{
                        paddingLeft: 15
                    }}>
                        <Text style={styles.title}>{item}</Text>
                    </View>

                </View>
                {ItemSeparatorView()}

            </View>

        )
    }
    const [inputheight, setInputheight] = React.useState(17)
    const [text, onChangeText] = React.useState("");

    const [data, setData] = React.useState([] as any);

    React.useEffect(() => {
        getData(setData, char_id);
    }, []);

    const ItemSeparatorView = () => {
        return (
            // Flat List Item Separator
            <View
                style={{
                    height: 0.5,
                    width: '100%',
                    backgroundColor: '#C8C8C8',
                }}
            />
        );
    };
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}>
            <Header
                title={'Comments'}
                onPressLeft={() => {
                    const value = JSON.stringify(data);
                    storeData(value, char_id);
                    navigation.goBack()
                }} />
            <View style={styles.content}>
                <FlatList
                    style={styles.list_comments}
                    data={data}
                    keyExtractor={(item, index) => (index).toString()}
                    renderItem={renderItem}
                    onEndReachedThreshold={0.5}
                />
                <View style={styles.input_contain}>
                    <TextInput
                        textAlign={'left'}
                        placeholder="Your Account"
                        // {...this.props}
                        multiline={true}
                        numberOfLines={5}
                        onChangeText={onChangeText}
                        value={text}
                        onContentSizeChange={(event) => {
                            setInputheight(event.nativeEvent.contentSize.height)
                        }}
                        style={[styles.input, { height: Math.max(35, inputheight) }]}
                    />
                    <TouchableOpacity
                        onPress={() => {
                            onChangeText("")
                            setData((oldaData: any) => [...oldaData, text])
                        }}
                    >
                        <Text style={styles.title}>Send</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        // justifyContent: 'center',
        // backgroundColor: 'gray'
    },
    content: {
        flex: 1,
        width: '100%'
    },
    input: {
        // height: 35,
        width: 300,
        borderWidth: 1,
        borderRadius: 10,
        // padding: 5,
        paddingLeft: 15,
        // textAlign: 'left',
        // alignSelf: 'center',
    },
    list_comments: {
        paddingHorizontal: 15,
        paddingTop: 25
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    input_contain: {
        margin: 15,
        flexDirection: 'row',
        // width:'100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        // paddingBottom: 15
    },
    avatar: {
        width: 25,
        height: 25,
        borderRadius: 10
    },
    item_comment: {
        flexDirection: 'row',
        paddingVertical: 10
    }
});
