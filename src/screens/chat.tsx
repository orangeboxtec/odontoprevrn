import React, { useEffect, useRef, useState } from 'react';
import { Alert, Animated, Dimensions, Image, Linking, PermissionsAndroid, Platform, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { SafeAreaView } from 'react-native-safe-area-context';
import uuid from 'react-native-uuid';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import CustomChat from '../components/chat';
import ChatInput from '../components/chatInput';
import api from '../utils/api';

export interface IMessage {
    id: string | number
    chatId: string
    data: string
    createdAt: Date
    type: string
    sent?: boolean
    contact?: IContact
}
export interface IContact {
    name: string
    address: string
    phone: string
    specialty: string
    distance: string
}

const screenWidth = Dimensions.get('window').width;
export default function Chat() {
    const [id, setId] = useState('')
    const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<IMessage[]>([])
    const [history, setHistory] = useState<IMessage[][]>([])

    const [open, setOpen] = useState(false);
    const slideAnim = useRef(new Animated.Value(-screenWidth)).current;

    function newChat() {
        setHistory(prev => [...prev, messages]);
        setMessage('')
        setMessages([])
        setId(uuid.v4())
        getLocation()
    }
    function submit() {
        if (!message.trim()) return;

        const userMsg: IMessage = {
            chatId: id,
            id: messages.length + 1,
            data: message,
            createdAt: new Date(),
            sent: true,
            type: 'text',
        };

        const newMessages = [...messages, userMsg];
        setMessages(newMessages);
        setMessage('');
        api.post('/send', {
            message: message,
            chatId: id,
            location: {
                latitude: location?.latitude,
                longitude: location?.longitude,
            },
        }).then((resp) => {
            resp.data.forEach((item: any, index: number) => {
                const botMsg: IMessage = {
                    chatId: id,
                    id: (newMessages.length + 1) + index,
                    data: item.data ?? '',
                    createdAt: new Date(),
                    sent: false,
                    type: item.type,
                    contact: {
                        name: item.name,
                        address: item.address,
                        phone: item.phone,
                        specialty: item.specialties,
                        distance: item.distance,
                    }
                };
                setMessages(prev => [...prev, botMsg]);
            });
        });
    }

    function toggleMenu() {
        if (open) {
            Animated.timing(slideAnim, {
                toValue: -screenWidth,
                duration: 200,
                useNativeDriver: false,
            }).start(() => setOpen(false));
        } else {
            setOpen(true);
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 200,
                useNativeDriver: false,
            }).start();
        }
    }
    function selectChat(item: IMessage[]) {
        setMessages(item)
        setId(item[0].chatId)
    }

    useEffect(() => {
        setId(uuid.v4() as string)
        getLocation()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    async function hasLocationPermission(): Promise<boolean> {
        if (Platform.OS !== 'android') return true;
        if (Platform.Version < 23) return true;

        const granted = await PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );
        if (granted) return true;

        const status = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
                title: 'Permissão de Localização',
                message: 'Precisamos da sua localização para continuar.',
                buttonPositive: 'Permitir',
                buttonNegative: 'Cancelar',
            }
        );

        if (status === PermissionsAndroid.RESULTS.GRANTED) return true;

        if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
            Alert.alert(
                'Permissão desativada',
                'Você desativou a permissão de localização permanentemente. Ative manualmente nas configurações.',
                [
                    { text: 'Cancelar', style: 'cancel' },
                    {
                        text: 'Abrir configurações',
                        onPress: () => Linking.openSettings(),
                    },
                ]
            );
        }

        return false;
    }
    async function getLocation() {
        const ok = await hasLocationPermission();
        if (!ok) return;

        Geolocation.getCurrentPosition(
            position => {
                setLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });
            },
            error => console.log(error),
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={toggleMenu}>
                    <FontAwesome6 name="bars" size={20} color="black" iconStyle='solid' />
                </TouchableOpacity>

                <Text style={styles.headerText}>OdontoPrev</Text>

                <TouchableOpacity onPress={newChat}>
                    <FontAwesome6 name="comment-medical" size={20} color="black" iconStyle='outline' />
                </TouchableOpacity>
            </View>
            {
                messages.length > 0
                    ?
                    <CustomChat messages={messages} />
                    : <View style={styles.content}>
                        <Image source={require('../assets/logo.png')} style={styles.contentImage} />
                        <Text style={styles.contentTitle}>Olá, eu sou o Dom</Text>
                        <Text style={styles.contentSubTitle}>Como posso ajudar você hoje?</Text>
                    </View>
            }
            <ChatInput setMessage={setMessage} message={message} submit={submit} />

            {open && (
                <Pressable style={styles.backdrop} onPress={toggleMenu} />
            )}
            <Animated.View style={[styles.sideMenu, { left: slideAnim }]}>
                {history.map((item, index) => (
                    <TouchableOpacity key={index} onPress={() => selectChat(item)}>
                        <Text style={styles.menuItem}>Chat {index + 1}</Text>
                    </TouchableOpacity>
                ))}
            </Animated.View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F0F0', // cor de fundo padrão aqui
    },
    header: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "center",
        margin: 15
    },
    headerText: {
        fontWeight: "bold"
    },
    content: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    contentImage: {
        width: 100,
        height: 100,
    },
    contentTitle: {
        fontWeight: "bold",
        fontSize: 22,
        marginBottom: 5
    },
    contentSubTitle: {
        fontWeight: "600",
        color: "#808080"
    },

    backdrop: {
        position: 'absolute',
        backgroundColor: 'rgba(0,0,0,0.3)',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1,
    },
    sideMenu: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        width: screenWidth * 0.7,
        backgroundColor: '#fff',
        paddingTop: 60,
        paddingHorizontal: 20,
        elevation: 10,
        zIndex: 2,
    },
    menuItem: { marginVertical: 15, fontSize: 16 }
});
