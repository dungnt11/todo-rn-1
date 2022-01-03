import * as React from 'react';
import styled from "styled-components/native";

type TProps = {
  value: string;
  onChange: (newValue: string) => void;
  placeholder?: string;
  isPassword?: boolean;
}

const Input: React.FC<TProps> = ({ value, onChange, placeholder, isPassword }) => {

  return (
    <Container>
      <TextInput
        secureTextEntry={isPassword}
        onChangeText={onChange}
        value={value}
        placeholder={placeholder}
        placeholderTextColor="#fff"
      />
    </Container>
  )
}

const TextInput = styled.TextInput`
  border-radius: 50px;
  border: 2px solid #C449F1;
  font-family: popPin;
  padding: 15px 20px;
  color: #fff;
  font-size: 16px;
`;

const Container = styled.View`
  
`;

export { Input };