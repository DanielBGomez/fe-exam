// Modules
import React, { useState, useCallback, useEffect, useRef, MouseEvent } from 'react';
import { Grid, Button, Box } from '@mui/material';
import axios from 'axios';
import Fuse from 'fuse.js';

// Icons
import { Add as AddIcon, HighlightOff as RemoveIcon } from '@mui/icons-material';

// Components
import { SearchBox } from '../../components/SearchBox';
import { Results } from '../../components/Results';
import { BreedCard } from '../../components/BreedCard';

// Elements
import {
  Title,
} from './App.styled';

// TS
interface IBreed {
  key: string;
  name: string;
}
interface ICatch {
  key: number;
  name: string;
  image: string;
} 
export type SearchResults = Fuse.FuseResult<IBreed>[];

/**
 * App container
 *
 * @version 1.0.0
 */
export const App = () => {
  // States
  const [ isLoading, setIsLoading ] = useState<boolean>(false);
  const [ error, setError ] = useState<string>('');
  const [ breeds, setBreeds ] = useState<IBreed[]>([]);
  const [ search, setSearch ] = useState<string>('');
  const [ results, setResults ] = useState<SearchResults>([]);
  const [ catches, setCatches ] = useState<ICatch[]>([]);

  // Refs
  const searchInput = useRef<HTMLInputElement>();
  const fuse = useRef<Fuse<IBreed>>();

  // Callbacks
  /**
   * Get the list of available breeds
   */
  const getBreeds = useCallback(() => {
    setIsLoading(true);
    return axios
      .get('https://dog.ceo/api/breeds/list/all')
      .finally(() => setIsLoading(false))
      .then(({ data: { message: breeds = {} } }) => {
        const Breeds: IBreed[] = [];
        Object.keys(breeds).forEach(baseName => {
          const variants = breeds[baseName];
          return variants.length ?
            variants.forEach((variant: string) => Breeds.push({ key: `${baseName}-${variant}`, name: `${variant} ${baseName}` })) : 
            Breeds.push({ key: baseName, name: baseName });
        });
        return Breeds;
      })
    }, []);
  /**
   * Search a breed
   */
  const searchBreed = useCallback((input: string) => {
    const results = fuse.current?.search(input);
    if (results) setResults(results);
    searchInput.current?.focus();
  }, [ breeds, fuse ]);

  // Effects
  useEffect(() => {
    getBreeds()
      .then(breeds => {
        setBreeds(breeds);
        fuse.current = new Fuse(breeds, { keys: ['key'] });
      });
  }, []);

  // Handlers
  /**
   * On searchbox blur, remove results
   */
  const onBlur = (({ target }: MouseEvent<HTMLElement>) => {
    if (target instanceof HTMLElement && (
      target.id === 'searchbox' || target.closest('#searchbox')
    )) return;
    setResults([]);
  });
  /**
   * Fetch a random image from a breed
   */
  const getBreedImage = (breed: string) => {
    setIsLoading(true);
    return axios
      .get(`https://dog.ceo/api/breed/${breed.replace('-', '/')}/images/random`)
      .finally(() => setIsLoading(false))
      .then(({ data: { message }}) => message)
      .catch(err => {
        console.error(err);
        setError('Unexpected error fetching the image')
      });
  };
  /**
   * Add a new breed into the catch
   */
  const catchBreed = async (breed: string) => {
    try {
      const image = await getBreedImage(breed);
      setResults([]);
      setSearch('');
      setCatches([...catches, {
        key: Date.now(),
        name: breed,
        image,
      }])
    } catch (err) {

    }
  }
  /**
   * Add a random breed into the catch
   */
  const catchRandomBreed = () => {
    const { key } = breeds[Math.floor((Math.random() * breeds.length))];
    catchBreed(key);
  };
  /**
   * Remove an element from the catch
   */
  const onCatchRemove = (key: number) => setCatches(catches.filter(({ key: catchKey }) => key !== catchKey ));

  // Render
  return (
    <Grid
      container
      height="100%"
      marginTop={0}
      marginBottom={0}
      justifyContent="center"
      onClick={onBlur}
    >
      <Title>Dog Catcher</Title>
      <SearchBox
        isLoading={isLoading}
        value={search}
        inputRef={searchInput}
        onChange={(value: string) => setSearch(value)}
        onSearch={() => searchBreed(search)}
      >
        <>
          {Boolean(results.length) && (
            <Results
              results={results}
              onSelect={catchBreed}
            />
          )}
        </>
      </SearchBox>
      <Grid
        item
        xs={10}
        md={7}
        xl={5}
        paddingTop={1}
      >
        <Button
          fullWidth
          startIcon={<AddIcon />}
          disabled={isLoading}
          variant="outlined"
          onClick={() => catchRandomBreed()}
        >
          Catch a Random Breed
        </Button>
        <Grid
          container
          paddingTop={5}
          paddingLeft={1}
          spacing={2}
        >
          <Title
            style={{
              fontSize: 18
            }}
          >
            Caught Breeds
            <Button
              size="small"
              color="error"
              variant="outlined"
              startIcon={<RemoveIcon />}
              onClick={() => setCatches([])}
              sx={{
                top: 0,
                right: 0,
                position: 'absolute',
              }}
            >
              Clear All
            </Button>
          </Title>
          {catches.length ? [...catches].reverse().map(breed =><BreedCard {...breed} id={breed.key} onRemove={onCatchRemove} />) : (
            <Box
              sx={{
                fontSize: 14,
                width: '100%',
                textAlign: 'center',
              }}
              paddingTop={2}
            >
              There are currently no breeds caught.<br />
              Search above to catch some!
            </Box>
          )}
        </Grid>
      </Grid>
      <Box
        sx={{
          width: '100%',
          height: '100%',
          flexShrink: 1,
        }}
      />
    </Grid>
  );
};
