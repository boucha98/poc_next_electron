import React, { useRef } from 'react';
import { useEffect, useState } from 'react';

import Layout from '../components/Layout';
import { getAllDeltas, insertOneDelta } from '../utils/repository';


const DatabaseView = () => {
    let [items, setItems] = useState([])
    let [refreshKey, setRefrehKey] = useState(0) // don't know if it's a good practice... have to check it
    let textInput = useRef()

    
    const fetchDatas = async () => {
        const deltas =  await getAllDeltas(window)
        setItems(deltas)
    }

    const insertOne = async (input?: HTMLInputElement) => {
        await insertOneDelta(window, input.value)
        setRefrehKey(++refreshKey)
    }

    useEffect(() => {
        fetchDatas()
    }, [refreshKey])

    return <Layout title='Database | Next.js + TypeScript + Electron Example'>
        <h1>Local database</h1>
        <p>Here you can test database interactions</p>
        <h2>Getter</h2>
        <ul>
            {items?.map(item => (
                <li key={item.id}>
                    <p>{`${item.text} `}</p>
                </li>
            ))}
        </ul>

        <h2>Setter</h2>
        <input ref={textInput} type='text'/><button onClick={() => insertOne(textInput.current)}>Insert</button>
    </Layout>
}

export default DatabaseView