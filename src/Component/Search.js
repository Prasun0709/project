// src/components/Search.js
import React, { useState } from 'react';
import { TextField, List, ListItem, ListItemText } from '@mui/material';
import Button from '@mui/material';

const Search = ({ categories, onSelect }) => {
  const [query, setQuery] = useState('');
  const [filteredCategories, setFilteredCategories] = useState([]);

  const handleSearch = (event) => {
    const { value } = event.target;
    setQuery(value);

    if (value) {
      const lowerCaseQuery = value.toLowerCase();
      const results = [];

      const searchCategories = (categories, path = '') => {
        categories.forEach((category) => {
          const categoryName = category.name.toLowerCase();
          const categoryPath = path ? `${path} > ${category.name}` : category.name;

          if (categoryName.includes(lowerCaseQuery)) {
            results.push(categoryPath);
          }

          if (category.subcategories) {
            searchCategories(category.subcategories, categoryPath);
          }
        });
      };

      searchCategories(categories);
      setFilteredCategories(results);
    } else {
      setFilteredCategories([]);
    }
  };

  return (
    <div>
      <TextField
        fullWidth
        variant="outlined"
        label="Search"
        value={query}
        onChange={handleSearch}
      />
      <List>
        {filteredCategories.map((categoryPath, index) => (
          <ListItem button key={index} onClick={() => onSelect(categoryPath)}>
            <ListItemText primary={categoryPath} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default Search;
