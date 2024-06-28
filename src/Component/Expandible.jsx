// src/components/ExpandableList.js
import React, { useState } from 'react';
import { List, ListItem, Collapse, ListItemText, ListItemIcon } from '@mui/material';
import { ExpandLess, ExpandMore, Folder } from '@mui/icons-material';

const ExpandableList = ({ categories }) => {
  const [open, setOpen] = useState({});

  const handleClick = (name) => {
    setOpen((prevOpen) => ({ ...prevOpen, [name]: !prevOpen[name] }));
  };

  const renderCategory = (category) => (
    <div key={category.name}>
      <ListItem button onClick={() => handleClick(category.name)}>
        <ListItemIcon>
          <Folder />
        </ListItemIcon>
        <ListItemText primary={category.name} />
        {open[category.name] ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      {category.subcategories && (
        <Collapse in={open[category.name]} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {category.subcategories.map((subcategory) => renderCategory(subcategory))}
          </List>
        </Collapse>
      )}
    </div>
  );

  return <List>{categories.map((category) => renderCategory(category))}</List>;
};

export default ExpandableList;
