// Modules
import React from 'react';
import { Box, List, ListItemButton, ListItemText } from '@mui/material';
import { array, func, number } from 'prop-types';

// TS
import { SearchResults } from '../../containers/App';
interface IResultsProps {
  results: SearchResults;
  onSelect: (breed: string) => void;
}

/**
 * Results component
 *
 * @version 1.0.0
 */
export const Results = ({
  results,
  onSelect,
}: IResultsProps) => {
  // Render
  return (
    <Box
      sx={{
        width: '100%',
        top: '100%',
        left: 0,
        zIndex: 1,
        position: 'absolute',
      }}
      paddingLeft={2}
      paddingRight={1}
    >
      <List
        sx={{
          maxHeight: 400,
          overflowY: 'auto',
          bgcolor: 'background.paper',
          boxShadow: '0 2px 2px rgba(0,0,0,0.4)',
        }}
      >
        {results.map(({ item: { key, name } }, index) => (
          <ListItemButton
            key={key}
            onClick={() => onSelect(key)}
          >
            <ListItemText
              sx={{
                textTransform: 'capitalize'
              }}
            >
              {name}
            </ListItemText>
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
};

Results.propTypes = {
  results: array.isRequired,
  onSelect: func.isRequired,
}
