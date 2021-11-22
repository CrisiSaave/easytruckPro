import { StyleSheet, View } from 'react-native';
import React, { useState, useEffect } from 'react'
import { Input, Button, Text, Divider, ListItem, Icon, } from 'react-native-elements';
import { setDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import file from "../database/firebase";

const viajeEnCurso = (props) => {
    //console.log(props.route.params)
    const idV = props.route.params.id
    const idC = props.route.params.id2
    const [destinos, setDestinos] = useState([])

    useEffect(async () => {
        const consulta = await getDoc(doc(file.data(), "viajes", idV))
        setDestinos(consulta.data().destinos)
        //console.log(consulta.data().destinos)
    })

    async function actualizar() {
        const ref = doc(file.data(), "viajes", idV)
        await updateDoc(ref, { estado: true })

    }

    function deBoton() {
        if (destinos.length > 1) {
            if (i < (destinos.length - 1)) {
                return (
                    <Button title='Siguiente Destino' buttonStyle={{ backgroundColor: 'black' }}
                        onPress={() => setear()} />
                )
            } else {
                return (
                    <Button title='Finalizar' buttonStyle={{ backgroundColor: 'black' }}
                        onPress={() => setear()} />
                )
            }
        } else {
            return (
                <Button title='Finalizar' buttonStyle={{ backgroundColor: 'black' }}
                    onPress={() => setear()} />
            )
        }
    }

    const [i, setI] = useState(0)

    function setear() {
        console.log(i)
        if (i < (destinos.length - 2)) {
            setI(i + 1)
        } else {
            if (i < (destinos.length - 1)) {
                setI(i + 1)
            } else {
                actualizar()
                props.navigation.replace('notCamionero', { id: idC })
            }
        }
    }


    return (


        <View style={{ flex: 1 }}>


            <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: '25%' }}>
                <Text h2>Viaje en curso</Text>
            </View>
            <View style={{ marginTop: 15, alignItems: 'center' }}>
                <Text h5>{'Destinos Totales: ' + destinos.length}</Text>
            </View>
            <View style={{ marginLeft: 10, marginTop: 70 }}>
                <Input inputStyle={styles.input} value={destinos[i]} disabled={true}
                    label='Destino Actual'
                    labelStyle={{ color: 'black', marginBottom: 30 }} />
            </View>

            <View style={{
                alignItems: 'center',
                justifyContent: 'center',
                paddingTop: 30,
                paddingBottom: 30
            }}>
                {
                    deBoton()
                }

            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    input: {
    }
})
export default viajeEnCurso