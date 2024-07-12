import React from 'react';
import PropTypes from 'prop-types';
import styles from './SearchFilter.module.css';

const SearchFilter = ({ filter, onFilterChange }) => {
  return (
    <form className={styles.form}>
      <label className={styles.label}>
        Find contact by name:
        <input
          className={styles.input}
          type="text"
          name="filter"
          value={filter}
          onChange={onFilterChange}
        />
      </label>
    </form>
  );
};

SearchFilter.propTypes = {
  filter: PropTypes.string.isRequired,
  onFilterChange: PropTypes.func.isRequired,
};

export default SearchFilter;
