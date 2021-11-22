import { StyleSheet, View } from 'react-native';
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button, Avatar, Text} from 'react-native-elements';
import validator from 'validator';
import { doc, getDocs, collection, query, where } from 'firebase/firestore';
import file from "../database/firebase";






function inicioSesion1(props) {

    const [state, setState] = useState({
        mail: "",
        pass: ""
    });

    const [validar, setValidar] = useState("");
    const [password, setValidarP] = useState("");
    const [encontro, setEncontro] = useState("");


    const verificador = (value) => {
        setState({ ...state, mail: value });
        if (value != "") {
            if (validator.isEmail(value)) {
                setValidar("")
                setValidarP("")
            } else {
                setValidar("mail invalido")
            }
        } else {
            setValidar("")
            setValidarP("")
        }
    }

    const ingresar = async () => {
        if (state.mail != "" && state.pass != "") {
            const refEncargados = collection(file.data(), "encargados");
            const q = query(refEncargados, where("mail", "==", state.mail));
            const consulta = await getDocs(q);
            consulta.forEach((doc) => {

                if (doc.data().mail === state.mail && doc.data().pass === state.pass) {
                    setValidar("")
                    setValidarP("")
                    props.navigation.push('menuEncargado')
                }
            });
            setValidarP('email o contraseña incorrecta');
        } else {
            setValidarP('ingrese un email y contraseña');
        }


    }
    

    return ([
        
        

        <View style={styles.container}>

            <Icon raised name='users' type='font-awesome'
                color='black' size={30} containerStyle={{ margin: 'auto' }}
                onPress={() => props.navigation.navigate('listaEncargados')} />
           
            <Avatar size="xlarge"
                rounded icon={{ name: 'user', type: 'font-awesome', color: "black" }}
                onPress={() => props.navigation.navigate('inicioSesion2')}
                containerStyle={{ flex: 1, margin: 'auto', }} />
            
            <Text h3>Encargado</Text>

            <Input placeholder='email@address.com' containerStyle={styles.imputs}
                errorStyle={{ color: 'black', margin: 'auto' }} errorMessage={validar}
                leftIcon={<Icon name='user' size={24} color='black' />}
                onChangeText={(value) => verificador(value)}
                leftIconContainerStyle={styles.icono} />

            <Input placeholder="password" secureTextEntry={true} containerStyle={styles.imputs}
                leftIcon={<Icon name='lock' size={24} color='black' />}
                onChangeText={(value) => setState({ ...state, pass: value })}
                errorStyle={{ color: 'black', margin: 'auto' }}
                leftIconContainerStyle={styles.icono} errorMessage={password} />

            <Button title="Ingresar" titleStyle={{ color: 'black' }} type="outline"
                buttonStyle={styles.botones}
                onPress={() => ingresar(state)} />

            <Button title="Crear" titleStyle={{ color: 'black' }} type="outline"
                buttonStyle={styles.botones}
                onPress={() => props.navigation.navigate('crearEncargado')} />



        </View>

    ]);
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
        marginTop: 20,


    },

    icono: {
        margin: 'auto',
        marginRight: 10
    },

    imputs: {
        marginTop: 10,
        marginBottom: 15
    }
})

export default inicioSesion1