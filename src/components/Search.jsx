import './../App.css';
import { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';

function Search(props) {
  // for some reason grabbing the text by state was easier
  const [query, setQuery] = useState("");
  const [error, setError] = useState(null);
  const textChange = (e) => {
    setQuery(e.target.value);
  }

  const performSearch = (e) => {
    e.preventDefault(); // don't reload the page, let me do the fetch and such
    const apiUrl = "https://www.googleapis.com/youtube/v3/search?";
    const params = "key=AIzaSyCJC86RBvFG5yBXsgu2P2GFYF-tktb8yzs&part=snippet&maxResults=30&q="
    const fullUrl = encodeURI(apiUrl + params + query);
    console.log("Make request with query:");
    console.log(query);
    console.log(fullUrl);
    fetch(fullUrl)
      .then((result) => {
        console.log(result.json());
      },
      (error) => {
        setError(error);
        console.log("")
      }
    );
    props.onSearchSubmit();
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