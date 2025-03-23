import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';

const comics = [
  {
    id: 2,
    title: 'Escape Velocity',
    image: '/Users/jagdeepshokeen/Downloads/IMG_5979.JPG',
    alt: 'Technically, this plan is only flawed if you still care about the laws of physics. But if you are already near a black hole, maybe it is time to start breaking rules.'
  },
  {
    id: 1,
    title: 'Heisenberg’s Dilemma',
    image: '/Users/jagdeepshokeen/Downloads/OKCD1.jpg',
    alt: 'Heisenberg was never good at making decisions...'
  }
];

const Home = () => (
  <div className="container mx-auto p-4">
    <h1 className="text-3xl mb-4">Latest Comic</h1>
    <div className="border p-4 rounded-xl">
      <img src={comics[0].image} alt={comics[0].alt} className="w-full rounded-xl mb-2" />
      <p>{comics[0].alt}</p>
    </div>
  </div>
);

const Archive = () => (
  <div className="container mx-auto p-4">
    <h1 className="text-3xl mb-4">Archive</h1>
    <div className="grid grid-cols-1 gap-4">
      {comics.map(comic => (
        <div key={comic.id} className="border p-4 rounded-xl">
          <Link to={`/comic/${comic.id}`} className="text-xl">{comic.title}</Link>
        </div>
      ))}
    </div>
  </div>
);

const ComicPage = ({ id }) => {
  const comic = comics.find(c => c.id === parseInt(id));

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl mb-4">{comic.title}</h1>
      <img src={comic.image} alt={comic.alt} className="w-full rounded-xl mb-2" />
      <p>{comic.alt}</p>
    </div>
  );
};

const App = () => (
  <Router>
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white p-4 shadow mb-4">
        <div className="container mx-auto">
          <Link to="/" className="mr-4">Home</Link>
          <Link to="/archive">Archive</Link>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/archive" element={<Archive />} />
        <Route path="/comic/:id" element={<ComicPage />} />
      </Routes>
    </div>
  </Router>
);

export default App;
