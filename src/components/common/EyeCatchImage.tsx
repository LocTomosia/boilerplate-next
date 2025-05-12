import { Box, Grid, useMediaQuery } from '@mui/material'
import React from 'react'
import { styled } from '@mui/material/styles'
import { theme, staticPath } from '@/utils'

interface EyeCatchImageProps {
  backgroundImagePath: string
  imageSrc: string
  mobileImageSrc?: string
  altText: string
}

export const EyeCatchImage: React.FC<EyeCatchImageProps> = (
  {
    backgroundImagePath,
    imageSrc,
    mobileImageSrc,
    altText,
  },
) => {
  const isBreakpointUpMd = useMediaQuery(theme.breakpoints.up('md'))

  const StyledImg = styled('img')`
  width: 40%;
  max-width: ${imageSrc === staticPath.next_js_svg ? '450px' : '40px'};
  max-height: ${isBreakpointUpMd ? 'inherit' : '350px'};
  object-fit: contain;
  `

  return (
    <Box
      sx={{
        backgroundImage: {
          md: `url("${backgroundImagePath}")`,
        },
        backgroundSize: 'cover',

        height: '100%',
        minHeight: '100px',
        px: { xs: 3, md: 10 },
        py: { xs: 1, md: 0 },
      }}
    >
      <Grid
        container
        direction='column'
        justifyContent='center'
        alignItems='center'
        sx={{
          height: '100%',
          textAlign: 'center',
          pt: { xs: 5, md: 0 },
        }}
      >
        <Grid sx={{ width: '100%' }}>
          <StyledImg
            src={isBreakpointUpMd ? imageSrc : mobileImageSrc || imageSrc}
            alt={altText}
          />
        </Grid>
      </Grid>
    </Box>
  )
}
