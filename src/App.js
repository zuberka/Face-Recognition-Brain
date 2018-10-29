import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Clarifai from'clarifai';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognation from './components/FaceRecognation/FaceRecognation';
import Signin from './components/Signin/Signin';
import './App.css';


const app = new Clarifai.App({
 apiKey: 'afe72595543c44e9a038185a55bde01e'
});

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
  constructor(){
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin'
    }
  }

calculateFaceLocation= (data) => {
  const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box
  const image = document.getElementById('inputImage');
  const width = Number(image.width);
  const height = Number(image.height);
  //console.log(width, height);
  return {
    leftCol: clarifaiFace.left_col * width,
    topRow: clarifaiFace.top_row * height,
    rightCol: width - (clarifaiFace.right_col * width),
    bottomCol: height - (clarifaiFace.bottom_row * height)
  }
}

displayFaceBox = (box) => {
  console.log(box);
  this.setState({box: box});
}

onInputChange = (event) => {
  this.setState({input: event.target.value});
}

onButtonSubmit = () => {
  this.setState({imageUrl: this.state.input})
  app.models
  .predict(
    Clarifai.FACE_DETECT_MODEL, 
    this.state.input)
  .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
  .catch(err => console.log(err));
}

onRouteChange = (route) => {
  this.setState({route: route})
}


  render() {
    return (
      <div className="App">
        <Particles className='particles'
          params={particlesOptions}
        />
        <Navigation onRouteChange={this.onRouteChange}/>
        { this.state.route ==='signin' 
          ? <Signin onRouteChange ={this.onRouteChange}/>
          : <div>
              <Logo />
              <Rank />
              <ImageLinkForm  onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
              <FaceRecognation box={this.state.box} imageUrl={this.state.imageUrl}/>
            </div>
        }
      </div>
    );
  }
}

export default App;
