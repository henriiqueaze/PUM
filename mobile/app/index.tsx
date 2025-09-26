import { useRef, useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet, LayoutChangeEvent, TextInput } from 'react-native';
import { Image } from 'expo-image';
import MenuHorizontal from '@/components/custom/MenuComponent';
import CustomInput from '@/components/custom/CustomInput';
import { Picker } from '@react-native-picker/picker';
import { UnderlineText } from '@/components/custom/UnderlineText';


const logo = require('@/assets/images/UNIFIP.svg');
const fipinho = require('@/assets/images/fipinhoLandingPage.png');
const fipinhofaq = require('@/assets/images/fipinhoMobile.png');

const unifipPhotos = [require('@/assets/images/unifip01.png'), require('@/assets/images/unifip02.png'), require('@/assets/images/unifip03.png')]

export type OptionMenu = 'sobre' | 'contatos' | 'faq';

export default function HomeScreen() {
  const scrollRef = useRef<ScrollView>(null);
  const [active, setActive] = useState<OptionMenu>('sobre');
  const [category, setCategory] = useState("Monitor");

  const positionsRef = useRef<Record<OptionMenu, number>>({
    sobre: 0,
    contatos: 0,
    faq: 0,
  });

  const setSectionY = (key: OptionMenu) => (e: LayoutChangeEvent) => {
    positionsRef.current[key] = e.nativeEvent.layout.y;
  };

  const handleSelect = (opt: OptionMenu) => {
    setActive(opt);
    const y = positionsRef.current[opt] ?? 0;
    scrollRef.current?.scrollTo({ y, animated: true });
  };

  return (
    <ScrollView
      ref={scrollRef}
      style={styles.container}
      contentContainerStyle={styles.content}
      scrollEventThrottle={16}
    >
      <View style={{ paddingTop: 50, backgroundColor: '#1E88E5' }}>
        <View style={{ width: 210, height: 82, alignSelf: 'center' }}>
          <Image source={logo} style={{ width: '100%', height: '100%' }} />
        </View>

        <View style={{ marginTop: 20 }}>
          <MenuHorizontal active={active} onSelect={handleSelect} />
        </View>

        <View style={{ alignSelf: 'center', alignItems: 'center', marginTop: 85 }}>
          <Text style={{ fontSize: 30, width: 220, fontWeight: 'bold', color: '#fff', textAlign: 'center' }}>
            Plataforma Universitária de Monitoria
          </Text>
          <Text style={{ marginTop: 20, fontSize: 14, width: 260, textAlign: 'center', color: '#E5E7EB' }}>
            Conecte-se com monitores e receba apoio acadêmico de forma prática e rápida em diversas disciplinas.
          </Text>

          <TouchableOpacity style={{ marginTop: 20, backgroundColor: '#FF9F0E', padding: 20, width: 200, alignItems: 'center', borderRadius: 10 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#fff' }}>Entrar</Text>
          </TouchableOpacity>
        </View>

        <View style={{ width: 300, height: 350, alignSelf: 'center', marginTop: 40 }}>
          <Image source={fipinho} style={{ width: '100%', height: '100%' }} />
        </View>
      </View>

      <View onLayout={setSectionY('sobre')} style={styles.section}>
        <UnderlineText textColor="#212121" underlineColor="#1E88E5">
          Sobre
        </UnderlineText>



        <Text style={{ fontSize: 25, fontWeight: 'bold', marginTop: 40 }}>UNIFIP - Patos pb</Text>
        <Text style={styles.sectionText}>Lorem ipsum dolor sit amet, consectetur.</Text>

        <View style={{ marginTop: 40, width: 300, height: 200, borderRadius: 20 }}>
          <Image source={unifipPhotos[0]} style={{ width: '100%', height: '100%', borderRadius: 20 }} />
        </View>

        <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginTop: 20, width: 300, height: 150, borderRadius: 20 }}>
          <Image source={unifipPhotos[1]} style={{ width: '47%', height: '100%', borderRadius: 20 }} />
          <Image source={unifipPhotos[2]} style={{ width: '47%', height: '100%', borderRadius: 20 }} />
        </View>

        <Text style={{ width: 300, marginTop: 30 }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.
        </Text>

        <TouchableOpacity style={{ marginTop: 20, backgroundColor: '#1E88E5', padding: 20, width: 200, alignItems: 'center', borderRadius: 10 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#fff' }}>Conheça Mais</Text>
        </TouchableOpacity>

      </View>

      <View onLayout={setSectionY('contatos')} style={styles.section}>
        <Text style={{ fontSize: 25, fontWeight: 'bold', width: 250, textAlign: 'center' }}>O seu feedback nos ajuda a melhorar!</Text>
        <Text style={{ width: 300, marginTop: 30, textAlign: 'center' }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.
        </Text>

        <View style={{
          width: 300,
          padding: 20,
          backgroundColor: '#fff',
          shadowColor: '#000',
          elevation: 5,
          borderRadius: 10,
          marginTop: 40
        }}>
          <CustomInput title='Nome' placeholder='Digite seu nome' value={''} setValue={() => { }} />
          <CustomInput title='E-mail' placeholder='Digite seu e-mail' value={''} setValue={() => { }} />

          <Text style={{ fontSize: 18, marginBottom: 5, marginTop: 20 }}>Categoria</Text>

          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={category}
              onValueChange={(v) => setCategory(v)}
              mode="dropdown"
              dropdownIconColor="#1E88E5"
              style={styles.picker}
            >
              <Picker.Item label="Monitor" value="monitor" />
              <Picker.Item label="Professor" value="professor" />
            </Picker>
          </View>

          <Text style={{ fontSize: 18, marginBottom: 5, marginTop: 20 }}>Mensagem</Text>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: '#ccc',
              borderRadius: 8,
              padding: 12,
              minHeight: 120,
              backgroundColor: '#fff',
              width: "100%",
            }}
            placeholder="Digite sua mensagem..."
            value={''}
            onChangeText={() => { }}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />

          <TouchableOpacity style={{ marginTop: 20, backgroundColor: '#1E88E5', padding: 20, width: "100%", alignItems: 'center', borderRadius: 10 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#fff' }}>Conheça Mais</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View onLayout={setSectionY('faq')} style={styles.section}>
        <Text style={{ ...styles.sectionTitle, fontWeight: 'bold' }}>FAQ</Text>
        <Text style={{ ...styles.sectionText, marginTop: 5 }}>Veja as perguntas frequentes</Text>

        <View style={{ width: 100, height: 150, alignSelf: 'center', marginTop: 40 }}>
          <Image source={fipinhofaq} style={{ width: '100%', height: '100%' }} />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#Fff' },
  content: { paddingBottom: 32 },
  section: { padding: 16, marginTop: 25, alignItems: 'center' },
  sectionTitle: { fontSize: 25, fontWeight: '400', marginBottom: 20, color: '#212121' },
  sectionText: { color: '#444', fontSize: 14, marginTop: 10 },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  picker: {
    height: 48,
  },
});

