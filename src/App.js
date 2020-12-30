import logo from './logo.svg';
import './App.css';
import {connect} from 'react-redux'

import EventList from './Containers/EventList'
// import {initialFetch}  from './Redux/actions';

function App() {
  return (
    <div>
      <EventList />
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
