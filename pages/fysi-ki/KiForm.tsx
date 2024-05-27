import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Input, Typography, Spin } from 'antd';
import OpenAI from 'openai';

const { TextArea } = Input;
const { Title, Paragraph } = Typography;

export default function KiForm() {
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [response, setResponse] = useState<string | null>(null);
    const [workoutLoading, setWorkoutLoading] = useState<boolean>(false);
    const [workoutPlan, setWorkoutPlan] = useState<string | null>(null);
    const [painlocation, setPainlocation] = useState<string>('');
    const [history, setHistory] = useState<string>('');
    const [provoking, setProvoking] = useState<string>('');

    const openai = new OpenAI({
        apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
        dangerouslyAllowBrowser: true,
    });
    

    async function fetchChatResponse(e: any) {
        if (e) {
            e.preventDefault();
        }
        setLoading(true); // Start loading
        const newChat: any = [
            { role: 'system', content: 'Du er en hjelpsom fysioterapiassistent.' },
            { role: 'user', content: `Gi meg en diagnose basert på smerteområdet: ${painlocation}, problemetshistorie: ${history}, og hvordan jeg kan provosere/lindre skaden: ${provoking}.` }
        ];

        try {
            const completion = await openai.chat.completions.create({
                model: 'gpt-3.5-turbo',
                messages: newChat,
            });

            const messageContent = completion.choices[0].message.content;
            setResponse(messageContent);
        } catch (error) {
            console.error('Feil ved henting av chatrespons:', error);
        } finally {
            setLoading(false); // Stop loading
        }
    }

    async function fetchWorkoutPlan() {
        if (!response) return;

        setWorkoutLoading(true); // Start loading
        const newChat: any = [
            { role: 'system', content: 'Du er en hjelpsom fysioterapiassistent.' },
            { role: 'user', content: `Basert på følgende diagnose, gi meg en treningsplan: ${response}` }
        ];

        try {
            const completion = await openai.chat.completions.create({
                model: 'gpt-3.5-turbo',
                messages: newChat,
            });

            const messageContent = completion.choices[0].message.content;
            setWorkoutPlan(messageContent);
        } catch (error) {
            console.error('Feil ved henting av treningsplan:', error);
        } finally {
            setWorkoutLoading(false); // Stop loading
        }
    }

    const { register, handleSubmit, formState: { errors } } = useForm();

    function filterEpisodes(e: any, field: "painlocation" | "history" | "provoking") {
        if (field === 'painlocation') {
            setPainlocation(e.target.value);
        }
        if (field === 'history') {
            setHistory(e.target.value);
        }
        if (field === 'provoking') {
            setProvoking(e.target.value);
        }
    }

    if (false) {
        return (
            <>
                <Title style={{ fontSize: '1.5em' }}>Forespørselsgrense nådd</Title>
                <Paragraph>Du har nådd maks antall forespørsler for i dag. Vennligst kom tilbake i morgen.</Paragraph>
            </>
        );
    }

    if (!submitted) {
        return (
            <>
                <form onSubmit={(e) => {
                    fetchChatResponse(e);
                    setSubmitted(true);
                }}>
                    <Title style={{ fontSize: '1.3em' }}>Beskriv smerten, hvor er den lokalisert?</Title>
                    <Input required showCount maxLength={30} type="text" placeholder="På høyre albue" onChange={(e) => filterEpisodes(e, "painlocation")} />
                    <Title style={{ fontSize: '1.3em' }}>Historie / Hva skjedde?</Title>
                    <TextArea
                        showCount
                        maxLength={100}
                        required
                        onChange={(e) => filterEpisodes(e, "history")}
                        placeholder="Jeg spilte tennis her om dagen, og etter treningen gjør albuen vondt."
                        style={{ height: 120, resize: 'none' }}
                    />
                    <Title style={{ fontSize: '1.3em' }}>Provoserende/lindrende faktorer?</Title>
                    <TextArea
                        showCount
                        maxLength={100}
                        required
                        onChange={(e) => filterEpisodes(e, "provoking")}
                        placeholder="Jeg føler smerten intensiveres når jeg bøyer armen."
                        style={{ height: 120, resize: 'none' }}
                    />
                    <Title style={{ paddingTop: 20, fontSize: '1.3em' }}>
                        Klikk for å be FysiAI om diagnose
                    </Title>
                    <Button type="primary" htmlType="submit">
                        Send inn
                    </Button>
                    <Paragraph> Etter å ha satt en diagnose kan vi begynne å generere øvelser</Paragraph>
                </form>
            </>
        )
    }

    return (
        <>
            {loading ? (
                <Spin tip="Laster...">
                    <div style={{ height: '100vh' }} />
                </Spin>
            ) : (
                <>
                    <Title style={{ fontSize: '1.5em' }}>Diagnose</Title>
                    <Paragraph>{response}</Paragraph>
                    {!workoutPlan && (
                        <Button type="primary" onClick={fetchWorkoutPlan} disabled={workoutLoading}>
                            Generer Treningsplan
                        </Button>
                    )}
                    {workoutLoading ? (
                        <Spin tip="Laster...">
                            <div style={{ height: '100vh' }} />
                        </Spin>
                    ) : (
                        workoutPlan && (
                            <>
                                <Title style={{ fontSize: '1.5em', marginTop: '20px' }}>Treningsplan</Title>
                                <Paragraph>{workoutPlan}</Paragraph>
                            </>
                        )
                    )}
                </>
            )}
        </>
    );
}
