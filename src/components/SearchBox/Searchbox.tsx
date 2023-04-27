// Modules
import React, { ReactElement, ChangeEvent, KeyboardEvent, MutableRefObject } from 'react';
import { Grid, TextField, Button } from '@mui/material';
import { bool, func, string } from 'prop-types';

// TS
interface ISearchBoxProps {
  isLoading: boolean;
  value: string;
  inputRef: MutableRefObject<HTMLInputElement | undefined>;
  onChange: (value: string) => void;
  onSearch: () => void;
  children: ReactElement;
} 

/**
 * Searchbox component
 *
 * @version 1.0.0
 */
export const SearchBox = ({
  isLoading,
  value,
  inputRef,
  onChange,
  onSearch,
  children,
}: ISearchBoxProps) => {

  // Handlers
  const onSearchChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => onChange(value);
  const onKeyUp = function ({ key }: KeyboardEvent<HTMLInputElement>) {
    switch(key) {
      case 'Enter':
        return onSearch();
      default:
        // Do nothing
    }
  };
  
  // Render
  return (
    <Grid
      container
      spacing={1}
      id="searchbox"
      alignItems="stretch"
      justifyContent="center"
    >
      <Grid
        item
        position="relative"
        xs={8}
        md={6}
        xl={4}
      >
        <TextField
          id="search"
          fullWidth
          size="small"
          autoFocus
          autoComplete="off"
          disabled={isLoading}
          placeholder="Find a breed to catch"
          variant="outlined"
          value={value}
          inputProps={{
            ref: inputRef,
            onKeyUp,
          }}
          onChange={onSearchChange}
        />
        {children}
      </Grid>
      <Grid
        item
        xs={2}
        md={1}
      >
        <Button
          fullWidth
          style={{
            height: '100%',
          }}
          disabled={isLoading}
          variant="contained"
          onClick={() => onSearch()}
        >
          Search
        </Button>
      </Grid>
    </Grid>
  );
};

SearchBox.propTypes = {
  isLoading: bool.isRequired,
  value: string.isRequired,
  onChange: func.isRequired,
  onSearch: func.isRequired,
}
