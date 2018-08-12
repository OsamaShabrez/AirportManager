import React, { Component } from "react";
import {Map, InfoWindow, Marker, GoogleApiWrapper} from "google-maps-react";

import { GOOGLE_MAPS_API_KEY } from "../../_Constants";

export class GMapsContainer extends Component {
  constructor() {
    super();
    this.state = {
      activeMarker: {},
      lat: 51.1657,
      lng: 10.4515,
      name: '',
      selectedPlace: {},
      showingInfoWindow: false,
    };

    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onMouseoverMarker = this.onMouseoverMarker.bind(this);
    this.onMapClicked = this.onMapClicked.bind(this);
    this.onMapReady = this.onMapReady.bind(this);
  }

  componentDidMount() {
    this.setState({
      lat: this.props.gMapData.lat,
      lng: this.props.gMapData.lng,
      name: this.props.gMapData.name,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      this.setState({
        lat: this.props.gMapData.lat,
        lng: this.props.gMapData.lng,
        name: this.props.gMapData.name,
      });
    }
  }

  onMarkerClick(props, marker, e) {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }

  onMapClicked(mapProps, map, clickEvent) {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
    if (this.props.callbackMapClick) {
      const coords = {
        lat: clickEvent.latLng.lat(),
        lng: clickEvent.latLng.lng()
      };
      this.props.callbackMapClick(coords);
    }
  }

  onMouseoverMarker(props, marker, e) {
    if (this.state.showingInfoWindow !== true) {
      this.setState({
        selectedPlace: props,
        activeMarker: marker,
        showingInfoWindow: true
      });
    }
  }

  onMapReady() {
    if (this.props.centerAroundCurrentLocation === true) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const coords = pos.coords;
        this.setState({
          lat: coords.latitude,
          lng: coords.longitude
        })
      });
    }
  }

  render() {
    const { lat, lng, name } = this.state;
    // return (<div></div>);
    return (
      <Map
        className={'map'}
        google={this.props.google}
        initialCenter={{
          lat: lat,
          lng: lng
        }}
        center={{
          lat: lat,
          lng: lng
        }}
        zoom={13}
        onClick={this.onMapClicked}
        onReady={this.onMapReady}
      >
        <Marker onClick={this.onMarkerClick} name={name} onMouseover={this.onMouseoverMarker} position={{
          lat: lat,
          lng: lng
        }} />
        <InfoWindow marker={this.state.activeMarker} visible={this.state.showingInfoWindow}>
            <div>
              <p>{name}</p>
            </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: GOOGLE_MAPS_API_KEY,
  libraries: ['places', 'visualization'],
})(GMapsContainer)
