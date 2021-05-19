import run from './images/run.png';
import './App.css';
import Runform from './components/runform';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={run} className="App-logo" alt="logo" />
        <h1>
          Pace yourself.
        </h1>
        
      </header>
      <Runform />
    </div>
  );
}

export default App;
