import { Card as CartMUI, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

export interface ICartProps {
  href: string,
  name: string,
  image: string,
  description: string
}

const Card = ({ href, name, image, description }: ICartProps) => {

  const navigate = useNavigate()

  const handleClick = () => {
    navigate(href)
  }

  return (
    <CartMUI sx={{ maxWidth: 305, minWidth: 260 }}>
      <CardActionArea onClick={handleClick}>
        <CardMedia
          component="img"
          height="140"
          image={image}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary" textAlign='justify'>
           {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </CartMUI>
  )
}

export default Card
