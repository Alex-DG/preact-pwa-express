import { h, render, Component } from 'preact';

class Alex extends Component {
  handleBody() {
    console.log('Bob!');
    return 'Do you like PWA?'
  }
  render() {
    console.log('-> Alex Component!');
    return(
      <div className="Alex page">
        <h2>Hello Alex</h2>
        <p>{ this.handleBody() }</p>
      </div>
    );
  }
}

export default Alex;
