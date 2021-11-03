/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-find-dom-node */
import { useState, createRef, useContext, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { ComponentContext } from '../../components'
import { useRouteMatch } from 'react-router-dom'

export default function IframePage(): JSX.Element {

    const context = useContext(ComponentContext)
    const [iframeRef, setIframeRef] = useState<any>('')
    const [iFrameHeight, setIFrameHeight] = useState('0px')
    const [path, setPath] = useState('')
    const match = useRouteMatch()

    useEffect(() => {
        if (match) {
            setPath(match.url)
        }
    }, [])

    return <iframe
        style={{
            width: '100%', height: '100%', overflow: 'visible',
            border: 'node'
        }}
        src={'/control/index.html'}
        ref={(el: any) => setIframeRef(el)}
        onLoad={() => {
            const obj: any = ReactDOM.findDOMNode(iframeRef)
            obj.contentWindow.postMessage(JSON.stringify(context), '*')
        }}
    />
}

