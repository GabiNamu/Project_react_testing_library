import React, { Component } from 'react'

export default class Location extends Component {
    state = {
        locations: [],
    }

    componentDidMount() {
      this.fetchLocations();

    }

    fetchLocations = async () => {
        const fetchResponse = await fetch('https://pokeapi.co/api/v2/location/');
        const jsonResponse = await fetchResponse.json();
        console.log(jsonResponse);
        jsonResponse.results.forEach((element) => {
          const url = element.url;
          const fetchLocation = await fetch(url);
          const 
        })
        this.setState({locations: jsonResponse.results});
    }
  render() {
    const { locations } = this.state;
    console.log(locations)
    return (
      <div>
        <h2>Location</h2>
        {locations.length !== 0 ? locations.map((local, index) => (
            <div key={ index }>
           <h3>{local.name}</h3>
           <img src={local.url} alt={local.name} />
           </div>
        )) : ''}

        </div>

    )
  }
}
