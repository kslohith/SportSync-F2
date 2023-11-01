import React from 'react';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';

const ItemCard = ({ title, description, date, time }) => {
  return (
    <Card sx={{ minWidth: 275 }}>
        <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {title}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {description}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {date}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {time}
        </Typography>
        </CardContent>
        <CardActions>
        <Button size="small">Manage</Button>
        </CardActions>
    </Card>
  );
};

export default ItemCard;
