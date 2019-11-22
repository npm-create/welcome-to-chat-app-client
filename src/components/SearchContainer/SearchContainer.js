import React from 'react';
import './SearchContainer.css';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';

const SearchContainer = ({ onSearchString }) => {
  return (
    <div className='search-container'>
      <div>
        <i className="fas fa-search" alt="options" />
        <input onChange={e => onSearchString(e.target.value.trim())} type="text" placeholder='Search' />
      </div>
    </div>
  );
};


const mapDispatchToProps = dispatch => {
  return {
    onSearchString: (value) => dispatch(actions.searchString(value))
  };
};


export default connect(null, mapDispatchToProps)(SearchContainer);
