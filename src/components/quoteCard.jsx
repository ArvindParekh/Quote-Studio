import { useRef } from "react";
import { useState } from "react";
import { ColorPicker } from "primereact/colorpicker";
import html2canvas from "html2canvas";

const QuoteCard = () => {
  const [input, setInput] = useState("");
  const [author, setAuthor] = useState("");
  const [background, setBackground] = useState("#f0f000");
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

  function handleDownload() {
    html2canvas(document.querySelector("#canvas")).then((canvas) => {
      canvas.toBlob((blob) => {
        // eslint-disable-next-line no-undef
        const item = new ClipboardItem({ "image/png": blob });
        navigator.clipboard.write([item]).then(console.log("done"));
      });
    });
  }

  return (
    <>
      <div className="m-4 flex h-full w-[50%] flex-col gap-5 pt-20">
        <div className="flex flex-col gap-2">
          <label className="font-medium">Quote</label>
          <input
            type="text"
            // placeholder="Enter Quote"
            className="rounded-md border p-3 focus:border-2 focus:border-black focus:outline-none"
            onChange={(e) => setInput(e.target.value)}
            value={input}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-medium">Author</label>
          <input
            // placeholder="Enter author name"
            className="rounded-md border p-3 focus:border-2 focus:border-black focus:outline-none"
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
          className="mt-5 rounded-md border-none bg-black p-2 text-base font-medium text-white"
          onClick={getFileFromDevice}
        >
          Select File
        </button>

        <button
          className="mb-5 rounded-md border-none bg-black p-2 text-base font-medium text-white"
          onClick={getRandomQuote}
        >
          Get Random Quote
        </button>

        {/* Color picker */}
        <div>
          <ColorPicker
            value={background}
            inputStyle={{
              width: "30px",
              height: "30px",
              borderRadius: "5px",
              margin: 4,
            }}
            height={4}
            onChange={(e) => setBackground("#" + e.target.value)}
          />

          <ColorPicker
            value={textColor}
            inputStyle={{
              width: "30px",
              height: "30px",
              borderRadius: "5px",
              margin: 4,
            }}
            onChange={(e) => setTextColor("#" + e.target.value)}
          />
          <p className="mt-5"><span className="font-semibold">*Disclaimer:</span> Download functionality currently only supported on chrome.</p>
        </div>
      </div>
      <div className="m-4 flex h-full w-[50%] flex-col items-center justify-center">
        {background && (
          <div
            className="m-4 flex h-[80%] w-[95%] flex-col items-center justify-center rounded-xl px-4 text-center shadow-lg"
            id="canvas"
            style={
              background[0] === "#"
                ? { background: background, color: textColor }
                : {
                    background: "url(" + background + ")",
                    color: textColor,
                  }
            }
          >
            <h1 className="text-6xl font-bold">{input}</h1>

            {author !== "" && (
              <span className="mt-5 text-2xl font-semibold">-{author}</span>
            )}
          </div>
        )}
        <button
          onClick={handleDownload}
          className="border-1 rounded-md border border-black bg-black p-3 px-7 text-white outline-none"
        >
          Download
        </button>
      </div>
    </>
  );
};

export default QuoteCard;
