import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { IMessage } from '../screens/chat';
import Card from './card';

interface I {
    messages: IMessage[],
    ref: React.RefObject<FlatList<any> | null>
}

export default function CustomChat({ messages, ref }: I) {

    function download(data) {
        //Não pronto para baixar
    }

    return (
        <FlatList
            ref={ref}
            data={messages}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
                <View style={[styles.bubble, item.sent ? { alignSelf: 'flex-end', backgroundColor: '#007AFF' } : { alignSelf: 'flex-start', backgroundColor: '#E1E1E1' }]}>
                    {
                        item.type === "text" ? (
                            <Text style={{ color: item.sent ? '#fff' : '#222' }}>
                                {item.data}
                            </Text>
                        ) : item.type === "pdf" ? (
                            <TouchableOpacity onPress={() => download(item.data)}>
                                <FontAwesome6 name="file-pdf" size={30} color="white" />
                            </TouchableOpacity>
                        ) : (
                            <Card data={item.contact!} />
                        )
                    }

                </View>
            )}
            contentContainerStyle={styles.listContent}
        />
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F5F5F5' },
    listContent: { padding: 10, paddingBottom: 60 },
    bubble: {
        padding: 10,
        borderRadius: 12,
        marginBottom: 6,
        maxWidth: '75%',
        flexShrink: 1,
        overflow: 'hidden'
    },
    bubbleText: { color: '#fff' },
    inputContainer: {
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        padding: 8,
        backgroundColor: '#fff',
        width: '100%',
        alignItems: 'center',
        borderTopWidth: 1,
        borderColor: '#ddd',
    },
    input: {
        flex: 1,
        backgroundColor: '#F0F0F0',
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 8,
        marginRight: 8,
    },
    sendButton: {
        backgroundColor: '#007AFF',
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 20,
    },
});