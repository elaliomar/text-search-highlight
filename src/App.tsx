import { useState, useEffect } from "react";
import { TbXboxXFilled } from "react-icons/tb";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [highlightCount, setHighlightCount] = useState(0);

  const title = "Exciting Breakthrough in AI Research";
  const date = "August 16, 2024";
  const text = `On August 16, 2024, a groundbreaking development in artificial
    intelligence was announced, marking a significant milestone in the field.
    Researchers have successfully created an advanced AI model capable of
    understanding and generating human-like responses with unprecedented
    accuracy. This innovation is expected to revolutionize industries ranging
    from healthcare to finance, making processes more efficient and reliable.
    As AI continues to evolve, this achievement serves as a testament to the
    potential of technology in shaping the future.`;

  const getHighlightedText = (text: string, highlight: string) => {
    if (!highlight) return { highlightedText: text, count: 0 };
    const regex = new RegExp(`(${highlight})`, "gi");
    const parts = text.split(regex);
    let count = 0;

    const highlightedText = parts.map((part, index) => {
      if (part.toLowerCase() === highlight.toLowerCase()) {
        count++;
        return (
          <span key={index} style={{ backgroundColor: "yellow" }}>
            {part}
          </span>
        );
      }
      return part;
    });

    return { highlightedText, count };
  };

  const { highlightedText: highlightedTitle, count: titleCount } =
    getHighlightedText(title, searchTerm);
  const { highlightedText: highlightedDate, count: dateCount } =
    getHighlightedText(date, searchTerm);
  const { highlightedText: highlightedContent, count: contentCount } =
    getHighlightedText(text, searchTerm);

  useEffect(() => {
    setHighlightCount(titleCount + dateCount + contentCount);
  }, [searchTerm, titleCount, dateCount, contentCount]);

  const handleClearInput = () => {
    setSearchTerm("");
  };

  return (
    <div className="d-flex flex-sm-column align-items-center justify-content-center">
      <div className="container bg-light m-3">
        <p className="fs-2 fw-semibold">Search</p>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search here..."
            aria-label="Search"
            aria-describedby="button-addon2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            className="btn btn-outline-secondary"
            type="button"
            id="button-addon2"
            onClick={handleClearInput}
          >
            <TbXboxXFilled />
          </button>
        </div>
        <p>
          <span className="fw-medium">{highlightCount} matches</span> found
        </p>
        <div className="my-5">
          <p className="fs-4 fw-semibold">{highlightedTitle}</p>
          <i>{highlightedDate}</i>
          <p className="mt-3">{highlightedContent}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
