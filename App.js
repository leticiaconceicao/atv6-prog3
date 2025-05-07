import React from 'react';
import { View, Text, TextInput, Image } from 'react-native';
import { Avatar } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      doutores: [] // novo estado para armazenar os dados da API
    };
  }

  updateSearch = (search) => {
    this.setState({ search });
  };

  componentDidMount() {
    fetch('http://localhost:3001/doutores') // use seu IP local se estiver no celular
      .then((response) => response.json())
      .then((data) => {
        this.setState({ doutores: data });
      })
      .catch((error) => {
        console.error('Erro ao buscar doutores:', error);
      });
  }

  render() {
    const { search, doutores } = this.state;

    return (
      <View style={{ flex: 1 }}>
        {/* Header */}
        <View
          style={{
            paddingTop: 40,
            paddingHorizontal: 16,
            paddingBottom: 16,
            backgroundColor: '#1E90FF',
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
          <FontAwesome5 name="bars" size={30} color="#1E90FF" style={{ marginLeft: 'auto' }} />
        </View>

        <View style={{ alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', marginTop: 20, paddingHorizontal: 16 }}>
          <View>
            <Icon name="umbrella-beach" size={40} color="#1E90FF" />
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>Resort</Text>
          </View>
          <View>
            <Icon name="tooth" size={40} color="#1E90FF" />
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>Dentista</Text>
          </View>
          <View>
            <Icon name="heart" size={40} color="#1E90FF" />
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>Cardiologista</Text>
          </View>
        </View>

        <View style={{ alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', marginTop: 40, paddingHorizontal: 16 }}>
          <View>
            <Icon name="hospital" size={40} color="#1E90FF" />
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>Hospital</Text>
          </View>
          <View>
            <Icon name="ambulance" size={40} color="#1E90FF" />
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>Emergencias</Text>
          </View>
          <View>
            <Icon name="flask" size={40} color="#1E90FF" />
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>Laboratório</Text>
          </View>
        </View>

        <Text style={{ fontWeight: "bold", fontSize: 16, marginTop: 60, marginLeft: 16 }}>Melhores doutores</Text>

        {/* Lista dinâmica de doutores */}
        <View style={{ paddingHorizontal: 16 }}>
          {doutores.map((doutor) => (
            <View key={doutor.id} style={{ backgroundColor: '#87CEFA', flexDirection: 'row', alignItems: 'center', borderRadius: 20, marginTop: 20, padding: 10 }}>
              <Avatar
                rounded
                size="medium"
                source={{ uri: doutor.imagem }}
              />
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
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', backgroundColor: '#1E90FF', paddingVertical: 10, marginTop: 50 }}>
          <View style={{ marginTop: 10 }}>
            <Icon name="home" size={40} color="#fff" />
            <Text style={{ color: '#fff', fontWeight: "bold", fontSize: 16 }}>Home</Text>
          </View>

          <View style={{ marginTop: 10 }}>
            <Icon name="stethoscope" size={40} color="#fff" />
            <Text style={{ color: '#fff', fontWeight: "bold", fontSize: 16 }}>Doutores</Text>
          </View>

          <View style={{ marginTop: 10 }}>
            <Icon name="calendar" size={40} color="#fff" />
            <Text style={{ color: '#fff', fontWeight: "bold", fontSize: 16 }}>Data</Text>
          </View>

          <View style={{ marginTop: 10 }}>
            <Icon name="user" size={40} color="#fff" />
            <Text style={{ color: '#fff', fontWeight: "bold", fontSize: 16 }}>Perfil</Text>
          </View>
        </View>
      </View>
    );
  }
}
