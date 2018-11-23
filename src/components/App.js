import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import Header from './common/header/Header';
import SearchBar from './common/searchBar/searchBar';
import {Map, TileLayer, Marker, Popup} from 'react-leaflet';
import axios from 'axios';
import toastr from 'toastr';
import './App.css';

const MyMarkersList=({places}) => {
    const items = places.results.map((item) => (
        <MyPopupMarker 
            key={item.annotations.wikidata} 
            position={[item.geometry.lat, item.geometry.lng]} 
            content={item.formatted}
        />
    ));
    return <Fragment>{items}</Fragment>;
};

const MyPopupMarker=({content, position}) => (
    <Marker position={position}>
        <Popup>{content}</Popup> 
    </Marker>
);

class App extends Component {
    constructor (props, context) {
        super(props, context);
        this.state = {
            places: {
                results: [
                    {
                        formatted: 'Pescara, Abruzzo, Italia',
                        annotations: {wikidata:''},
                        geometry: {lat:'42.4584000', lng:'14.2028300'}
                    }
                ]
            },
            place: ''
        };

        this.getOnSearch = this.getOnSearch.bind(this);
        this.updatePlace = this.updatePlace.bind(this);
    }

    updatePlace(event) {
        this.setState({
            place: event.target.value
        });
    }

    getOnSearch() {
        axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${this.state.place}&key=dc791212ce4046d5a679f4c33916295e`)
                .then(res => {
                    const places = res.data;
                    this.setState({places});
                    toastr.success('Luogo trovato!');
        }).catch(error => {
            toastr.error('Luogo non trovato | ' + error);  
        });
    }

    render () {
        let lat;
        let lng;
        if(this.state.places.results.length > 0){
            lat = this.state.places.results[0].geometry.lat;
            lng = this.state.places.results[0].geometry.lng;
        } else {
            lat = '42.4584000';
            lng = '14.2028300';
        }
        return (
            <div className="container-fluid">
                <Header />
                <div className="row justify-content-center">
                    <div className="col-4 mt-4 my-auto">
                        <SearchBar 
                            onSearch={this.getOnSearch}
                            onChange={this.updatePlace}
                        />
                    </div>
                    <div className="col-8 text-center mt-4">
                        <Map id="map" center={[lat, lng]} zoom={13}>
                            <TileLayer
                                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <MyMarkersList places={this.state.places} />
                        </Map>
                        <div className="d-inline-flex p-2 mt-2 font-weight-bold position-custom">
                             Latitudine: {lat} - Longitudine: {lng} 
                        </div>
                    </div>
                </div>
            </div>   
        );
    }
}

App.propTypes = {
    places: PropTypes.object
};

MyMarkersList.propTypes = {
    places: PropTypes.object
};

MyPopupMarker.propTypes = {
    content: PropTypes.string,
    position: PropTypes.array
};

export default App;