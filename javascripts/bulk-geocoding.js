'use strict';

import React from "react";

import loadGoogleMapsAPI from 'load-google-maps-api';

class AddressInput extends React.Component {
  render() {
    return (
      <form onSubmit={this.props.submitForm}>
        <textarea
          value={this.props.addressesText}
          onChange={this.props.updateAddresses}
          >
        </textarea>
        <input type="submit" value="Geocode!" />
      </form>
    )
  }
}

class GeoCodeResults extends React.Component {
  constructor(props) {
    super(props)

    loadGoogleMapsAPI({
      key: 'AIzaSyBYcspIcoTdiADRpZogplY7NP0B5UnjyIw'
    }).then((google) => {
      this.geocoder = new google.Geocoder();
    }).catch((err) => {
      console.error(err);
    });

    this.state = {
      geocodedAddresses: {}
    }
  }

  geocodeAddress() {
    const addrs = this.props.addresses

    const that = this
    for (var i = 0; i < addrs.length; i++) {
      (function() {
        var addr = addrs[i];

        if (addr in that.state.geocodedAddresses) {
          return;
        }

        that.geocoder.geocode( { 'address': addr}, function(results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            var location = results[0].geometry.location;

            const geocodedAddresses = that.state.geocodedAddresses
            geocodedAddresses[addr] = {
              lat: location.lat(),
              lng: location.lng()
            }
            that.setState({
              geocodedAddresses: geocodedAddresses
            })
          } else {
            console.log("Error looking up address: " + addr);
          }
        });
      })();
    };
  }

  render() {
    this.geocodeAddress()

    const geocodedAddresses = this.state.geocodedAddresses

    const Geocoded = Object.keys(geocodedAddresses).map(function(key, idx) {
      const geocodedAddress = geocodedAddresses[key]

      return (
        <tr key={idx}>
          <td>{key}</td><td>{geocodedAddress.lat}</td><td>{geocodedAddress.lng}</td>
        </tr>
      )
    })

    if (Geocoded.length) {
      return (
        <div>
          <table>
            <thead>
              <tr><th>Address</th><th>Latitude</th><th>Longitude</th></tr>
            </thead>
            <tbody>
              {Geocoded}
            </tbody>
          </table>
        </div>
      )
    }
    return (<div></div>)
  }
}

class BulkGeocoding extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      addresses_text: '',
      addresses: []
    }

    this.updateAddresses = this.updateAddresses.bind(this)
    this.submitForm = this.submitForm.bind(this)
  }

  updateAddresses(event) {
    this.setState({
      addressesText: event.target.value
    })
  }

  submitForm(event) {
    const addresses = this.state.addressesText.split('\n')

    this.setState({
      addresses: addresses
    })

    event.preventDefault()
  }

  render() {
    return (
      <div className="flex">
        <div className="left-sidebar">
          <AddressInput
            addressesText={this.state.addressesText}
            updateAddresses={this.updateAddresses}
            submitForm={this.submitForm}
            />
        </div>
        <div className="right-sidebar">
          <GeoCodeResults addresses={this.state.addresses} />
        </div>
      </div>
    )
  }
}

export default BulkGeocoding
