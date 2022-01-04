import * as React from 'react';
import styled from "styled-components/native";
import {Animated, Dimensions, Easing, Pressable, View} from "react-native";
import {Ionicons} from '@expo/vector-icons';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import {getBottomSpace, isIphoneX} from 'react-native-iphone-x-helper';
import shortID from 'shortid';
import AppLoading from 'expo-app-loading';
import axios from '../helpers/axios';

const {width, height} = Dimensions.get("window");

const TodoMainScreen: React.FC = () => {
  const [newTodo, setNewTodo] = React.useState('');
  const [isOpenNewTodo, setIsOpenNewTodo] = React.useState(false);
  const [checkboxes, setCheckboxes] = React.useState<{ checked: boolean, title: string, id: string }[]>([]);
  const widthAnim = React.useRef(new Animated.Value(0)).current;

  const [loading, setLoading] = React.useState(false);

  function changeCheckbox(ind: number, val: boolean) {
    const checkboxesCloned = [...checkboxes];
    checkboxesCloned[ind].checked = val;
    setCheckboxes(checkboxesCloned);
  }

  React.useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await axios.get('/api/todos');
        setCheckboxes(res.data);
      } catch {
        // handle error
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  async function addNewTodo() {
    if (isOpenNewTodo) {
      if (newTodo) {
        const newTodoDB = [{title: newTodo, checked: false, id: shortID.generate()}];
        setCheckboxes((checkboxOld) => checkboxOld.concat(newTodoDB));
        setNewTodo('');

        axios.post('/api/todo', {
          todos: newTodoDB
        });
      }

      Animated.timing(
        widthAnim,
        {
          toValue: 0,
          duration: 200,
          easing: Easing.sin,
          useNativeDriver: false,
        }
      ).start();
      setIsOpenNewTodo(false);
    } else {
      Animated.timing(
        widthAnim,
        {
          toValue: 1,
          duration: 200,
          easing: Easing.sin,
          useNativeDriver: false,
        }
      ).start();
      setIsOpenNewTodo(true);
    }
  }

  if (loading) return <AppLoading/>

  return (
    <Container>
      <ImageComponent
        source={require('../assets/images/masthead.png')}
      />

      <TextAlert>
        Xin chào.
      </TextAlert>

      <Main>
        {
          checkboxes.map((checkboxItem, ind) => (
            <View key={checkboxItem.id}>
              <BouncyCheckbox
                size={25}
                isChecked={checkboxItem.checked}
                fillColor="#006AD8"
                unfillColor="#FFFFFF"
                text={checkboxItem.title}
                iconStyle={{borderColor: "#006AD8", borderRadius: 5}}
                textStyle={{fontFamily: "popPin"}}
                onPress={(newCheck) => changeCheckbox(ind, newCheck)}
              />
              <Divider/>
            </View>
          ))
        }
      </Main>

      <CreateTodo>
        <Pressable onPress={addNewTodo}>
          {
            isOpenNewTodo ? (
              <Ionicons name="ios-send" size={20} color="#fff"/>
            ) : (
              <Ionicons name="add" size={20} color="#fff"/>
            )
          }
        </Pressable>
      </CreateTodo>
      <Animated.View
        style={{
          transform: [
            {
              translateX: widthAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [width - 100, 0],
              })
            }
          ],
          opacity: widthAnim,
          zIndex: 1,
          position: 'absolute',
          left: 25,
          bottom: isIphoneX() ? getBottomSpace() : 25,
          backgroundColor: '#006AD8',
          borderRadius: 5,
          width: width - 100,
        }}
      >
        <TodoInput
          value={newTodo}
          onChangeText={setNewTodo}
          placeholder="New todo"
          placeholderTextColor="#fff"
        />
      </Animated.View>
    </Container>
  )
}

const Divider = styled.View`
  width: ${width}px;
  height: 5px;
`;

const TodoInput = styled.TextInput`
  color: #fff;
  font-family: popPin;
  padding: 10px 20px;
`;

const CreateTodo = styled.View`
  position: absolute;
  bottom: ${isIphoneX() ? getBottomSpace() : 25}px;
  right: 25px;
  background: #006AD8;
  z-index: 2;
  padding: 10px;
  border-radius: 20px;
`;

const TextAlert = styled.Text`
  color: #fff;
  font-family: popPinBold;
  font-size: 20px;
  margin-top: -30px;
  margin-bottom: 10px;
  margin-left: 15px;
`;

const Main = styled.View`
  height: ${height - 150}px;
  background-color: #fff;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  overflow: hidden;
  padding: 20px 15px 15px;
`;

const Container = styled.SafeAreaView`
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  background-color: #006AD8;
`;

const ImageComponent = styled.Image`
  width: ${width}px;
  height: ${height / 4}px;
`;

export {TodoMainScreen};