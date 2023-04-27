// Modules
import React from 'react';
import { Grid, Box } from '@mui/material';
import { number, string } from 'prop-types';

// Icons
import { HighlightOff as RemoveIcon } from '@mui/icons-material';

// TS
interface IBreedCardProps {
  id: number;
  image: string;
  name: string;
  onRemove: (key: number) => void;
}

/**
 * Breed card component
 *
 * @version 1.0.0
 */
export const BreedCard = ({
  id,
  image,
  name,
  onRemove,
}: IBreedCardProps) => {
  return (
    <Grid
      item
      xs={3}
    >
      <Box
        sx={{
          position: 'relative',
          borderRadius: '5px',
          boxShadow: '0 2px 2px rgba(0,0,0,0.4)',
        }}
        padding={1}
      >
        <RemoveIcon
          sx={{
            top: 0,
            right: 0,
            color: 'red',
            bgcolor: 'white',
            cursor: 'pointer',
            borderRadius: '50%',
            position: 'absolute',
          }}
          onClick={() => onRemove(id)}
        />
        <Box
          sx={{
            width: '100%',
            paddingTop: '100%',
            backgroundImage: `url('${image}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Box
          sx={{
            fontSize: 14,
            textAlign: 'center',
            textTransform: 'capitalize',
          }}
          paddingTop={1}
        >
          {name.split('-').reverse().join(' ')}
        </Box>
      </Box>
    </Grid>
  )
};

BreedCard.propTypes = {
  id: number.isRequired,
  image: string.isRequired,
  name: string.isRequired,
};
