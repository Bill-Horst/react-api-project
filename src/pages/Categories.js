import React from 'react';
import { Link } from 'react-router-dom';

import './Categories.scss';

class Categories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentDidMount() {
    fetch('http://localhost:8081/api/categories')
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }

  render() {
    const { error, isLoaded, items } = this.state;

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className='main-view'>
          <h2>Categories</h2>
          <div className='category-list'>
            {items.map(item => (
              <Link key={item.name} to={`/category/${item.name.toLowerCase()}`}>
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      );
    }
  }
}

export default Categories;