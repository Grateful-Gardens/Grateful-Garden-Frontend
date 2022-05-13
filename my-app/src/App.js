import './App.css';
import NavBar from './components/navBar';
import Posts from './components/post';
import Link from './components/link';
import Friends from './components/friends';



function App() {
  return (
    <div className="App">
      <header className="App-header">
        <NavBar/>
      </header>

      <div>
        <Link/>
      </div>

      <div>
        <Posts/>
      </div>
     
     <div>
       <Friends/>
     </div>
     
    </div>
  );
}

export default App;
