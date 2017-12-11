import React, { Component } from 'react';

// Composant fonctionnel
function Restaurant(props) {
    return(

      <tr>
        <td>{props.restaurantName}</td>
        <td>{props.restaurantCuisine}</td>
        <td>{props.restaurantAdress.street}</td>
        <td>{props.restaurantBorough}</td>
      </tr>

    )
}

class App extends Component {
  constructor(props) {
    super(props);
    
    this.getRestaurants = this.getRestaurants.bind(this)
    this.pagination = this.pagination.bind(this)
    this.pageSuivante = this.pageSuivante.bind(this)
    this.pagePrecedante = this.pagePrecedante.bind(this)

    this.state = {
      restaurants: [],
      current:0,
      next:1,
      next2:2
    };
  }

  componentWillMount() {

    this.getRestaurants(this.current);

  }

  pagination(nvllePage) {

    this.setState({
      current: nvllePage,
      next: nvllePage + 1,
      next2: nvllePage + 2
    })

    this.getRestaurants(nvllePage);

  }

  pageSuivante() {
    this.pagination(this.state.next);
  }

  pagePrecedante() {

    let page = 0;
    if (this.state.current === 0 ) {
      page = 0;
    } else {
      page = this.state.current - 1;
    }
    this.pagination(page);
  }

  getRestaurants(page) {
    let url = "http://localhost:8080/api/restaurants?page=" + page;
    let _shit = this;
    //"/api/restaurants?page=2"
      fetch(url)
        .then(function(responseJSON) {
          responseJSON.json().then(function(res) {
                // Maintenant res est un vrai objet JavaScript
                console.log(res.data);
                _shit.setState({restaurants: res.data});
                //initContext(res.data);
              });
          })
          .catch(function (err) {
              console.log(err);
        });
  }

  render() {

    let listComponents = this.state.restaurants.map(
      (el, index) => {
      
        return <Restaurant key={index} 
        index={index} 
        restaurantName={el.name}
        //_id, address, borough, cuisine, grades, name, restaurant_id
        restaurantAdress={el.address}
        restaurantCuisine={el.cuisine}
        restaurantGrades={el.restaurant_id}
        restaurantBorough={el.borough} 
        />
      }
    );

    return (
      <div className="App">
      <h3>Restaurants :</h3>
        <div className="container">
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>Name</th>
              <th>Cuisine</th>
              <th>Street</th>
              <th>Borough</th>
            </tr>
          </thead>
          <tbody>
            {listComponents}
          </tbody>
        </table>
        <ul class="pager">
          <li><button type="button" className="btn btn-default" onClick={this.pagePrecedante.bind(this)}>Previous</button></li>
          <li><button type="button" className="btn btn-default" onClick={(e) => this.pagination(this.state.current)}>{this.state.current}</button></li>
          <li><button type="button" className="btn btn-default" onClick={(e) => this.pagination(this.state.next)}>{this.state.next}</button></li>
          <li><button type="button" className="btn btn-default" onClick={(e) => this.pagination(this.state.next2)}>{this.state.next2}</button></li>
          <li><button type="button" className="btn btn-default" onClick={this.pageSuivante.bind(this)}>Next</button></li>
        </ul> 
        </div>
       </div>
    );
  }
}

export default App;