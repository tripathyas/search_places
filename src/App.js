import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
var cityData =
{
  "data": [
    {
      "id": 3350606,
      "wikiDataId": "Q24668",
      "type": "CITY",
      "city": "Aixirivall",
      "name": "Aixirivall",
      "country": "Andorra",
      "countryCode": "AD",
      "region": "Sant Julià de Lòria",
      "regionCode": "06",
      "regionWdId": "Q24282",
      "latitude": 42.46245,
      "longitude": 1.50209,
      "population": 1025
    },
    {
      "id": 3216144,
      "wikiDataId": "Q24656",
      "type": "CITY",
      "city": "Aixovall",
      "name": "Aixovall",
      "country": "Andorra",
      "countryCode": "AD",
      "region": "Sant Julià de Lòria",
      "regionCode": "06",
      "regionWdId": "Q24282",
      "latitude": 42.47635833,
      "longitude": 1.48949167,
      "population": 69
    },
    {
      "id": 3406038,
      "wikiDataId": "Q4699394",
      "type": "CITY",
      "city": "Aixàs",
      "name": "Aixàs",
      "country": "Andorra",
      "countryCode": "AD",
      "region": "Sant Julià de Lòria",
      "regionCode": "06",
      "regionWdId": "Q24282",
      "latitude": 42.48638889,
      "longitude": 1.46722222,
      "population": 0
    },
    {
      "id": 3673384,
      "wikiDataId": "Q2522163",
      "type": "CITY",
      "city": "Andorra la Vella",
      "name": "Andorra la Vella",
      "country": "Andorra",
      "countryCode": "AD",
      "region": "Andorra la Vella",
      "regionCode": "07",
      "regionWdId": "Q2522163",
      "latitude": 42.5,
      "longitude": 1.5,
      "population": 22615
    },
    {
      "id": 3360277,
      "wikiDataId": "Q24475",
      "type": "CITY",
      "city": "Ansalonga",
      "name": "Ansalonga",
      "country": "Andorra",
      "countryCode": "AD",
      "region": "Ordino",
      "regionCode": "05",
      "regionWdId": "Q24272",
      "latitude": 42.568443,
      "longitude": 1.521571,
      "population": 0
    },
    {
      "id": 3350606,
      "wikiDataId": "Q24668",
      "type": "CITY",
      "city": "Aixirivall",
      "name": "Aixirivall",
      "country": "Andorra",
      "countryCode": "AD",
      "region": "Sant Julià de Lòria",
      "regionCode": "06",
      "regionWdId": "Q24282",
      "latitude": 42.46245,
      "longitude": 1.50209,
      "population": 1025
    },
  ],
  "links": [
    {
      "rel": "first",
      "href": "/v1/geo/cities?offset=0&limit=5"
    },
    {
      "rel": "next",
      "href": "/v1/geo/cities?offset=5&limit=5"
    },
    {
      "rel": "last",
      "href": "/v1/geo/cities?offset=662460&limit=5"
    }
  ],
  "metadata": {
    "currentOffset": 0,
    "totalCount": 662461
  }
}


function App() {
  const [grepCityText, setGrepCityText] = useState('')
  const [page, setPage] = useState(1);
  const [tableData, setTableData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState();
  const [perPage, setPerPage] = useState();
  const [dropDown, setDropDown] = useState(2);
  const habdleGrepCityTextChange = (event) => setGrepCityText(event.target.value);
  var data = cityData.data;
  if (grepCityText) {
    data = data.filter(item => item.city.indexOf(grepCityText) > -1);
  }

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(total / perPage); i++) {
    pageNumbers.push(i);
  }

  const handlePagination = (id, limit) => {
    if (id !== len || id !== 0) {
      setCurrentPage(id);
      cityData(id, limit);
    } else {
      setCurrentPage(currentPage);
    }
  };

  const renderPageNumbers = pageNumbers.map(id => {
    let limit = dropDown;
    return (
      <span key={id} onClick={() => handlePagination(id, limit)}>
        {id}
      </span>
    );
  });

  let len = renderPageNumbers.length;
  const handleNextClick = (currentPage, dropDown) => {
    if (currentPage <= renderPageNumbers.length) {
      setCurrentPage(currentPage);
      cityData(currentPage, dropDown);
    }
  };
  return (
    <div className="App">
      <input type="text" placeholder="Enter search string" value={grepCityText} onChange={habdleGrepCityTextChange} />
      <p>{grepCityText}</p>
      <div className="App-table"> {data.length > 0 ? (
        <table className="table-container">
          <thead><td>Serial</td><td>City</td><td>Country</td></thead>
          <tbody>
            {
              data.map((item, index) => (<tr><td>{index + 1}</td><td>{item.city}</td><td>{item.country}</td></tr>))
            }
          </tbody>
        </table>) : <h3>No result found</h3>}</div>

      <div id="pagination">
        <span onClick={() => handleNextClick(currentPage - 1, dropDown)}>
          &laquo;
        </span>
        {renderPageNumbers}
        <span onClick={() => handleNextClick(currentPage + 1, dropDown, len)}>
          &raquo;
        </span>
      </div>
    </div>
  );
}

export default App;
