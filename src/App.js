import React from 'react';
import './App.css';
import LazyPoster from './components/LazyPoster';
import { items } from './components/default-list.json';

const App = () =>
  <div className="App">
    <ul>
      {items.map(item =>
        <li key={item.id}>
          <LazyPoster id={item.id} alt={item.title} />
        </li>
      )}
    </ul>
  </div>;

export default App;
