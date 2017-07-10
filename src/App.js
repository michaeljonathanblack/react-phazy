import React, { Component } from 'react';
import './App.css';
import FazyImage from './components/FazyImage';

class App extends Component {
  render() {
    return (
      <div className="App">
        <ul>
          <li>
            <p>Ghost in the Shell</p>
            <FazyImage alt="Test!" />
          </li>
          <li>
            <p>Ghost in the Shell</p>
            <FazyImage />
          </li>
          <li>
            <p>Ghost in the Shell</p>
            <FazyImage />
          </li>
          <li>
            <p>Ghost in the Shell</p>
            <FazyImage />
          </li>
          <li>
            <p>Ghost in the Shell</p>
            <FazyImage />
          </li>
          <li>
            <p>Ghost in the Shell</p>
            <FazyImage />
          </li>
          <li>
            <p>Ghost in the Shell</p>
            <FazyImage />
          </li>
          <li>
            <p>Ghost in the Shell</p>
            <FazyImage />
          </li>
          <li>
            <p>Ghost in the Shell</p>
            <FazyImage />
          </li>
        </ul>
      </div>
    );
  }
}

export default App;
