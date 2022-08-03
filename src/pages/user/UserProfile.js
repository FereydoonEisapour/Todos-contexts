import React, { } from 'react'
import { Redirect } from "react-router-dom";
import { useSelector } from 'react-redux'
import { selectUserName, selectUserAvatar, selectUserEmail } from '../../features/userSlics'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import UserAvatarSvg from '../../assets/images/userAvatar.svg'
const UserProfile = () => {
    console.log('<UserProfile /> renderd');
    const userEmail = useSelector(selectUserEmail);
    const userAvatar = useSelector(selectUserAvatar);
    const userName = useSelector(selectUserName);

    return (
        <div className='d-flex  justify-content-center align-items-center' style={{ height: '80vh', overflow: 'auto' }}>
            {userEmail ?
                <div className=''>
                    <Card sx={{ minWidth: 300, maxWidth: 700 }}>
                        <CardMedia
                            component="img"
                            height="140"
                            image={userAvatar === undefined ? UserAvatarSvg : userAvatar}
                            alt="user avatar"
                            className="w-50 mx-auto"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {userName}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                about me
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small" disabled>Share</Button>
                        </CardActions>
                    </Card>
                </div>
                :
                <Redirect to="/" replace={true} />
            }
        </div>

    )
}

export default UserProfile