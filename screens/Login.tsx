import * as React from 'react';
import {ActivityIndicator, Dimensions, Pressable} from 'react-native';
import styled from 'styled-components/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Input} from "../components/Input";
import {Button} from "../components/Button";
import {RootStackParamList} from './screen';
import axios from "../helpers/axios";
import {user} from "../stores/jwt";

const {width, height} = Dimensions.get("window");
type mainScreenProp = NativeStackScreenProps<RootStackParamList, 'Login'>;

function LoginScreen(props: mainScreenProp) {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  async function loginFn() {
    if (!username) {
      setError('Tên đăng nhập không được để trống');
      return;
    }

    if (!password) {
      setError('Mật khẩu không được để trống');
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post('/api/login', {
        username,
        password,
      });
      if (res.data.msg) {
        await user.setJwt(res.headers.jwt);
        setLoading(false);
        props.navigation.replace('TodoMainScreen');
      }
    } catch {
      setError('Đăng nhập thất bại');
      setLoading(false);
    }
  }

  function changeSignUp() {
    props.navigation.replace('SignUp');
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
          onChange={setPassword}
          isPassword
          placeholder="Mật khẩu"
        />
        <BreakLine/>
        {
          loading ? <ActivityIndicator size="small" color="#fff"/> : <Button textButton="Đăng nhập" onPress={loginFn}/>
        }

        <Pressable onPress={changeSignUp}>
          <NotRegister>
            Chưa có tài khoản? Đăng kí ngay.
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

export {LoginScreen};