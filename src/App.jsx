import { useState } from 'react';
import LifeCycleComponent from './components/LifeCyleComponent';

function App() {
  const [showComponent, setShowComponent] = useState(true);

  return (
    <div className='App'>
      {' '}
      <button onClick={(event) => setShowComponent(!showComponent)}>
        Show
      </button>
      {showComponent ? <LifeCycleComponent /> : 'nope'}
    </div>
  );
}

export default App;
