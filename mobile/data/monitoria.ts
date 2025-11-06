export type Mode = 'Presencial' | 'EAD';

export type Monitoria = {
    id: string;
    title: string;
    area: string;
    tutor: string;
    location: string;
    rating: number;
    mode: Mode;
    avatarUrl: string;
    vagas: number;
    slots: string[];
    bio: string;
    stats: { total: number; presenca: number };
    reviews: Array<{ name: string; stars: number; text: string }>;
};

const DB: Monitoria[] = [
    {
        id: '1',
        title: 'Cálculo I',
        area: 'Engenharia',
        tutor: 'Ana Silva',
        location: 'Sala 203 - Bloco A',
        rating: 4.8,
        mode: 'Presencial',
        avatarUrl: 'https://i.pravatar.cc/100?img=5',
        vagas: 5,
        slots: ['Segunda 14:00-16:00', 'Quarta 16:00-18:00'],
        bio: 'Estudante de Engenharia, monitora há 2 semestres. Especializada em Cálculo I.',
        stats: { total: 156, presenca: 0.98 },
        reviews: [
            { name: 'Maria S.', stars: 5, text: 'Excelente monitora! Muito paciente e didática.' },
            { name: 'Pedro L.', stars: 5, text: 'Ajudou muito a clarear minhas dúvidas.' },
            { name: 'Ana C.', stars: 4, text: 'Ótima monitoria, recomendo!' },
        ],
    },
    {
        id: '2',
        title: 'Química Orgânica',
        area: 'Química',
        tutor: 'Maria Oliveira',
        location: 'Laboratório 1',
        rating: 4.7,
        mode: 'Presencial',
        avatarUrl: 'https://i.pravatar.cc/100?img=31',
        vagas: 3,
        slots: ['Terça 10:00-12:00', 'Quinta 16:00-18:00'],
        bio: 'Graduanda em Química. Foco em orgânica e técnicas de laboratório.',
        stats: { total: 120, presenca: 0.96 },
        reviews: [
            { name: 'João P.', stars: 5, text: 'A aula prática foi muito boa!' },
            { name: 'Larissa F.', stars: 4, text: 'Dominou o conteúdo e explicou bem.' },
        ],
    },
    {
        id: '3',
        title: 'Programação I',
        area: 'Computação',
        tutor: 'Carlos Santos',
        location: 'Google Meet',
        rating: 4.9,
        mode: 'EAD',
        avatarUrl: 'https://i.pravatar.cc/100?img=12',
        vagas: 8,
        slots: ['Segunda 19:00-21:00', 'Sábado 09:00-11:00'],
        bio: 'Dev e monitor. Ajudo em lógica, JS/TS e estrutura de dados.',
        stats: { total: 210, presenca: 0.99 },
        reviews: [{ name: 'Rafa T.', stars: 5, text: 'Código ficou muito mais claro, valeu!' }],
    },
];

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function getAllMonitorias(): Promise<Monitoria[]> {
    await delay(120);
    return DB;
}

export async function getMonitoriaById(id: string): Promise<Monitoria | null> {
    await delay(120);
    return DB.find((m) => m.id === id) ?? null;
}
