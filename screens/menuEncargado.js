import { StyleSheet, View } from 'react-native';
import React from 'react'
import { Button, Text, Icon, Divider } from 'react-native-elements';


const menuEncargado = (props) => {
    return (
        <View style={{ flex: 1}}>

            <Icon name='log-out' size={27} color='black' type='feather'
                containerStyle={{ marginLeft: '90%' }}
                onPress={() => props.navigation.popToTop('inicioSesion1')} />

            <Divider orientation="horizontal" width={5} color='black' style={{ marginTop: '15%'}} />

            <Icon name='user' size={55} color='black' type='feather'
                containerStyle={{
                    flex: 0.1, justifyContent: 'center', marginTop: '10%',

                }} />

            <View style={{ margin: 'auto' }}>
                <Text h1>Bienvenido</Text>
            </View>

            <Divider orientation="horizontal" width={5} color='black' />

            <View style={{
                flex: 0.8,
                paddingLeft: 60,
                paddingRight: 60,
                alignContent: 'center'

            }}>
                <Button title="Crear Viaje" titleStyle={{ color: 'black' }} type="outline"
                    buttonStyle={styles.botones}
                    onPress={() => props.navigation.push('crearViaje')}
                />
                <Button title="Agregar Camionero" titleStyle={{ color: 'black' }} type="outline"
                    buttonStyle={styles.botones}
                    onPress={() => props.navigation.push('crearCamionero')}
                />
                <Button title="Eliminar Camionero" titleStyle={{ color: 'black' }} type="outline"
                    buttonStyle={styles.botones}
                    onPress={() => props.navigation.push('eliminarCamionero')}
                />
            </View>

        </View>
    )
}

const styles = StyleSheet.create({


    botones: {
        borderColor: 'black',
        marginTop: '30%',
        borderWidth: 3

    },
})

export default menuEncargado