import logo from './logo.svg';
import './App.css';
import {connect} from 'react-redux'

// import EventList from './Containers/EventList'
import Header from './Components/Header'
import Navbar from './Components/Navbar'

// import {initialFetch}  from './Redux/actions';

function App() {
  return (
    <div>
      <Navbar />
      <Header />
      
    </div>
  );
}

// function mdp(dispatch) {
//   return (
//     {
//       initialFetch: () => dispatch(initialFetch())
//     }
//   )
// }

export default App;
