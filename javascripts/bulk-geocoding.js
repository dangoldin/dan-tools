'use strict';

import React from "react";

import loadGoogleMapsAPI from 'load-google-maps-api';

class AddressInput extends React.Component {
  render() {
    return (
      <form>
        <textarea
          value={this.props.addresses.join("\n")}
          onChange={this.props.updateAddresses}
          >
        </textarea>
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
      console.log(google); //=> Object { Animation: Object, ...
      this.geocoder = new google.Geocoder();
    }).catch((err) => {
      console.error(err);
    });

  }

  geocodeAddress() {
    const addrs = this.props.addresses

    const that = this
    for (var i = 0; i < addrs.length; i++) {
      (function() {
        var addr = addrs[i];
        that.geocoder.geocode( { 'address': addr}, function(results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            var location = results[0].geometry.location;
            // var rowHTML = '<tr><td>' + addr + '</td><td>' + location.lat() + '</td><td>' + location.lng() + '</td></tr>';
            // $('').append(rowHTML);
            console.log(location)
          } else {
            console.log("Error looking up address" + addr);
            alert("Geocode was not successful for the following reason: " + status);
          }
        });
      })();
    };
  }

  render() {
    this.geocodeAddress()

    return (
      <div>
        {this.props.addresses.join("\n")}
      </div>
    )
  }
}

class BulkGeocoding extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      addresses: []
    }

    this.updateAddresses = this.updateAddresses.bind(this)
  }

  updateAddresses(event) {
    this.setState({
      addresses: event.target.value.split('\n')
    })
  }

  render() {
    return (
      <div className="flex">
        <div className="left-sidebar">
          <AddressInput addresses={this.state.addresses} updateAddresses={this.updateAddresses}/>
        </div>
        <div className="right-sidebar">
          <GeoCodeResults addresses={this.state.addresses} />
        </div>
      </div>
    )
  }
}

export default BulkGeocoding
