
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Icon } from 'react-native-elements'

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
import CrearEncargado from './screens/crearEncargado';
import listaEncargados from './screens/listaEncargados';



const Stack = createNativeStackNavigator();

export default function App() {

  return <SafeAreaProvider>
    <NavigationContainer>
      <Stack.Navigator screenOptions={opciones}>
        <Stack.Screen name="listaEncargados" component={listaEncargados} />
        <Stack.Screen name="inicioSesion2" component={inicioSesion2} />
        <Stack.Screen name="inicioSesion1" component={inicioSesion1}
          options={{
            title: 'Inicio Encargado', headerRight: () => (
              <Icon raised name='users' type='font-awesome'
                color='black' containerStyle={{ margin: 'auto' }}
                onPress={() => alert('press')} />
            )
          }} />
        <Stack.Screen name="crearEncargado" component={CrearEncargado} />
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

const botones = ({
  headerRight: () => (
    <Icon name='g-translate' color='#00aced' />
  )
});

const opciones = ({
  headerStyle: {
    backgroundColor: 'black',
  },
  headerTintColor: 'white',
  headerTitleAlign: 'center',
  headerTitleStyle: {
    color: 'white',
    margin: 'center',
  },

})


