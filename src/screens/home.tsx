import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Dimensions, Image, Pressable, ScrollView, StyleSheet, View } from 'react-native';

export default function Home() {
    const navigation = useNavigation()
    const screenWidth = Dimensions.get('window').width;
    const [imageHeight, setImageHeight] = useState(null);

    useEffect(() => {
        const { width, height } = Image.resolveAssetSource(require('../assets/home.png'));
        const ratio = height / width;
        setImageHeight(screenWidth * ratio);
    }, []);
    if (!imageHeight) return null;

    function goToChat() {
        navigation.navigate('Chat')
    }

    return (
        <View style={{ flex: 1 }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ position: 'relative' }}>
                    <Image
                        source={require('../assets/home.png')}
                        style={{ width: screenWidth, height: imageHeight }}
                        resizeMode="cover"
                    />

                    {/* Botões sobre a imagem */}
                    <Pressable
                        style={[styles.touchArea, { position: 'absolute', top: 405, left: 27, width: 340, height: 45 }]}
                        onPress={goToChat}
                    />
                    <Pressable
                        style={[styles.touchArea, { position: 'absolute', top: 1440, right: 25, width: 75, height: 60 }]}
                        onPress={goToChat}
                    />
                </View>
            </ScrollView>
        </View>

    );
}

const styles = StyleSheet.create({
    root: { flex: 1, backgroundColor: '#000' },

    /* área clicável: invisível (0.01 de opacidade só pra depuração; tire se quiser 100 % transparente) */
    touchArea: {
        position: 'absolute',
        zIndex: 10,
        backgroundColor: 'rgba(0,0,0,0.1)', // torna tocável sem aparecer
        borderRadius: 25,                    // opcional
    },
});
