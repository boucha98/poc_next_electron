import Quill from 'quill'
import { useEffect } from 'react'
import Layout from '../components/Layout'


const EditorView = () => {
    const container = 'editor'
    const toolbar = 'toolbar'
    let editor;

    const saveDeltas = () => {
        console.log(editor?.getContents(0, editor.getLength()))
    }

    useEffect(() => {
        editor = new Quill(`#${container}`, {
            modules: { toolbar: `#${toolbar}` }
        })

        editor.on('text-change', (delta, oldDelta, source) => {
            console.log(delta) // the last change + informations about olds char kept or deleted
            console.log(oldDelta) // array with all events from the beginning
            console.log(source) // source can be either 'user' or 'api' 
        })
    }, [])


    return <Layout title='Editor | Next.js + TypeScript + Electron Example'>
        <br />
        <button onClick={saveDeltas}>SAVE</button>
        <div id={toolbar}>
            <button className='ql-bold'>Bold</button>
            <button className='ql-italic'>Italic</button>
        </div>
        <div id={container}></div>
    </Layout>
}

export default EditorView
