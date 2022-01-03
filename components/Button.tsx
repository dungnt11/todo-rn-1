import * as React from 'react';
import styled from "styled-components/native";
import {Pressable} from "react-native";

type TProps = {
  textButton: string;
  onPress: () => void;
}

const Button: React.FC<TProps> = ({ textButton, onPress }) => {

  return (
    <Pressable onPress={onPress}>
      <Container>
        {textButton}
      </Container>
    </Pressable>
  )
}

const Container = styled.Text`
  border-radius: 20px;
  overflow: hidden;
  background: #2D0D39;
  color: #fff;
  font-family: popPin;
  padding: 15px 20px;
  text-align: center;
`;

export { Button };