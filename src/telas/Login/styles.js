import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    background: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F5F7FA',
        paddingHorizontal: 20,
    },
    container: {
        width: '100%',
        alignItems: 'center',
    },
   
    logoContainer: {
        marginBottom: 30,
        width: '100%',
        alignItems: 'center',
    },
    logo: {
        width: 200,
        height: 120,
    },
    form: {
        width: '100%',
        alignItems: 'center',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#eaf6fb',
        borderWidth: 1,
        borderColor: '#9ebccc',
        borderRadius: 10,
        marginBottom: 15,
        paddingHorizontal: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
    },
    icon: {
        marginRight: 8,
    },
    input: {
        flex: 1,
        fontSize: 16,
        paddingVertical: 12,
        color: '#161616',
    },
    button: {
        backgroundColor: '#2295D1',
        width: '100%',
        borderRadius: 10,
        paddingVertical: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        shadowColor: '#2295D1',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 5,
    },
    textButton: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '700',
        letterSpacing: 1,
    },
    cadastroContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 20,
    },
    cadastroText: {
        fontSize: 16,
        color: '#666',
    },
    cadastroLink: {
        fontSize: 16,
        color: '#2295D1',
        fontWeight: '600',
        textDecorationLine: 'underline',
    },
});