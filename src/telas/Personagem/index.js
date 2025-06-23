import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView, Image, Picker } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CadastrarPersonagem from '../CadastrarPersonagem';

export default function Personagem({ navigation }) {
    const [nomePersonagem, setNomePersonagem] = useState('');
    const [jogador, setJogador] = useState('');
    const [nivel, setNivel] = useState('');
    const [idade, setIdade] = useState('');
    const [antepassado, setAntepassado] = useState('');
    
    const [forca, setForca] = useState('1');
    const [agilidade, setAgilidade] = useState('1');
    const [constituicao, setConstituicao] = useState('1');
    const [vontade, setVontade] = useState('1');
    const [inteligencia, setInteligencia] = useState('1');
    const [percepcao, setPercepcao] = useState('1');
    const [sorte, setSorte] = useState('1');
    const [acalmar, setAcalmar] = useState('1');
    const [acrobacia, setAcrobacia] = useState('1');
    const [atletismo, setAtletismo] = useState('1');
    const [atualidades, setAtualidades] = useState('1');
    const [analise, setAnalise] = useState('1');
    const [charme, setCharme] = useState('1');
    const [eletronicos, setEletronicos] = useState('1');
    const [enganar, setEnganar] = useState('1');
    const [furtividade, setFurtividade] = useState('1');
    const [informatica, setInformatica] = useState('1');
    const [iniciativa, setIniciativa] = useState('1');
    const [intimidacao, setIntimidacao] = useState('1');
    const [intuicao, setIntuicao] = useState('1');
    const [medicina, setMedicina] = useState('1');
    const [mecanica, setMecanica] = useState('1');
    const [persuasao, setPersuasao] = useState('1');
    const [primeirosSocorros, setPrimeirosSocorros] = useState('1');
    const [procurar, setProcurar] = useState('1');

    const antepassados = [
        {ant: "Médico", valor: 1},
        {ant: "Professor", valor: 2},
        {ant: "Artista", valor: 3},
    ];

let antepassadosItems = antepassados.map((v,k) => {
        return <Picker.Item key={k} value={k} label={v.ant} />
    })

    return (
        <View style={styles.mainContainer}>
            <ScrollView 
                contentContainerStyle={styles.scrollContainer}
                keyboardShouldPersistTaps="handled"
                
            >
                <View style={styles.header}>
                <Image 
                    style={styles.logo} 
                    resizeMode="contain" 
                    source={require('../../../assets/img/logo.png')}
                />
            </View>

            <TouchableOpacity 
                style={styles.backButton}
                onPress={() => navigation.navigate("TelaCampanha")}
            >
                <Ionicons name="arrow-back-outline" size={30} color="#3B004F" />
            </TouchableOpacity>

                <View style={styles.content}>
                    <Text style={styles.title}>Personagem</Text>
                    
                    <View style={styles.formRow}>
                        <Text style={styles.label}>Nome:</Text>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="Nome do personagem"
                                placeholderTextColor="#999"
                                value={nomePersonagem}
                                onChangeText={setNomePersonagem}
                            />
                        </View>
                    </View>
                    
                    <View style={styles.formRow}>
                        <Text style={styles.label}>Jogador:</Text>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="Seu nome"
                                placeholderTextColor="#999"
                                value={jogador}
                                onChangeText={setJogador}
                            />
                        </View>
                    </View>
<View style={styles.formRow}>
                        <Text style={styles.label}>Antepassado:</Text>
                        <View style={styles.pickerContainer}>
                            <Picker
                                style={styles.picker}
                                selectedValue={antepassado}
                                onValueChange={(itemValue) => setAntepassado(itemValue)}
                                dropdownIconColor="#623372"
                            >
                                {antepassadosItems}
                            </Picker>
                        </View>
                    </View>
                    <View style={styles.combinedRow}>
                        <View style={styles.combinedField}>
                            <Text style={styles.label}>Nível:</Text>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Nível"
                                    placeholderTextColor="#999"
                                    value={nivel}
                                    onChangeText={setNivel}
                                    keyboardType="numeric"
                                />
                            </View>
                        </View>
                        
                        <View style={styles.combinedField}>
                            <Text style={styles.label}>Idade:</Text>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Idade"
                                    placeholderTextColor="#999"
                                    value={idade}
                                    onChangeText={setIdade}
                                    keyboardType="numeric"
                                />
                            </View>
                        </View>
                    </View>
                    
                    <View>
                        <Text style={styles.sectionTitle}>Atributos</Text>
                        
                        <View style={styles.combinedRow}>
                            <View style={styles.combinedField}>
                                <Text style={styles.label}>Força:</Text>
                                <View style={styles.attributeInputContainer}>
                                    <TextInput
                                        style={styles.attributeInput}
                                        value={forca}
                                        onChangeText={setForca}
                                        keyboardType="numeric"
                                        textAlign="center"
                                    />
                                </View>
                            </View>
                            
                            <View style={styles.combinedField}>
                                <Text style={styles.label}>Vontade:</Text>
                                <View style={styles.attributeInputContainer}>
                                    <TextInput
                                        style={styles.attributeInput}
                                        value={vontade}
                                        onChangeText={setVontade}
                                        keyboardType="numeric"
                                        textAlign="center"
                                    />
                                </View>
                            </View>
                        </View>

                        <View style={styles.combinedRow}>
                            <View style={styles.combinedField}>
                                <Text style={styles.label}>Agilidade:</Text>
                                <View style={styles.attributeInputContainer}>
                                    <TextInput
                                        style={styles.attributeInput}
                                        value={agilidade}
                                        onChangeText={setAgilidade}
                                        keyboardType="numeric"
                                        textAlign="center"
                                    />
                                </View>
                            </View>
                            
                            <View style={styles.combinedField}>
                                <Text style={styles.label}>Inteligência:</Text>
                                <View style={styles.attributeInputContainer}>
                                    <TextInput
                                        style={styles.attributeInput}
                                        value={inteligencia}
                                        onChangeText={setInteligencia}
                                        keyboardType="numeric"
                                        textAlign="center"
                                    />
                                </View>
                            </View>
                        </View>

                        <View style={styles.combinedRow}>
                            <View style={styles.combinedField}>
                                <Text style={styles.label}>Constituição:</Text>
                                <View style={styles.attributeInputContainer}>
                                    <TextInput
                                        style={styles.attributeInput}
                                        value={constituicao}
                                        onChangeText={setConstituicao}
                                        keyboardType="numeric"
                                        textAlign="center"
                                    />
                                </View>
                            </View>
                            
                            <View style={styles.combinedField}>
                                <Text style={styles.label}>Percepção:</Text>
                                <View style={styles.attributeInputContainer}>
                                    <TextInput
                                        style={styles.attributeInput}
                                        value={percepcao}
                                        onChangeText={setPercepcao}
                                        keyboardType="numeric"
                                        textAlign="center"
                                    />
                                </View>
                            </View>
                        </View>

                        <View style={styles.singleAttributeRow}>
                            <View style={styles.singleAttributeContainer}>
                                <Text style={styles.label}>Sorte:</Text>
                                <View style={styles.attributeInputContainer}>
                                    <TextInput
                                        style={styles.attributeInput}
                                        value={sorte}
                                        onChangeText={setSorte}
                                        keyboardType="numeric"
                                        textAlign="center"
                                    />
                                </View>
                            </View>
                        </View>
                    </View>
                    
                    <View>
                        <Text style={styles.sectionTitle}>Perícias</Text>
                    
                        <View style={styles.combinedRow}>
                            <View style={styles.combinedField}>
                                <Text style={styles.label}>Acalmar:</Text>
                                <View style={styles.attributeInputContainer}>
                                    <TextInput
                                        style={styles.attributeInput}
                                        value={acalmar}
                                        onChangeText={setAcalmar}
                                        keyboardType="numeric"
                                        textAlign="center"
                                    />
                                </View>
                            </View>
                            
                            <View style={styles.combinedField}>
                                <Text style={styles.label}>Acrobacia:</Text>
                                <View style={styles.attributeInputContainer}>
                                    <TextInput
                                        style={styles.attributeInput}
                                        value={acrobacia}
                                        onChangeText={setAcrobacia}
                                        keyboardType="numeric"
                                        textAlign="center"
                                    />
                                </View>
                            </View>
                        </View>

                        <View style={styles.combinedRow}>
                            <View style={styles.combinedField}>
                                <Text style={styles.label}>Atletismo:</Text>
                                <View style={styles.attributeInputContainer}>
                                    <TextInput
                                        style={styles.attributeInput}
                                        value={atletismo}
                                        onChangeText={setAtletismo}
                                        keyboardType="numeric"
                                        textAlign="center"
                                    />
                                </View>
                            </View>
                            
                            <View style={styles.combinedField}>
                                <Text style={styles.label}>Atualidades:</Text>
                                <View style={styles.attributeInputContainer}>
                                    <TextInput
                                        style={styles.attributeInput}
                                        value={atualidades}
                                        onChangeText={setAtualidades}
                                        keyboardType="numeric"
                                        textAlign="center"
                                    />
                                </View>
                            </View>
                        </View>

                        <View style={styles.combinedRow}>
                            <View style={styles.combinedField}>
                                <Text style={styles.label}>Análise:</Text>
                                <View style={styles.attributeInputContainer}>
                                    <TextInput
                                        style={styles.attributeInput}
                                        value={analise}
                                        onChangeText={setAnalise}
                                        keyboardType="numeric"
                                        textAlign="center"
                                    />
                                </View>
                            </View>
                            
                            <View style={styles.combinedField}>
                                <Text style={styles.label}>Charme:</Text>
                                <View style={styles.attributeInputContainer}>
                                    <TextInput
                                        style={styles.attributeInput}
                                        value={charme}
                                        onChangeText={setCharme}
                                        keyboardType="numeric"
                                        textAlign="center"
                                    />
                                </View>
                            </View>
                        </View>

                        <View style={styles.combinedRow}>
                            <View style={styles.combinedField}>
                                <Text style={styles.label}>Eletrônicos:</Text>
                                <View style={styles.attributeInputContainer}>
                                    <TextInput
                                        style={styles.attributeInput}
                                        value={eletronicos}
                                        onChangeText={setEletronicos}
                                        keyboardType="numeric"
                                        textAlign="center"
                                    />
                                </View>
                            </View>
                            
                            <View style={styles.combinedField}>
                                <Text style={styles.label}>Enganar:</Text>
                                <View style={styles.attributeInputContainer}>
                                    <TextInput
                                        style={styles.attributeInput}
                                        value={enganar}
                                        onChangeText={setEnganar}
                                        keyboardType="numeric"
                                        textAlign="center"
                                    />
                                </View>
                            </View>
                        </View>

                        <View style={styles.combinedRow}>
                            <View style={styles.combinedField}>
                                <Text style={styles.label}>Furtividade:</Text>
                                <View style={styles.attributeInputContainer}>
                                    <TextInput
                                        style={styles.attributeInput}
                                        value={furtividade}
                                        onChangeText={setFurtividade}
                                        keyboardType="numeric"
                                        textAlign="center"
                                    />
                                </View>
                            </View>
                            
                            <View style={styles.combinedField}>
                                <Text style={styles.label}>Informática:</Text>
                                <View style={styles.attributeInputContainer}>
                                    <TextInput
                                        style={styles.attributeInput}
                                        value={informatica}
                                        onChangeText={setInformatica}
                                        keyboardType="numeric"
                                        textAlign="center"
                                    />
                                </View>
                            </View>
                        </View>

                        <View style={styles.combinedRow}>
                            <View style={styles.combinedField}>
                                <Text style={styles.label}>Iniciativa:</Text>
                                <View style={styles.attributeInputContainer}>
                                    <TextInput
                                        style={styles.attributeInput}
                                        value={iniciativa}
                                        onChangeText={setIniciativa}
                                        keyboardType="numeric"
                                        textAlign="center"
                                    />
                                </View>
                            </View>
                            
                            <View style={styles.combinedField}>
                                <Text style={styles.label}>Intimidação:</Text>
                                <View style={styles.attributeInputContainer}>
                                    <TextInput
                                        style={styles.attributeInput}
                                        value={intimidacao}
                                        onChangeText={setIntimidacao}
                                        keyboardType="numeric"
                                        textAlign="center"
                                    />
                                </View>
                            </View>
                        </View>

                        <View style={styles.combinedRow}>
                            <View style={styles.combinedField}>
                                <Text style={styles.label}>Intuição:</Text>
                                <View style={styles.attributeInputContainer}>
                                    <TextInput
                                        style={styles.attributeInput}
                                        value={intuicao}
                                        onChangeText={setIntuicao}
                                        keyboardType="numeric"
                                        textAlign="center"
                                    />
                                </View>
                            </View>
                            
                            <View style={styles.combinedField}>
                                <Text style={styles.label}>Medicina:</Text>
                                <View style={styles.attributeInputContainer}>
                                    <TextInput
                                        style={styles.attributeInput}
                                        value={medicina}
                                        onChangeText={setMedicina}
                                        keyboardType="numeric"
                                        textAlign="center"
                                    />
                                </View>
                            </View>
                        </View>

                        <View style={styles.combinedRow}>
                            <View style={styles.combinedField}>
                                <Text style={styles.label}>Mecânica:</Text>
                                <View style={styles.attributeInputContainer}>
                                    <TextInput
                                        style={styles.attributeInput}
                                        value={mecanica}
                                        onChangeText={setMecanica}
                                        keyboardType="numeric"
                                        textAlign="center"
                                    />
                                </View>
                            </View>
                            
                            <View style={styles.combinedField}>
                                <Text style={styles.label}>Persuasão:</Text>
                                <View style={styles.attributeInputContainer}>
                                    <TextInput
                                        style={styles.attributeInput}
                                        value={persuasao}
                                        onChangeText={setPersuasao}
                                        keyboardType="numeric"
                                        textAlign="center"
                                    />
                                </View>
                            </View>
                        </View>

                        <View style={styles.combinedRow}>
                            <View style={styles.combinedField}>
                                <Text style={styles.label}>Primeiros-Socorros:</Text>
                                <View style={styles.attributeInputContainer}>
                                    <TextInput
                                        style={styles.attributeInput}
                                        value={primeirosSocorros}
                                        onChangeText={setPrimeirosSocorros}
                                        keyboardType="numeric"
                                        textAlign="center"
                                    />
                                </View>
                            </View>
                            
                            <View style={styles.combinedField}>
                                <Text style={styles.label}>Procurar:</Text>
                                <View style={styles.attributeInputContainer}>
                                    <TextInput
                                        style={styles.attributeInput}
                                        value={procurar}
                                        onChangeText={setProcurar}
                                        keyboardType="numeric"
                                        textAlign="center"
                                    />
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 75,
        height: 60,
    },
    logo: {
        width: 75,
        height: 75,
    },
    backButton: {
        position: 'absolute',
        top: 15,
        left: 15,
        zIndex: 1,
    },
    scrollContainer: {
        paddingTop: 10,          
        paddingBottom: 10,
    },
    content: {
        padding: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: '800',
        color: '#623372',
        marginBottom: 25,
        textAlign: 'center',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#623372',
        marginTop: 20,
        marginBottom: 15,
        textAlign: 'center',
    },
    formRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    combinedRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    combinedField: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '48%',
    },
    singleAttributeRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 15,
    },
    singleAttributeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '48%',
    },
    label: {
        width: 90,
        fontSize: 14,
        fontWeight: '600',
        color: '#623372',
        marginRight: 7,
        textAlign: 'right',
    },
    inputContainer: {
        flex: 1,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    attributeInputContainer: {
        flex: 1,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        justifyContent: 'center',
    },
    input: {
        paddingVertical: 5,
        fontSize: 15,
        color: '#333',
    },
    attributeInput: {
        paddingVertical: 5,
        fontSize: 15,
        color: '#333',
        textAlign: 'center',
    },
});