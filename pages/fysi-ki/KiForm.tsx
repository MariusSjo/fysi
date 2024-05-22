import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Input, Typography, Spin } from 'antd';
import OpenAI from 'openai';

const { TextArea } = Input;
const { Title, Paragraph } = Typography;

const REQUEST_LIMIT = 2;

export default function KiForm() {
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [response, setResponse] = useState<string | null>(null);
    const [workoutLoading, setWorkoutLoading] = useState<boolean>(false);
    const [workoutPlan, setWorkoutPlan] = useState<string | null>(null);
    const [painlocation, setPainlocation] = useState<string>('');
    const [history, setHistory] = useState<string>('');
    const [provoking, setProvoking] = useState<string>('');
    const [requestLimitReached, setRequestLimitReached] = useState<boolean>(false);

    const openai = new OpenAI({
        apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
        dangerouslyAllowBrowser: true,
    });

    useEffect(() => {
        checkRequestLimit();
    }, []);

    function checkRequestLimit() {
        const requestInfo = JSON.parse(localStorage.getItem('requestInfo') || '{}');
        const today = new Date().toISOString().split('T')[0];

        if (requestInfo.date === today && requestInfo.count >= REQUEST_LIMIT) {
            setRequestLimitReached(true);
        } else if (requestInfo.date !== today) {
            localStorage.setItem('requestInfo', JSON.stringify({ date: today, count: 0 }));
        }
    }

    function updateRequestCount() {
        const requestInfo = JSON.parse(localStorage.getItem('requestInfo') || '{}');
        const today = new Date().toISOString().split('T')[0];

        if (requestInfo.date === today) {
            requestInfo.count += 1;
        } else {
            requestInfo.date = today;
            requestInfo.count = 1;
        }

        localStorage.setItem('requestInfo', JSON.stringify(requestInfo));
        if (requestInfo.count >= REQUEST_LIMIT) {
            setRequestLimitReached(true);
        }
    }

    async function fetchChatResponse(e: any) {
        if (e) {
            e.preventDefault();
        }
        setLoading(true); // Start loading
        const newChat: any = [
            { role: 'system', content: 'You are a helpful assistant.' },
            { role: 'user', content: `Provide me a diagnose based on the painlocation: ${painlocation}, the history of the problem: ${history}, and how I can provoke/relieve the injury: ${provoking}.` }
        ];

        try {
            const completion = await openai.chat.completions.create({
                model: 'gpt-3.5-turbo',
                messages: newChat,
            });

            const messageContent = completion.choices[0].message.content;
            setResponse(messageContent);
            console.log(messageContent);
            updateRequestCount();
        } catch (error) {
            console.error('Error fetching chat response:', error);
        } finally {
            setLoading(false); // Stop loading
        }
    }

    async function fetchWorkoutPlan() {
        if (!response) return;

        setWorkoutLoading(true); // Start loading
        const newChat: any = [
            { role: 'system', content: 'You are a helpful assistant.' },
            { role: 'user', content: `Based on the following diagnosis, provide a workout plan: ${response}` }
        ];

        try {
            const completion = await openai.chat.completions.create({
                model: 'gpt-3.5-turbo',
                messages: newChat,
            });

            const messageContent = completion.choices[0].message.content;
            setWorkoutPlan(messageContent);
            console.log(messageContent);
            updateRequestCount();
        } catch (error) {
            console.error('Error fetching workout plan:', error);
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

    if (requestLimitReached) {
        return (
            <>
                <Title style={{ fontSize: '1.5em' }}>Request Limit Reached</Title>
                <Paragraph>You have reached the maximum number of requests for today. Please come back tomorrow.</Paragraph>
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
                    <Title style={{ fontSize: '1.3em' }}>Describe the pain, where is it located?</Title>
                    <Input required showCount maxLength={30} type="text" placeholder="On my right elbow" onChange={(e) => filterEpisodes(e, "painlocation")} />
                    <Title style={{ fontSize: '1.3em' }}>History / What happened?</Title>
                    <TextArea
                        showCount
                        maxLength={100}
                        required
                        onChange={(e) => filterEpisodes(e, "history")}
                        placeholder="I played tennis the other day, and after the exercise my elbow hurts."
                        style={{ height: 120, resize: 'none' }}
                    />
                    <Title style={{ fontSize: '1.3em' }}>Provoking/relieving factors?</Title>
                    <TextArea
                        showCount
                        maxLength={100}
                        required
                        onChange={(e) => filterEpisodes(e, "provoking")}
                        placeholder="I feel the pain intensifies when I bend my arm."
                        style={{ height: 120, resize: 'none' }}
                    />
                    <Title style={{ paddingTop: 20, fontSize: '1.3em' }}>
                        Click to ask FysiAI to diagnose
                    </Title>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                    <Paragraph> After setting a diagnosis we can start generating exercises</Paragraph>
                </form>
            </>
        )
    }

    return (
        <>
            {loading ? (
                <Spin tip="Loading...">
                    <div style={{ height: '100vh' }} />
                </Spin>
            ) : (
                <>
                    <Title style={{ fontSize: '1.5em' }}>Diagnosis</Title>
                    <Paragraph>{response}</Paragraph>
                    {!workoutPlan && (
                        <Button type="primary" onClick={fetchWorkoutPlan} disabled={workoutLoading}>
                            Generate Workout Plan
                        </Button>
                    )}
                    {workoutLoading ? (
                        <Spin tip="Loading...">
                            <div style={{ height: '100vh' }} />
                        </Spin>
                    ) : (
                        workoutPlan && (
                            <>
                                <Title style={{ fontSize: '1.5em', marginTop: '20px' }}>Workout Plan</Title>
                                <Paragraph>{workoutPlan}</Paragraph>
                            </>
                        )
                    )}
                </>
            )}
        </>
    );
}
