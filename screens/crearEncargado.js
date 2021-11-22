import { StyleSheet, TextInput, View } from 'react-native';
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button, Avatar } from 'react-native-elements';
import validator from 'validator';
import { addDoc, collection, query, where, getDocs } from 'firebase/firestore';
import file from "../database/firebase";



function CrearEncargado(props) {

    const [state, setState] = useState({
        mail: "",
        pass: "",
        name: ""
    });
    const [adminpass, setAdminpass] = useState("");

    const [admin, setAdmin] = useState("");
    const [validar, setValidar] = useState("");
    const [password, setValidarP] = useState("");
    const [user, setUser] = useState("");
    const flag = false;


    const verificador = (value => {
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
    });


    async function verAdmin(pw, flag) {
        flag = false;
        const refAdmin = collection(file.data(), "adminPass");
        const q = query(refAdmin, where("pass", "==", pw));
        const consulta = await getDocs(q);

        consulta.forEach((doc) => {
            if (doc.data().pass === pw) {
                flag = true;
                console.log(doc.data().pass)
                return flag;

            }
        });
        return flag;
    }



    const crearUsuario = async (pw, flag) => {
        if(state.user === ""){
            setUser("ingrese un nombre")
        }
        if (state.mail === "") {
            setValidar("ingrese un email")
        } else {
            verificador(state.mail)
        }
        if (adminpass === "") {
            setAdminpass("")
            setAdmin("ingrese codigo")
        } else {
            setAdmin("")
        }
        if (state.pass === "") {
            setValidarP("ingrese una contraseña");
        } else {
            setValidarP("");
        }

        if (validator.isEmail(state.mail) && adminpass != "" && state.pass != "") {
            try {
                flag = await verAdmin(pw, flag);

            } catch (error) {
                alert("error")
            }
            if (flag === true) {

                try {
                    const docRef = await addDoc(collection(file.data(), "encargados"), {
                        mail: state.mail,
                        pass: state.pass,
                        name: state.name
                    });
                    alert("encargado creado con exito!")
                    //navigator a iniciar sesion1
                    props.navigation.navigate('inicioSesion1');
                } catch (error) {
                    alert("ERROR");
                }
            } else {
                alert("adminpass invalido !");
            }
        }//else{alert("llene todos los campos");}
    }



    return (
        <View style={styles.container}>
            <Avatar size="xlarge" rounded icon={{ name: 'truck', type: 'font-awesome', color: "black" }}
                onPress={() => props.navigation.popToTop()}
                containerStyle={{ flex: 1, margin: 'auto'}} />

            <Input placeholder="name"  containerStyle={styles.imputs}
                leftIcon={<Icon name='user' size={26} color='black' />}
                onChangeText={(n) => setState({ ...state, name: n})}
                errorStyle={{ color: 'black', margin: 'auto' }}
                leftIconContainerStyle={styles.icono} errorMessage={user} />

            <Input placeholder='email@address.com' containerStyle={styles.imputs}
                errorStyle={{ color: 'black', margin: 'auto' }} errorMessage={validar}
                leftIcon={<Icon name='envelope' size={19} color='black' />}
                onChangeText={(value) => verificador(value)}
                leftIconContainerStyle={styles.icono} />

            <Input placeholder="password" secureTextEntry={true} containerStyle={styles.imputs}
                leftIcon={<Icon name='lock' size={27} color='black' />}
                onChangeText={(pw) => setState({ ...state, pass: pw })}
                errorStyle={{ color: 'black', margin: 'auto' }}
                leftIconContainerStyle={styles.icono} errorMessage={password} />

            <Input placeholder="admin-pass" secureTextEntry={true} containerStyle={styles.imputs}
                leftIcon={<Icon name='id-badge' size={26} color='black' />}
                leftIconContainerStyle={styles.icono} errorMessage={admin}
                errorStyle={{ color: 'black', margin: 'auto' }}
                onChangeText={(value) => setAdminpass(value)} />

            <Button title="Agregar" titleStyle={{ color: 'black' }} type="outline"
                buttonStyle={styles.botones}
                onPress={() => crearUsuario(adminpass, flag)}
            />


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

    },
    icono: {
        margin: 'auto',
        marginRight: 10

    },

    imputs: {
        marginTop: 0,
        marginBottom: 20
    }
})

export default CrearEncargado