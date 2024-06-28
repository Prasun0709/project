// src/pages/Home.js
import React, { useState, useEffect } from 'react';
import { Container, Grid } from '@mui/material';
import ExpandableList from './Expandible';
import Search from './Search';

const Home = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch('http://localhost:1000/')
      .then((response) => response.json())
      .then((data) => setCategories(data));
  }, []);

  const handleCategorySelect = (categoryPath) => {
    console.log('Selected category:', categoryPath);
  };

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Search categories={categories} onSelect={handleCategorySelect} />
        </Grid>
        <Grid item xs={12} md={8}>
          <ExpandableList categories={categories} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
