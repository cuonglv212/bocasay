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
import { getCharacterDetail } from '../actions/characterActions';

export default function TabTwoScreen() {
  const counter = useSelector((state: any) => state.characterReducers)
  const navigation = useNavigation()
  const route = useRoute<RouteProp<TabTwoParamList, 'TabTwoScreen'>>();
  const char_id = 1
  //  route.params.char_id
  // const [detailCharacter, setDetailCharacter] = React.useState<Character>(Object);
  const [isLoading, setLoading] = React.useState<boolean>(true)

  const characterReducers = useSelector((state: any)=> state.characterReducers)
  const detailCharacter = characterReducers.detail || {}
  const dispatch = useDispatch()

  React.useEffect(() => {
    getDetailCharacter(char_id)
  }, [char_id])

  React.useEffect(() => {
    if (isLoading && detailCharacter !== {}) setLoading(false);
  }, [detailCharacter]);

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
      <Header title={'Detail'} />
      {isLoading ? detailSkeleton() :
        <View style={styles.content}>
          <Image
            style={styles.avatar}
            source={{
              uri: detailCharacter.img
            }}
          />
          <Text style={styles.title}>{detailCharacter.name}</Text>
          <Text style={styles.title}>{detailCharacter.nickname}</Text>
          <Text style={styles.title}>{detailCharacter.status}</Text>
          <Text style={styles.title}>{detailCharacter.portrayed}</Text>
          {detailCharacter?.occupation?.map((item, index)=><Text key={index} style={styles.title}>{item}</Text>)}
          <Text style={styles.title}>{detailCharacter.category}</Text>
          <Text style={styles.title}>{detailCharacter.birthday}</Text>
          {detailCharacter?.better_call_saul_appearance?.map((item, index)=><Text key={index} style={styles.title}>{item}</Text>)}
          
          <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
          {/* <EditScreenInfo path="/screens/TabTwoScreen.tsx" /> */}
          <TouchableOpacity
            onPress={() => {
              navigation.goBack()
            }}
          >
            <Text style={styles.title}>Go back</Text>
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
          </TouchableOpacity>
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
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingTop: 15
  }
});
