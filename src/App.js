import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import './App.css';
import Particles from 'react-particles-js';

const particlesOptions = {
  particles: {
      line_linked: {
        color: '#111111',
        opacity: 0.2
      },
      number: {
        value: 100,
        density: {
        enable: true,
        value_area: 800
        }
      }      
  }
}


class App extends Component {
  render() {
    return (
      <div className="App">
        <Particles className='particles'
          params={particlesOptions}
        />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm />
        {/*<FaceRecognation />*/}
      </div>
    );
  }
}

export default App;
