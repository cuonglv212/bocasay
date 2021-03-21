import { useNavigation } from '@react-navigation/core';
import { RouteProp, useRoute } from '@react-navigation/native';
import * as React from 'react';
import { StyleSheet, Image, SafeAreaView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import EditScreenInfo from '../components/EditScreenInfo';
import Header from '../components/header';
import { Text, View } from '../components/Themed';
import { TabTwoParamList } from '../types';

import {
  Placeholder,
  PlaceholderMedia,
  PlaceholderLine,
  Fade
} from "rn-placeholder";
import { useDispatch, useSelector } from 'react-redux'
import Character from '../model/character';
import { getCharacterDetail, getRandomQuote, resetDetail } from '../actions/characterActions';

export default function TabTwoScreen() {
  const navigation = useNavigation()
  const route = useRoute<RouteProp<TabTwoParamList, 'TabTwoScreen'>>();
  const char_id = route.params.char_id
  const [isLoading, setLoading] = React.useState<boolean>(true)

  const characterReducers = useSelector((state: any) => state.characterReducers)
  const detailCharacter = characterReducers.detail || {}
  const quote = characterReducers.quote
  const dispatch = useDispatch()

  React.useEffect(() => {
    getDetailCharacter(char_id)
    dispatch(getRandomQuote())

    return () => {
      dispatch(resetDetail())
    }
  }, [char_id])

  const getDetailCharacter = async (char_id) => {
    dispatch(getCharacterDetail(char_id))
  };

  const detailSkeleton = () => (
    <View style={styles.content}>
      <PlaceholderMedia size={80} isRound />
      <Placeholder
        Animation={Fade}
      >

        <View style={{ width: "100%", alignItems: 'center', paddingTop: 5 }}>
          <PlaceholderLine width={35} height={25} />
        </View>
      </Placeholder>

      <Placeholder
        Animation={Fade}
      >
        <PlaceholderLine />

        <PlaceholderLine width={60} />
        <PlaceholderLine width={40} />
        <PlaceholderLine width={50} />
        <PlaceholderLine width={40} />
        <PlaceholderLine />
        <PlaceholderLine width={30} />
        <PlaceholderLine width={30} />
        <PlaceholderLine />
        <PlaceholderLine width={20} />

      </Placeholder>
    </View>
  );

  return (
    <SafeAreaView
      style={styles.container}>
      <Header
        title={'Detail'}
        onPressLeft={() => {
          navigation.goBack()
        }} />
      {characterReducers.isLoadingDetail ? detailSkeleton() :
        <View style={styles.content}>
          <Image
            style={styles.avatar}
            source={{
              uri: detailCharacter.img
            }}
          />
          <Text style={styles.title}>{detailCharacter.name}</Text>
          <Text style={styles.title}>{detailCharacter.nickname}</Text>
          <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
          <View style={styles.container_detail}>

            <Text style={styles.title}>{detailCharacter.status}</Text>
            <Text style={styles.title}>{detailCharacter.portrayed}</Text>
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
            <Text style={styles.title}>{detailCharacter.category}</Text>
            <Text style={styles.title}>{detailCharacter.birthday}</Text>
            {/* {detailCharacter?.better_call_saul_appearance?.map((item, index) => <Text key={index} style={styles.title}>{item}</Text>)} */}

            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
          </View>

          {quote.quote && <View style={styles.container_quote}>
            <View style={styles.quote_bubble}>
              <Text style={styles.text_quote}>" {quote.quote} "</Text>
              <Text style={styles.text_quote_author}>{quote.author}</Text>
            </View>
            <TouchableOpacity
              style={styles.quote_refresh}
              onPress={() => {
                dispatch(getRandomQuote())
              }}
            >
              <Text style={styles.title}>refresh</Text>
            </TouchableOpacity>
          </View>}

          <View style={styles.content_comments_button}>
            <TouchableOpacity
              // style={styles.quote_refresh}
              onPress={() => {
                navigation.navigate('CommentsScreen', {char_id: detailCharacter.char_id})
              }}
            >
              <Text style={styles.title}>Rewrite Comment</Text>
            </TouchableOpacity>
          </View>

        </View>
      }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
    // backgroundColor: 'gray'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50
  },
  container_skeleton: {
    flex: 1
  },
  content: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    // paddingHorizontal: 25,
    paddingTop: 15
  },
  container_detail: {
    // flex: 1,
    width: '100%',
    paddingHorizontal: 25
  },
  text_quote: {
    fontStyle: 'italic',
    fontSize: 16,
    fontWeight: "400"
  },
  text_quote_author: {
    fontStyle: 'italic',
    textAlign: "right",
    width: '100%',
    paddingTop: 5,
    paddingRight: 15
  },
  quote_bubble: {
    backgroundColor: '#f0f0f5',
    // width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    marginHorizontal: 25,
    borderRadius: 25
  },
  container_quote: {
    width: '100%',
    alignContent: 'center',
    justifyContent: 'center',
    paddingBottom: 25,
  },
  quote_refresh: {
    paddingTop: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  content_comments_button: {
    // width: '100%',
    backgroundColor: '#3399ff',
    borderRadius: 15,
    padding: 10,
    height: 45
  }
});
