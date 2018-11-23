import React from 'react';
import PropTypes from 'prop-types';
import './searchBar.css';

const SearchBar = ({onSearch, onChange}) => {
    return(
            <div className="container-fluid">
                <div className="row justify-content-center">
                    <div className="col-8 border-bottom px-0">
                        <h4 className="title-custom"> Inserisci luogo da cercare </h4>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-8 p-3">
                        <input 
                            type="text" 
                            className="form-control input-custom" 
                            placeholder="Luogo"
                            onChange={onChange}
                        />
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-8 text-center">
                        <button className="btn button-custom" onClick={onSearch}>Invia</button>
                    </div>
                </div>  
            </div>
    );
};

SearchBar.propTypes = {
    onSearch: PropTypes.func.isRequired,
    onChange: PropTypes.func
};

export default SearchBar;