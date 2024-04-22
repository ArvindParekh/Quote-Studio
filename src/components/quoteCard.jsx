import { useRef } from "react";
import { useState } from "react";
import { ColorPicker } from "primereact/colorpicker";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Slider } from "@mui/material";
import domtoimage from "dom-to-image";
import fontsData from "../data/fonts";

const QuoteCard = () => {
  const [input, setInput] = useState("The quote goes here.");
  const [author, setAuthor] = useState("Someone Wise");
  const [background, setBackground] = useState("#f0f000");
  const [textColor, setTextColor] = useState("#000000");
  const [font, setFont] = useState("Arial");
  const [quoteSize, setQuoteSize] = useState('60');
  //   const [image, setImage] = useState(null);
  const inputRef = useRef(null);

  function getRandomQuote() {
    fetch("https://type.fit/api/quotes")
      .then((res) => res.json())
      .then((data) => setInput(data[Math.floor(Math.random() * 10)].text));
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
    try {
      domtoimage
        .toJpeg(document.getElementById("canvas"), { quality: 0.95 })
        .then(function (dataUrl) {
          var link = document.createElement("a");
          link.download = "quote.jpeg";
          link.href = dataUrl;
          link.click();
        });
    } catch (error) {
      console.log(error);
    }
  }

  function handleCopy() {
    try {
      domtoimage
        .toBlob(document.getElementById("canvas"), { quality: 0.95 })
        .then((dataUrl) => {
          navigator.clipboard.write([
            new ClipboardItem({
              "image/png": dataUrl,
            }),
          ]);
        });
    } catch (error) {
      console.log(error);
    }
  }

  function handleFontChange(event) {
    setFont(event.target.value);
  }

  function handleFontSizeChange(event){
    setQuoteSize(event.target.value);
  }

  return (
    <>
      <div className="m-4 flex h-full w-[50%] flex-col gap-5 pt-20">
        <div className="flex flex-col gap-2">
          <label className="font-medium">Quote</label>
          <input
            type="text"
            className="rounded-md border p-3 focus:border-2 focus:border-black focus:outline-none"
            onChange={(e) => setInput(e.target.value)}
            value={input}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-medium">Author</label>
          <input
            type="text"
            className="rounded-md border p-3 focus:border-2 focus:border-black focus:outline-none"
            onChange={(e) => setAuthor(e.target.value)}
            value={author}
          />
        </div>

        <div>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Font</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              defaultValue={font}
              value={font}
              label="Font"
              onChange={handleFontChange}
            >
              {fontsData.map((fonts, index) => {
                return (
                  <MenuItem style={{fontFamily: fonts}} key={index} value={fonts}>
                    {fonts}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>

        <div>
          <Slider defaultValue={60} valueLabelDisplay="auto" onChange={handleFontSizeChange} />
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
        </div>
      </div>
      <div className="m-4 flex h-full w-[50%] flex-col items-center justify-center">
        {background && (
          <div
            className="flex h-[80%] w-[95%] flex-col items-center justify-center rounded-xl px-4 text-center shadow-lg"
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
            <h1 className="text-6xl font-bold" style={{ fontFamily: font, fontSize:`${quoteSize}px` }}>
              {input}
            </h1>

            {author !== "" && (
              <span
                className="mt-5 text-2xl font-semibold"
                style={{ fontFamily: font }}
              >
                -{author}
              </span>
            )}
          </div>
        )}
        <div className="flex items-center justify-center gap-10">
          <button
            onClick={handleDownload}
            className="border-1 mt-4 rounded-md border border-black bg-black p-3 px-7 text-white outline-none"
          >
            Download
          </button>

          <button
            onClick={handleCopy}
            className="border-1 mt-4 rounded-md border border-black bg-black p-3 px-7 text-white outline-none"
          >
            Copy to Clipboard
          </button>
        </div>
      </div>
    </>
  );
};

export default QuoteCard;
