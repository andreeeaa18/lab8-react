import { useContext } from "react";
import { spaceContext } from "./SearchInput";
import Card from "./Card";

function DataGrid({ mostRecent, inputValue, onCardClick }) {
  const { data } = useContext(spaceContext);

  function getFilteredData() {
    let filteredData = data;

    if (inputValue && inputValue.trim()) {
      filteredData = filteredData.filter(
        (el) =>
          el.identifier?.toLowerCase().includes(inputValue.toLowerCase()) ||
          el.caption?.toLowerCase().includes(inputValue.toLowerCase()),
      );
    }

    if (mostRecent && filteredData.length > 0) {
      const mostRecentDate = filteredData.reduce((latest, current) =>
        new Date(current.date) > new Date(latest.date) ? current : latest,
      ).date;
      filteredData = filteredData.filter((el) => el.date === mostRecentDate);
    }

    return filteredData;
  }

  const displayData = getFilteredData();

  if (displayData.length === 0) {
    return (
      <div className="no-results-container">
        <div className="no-results-box">
          <h3>No results found</h3>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="image-container">
        {displayData.map((el) => (
          <Card key={el.identifier} data={el} onCardClick={onCardClick} />
        ))}
      </div>
    </>
  );
}

export default DataGrid;
