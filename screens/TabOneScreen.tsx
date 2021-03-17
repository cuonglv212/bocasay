import { useNavigation } from '@react-navigation/core';
import * as React from 'react';
import {
  FlatList
  , Image
  , StatusBar
  , SafeAreaView,
  ActivityIndicator
} from 'react-native';
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import EditScreenInfo from '../components/EditScreenInfo';
import Header from '../components/header';
import { Text, View } from '../components/Themed';

const Item = ({ item }) => {
  const navigation = useNavigation()
  const onClickItem = () => {
    navigation.navigate('TabTwoScreen', {char_id: item.char_id})
  }
  return (
    <TouchableOpacity
      onPress={onClickItem}
      style={styles.item}>
      <Image
        style={styles.avatar}
        source={{
          uri: item.img
        }}
      />
      <View style={styles.avatar_detail}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.title}>{item.char_id}</Text>
      </View>
    </TouchableOpacity>
  )
};

interface character {
  char_id: string,
  name: string,
  birthday: string,
  occupation: Array<string>[],
  img: string,
  status: string,
  nickname: string,
  appearance: Array<string>[],
  portrayed: string,
  category: string,
  better_call_saul_appearance: Array<number>[]
}

export default function TabOneScreen() {
  const renderItem = ({ item }) => <Item item={item} />;

  const [isLoading, setIsLoading] = React.useState(true);
  const [isLoadMore, setIsLoadMore] = React.useState(false);

  const [data, setData] = React.useState<Array<character>>([]);
  const [pageNumber, setPageNumber] = React.useState<number>(0);

  async function getAPI<T>(
    request: RequestInfo
  ): Promise<T> {
    const response = await fetch(request);
    const body = await response.json();
    return body;
  }

  const loadCharacter = async (page) => {
    setIsLoadMore(true)
    const response = await getAPI<Array<character>>(`https://breakingbadapi.com/api/characters?limit=10&offset=${10*page}`);
    const results = await response;
    if (results) {
      setData((oldDate) => [...oldDate, ...results]);
      if (isLoading) setIsLoading(false);
      setIsLoadMore(false)
    }
  };

  React.useEffect(() => {
    loadCharacter(pageNumber);
  }, []);

  const onLoadMore = () => {
    if (!onEndReachedCalledDuringMomentum.current) {
      const nextPage = pageNumber + 1
      setPageNumber(nextPage)
      loadCharacter(nextPage)
      onEndReachedCalledDuringMomentum.current = true;
    }
  }


  const loadingView = () => (
    <View style={[styles.container_spiner, styles.horizontal]}>
      <ActivityIndicator size="large" color="#00ff00" />
    </View>
  )

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

  const renderFooter = () => {
    if (isLoadMore)
      return (
        //Footer View with Load More button
        <View style={styles.footer}>
          <ActivityIndicator size="large" color="#00ff00" />
        </View>
      );
    return null
  };

  const onEndReachedCalledDuringMomentum = React.useRef<boolean>(true)

  React.useEffect(()=>{
    data.forEach(e=> console.log(e.char_id))
  }, [data])


  return (
    <SafeAreaView style={styles.container}>
      <Header/>
      { isLoading ?
        loadingView()
        :
        <FlatList
          data={data}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={renderItem}
          ListFooterComponent={renderFooter}
          onEndReached={onLoadMore}
          onEndReachedThreshold={0.5}
        onMomentumScrollBegin={() => { onEndReachedCalledDuringMomentum.current = false }}
        />
      }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container_header: {
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 60,
    flexDirection: 'row',
    paddingHorizontal: 25
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    flexDirection: 'row'
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50
  },
  avatar_detail: {
    marginLeft: 15,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: 'transparent'
  },
  container_spiner: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  footer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  loadMoreBtn: {
    padding: 10,
    backgroundColor: '#800000',
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
  },
});
