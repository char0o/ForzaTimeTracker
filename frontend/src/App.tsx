import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import axios from 'axios';
import './App.css';
import TimeForm from './TimeForm'
import ConnectForm from './ConnectForm';
import { ChakraProvider } from '@chakra-ui/react';
import { Box, Text } from "@chakra-ui/react"

function App() {



  return (
    <ChakraProvider>   

    <div>
      <ConnectForm />
    </div>
    </ChakraProvider>
  );
}

export default App;
