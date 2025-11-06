import { getMonitoriaById, type Mode } from '@/data/monitoria';

export type Status = 'Confirmado' | 'Cancelado' | 'Concluído';

export type Agendamento = {
    id: string;
    monitoriaId: string;
    dateISO: string;
    start: string;
    end: string;
    local: string;
    status: Status;

    recorded?: boolean;
    videoUrl?: string;
    durationMin?: number;
    summary?: string;
    ratingGiven?: number;
};

export type AgendamentoComMonitoria = Agendamento & {
    title: string;
    tutor: string;
    mode: Mode;
};

const AGENDAMENTOS: Agendamento[] = [
    {
        id: 'a1',
        monitoriaId: '1',
        dateISO: '2025-11-15',
        start: '14:00',
        end: '16:00',
        local: 'Sala 20 - Bloco A',
        status: 'Confirmado',
    },
    {
        id: 'a2',
        monitoriaId: '3',
        dateISO: '2025-11-17',
        start: '10:00',
        end: '12:00',
        local: 'Ao vivo',
        status: 'Confirmado',
    },

    {
        id: 'h1',
        monitoriaId: '1',
        dateISO: '2025-10-28',
        start: '14:00',
        end: '15:45',
        local: 'Sala 203 - Bloco A',
        status: 'Concluído',
        recorded: true,
        videoUrl: 'https://www.youtube.com/embed/4v8PztL6y38',
        durationMin: 105,
        summary:
            'Nesta sessão foram abordados os principais conceitos de limites e derivadas, com exercícios práticos.',
        ratingGiven: 5,
    },
    {
        id: 'h2',
        monitoriaId: '3',
        dateISO: '2025-10-25',
        start: '19:00',
        end: '20:30',
        local: 'Ao vivo',
        status: 'Concluído',
        recorded: true,
        videoUrl: 'https://www.youtube.com/embed/2BrpKpWwT2A',
        durationMin: 90,
        summary: 'Estruturas de repetição, funções e boas práticas em JS.',
    },
    {
        id: 'h3',
        monitoriaId: '2',
        dateISO: '2025-10-20',
        start: '10:00',
        end: '11:30',
        local: 'Laboratório 1',
        status: 'Concluído',
        recorded: true,
        videoUrl: 'https://www.youtube.com/embed/r9KQ3G7W7wQ',
        durationMin: 90,
        summary:
            'Reações orgânicas mais comuns e técnicas de laboratório aplicadas.',
    },
];

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function getAgendamentos(): Promise<AgendamentoComMonitoria[]> {
    await delay(120);
    const list: AgendamentoComMonitoria[] = [];
    for (const a of AGENDAMENTOS) {
        const m = await getMonitoriaById(a.monitoriaId);
        if (m) list.push({ ...a, title: m.title, tutor: m.tutor, mode: m.mode });
    }
    return list;
}

export async function getAgendamentoById(id: string): Promise<AgendamentoComMonitoria | null> {
    await delay(100);
    const a = AGENDAMENTOS.find((x) => x.id === id);
    if (!a) return null;
    const m = await getMonitoriaById(a.monitoriaId);
    if (!m) return null;
    return { ...a, title: m.title, tutor: m.tutor, mode: m.mode };
}

export async function cancelarAgendamento(id: string): Promise<void> {
    await delay(120);
    const idx = AGENDAMENTOS.findIndex((x) => x.id === id);
    if (idx >= 0) AGENDAMENTOS.splice(idx, 1);
}

export async function enviarAvaliacao(id: string, stars: number, comment?: string) {
    await delay(150);
    const a = AGENDAMENTOS.find((x) => x.id === id);
    if (a) a.ratingGiven = stars;
    return true;
}
