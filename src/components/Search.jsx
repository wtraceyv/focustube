import './../App.css';
import { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';

function Search(props) {
  // for some reason grabbing the text by state was easier
  const textChange = (e) => {
    setQuery(e.target.value);
  }
  const [query, setQuery] = useState("");
  const [error, setError] = useState(null);
  const [queryResults, setQueryResults] = useState(null);
  const [nextPageToken, setNextPageToken] = useState("");

  const performSearch = (e) => {
    e.preventDefault(); // don't reload the page, let me do the fetch and such
    const apiUrl = "https://www.googleapis.com/youtube/v3/search?";
    const params = "key=AIzaSyCJC86RBvFG5yBXsgu2P2GFYF-tktb8yzs&part=snippet&maxResults=30&q="
    const fullUrl = encodeURI(apiUrl + params + query);
    // TODO: remove dummy data when done
    let dummyData = require('./../dummy.json');
    // fetch(fullUrl)
    // .then((result) => {
    //   return result.json(); // this returns a Promise
    // })
    // .then((data) => { // need this step to grab the Object I want ^
    //   setQueryResults(data.items);
    //   setNextPageToken(data.nextPageToken);
    // },
    // (error) => { // don't forget an error handle
    //   setError(error);
    //   console.log(error);
    // });

    props.onSearchSubmit(dummyData.items, dummyData.nextPageToken);
  }

  return (
    <div>
      <Container>
        <Row>
          <Col sm={4} />
          <Col sm={4}>
            <form className="search-bar" onSubmit={performSearch}>
              <input className="form-control mr-sm-2" onChange={textChange} type="text" placeholder="Search" aria-label="Search" />
              <button className="btn my-2 my-sm-1" type="submit" onClick={performSearch}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                </svg>
              </button>
            </form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Search;