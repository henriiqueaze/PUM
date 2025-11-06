import { useRef, useState, useMemo } from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  LayoutChangeEvent,
  TextInput,
  Alert,
} from 'react-native';
import { Image } from 'expo-image';
import { Picker } from '@react-native-picker/picker';
import { router } from 'expo-router';

import MenuHorizontal from '@/components/custom/MenuComponent';
import CustomInput from '@/components/custom/CustomInput';
import { UnderlineText } from '@/components/custom/UnderlineText';

const logo = require('@/assets/images/UNIFIP.svg');
const fipinho = require('@/assets/images/fipinhoLandingPage.png');
const fipinhofaq = require('@/assets/images/fipinhoMobile.png');

const unifipPhotos = [
  require('@/assets/images/unifip01.png'),
  require('@/assets/images/unifip02.png'),
  require('@/assets/images/unifip03.png'),
];

type OptionMenu = 'sobre' | 'contatos' | 'faq';

export default function HomeScreen() {
  const scrollRef = useRef<ScrollView>(null);
  const [active, setActive] = useState<OptionMenu>('sobre');
  const [category, setCategory] = useState('monitor');

  const positionsRef = useRef<Record<OptionMenu, number>>({
    sobre: 0,
    contatos: 0,
    faq: 0,
  });

  const setSectionY = (key: OptionMenu) => (e: LayoutChangeEvent) => {
    positionsRef.current[key] = e.nativeEvent.layout.y;
  };

  const scrollTo = (key: OptionMenu) => {
    const y = positionsRef.current[key] ?? 0;
    setActive(key);
    scrollRef.current?.scrollTo({ y, animated: true });
  };

  const faqs = useMemo(
    () => [
      {
        q: 'Pergunta 1',
        a: 'Resposta curta de exemplo. Explique como o aluno pode encontrar monitores, horários e regras básicas.',
      },
      {
        q: 'Pergunta 2',
        a: 'Outra resposta de exemplo. Inclua links internos ou instruções rápidas para o app quando necessário.',
      },
      {
        q: 'Pergunta 3',
        a: 'Detalhe taxas, políticas de cancelamento ou como entrar em contato com a coordenação.',
      },
      {
        q: 'Pergunta 4',
        a: 'Informações sobre privacidade, segurança e suporte técnico.',
      },
    ],
    []
  );
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const toggle = (i: number) => setOpenIndex(prev => (prev === i ? null : i));

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
          <MenuHorizontal active={active} onSelect={scrollTo} />
        </View>

        <View style={{ alignSelf: 'center', alignItems: 'center', marginTop: 85 }}>
          <Text style={styles.heroTitle}>Plataforma Universitária de Monitoria</Text>
          <Text style={styles.heroSubtitle}>
            Conecte-se com monitores e receba apoio acadêmico de forma prática e rápida em diversas disciplinas.
          </Text>

          <TouchableOpacity
            style={styles.ctaPrimary}
            onPress={() => router.push('/(auth)/login')}
          >
            <Text style={styles.ctaPrimaryText}>Entrar</Text>
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

        <Text style={{ fontSize: 25, fontWeight: 'bold', marginTop: 40 }}>UNIFIP - Patos PB</Text>
        <Text style={styles.sectionText}>Lorem ipsum dolor sit amet, consectetur.</Text>

        <View style={{ marginTop: 40, width: 300, height: 200, borderRadius: 20 }}>
          <Image source={unifipPhotos[0]} style={{ width: '100%', height: '100%', borderRadius: 20 }} />
        </View>

        <View style={styles.duoPhotos}>
          <Image source={unifipPhotos[1]} style={styles.duoLeft} />
          <Image source={unifipPhotos[2]} style={styles.duoRight} />
        </View>

        <Text style={{ width: 300, marginTop: 30 }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet,
          adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue,
          euismod non, mi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor,
          dignissim sit amet, adipiscing nec, ultricies sed, dolor.
        </Text>

        <TouchableOpacity
          style={styles.ctaSecondary}
          onPress={() => router.push('/(app)/monitorias')}
        >
          <Text style={styles.ctaSecondaryText}>Conheça Mais</Text>
        </TouchableOpacity>
      </View>

      <View onLayout={setSectionY('contatos')} style={styles.section}>
        <Text style={{ fontSize: 25, fontWeight: 'bold', width: 260, textAlign: 'center' }}>
          O seu feedback nos ajuda a melhorar!
        </Text>

        <Text style={{ width: 300, marginTop: 30, textAlign: 'center' }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet,
          adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue,
          euismod non, mi.
        </Text>

        <View style={styles.feedbackCard}>
          <CustomInput title="Nome" placeholder="Digite seu nome" value={''} setValue={() => { }} />
          <CustomInput title="E-mail" placeholder="Digite seu e-mail" value={''} setValue={() => { }} />

          <Text style={{ fontSize: 18, marginBottom: 5, marginTop: 20 }}>Categoria</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={category}
              onValueChange={(v) => setCategory(String(v))}
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
            style={styles.msg}
            placeholder="Digite sua mensagem..."
            value={''}
            onChangeText={() => { }}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />

          <TouchableOpacity
            style={styles.ctaSecondary}
            onPress={() => Alert.alert('Feedback', 'Obrigado! Recebemos seu feedback (mock).')}
          >
            <Text style={styles.ctaSecondaryText}>Enviar</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View onLayout={setSectionY('faq')} style={styles.section}>
        <Text style={{ ...styles.sectionTitle, fontWeight: 'bold' }}>FAQ</Text>
        <Text style={{ ...styles.sectionText, marginTop: 5 }}>Veja as perguntas frequentes</Text>

        <View style={{ width: 100, height: 150, alignSelf: 'center', marginTop: 40 }}>
          <Image source={fipinhofaq} style={{ width: '100%', height: '100%' }} />
        </View>

        <View style={{ width: '100%', marginTop: 32, paddingHorizontal: 8 }}>
          {faqs.map((item, i) => {
            const opened = openIndex === i;
            return (
              <View key={i} style={{ marginBottom: 12 }}>
                <TouchableOpacity onPress={() => toggle(i)} style={styles.faqRow}>
                  <Text style={styles.faqQuestion}>{item.q}</Text>
                  <Text style={styles.chevron}>›</Text>
                </TouchableOpacity>

                {opened && (
                  <View style={styles.faqAnswerBox}>
                    <Text style={styles.faqAnswer}>{item.a}</Text>
                  </View>
                )}

                <View style={styles.separator} />
              </View>
            );
          })}
        </View>

        <View style={styles.footerCard}>
          <View style={{ width: 140, height: 50, alignSelf: 'center', marginBottom: 16 }}>
            <Image source={logo} style={{ width: '100%', height: '100%' }} />
          </View>

          <View style={styles.footerCols}>
            <View style={{ flex: 1 }}>
              <Text style={styles.footerTitle}>Contatos</Text>
              <Text style={styles.footerText}>fip@email.com</Text>
            </View>

            <View style={{ flex: 1 }}>
              <Text style={styles.footerTitle}>Siga a gente</Text>
              <Text style={styles.footerText}>@instagram</Text>
              <Text style={styles.footerText}>@youtube</Text>
            </View>
          </View>

          <View style={styles.footerLine} />

          <View style={styles.footerBottomLinks}>
            <TouchableOpacity onPress={() => scrollTo('sobre')}>
              <Text style={styles.bottomLink}>Início</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => scrollTo('sobre')}>
              <Text style={styles.bottomLink}>Sobre</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => scrollTo('contatos')}>
              <Text style={styles.bottomLink}>Contatos</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => scrollTo('faq')}>
              <Text style={styles.bottomLink}>FAQ</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.footerCopyright}>
            © 2025 Todos os direitos reservados para os Ternurinhas
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { paddingBottom: 32 },

  heroTitle: { fontSize: 30, width: 260, fontWeight: 'bold', color: '#fff', textAlign: 'center' },
  heroSubtitle: { marginTop: 20, fontSize: 14, width: 280, textAlign: 'center', color: '#E5E7EB' },
  ctaPrimary: { marginTop: 20, backgroundColor: '#FF9F0E', padding: 20, width: 200, alignItems: 'center', borderRadius: 10 },
  ctaPrimaryText: { fontSize: 20, fontWeight: 'bold', color: '#fff' },

  section: { padding: 16, marginTop: 25, alignItems: 'center' },
  sectionTitle: { fontSize: 25, fontWeight: '400', marginBottom: 20, color: '#212121' },
  sectionText: { color: '#444', fontSize: 14, marginTop: 10 },

  duoPhotos: { justifyContent: 'space-between', flexDirection: 'row', marginTop: 20, width: 300, height: 150 },
  duoLeft: { width: '47%', height: '100%', borderRadius: 20 },
  duoRight: { width: '47%', height: '100%', borderRadius: 20 },

  ctaSecondary: { marginTop: 20, backgroundColor: '#1E88E5', padding: 20, width: 200, alignItems: 'center', borderRadius: 10 },
  ctaSecondaryText: { fontSize: 20, fontWeight: 'bold', color: '#fff' },

  feedbackCard: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    shadowColor: '#000',
    elevation: 5,
    borderRadius: 10,
    marginTop: 40,
  },
  pickerWrapper: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, overflow: 'hidden', backgroundColor: '#fff' },
  picker: { height: 48 },
  msg: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    minHeight: 120,
    backgroundColor: '#fff',
    width: '100%',
  },

  faqRow: {
    width: '100%',
    paddingVertical: 18,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  faqQuestion: { color: '#3B82F6', fontSize: 16, fontWeight: '600' },
  chevron: { fontSize: 22, color: '#111' },
  separator: { height: 1, backgroundColor: '#E5E7EB', width: '100%' },
  faqAnswerBox: { backgroundColor: '#F9FAFB', borderRadius: 10, marginHorizontal: 12, marginBottom: 12, padding: 12 },
  faqAnswer: { color: '#374151', fontSize: 14, lineHeight: 20 },

  footerCard: {
    width: '100%',
    backgroundColor: '#FF9F0E',
    borderRadius: 14,
    paddingVertical: 22,
    paddingHorizontal: 18,
    marginTop: 28,
    shadowColor: '#000',
    elevation: 3,
  },
  footerCols: { width: '100%', flexDirection: 'row', gap: 16, marginTop: 6 },
  footerTitle: { color: '#ffffff', fontWeight: '700', fontSize: 16, marginBottom: 6 },
  footerText: { color: '#F1F5F9', fontSize: 14, marginBottom: 4 },
  footerLine: { height: 1, backgroundColor: '#FFE0B2', width: '100%', marginVertical: 14 },
  footerBottomLinks: { width: '100%', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  bottomLink: { color: '#fff', fontWeight: '600' },
  footerCopyright: { color: '#fff', opacity: 0.9, fontSize: 12, marginTop: 4, textAlign: 'center' },
});
