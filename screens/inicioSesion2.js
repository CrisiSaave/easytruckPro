import { StyleSheet, View } from 'react-native';
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button, Avatar } from 'react-native-elements';


const inicioSesion2 = () => {
    const [state, setState] = useState({
        mail: "",
        pass: ""
    });

    const [validar, setValidar] = useState("");
    const [password, setValidarP] = useState("");

    const verificador = (value, pw) => {
        setState({ ...state, mail: value });
        if (value != "") {
            if (validator.isEmail(value)) {
                setValidar("")
            } else {
                setValidar("mail invalido")
            }
        } else {
            setValidar("")
        }
    }

    const crearUsuario = async () => {


    }

    return (
        <View style={styles.container}>


            <Avatar size="xlarge" rounded icon={{ name: 'truck', type: 'font-awesome', color: "black" }} onPress={() => console.log("Works!")}
                containerStyle={{ flex: 2, margin: 'auto', }} />
            <Input placeholder='email@address.com' errorStyle={{ color: 'red', margin: 5 }} errorMessage={validar}
                leftIcon={<Icon name='user' size={24} color='black' />}
                onChangeText={(value) => verificador(value)}
                leftIconContainerStyle={styles.icono} />

            <Input placeholder="password" secureTextEntry={true}
                leftIcon={<Icon name='lock' size={24} color='black' />}
                onChangeText={(value) => setState({ ...state, pass: value })} errorStyle={{ color: 'black', margin: 9 }}
                leftIconContainerStyle={styles.icono} errorMessage={password} />

            <Button title="Ingresar" titleStyle={{ color: 'black' }} type="outline" buttonStyle={styles.botones}
                onPress={() => crearUsuario()} />

            <Button title="Crear" titleStyle={{ color: 'black' }} type="outline" buttonStyle={styles.botones}
                onPress={() => props.navigation.navigate('crearEncargado')} />
            


        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 25,
        marginBottom: 100

    },

    botones: {

        backgroundColor: 'white',
        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 3,
        padding: 6,
        margin: 3

    },
    icono: {
        marginRight: 9
    }
})

export default inicioSesion2