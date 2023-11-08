import React from 'react';
import SportsCricketIcon from '@mui/icons-material/SportsCricket';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import SportsFootballIcon from '@mui/icons-material/SportsFootball';
import SportsVolleyballIcon from '@mui/icons-material/SportsVolleyball';
import SportsTennisIcon from '@mui/icons-material/SportsTennis';
import SportsKabaddiIcon from '@mui/icons-material/SportsKabaddi';
import SportsGolfIcon from '@mui/icons-material/SportsGolf';

const SportsIcon = ({sport}) => {
    const getSports = () => {
        switch(sport){
            case "Cricket": return <SportsCricketIcon />;
            case "Soccer": return <SportsSoccerIcon />;
            case "Football": return <SportsFootballIcon />;
            case "Volleyball": return <SportsVolleyballIcon />;
            case "Tennis": return <SportsTennisIcon />;
            case "Fencing": return <SportsKabaddiIcon />;
            case "Squash": return <SportsTennisIcon />;
            case "Golf": return <SportsGolfIcon />;
            case "Badminton": return <SportsTennisIcon />;
        }
    }
    return(
        <>
            <div>
                {getSports()}
            </div>
        </>
    )
}

export default SportsIcon;