import { StyleSheet, TextInput, View } from 'react-native';
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button } from 'react-native-elements';




function inicioSesion1(props) {

    const [state, setState] = useState({
        mail: "",
        pass: ""
    });

    const confirmarUsuario = () => {
        console.log("formato invalido");
        props.navigation.navigate('crea');
    }

    const validar = "";

    return (
        <View style={styles.container}>

            <Input placeholder='Ingresar Correo' errorStyle={{ color: 'red' }} errorMessage={validar}
                leftIcon={<Icon name='user' size={24} color='black' />}
                onChangeText={(value) => setState({ ...state, mail: value })} />

            <Input placeholder="Contraseña" secureTextEntry={true}
                leftIcon={<Icon name='lock' size={24} color='black' />}
                onChangeText={(value) => setState({ ...state, pass: value })} />
            <Button title="Ingresar" titleStyle={{ color: 'black' }} type="outline" buttonStyle={styles.botones}
                onPress={() => confirmarUsuario()} />
            <Button title="Crear" titleStyle={{ color: 'black' }} type="outline" buttonStyle={styles.botones}
                onPress={() => props.navigation.navigate('crearEncargado')} />
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 25
    },

    botones: {

        backgroundColor: 'white',
        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 3,
        padding: 6,
        margin: 3

    }
})

export default inicioSesion1