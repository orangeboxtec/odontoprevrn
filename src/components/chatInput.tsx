import React, { Dispatch, SetStateAction } from 'react';
import {
    Keyboard,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

interface I {
    submit: () => void,
    message: string,
    setMessage: Dispatch<SetStateAction<string>>
}

export default function ChatInput({ message, setMessage, submit }: I) {

    return (
        <View style={styles.container}>

            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder="Digite sua mensagem"
                        style={styles.input}
                        value={message}
                        cursorColor="#246AF7"
                        onChangeText={setMessage}
                    />
                    <TouchableOpacity onPress={submit} disabled={message.length <= 0} style={[styles.sendButton, message.length > 0 ? { backgroundColor: '#007bff' } : { backgroundColor: '#007bff65' }]}>
                        <FontAwesome6 name="arrow-up" size={15} color="#FFF" iconStyle='solid' />
                    </TouchableOpacity>
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { height: 'auto' },
    inputContainer: {
        flexDirection: 'row',
        padding: 10,
        backgroundColor: '#FFF',
        alignItems: 'center',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    input: {
        flex: 1,
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginRight: 10,
    },
    sendButton: {
        borderRadius: 25,
        paddingHorizontal: 13,
        paddingVertical: 10,
    },
});
