import React from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import ButtonBase from '@mui/material/ButtonBase';
import { styled } from '@mui/material/styles';

const InfoCard = (props) => {
    const { operation, callback } = props;

    const ImageButton = styled(ButtonBase)(({ theme }) => ({
        position: 'relative',
        height: 200,
        [theme.breakpoints.down('sm')]: {
          width: '100% !important', // Overrides inline-style
          height: 100,
        },
        '&:hover, &.Mui-focusVisible': {
          zIndex: 1,
          '& .MuiImageBackdrop-root': {
            opacity: 0.15,
          },
          '& .MuiImageMarked-root': {
            opacity: 0,
          },
          '& .MuiTypography-root': {
            border: '4px solid currentColor',
          },
        },
      }));
      
      const ImageSrc = styled('span')({
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundSize: 'cover',
        backgroundPosition: 'center 40%',
      });
      
      const Image = styled('span')(({ theme }) => ({
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.palette.common.white,
      }));
      
      const ImageBackdrop = styled('span')(({ theme }) => ({
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: theme.palette.common.black,
        opacity: 0.4,
        transition: theme.transitions.create('opacity'),
      }));
      
      const ImageMarked = styled('span')(({ theme }) => ({
        height: 3,
        width: 18,
        backgroundColor: theme.palette.common.white,
        position: 'absolute',
        bottom: -2,
        left: 'calc(50% - 9px)',
        transition: theme.transitions.create('opacity'),
      }));

      const showAnswerAndIncrementPoint = () => {
        // revealBoxOffice(movie);
      }

      const CardHeader = (operation) => {
        switch(operation) {
            case 'play': return <Typography variant="body1" gutterBottom> Play </Typography>;
            case 'organize': return <Typography variant="body1" gutterBottom> Organize </Typography>
            case 'mentor': return <Typography variant="body1" gutterBottom> Learn </Typography>
        }
      }

      const handleButtonClick = (event) => {
        callback(event);
      }

  return (
    <Card elevation={3}>
      <Grid container>
        <Grid item xs={12} sm={4}>
        <ImageButton
          focusRipple
          style={{
            width: "100%",
          }}
          onClick={() => {handleButtonClick(operation)}}
        >
          <ImageSrc style={{ backgroundImage: `url(${require(`../../assets/${operation}.jpg`)})` }} />
          <ImageBackdrop className="MuiImageBackdrop-root" />
          <Image>
            <Typography
              component="span"
              variant="subtitle1"
              color="inherit"
              sx={{
                position: 'relative',
                p: 4,
                pt: 2,
                pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
              }}
            >
               {CardHeader(operation)}
              <ImageMarked className="MuiImageMarked-root" />
            </Typography>
          </Image>
        </ImageButton>
        </Grid>
      </Grid>
    </Card>
  );
};

export default InfoCard;
