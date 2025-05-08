import React from 'react';
import { View, Text, TextInput, ScrollView } from 'react-native';
import { Avatar } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      doutores: [],
      categorias: []
    };
  }

  updateSearch = (search) => {
    this.setState({ search });
  };

  componentDidMount() {
    fetch('http://localhost:3000/doutores')
      .then((response) => response.json())
      .then((data) => {
        this.setState({ doutores: data });
      })
      .catch((error) => {
        console.error('Erro ao buscar doutores:', error);
      });

    fetch('http://localhost:3000/categorias')
      .then((response) => response.json())
      .then((data) => {
        this.setState({ categorias: data || [] });
      })
      .catch((error) => {
        console.error('Erro ao buscar categorias:', error);
        this.setState({ categorias: [] });
      });
  }

  render() {
    const { search, doutores, categorias } = this.state;

    return (
      <ScrollView style={{ flex: 1 }}>
        {/* Header */}
        <View
          style={{
            paddingTop: 40,
            paddingHorizontal: 16,
            paddingBottom: 16,
            backgroundColor: '#6A0DAD',
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 10,
            }}
          >
            <Icon name="plane" size={40} color="#fff" />

            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#fff',
                borderRadius: 20,
                marginHorizontal: 16,
                paddingHorizontal: 8,
                height: 40,
              }}
            >
              <Ionicons name="search" size={20} color="#aaa" style={{ marginRight: 8 }} />
              <TextInput
                style={{ flex: 1, fontSize: 16, color: '#333' }}
                placeholder="Search here ..."
                placeholderTextColor="#aaa"
                onChangeText={this.updateSearch}
                value={search}
              />
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Avatar
                rounded
                size="medium"
                source={{
                  uri: 'https://robohash.org/b4faa298dd94fea676ea797a194cb6e4?set=set4&bgset=&size=400x400',
                }}
              />
              <View style={{ marginLeft: 12 }}>
                <Text style={{ color: '#fff', fontSize: 18 }}>Bem vindo!</Text>
                <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>
                  Marilet
                </Text>
              </View>
            </View>

            <Ionicons name="notifications" size={28} color="#fff" />
          </View>
        </View>

        <View style={{ flexDirection: 'row', marginTop: 10, paddingHorizontal: 16 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Categorias</Text>
          <FontAwesome5 name="bars" size={30} color="#6A0DAD" style={{ marginLeft: 'auto' }} />
        </View>

        {/* Categorias dinâmicas */}
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 16, marginTop: 20 }}>
          {categorias.map((categoria) => (
            <View key={categoria.id} style={{ alignItems: 'center', marginRight: 20, marginBottom: 20 }}>
              <Icon name={categoria.icone} size={40} color="#6A0DAD" />
              <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{categoria.nome}</Text>
            </View>
          ))}
        </View>

        <Text style={{ fontWeight: 'bold', fontSize: 16, marginTop: 40, marginLeft: 16 }}>Melhores doutores</Text>

        {/* Lista dinâmica de doutores */}
        <View style={{ paddingHorizontal: 16 }}>
          {doutores.map((doutor) => (
            <View
              key={doutor.id}
              style={{
                backgroundColor: '#D8BFD8',
                flexDirection: 'row',
                alignItems: 'center',
                borderRadius: 20,
                marginTop: 20,
                padding: 10,
              }}
            >
              <Avatar rounded size="medium" source={{ uri: doutor.imagem }} />
              <View style={{ marginLeft: 12 }}>
                <Text style={{ color: '#000000', fontSize: 18 }}>{doutor.nome}</Text>
                <Text style={{ color: '#000000', fontSize: 16, fontWeight: 'bold' }}>{doutor.especialidade}</Text>
                <View style={{ flexDirection: 'row' }}>
                  <Icon name="star" size={20} color="#FFD700" />
                  <Text style={{ marginLeft: 8, fontSize: 16, color: '#555' }}>
                    {doutor.nota} ({doutor.reviews} Reviews)
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Footer */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', backgroundColor: '#6A0DAD', paddingVertical: 10, marginTop: 50 }}>
          <View style={{ marginTop: 10 }}>
            <Icon name="home" size={40} color="#fff" />
            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>Home</Text>
          </View>

          <View style={{ marginTop: 10 }}>
            <Icon name="stethoscope" size={40} color="#fff" />
            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>Doutores</Text>
          </View>

          <View style={{ marginTop: 10 }}>
            <Icon name="calendar" size={40} color="#fff" />
            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>Data</Text>
          </View>

          <View style={{ marginTop: 10 }}>
            <Icon name="user" size={40} color="#fff" />
            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>Perfil</Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}
