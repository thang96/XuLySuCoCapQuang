import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
  Modal,
  Dimensions,
  FlatList,
  ScrollView,
} from 'react-native';
import {colors, icons, images} from '../../Constants';
import CustomButtonLogo from '../CustomButtonLogo';
import {uuid} from '../../Utils/uuid';
import CustomTextInput from '../CustomTextInput';
import CustomButton from '../CustomButton';
import CustomTwoBottomButtonFuntion from '../../Components/CustomTwoBottomButtonFuntion';

const FAKE_DATA = [
  {
    title: 'Template 01',
    frontCard: images.im_commonCard,
    backOfCard: images.im_otherCard,
  },
  {
    title: 'Template 02',
    frontCard: images.im_otherCard,
    backOfCard: images.im_commonCard,
  },
  {
    title: 'Template 03',
    frontCard: images.backgroundZ,
    backOfCard: images.background,
  },
];
const CustomModalChooseThemeTemplate = props => {
  const imageWidth = Dimensions.get('window').width - 20;
  const widthWindow = Dimensions.get('window').width - 20;
  const widthHeight = Dimensions.get('window').height;
  const heightIMG = widthWindow / 1.8;
  const {modalVisible, onRequestClose, closeModal} = props;
  const [showDetail, setShowDetail] = useState(false);

  const [detailCard, setDetailCard] = useState(null);

  const renderItemCard = (item, index) => {
    return (
      <View style={{marginBottom: 15}}>
        <View style={[styles.viewRowRender, {marginBottom: 5}]}>
          <Text style={styles.titleRender}>{item.title}</Text>
          <CustomButton
            title={'More'}
            styleText={styles.styleTextMore}
            onPress={() => {
              setDetailCard(item);
              setShowDetail(true);
            }}
          />
        </View>
        <View style={styles.viewRowRender}>
          <Image source={item.frontCard} style={styles.imageRender} />
          <Image source={item.backOfCard} style={styles.imageRender} />
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={onRequestClose}>
        <View
          style={[
            styles.eachContainer,
            {height: widthHeight - (heightIMG + 145)},
          ]}>
          <View style={styles.viewRow}>
            <Text style={styles.title}>Theme Template</Text>
            <CustomButtonLogo
              source={icons.ic_closeRed}
              styleButton={{width: 25, height: 25}}
              onPress={closeModal}
            />
          </View>
          {!showDetail ? (
            <View style={styles.viewListItem}>
              <CustomTextInput
                disabled={false}
                image={icons.ic_search}
                placeholder={'Seach template'}
                styleViewInput={styles.styleCustomTextInput}
              />
              <FlatList
                data={FAKE_DATA}
                keyExtractor={uuid}
                renderItem={({item, index}) => renderItemCard(item, index)}
              />
            </View>
          ) : (
            <ScrollView style={styles.viewListItem}>
              <Image
                source={detailCard.frontCard}
                style={{
                  width: imageWidth,
                  height: imageWidth / 1.8,
                  borderRadius: 10,
                  marginVertical: 10,
                }}
              />
              <Image
                source={detailCard.backOfCard}
                style={{
                  width: imageWidth,
                  height: imageWidth / 1.8,
                  borderRadius: 10,
                }}
              />
              <CustomTwoBottomButtonFuntion
                styleTwoButton={{height: 50, marginTop: 20}}
                titleLeft={'Back'}
                titleRight={'Apply'}
                styleTextLeft={{color: 'white'}}
                styleTextRight={{color: 'white'}}
                styleButtonLeft={{backgroundColor: colors.backgroundButtonRed}}
                styleButtonRight={{backgroundColor: colors.backgroundButton}}
                onPressLeft={() => setShowDetail(false)}
                onPressRight={() => {}}
              />
            </ScrollView>
          )}
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  eachContainer: {
    backgroundColor: colors.backgroundInput,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flex: 1,
  },
  viewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    borderBottomWidth: 2,
    borderBottomColor: 'rgb(199,199,199)',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
  },
  title: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18,
  },
  content: {color: 'grey', fontWeight: '500', fontSize: 16, marginBottom: 5},
  viewListItem: {
    paddingHorizontal: 10,
    flex: 1,
  },
  styleCustomTextInput: {
    backgroundColor: 'white',
    borderRadius: 10,
    height: 45,
    width: '100%',
    marginVertical: 10,
  },
  viewRowRender: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleRender: {fontSize: 16, fontWeight: 'bold', color: 'black'},
  imageRender: {borderRadius: 10, width: 160, height: 160 / 1.8},
  styleTextMore: {color: colors.backgroundButtonGreen, fontSize: 15},
});
export default CustomModalChooseThemeTemplate;
