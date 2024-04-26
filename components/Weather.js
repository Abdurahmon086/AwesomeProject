import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function Weather() {
    return (
        <View style={styles.continer}>
            <Text>Weather</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    continer: {
        flex: 1,
        backgroundColor: 'red',
    }
})