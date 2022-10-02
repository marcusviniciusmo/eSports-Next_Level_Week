import { Background } from '../../components/Background';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, TouchableOpacity, Image, FlatList, Text } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { GameParams } from '../../@types/navigation';
import { Entypo } from '@expo/vector-icons';
import { THEME } from '../../theme';
import LogoImg from '../../assets/logo-nlw-esports.png';
import { styles } from './styles';
import { Heading } from '../../components/Heading';
import { DuoCard, DuoCardProps } from '../../components/DuoCard';
import { useEffect, useState } from 'react';

export function Game() {
  const [ads, setAds] = useState<DuoCardProps[]>([]);
  const route = useRoute();
  const game = route.params as GameParams;
  const navigation = useNavigation();

  function handleGoBack() {
    navigation.goBack();
  };

  useEffect(() => {
    fetch(`http://192.168.0.171:3333/games/${game.id}/ads`)
      .then(response => response.json())
      .then(data => setAds(data))
  }, []);

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack}>
            <Entypo
              name='chevron-thin-left'
              color={THEME.COLORS.CAPTION_300}
              size={20}
            />
          </TouchableOpacity>

          <Image
            source={LogoImg}
            style={styles.logo}
          />

          <View style={styles.right} />
        </View>

        <Image
          source={{ uri: game.bannerUrl }}
          style={styles.cover}
          resizeMode="cover"
        />

        <Heading
          title={game.title}
          subtitle='Conecte-se e comece a jogar!'
        />

        <FlatList
          data={ads}
          keyExtractor={item => item.id}
          renderItem={({ item }) => {
            return (
              <DuoCard
                data={item}
                onConnect={() => { }}
              />
            )
          }}
          horizontal
          style={styles.containerList}
          contentContainerStyle={ads.length > 0 ? styles.contentList : styles.emptyListContent}
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={() => (
            <Text style={styles.emptyListText}>
              Não há anúncios publicados ainda.
            </Text>
          )}
        />
      </SafeAreaView>
    </Background>
  );
};