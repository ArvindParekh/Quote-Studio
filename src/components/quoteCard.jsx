import { useRef } from "react";
import { useState } from "react";

const QuoteCard = () => {
  const [input, setInput] = useState("");
  const [author, setAuthor] = useState("");
  const [background, setBackground] = useState(null);
  const [textColor, setTextColor] = useState("#000000");
  //   const [image, setImage] = useState(null);
  const inputRef = useRef(null);

  function getRandomQuote() {
    console.log("Clicked");
    const quote = fetch("https://type.fit/api/quotes")
      .then((res) => res.json())
      .then((data) => setInput(data[Math.floor(Math.random() * 10)].text));
    console.log(quote);
    // setInput(quote[Math.floor(Math.random() * 10)].text);
  }

  function getFileFromDevice() {
    inputRef.current.click();
  }

  function handleChange(e) {
    const files = e.target.files[0];
    const objecturl = URL.createObjectURL(files);
    setBackground(objecturl);
  }

  return (
    <>
      {console.log(background)}
      <div className="w-[50%] h-full m-4 flex flex-col gap-5 pt-20">
        <div className="flex flex-col gap-2">
          <label className="font-medium">Quote</label>
          <input 
            type="text"
            // placeholder="Enter Quote"
            className="border rounded-md p-3 focus:outline-none focus:border-2 focus:border-black"
            onChange={(e) => setInput(e.target.value)}
            value={input}
          />
        </div>

        <div className="flex flex-col gap-2">
        <label className="font-medium">Author</label>
        <input
          // placeholder="Enter author name"
          className="border rounded-md p-3 focus:outline-none focus:border-2 focus:border-black"
          onChange={(e) => setAuthor(e.target.value)}
        />
        </div>

        <input
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          ref={inputRef}
          onChange={handleChange}
        />
        <button
          className="border-none rounded-md p-2 text-base font-medium bg-black text-white mt-5"
          onClick={getFileFromDevice}
        >
          Select File
        </button>

        <button
          className="border-none rounded-md p-2 text-base font-medium bg-black text-white mb-5"
          onClick={getRandomQuote}
        >
          Get Random Quote
        </button>

        {/* Color picker */}
        <div>
          {/* <input
            type="color"
            onChange={(e) => setBackground(e.target.value)}
            className="inline-block mr-4"
          />

          <input
            type="color"
            onChange={(e) => setTextColor(e.target.value)}
            className="inline-block"
          /> */}
        </div>
      </div>
      <div className="w-[50%] h-full  m-4 flex items-center justify-center">
        {background && (
          <div
            className="flex flex-col items-center justify-center m-4 w-[95%] h-[80%] shadow-lg text-center rounded-xl px-4"
            style={
              background[0] === "#"
                ? { background: background, color: textColor }
                : { background: "url(" + background + ")", color: textColor }
            }
          >
            <h1 className="text-6xl font-bold">{input}</h1>

            {author !== "" && (
              <span className="mt-5 font-semibold text-2xl">-{author}</span>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default QuoteCard;
