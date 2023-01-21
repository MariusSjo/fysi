import React from 'react'
import "./Advertisement.css";
import ReactGA from "react-ga";

const useAnalyticsEventTracker = (category="Blog category") => {
    const eventTracker = (action = "test action", label = "test label") => {
      ReactGA.event({category, action, label});
    }
    return eventTracker;
  }

declare function require(path: string)
const advertisement: string = require('../../images/Physica-Annonse-970x90.png')


export default function Advertisement({ }) {
    const gaEventTracker = useAnalyticsEventTracker('ads');
    return (
        <div>
            <a onClick={()=>gaEventTracker('clickonAd')} target="_blank" href="https://www.aspit.no/aspit-physica">
                <img src={advertisement} alt="annonse" className='advertisement' />
            </a>
        </div>
    )
}