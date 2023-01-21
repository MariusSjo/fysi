import { Card } from '@mui/material';
import React, { useEffect, useState } from 'react';
import './Landingpage.css';
import Typography from '@mui/material/Typography';
import qs from 'qs';
// @ts-ignore
import Podcasts from '../components/podcasts/Podcasts.tsx';
import CircularProgress from '@mui/material/CircularProgress';
import { FormControlUnstyled } from '@mui/base';
import { Buffer } from 'buffer';
const axios = require('axios').default;
/* declare function require(path: string)
 declare const Buffer: any;
 */
const fysiBanner = require('../images/fysi_info-removebg.png');

export default function Landingpage() {
	const [episodes, setEpisodes] = useState([]);

	var client_id = '9af22d6418ce49738b35235ab74db93e';
	var client_secret = 'e0dde8a6105949f1a42b7aa880b83c09';

	const authOptions = {
		url: 'https://accounts.spotify.com/api/token',
		headers: {
			Authorization:
				'Basic ' +
				Buffer.from(client_id + ':' + client_secret).toString('base64'),
		},
		form: {
			grant_type: 'client_credentials',
		},
		json: true,
	};

	const fetchEpisodes = async () => {
		let bearer;
		await axios
			.post(
				'https://accounts.spotify.com/api/token',
				qs.stringify({
					grant_type: 'client_credentials',
				}),
				{
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/x-www-form-urlencoded',
						authorization:
							'Basic ' +
							Buffer.from(
								client_id + ':' + client_secret
							).toString('base64'),
					},
				}
			)
			.then(function (res) {
				console.log(res.data);
				bearer = res.data.access_token;
			});
		console.log(bearer);
		const { data } = await axios.get(
			'https://api.spotify.com/v1/shows/2XZ654XhzGKbtkwgSlPk2K/episodes?market=NO',
			{
				headers: {
					authorization: 'Bearer ' + bearer,
				},
				params: {
					limit: '6',
				},
			}
		);
		console.log(bearer);
		setEpisodes(data.items);
		console.log('successfully loaded');
	};

	useEffect(() => {
		// Do mount stuff here such as executing your request.
		fetchEpisodes();
	}, []);

	return (
		<>
			<div className="info">
				<img className="banner" src={fysiBanner} />
				<Typography>
					Fysi er et idealistisk iniativ som er startet av Fredrik
					Sjøberg. Fysi driftes av totalt 12 engasjerte
					fysioterapeuter, turnusfysioer og fysiostudenter. Vi er Fysi
					kollektivet. Målet er å dele evidensbasert og klinisk
					anvennelig kunnskap for å forbedre håndteringen av
					pasienter. Vår målgruppe er fysioterapeuter og andre
					helsearbeidere. De jobber på sykehusene, i kommunene og som
					privatpraktiserende med og uten driftstilskudd. De jobber
					med barn, traumer, pasienter med muskel- og skjelettplager,
					nevro, lungesyke og friske som vil forebygge. De som hjelper
					oss fra vi er små til vi blir bestemødre og bestefedre.
				</Typography>
			</div>
			<div className="podcast_intro">
				<h2>Nyeste podcaster:</h2>
				<iframe
					src="https://open.spotify.com/embed/show/2XZ654XhzGKbtkwgSlPk2K?utm_source=generator"
					width="100%"
					height="232"
					title="Spotifyframe"
					frameBorder="0"
					allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
				></iframe>
			</div>
			<div className="cardContainer">
				{!!episodes.length &&
					episodes.map((episode, id) => {
						return <Podcasts key={id} props={episode}></Podcasts>;
					})}
				{!episodes.length && (
					<>
						{' '}
						<Typography>
							{' '}
							<CircularProgress /> <br />
							Laster episoder{' '}
						</Typography>
					</>
				)}
			</div>
		</>
	);
}
