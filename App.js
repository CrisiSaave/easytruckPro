
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
import eliminarCamionero from './screens/eliminarCamionero';



const Stack = createNativeStackNavigator();



export default function App() {

  return <SafeAreaProvider>

    <NavigationContainer>
      <Stack.Navigator screenOptions={opciones}  initialRouteName="inicio">

        <Stack.Screen name="inicioSesion1" component={inicioSesion1} options={{ headerLeft: null, title: 'Inicio'}} />
        <Stack.Screen name="perfil" component={perfil} options={{title: 'Perfil'}}/>
        <Stack.Screen name="viajeEnCurso" component={viajeEnCurso} options={{ headerLeft: null, title: 'En curso...'}} />
        <Stack.Screen name="inicioSesion2" component={inicioSesion2} options={{ headerLeft: null,title: 'Inicio'  }} />
        <Stack.Screen name="notCamionero" component={notCamionero} options={{title: 'Notificaciones', headerLeft: null}}/>
        <Stack.Screen name="detalleViaje" component={detalleViaje} options={{title: 'Viaje'}} />
        <Stack.Screen name="crearViaje" component={crearViaje} options={{title:'EasyTruck'}}/>
        <Stack.Screen name="crearCamionero" component={crearCamionero} options={{title: 'EasyTruck'}}/>
        <Stack.Screen name="eliminarCamionero" component={eliminarCamionero} options={{title: 'Camioneros'}}/>
        <Stack.Screen name="menuEncargado" component={menuEncargado} options={{ headerLeft: null, title: 'Menú'}}/>
        <Stack.Screen name="listaEncargados" component={listaEncargados} options={{title: 'Encargados'}}/>
        <Stack.Screen name="crearEncargado" component={CrearEncargado} options={{title: 'EasyTruck'}} />

      </Stack.Navigator>
    </NavigationContainer>
  </SafeAreaProvider>;

}


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
  title: 'EasyTruck'

})


