import React, { useState } from 'react';
import { Alert, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { IContact } from '../screens/chat';



export default function Card({ data }: { data: IContact }) {

    const [favorite, setFavorite] = useState(false)

    function contact() {
        const phone = data.phone.replace(/\D/g, ''); // remove espaços, parênteses, traços
        const message = 'Olá! Gostaria de entrar em contato.';
        const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

        Linking.openURL(url).catch(() => {
            Alert.alert('Erro', 'WhatsApp não instalado ou link inválido');
        });
    }


    return (
        <View style={styles.container}>
            <View style={styles.left}>
                <Text style={[styles.bubbleText, { fontWeight: 700 }]}>{data.name}</Text>
                <Text style={[styles.bubbleText, { fontWeight: 400 }]}>{data.address}</Text>
                {
                    data.phone &&
                    <View style={[styles.row, { alignItems: 'center' }]}>
                        <Text style={[styles.bubbleText, { fontWeight: 700, fontSize: 18, paddingVertical: 5 }]}>{data.phone}</Text>
                        <FontAwesome6 name="whatsapp" size={18} color="#42C954" iconStyle="regular" />
                    </View>
                }

                <Text style={[styles.bubbleText, { fontWeight: 400, fontStyle: 'italic' }]}>{data.specialty}</Text>
            </View>
            <View style={styles.right}>
                <View style={styles.row}>
                    <FontAwesome6 name="person-walking" size={15} color="#D8594A" iconStyle="regular" />
                    <Text style={styles.bubbleText}>{data.distance}</Text>
                </View>
                <View style={styles.column}>
                    <TouchableOpacity onPress={() => setFavorite(!favorite)}>
                        <FontAwesome6 name="heart" size={20} color={favorite ? "red" : "#333"} />
                    </TouchableOpacity>
                    {
                        data.phone &&
                        <TouchableOpacity onPress={contact} style={styles.sendButton}>
                            <FontAwesome6 name="chevron-right" size={15} color="white" />
                        </TouchableOpacity>
                    }
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 5
    },
    column: {
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    left: {
        flex: 1,
        flexShrink: 1,
        minWidth: 0,
    },
    right: {
        flex: 1,
        alignItems: 'flex-end'
    },
    bubbleText: {
        color: '#333', flexWrap: 'wrap', flexShrink: 1,
        minWidth: 0
    },
    sendButton: {
        backgroundColor: '#007AFF',
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 20,
    },
});