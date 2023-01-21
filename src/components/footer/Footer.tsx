import React from 'react'
import Typography from '@mui/material/Typography';
import "./Footer.css"
type Props = {}

export default function Footer({ }: Props) {
    return (
        <div className='footer'>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Hei!
            </Typography>
            <Typography className='footercontent'>
                Ønsker du å være vert eller deltager på pods’a?
                Dele tanker om hvordan vi kan forbedre oss?
                Ønsker du reklame/ads på våre nettsider og podcasts?
                Ring oss eller send mail.<br />
                Kontakt sentralbord: +47 210 64 000<br />
                E-post: post@fysi.no<br />
            </Typography>
        </div>
    )
}