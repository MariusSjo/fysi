import React from 'react'
import "./Advertisement.css";
type Props = {}

declare function require(path: string)
const advertisement: string = require('../../images/Physica-Annonse-970x90.png')


export default function Advertisement({ }: Props) {
    return (
        <div>
            <a target="_blank" href="https://www.aspit.no/aspit-physica">
                <img src={advertisement} alt="annonse" className='advertisement' />
            </a>
        </div>
    )
}