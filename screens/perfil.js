import { Text, View, Button, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import React from 'react'

const perfil = () => {
    
    return (
        <View >
            <ScrollView>
                <View style={{padding:10, width:'100%',backgroundColor:'#000',height:150}}>
                    <TouchableOpacity>
                        <Image source={require('../imagenes/back.png')} style={{width:90, height:90}}></Image>
                        <View></View>
                        <View></View>
                    </TouchableOpacity>
                </View>
                <View style={{alignItems:'center'}}>
                    <Image source={require('../imagenes/tom.jfif')} style={{width:130, height:130, borderRadius:100, marginTop:-70, borderColor:'#FFF'}}></Image>
                    <Text style={{fontSize:25, fontWeight:'bold'}}> Tom York</Text>
                    <Text style={{fontSize:15, fontWeight:'bold', color:'grey'}}> 35, Hombre</Text>
                </View>
                <View>
                    <View style={{alignSelf:'center', flexDirection:'row', justifyContent:'center', backgroundColor:'#FFF', width:'100%' }}>
                        <Image source={require('../imagenes/estrella.png')} style={{width:16, height:16}}></Image>
                        <Text>Calificación: 4,85</Text>                    
                    </View>
                    <View style={{alignSelf:'center', flexDirection:'row', justifyContent:'center', backgroundColor:'#FFF', width:'100%' }}>
                        <Image source={require('../imagenes/coche.png')} style={{width:16, height:16}}></Image>
                        <Text>Viajes realizados: 200</Text>
                    </View>
                </View>
                
                <View style={{alignSelf:'center', flexDirection:'column', justifyContent:'center', paddingBottom:22, width:'90%', shadowOpacity:80}}>
                    <Text style={{fontSize:25, fontWeight:'bold', paddingTop:20, justifyContent:'center'}}> Ultimos viajes</Text>
                        <View style={{padding:20,flexDirection:'row', paddingBottom:22, borderRadius:10, shadowOpacity:80, elevation:15, marginTop:20, marginBottom:20, backgroundColor:'#fff' }}>
                            <Image source={require('../imagenes/mapa.png')} style={{width:30, height:30}}></Image>
                            <Text>Destino: Los Angeles, Valparaiso </Text>
                            <Text>Duración: 1:20:15</Text>
                        </View>
                        <View style={{padding:20,flexDirection:'row', paddingBottom:22, borderRadius:10, shadowOpacity:80, elevation:15, marginTop:20, marginBottom:20, backgroundColor:'#fff' }}>
                            <Image source={require('../imagenes/mapa.png')} style={{width:30, height:30}}></Image>
                            <Text>Destino: La Pintana, Santiago </Text>
                            <Text>Duración: 1:45:02</Text>
                        </View>
                        <View style={{padding:20,flexDirection:'row',  paddingBottom:22, borderRadius:10, shadowOpacity:80, elevation:15, marginTop:20, marginBottom:20, backgroundColor:'#fff' }}>
                            <Image source={require('../imagenes/mapa.png')} style={{width:30, height:30}}></Image>
                            <Text>Destino: La Herradura, Coquimbo </Text>
                            <Text>Duración: 4:30:00</Text>
                        </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default perfil