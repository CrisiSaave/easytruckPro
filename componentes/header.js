import { Header } from 'react-native-elements/dist/header/Header';
import React from 'react'

const header = () => {
    return (
        <Header
            leftComponent={{ icon: 'menu', color: '#fff', iconStyle: { color: '#fff' } }}
            centerComponent={{ text: 'MY TITLE', style: { color: '#fff' } }}
            rightComponent={{ icon: 'home', color: '#fff' }}
        />
    )
}

export default header

