import * as React from 'react';
import {ActivityIndicator, Dimensions, Pressable} from 'react-native';
import styled from 'styled-components/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {Input} from "../components/Input";
import {Button} from "../components/Button";
import {RootStackParamList} from "./screen";
import axios from '../helpers/axios';

const {width, height} = Dimensions.get("window");

type mainScreenProp = NativeStackScreenProps<RootStackParamList, 'Login'>;

function SignUpScreen(props: mainScreenProp) {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [rePassword, setRePassword] = React.useState('');
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  async function signUpFn() {
    if (!username) {
      setError('Tên đăng nhập không được để trống');
      return;
    }

    if (!password) {
      setError('Mật khẩu không được để trống');
      return;
    }

    if (password !== rePassword) {
      setError('Hai mật khẩu phải giống nhau');
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post('/api/register', {
        username,
        password,
      });
      if (res.data.msg) {
        await AsyncStorage.setItem('jwt', res.headers.jwt);
        props.navigation.replace('TodoMainScreen');
      }
    } catch {
      setError('Đăng ký thất bại');
    } finally {
      setLoading(false);
    }
  }

  function changLogin() {
    props.navigation.replace('Login');
  }

  return (
    <Container>
      <ImageComponent
        source={require('../assets/images/about-masthead.png')}
      />

      <Context>
        <ErrorText>{error}</ErrorText>
        <Input
          value={username}
          onChange={setUsername}
          placeholder="Tên đăng nhập"
        />

        <BreakLine/>
        <Input
          value={password}
          isPassword
          onChange={setPassword}
          placeholder="Mật khẩu"
        />
        <BreakLine/>
        <Input
          value={rePassword}
          isPassword
          onChange={setRePassword}
          placeholder="Nhập lại mật khẩu"
        />
        <BreakLine/>
        {
          loading ? <ActivityIndicator size="small" color="#fff"/> : <Button textButton="Đăng ký" onPress={signUpFn}/>
        }

        <Pressable onPress={changLogin}>
          <NotRegister>
            Đã có tài khoản? Đăng nhập ngay.
          </NotRegister>
        </Pressable>
      </Context>
    </Container>
  )
}

const ErrorText = styled.Text`
  color: red;
  margin-bottom: 15px;
`;

const NotRegister = styled.Text`
  color: #fff;
  text-align: right;
  margin-top: 10px;
`;

const BreakLine = styled.View`
  width: ${width}px;
  height: 20px;
`;

const Context = styled.View`
  padding: 0 15px;
  margin-bottom: 30px;
`;

const Container = styled.SafeAreaView`
  background-color: #6A2487;
  flex: 1;
  flex-direction: column;
  justify-content: space-around;
`;

const ImageComponent = styled.Image`
  width: ${width}px;
  height: ${height / 4}px;
`;

export {SignUpScreen};