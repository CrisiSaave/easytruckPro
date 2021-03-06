
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from 'react-native-safe-area-context';

//Screen
import crearCamionero from './screens/crearCamionero';
import crearViaje from './screens/crearViaje';
import detalleViaje from './screens/detalleViaje';
import inicioSesion1 from './screens/inicioSesion1';
import inicioSesion2 from './screens/inicioSesion2';
import menuEncargado from './screens/menuEncargado';
import notCamionero from './screens/notCamionero';
import perfil from './screens/perfil';
import viajeEnCurso from './screens/viajeEnCurso';



const Stack = createNativeStackNavigator();

export default function App() {

  return <SafeAreaProvider>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="inicioSesion1" component={inicioSesion1}/>
        <Stack.Screen name="inicioSesion2" component={inicioSesion2} />
        <Stack.Screen name="CrearCamionero" component={crearCamionero} />
        <Stack.Screen name="crearViaje" component={crearViaje} />
        <Stack.Screen name="detalleViaje" component={detalleViaje} />
        <Stack.Screen name="menuEncargado" component={menuEncargado} />
        <Stack.Screen name="notCamionero" component={notCamionero} />
        <Stack.Screen name="perfil" component={perfil} />
        <Stack.Screen name="viajeEnCurso" component={viajeEnCurso} />
      </Stack.Navigator>
    </NavigationContainer>
  </SafeAreaProvider>;
  
}


