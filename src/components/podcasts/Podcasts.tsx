import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import { CardActionArea, Collapse } from '@mui/material';
import { styled } from '@mui/material/styles';


export default function Podcasts(data) {
    const props = data.props;
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card >
            <CardMedia
                component="img"
                image={props.images[1].url}
                alt="Photo of Fysi logo"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {props.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" className="card-description">
                    {props.description.slice(0, 250) + "..."}
                </Typography>
            </CardContent>

        </Card>
    );
}


