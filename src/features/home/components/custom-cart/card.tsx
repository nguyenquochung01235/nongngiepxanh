import { Card as CartMUI, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material'
import React, { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'

export interface ICartProps {
  href: string,
  image: string,
  children?: ReactNode
}

const Card = ({ href, image, children }: ICartProps) => {

  const navigate = useNavigate()

  const handleClick = () => {
    navigate(href)
  }

  return (
    <CartMUI sx={{ maxWidth: 370, minWidth: 335, m: '0 auto' }}>
      <CardActionArea onClick={handleClick}>
        <CardMedia
          component="img"
          height="200"
          image={image}
          alt="green iguana"
        />
        <CardContent>
          {
            children
          }
        </CardContent>
      </CardActionArea>
    </CartMUI>
  )
}

export default Card
