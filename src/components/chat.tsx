import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { IMessage } from '../screens/home';

interface I {
    messages: IMessage[]
}

export default function CustomChat({ messages }: I) {


    return (
        <FlatList
            data={messages}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
                <View style={[styles.bubble, item.sent ? { alignSelf: 'flex-end', backgroundColor: '#007AFF' } : { alignSelf: 'flex-start', backgroundColor: '#444444' }]}>
                    <Text style={styles.bubbleText}>{item.data}</Text>
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