import React from 'react';
import './App.css';
import LazyPoster from './components/LazyPoster';
import { items } from './components/exampleData.json';

const App = () =>
  <div className="App">
    <h1>React Phazy</h1>
    <h2>Row Scroll</h2>
    <ul className="row-scroll">
      {items.map(item =>
        <li key={item.id} className="item-container">
          <LazyPoster id={item.id} alt={item.title} />
        </li>
      )}
    </ul>
    <h2>Row Flex</h2>
    <ul className="row-flex">
      {items.slice(0, 5).map(item =>
        <li key={item.id}>
          <div className="placeholder" />
        </li>
      )}
    </ul>
    <h2>Grid Flex</h2>
    <ul className="grid">
      {items.map(item =>
        <li key={item.id}>
          <LazyPoster id={item.id} alt={item.title} />
        </li>
      )}
    </ul>
  </div>;

export default App;
