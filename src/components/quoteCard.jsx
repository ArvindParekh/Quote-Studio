import { useRef } from "react";
import { useState } from "react";
import { ColorPicker } from "primereact/colorpicker";
import InputLabel from "@mui/material/InputLabel";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import { TabContext, TabList, TabPanel } from "@mui/lab";
// import TabPanel from "@mui/lab/TabPanel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { ToggleButton, Slider, ToggleButtonGroup } from "@mui/material";
import domtoimage from "dom-to-image";
import fontsData from "../data/fonts";

const QuoteCard = () => {
  const [input, setInput] = useState("The quote goes here.");
  const [author, setAuthor] = useState("Someone Wise");
  const [background, setBackground] = useState("#f0f000");
  const [textColor, setTextColor] = useState("#000000");
  const [font, setFont] = useState("Arial");
  const [quoteSize, setQuoteSize] = useState("60");
  const [opacity, setOpacity] = useState(1);
  const [quoteGenre, setQuoteGenre] = useState("");
  const [value, setValue] = useState("1");
  //   const [image, setImage] = useState(null);
  const inputRef = useRef(null);

  function getRandomQuote() {
    console.log(
      `https://api.quotable.io/quotes/random?maxLength=80&tags=${quoteGenre}`,
    );
    fetch(
      `https://api.quotable.io/quotes/random?maxLength=80&tags=${quoteGenre}`,
    )
      .then((res) => res.json())
      .then((data) => {
        setInput(data[0].content);
        setAuthor(data[0].author);
      });
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

  function handleFontSizeChange(event) {
    setQuoteSize(event.target.value);
  }

  function handleGradientChange(event) {
    const gradient = event.target.style.backgroundImage;
    console.log(gradient);
    setBackground(gradient);
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

        <div>
          <Slider
            defaultValue={60}
            valueLabelDisplay="auto"
            onChange={handleFontSizeChange}
          />
        </div>

        <div>
          <Slider
            min={0}
            max={1}
            step={0.01}
            defaultValue={1}
            valueLabelDisplay="auto"
            onChange={(event) => setOpacity(event.target.value)}
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
                  <MenuItem
                    style={{ fontFamily: fonts }}
                    key={index}
                    value={fonts}
                  >
                    {fonts}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>

        <div>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList onChange={(event, newValue) => setValue(newValue)}>
                <Tab label="Color" value="1" />
                <Tab label="Image" value="2" />
                <Tab label="Gradient" value="3" />
              </TabList>
            </Box>
            <TabPanel value="1">
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
            </TabPanel>
            <TabPanel value="2">
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
            </TabPanel>
            <TabPanel value="3" className="">
              <div className="flex gap-3">
                <div
                  className="rounded-m h-10 w-10 cursor-pointer rounded-full"
                  style={{
                    backgroundImage: "linear-gradient(to right, pink, purple)",
                  }}
                  onClick={handleGradientChange}
                ></div>
                <div
                  className="h-10 w-10 cursor-pointer rounded-full"
                  style={{
                    backgroundImage: "linear-gradient(to right, cyan, blue)",
                  }}
                  onClick={handleGradientChange}
                ></div>
                <div
                  className="h-10 w-10 cursor-pointer rounded-full"
                  style={{
                    backgroundImage: "linear-gradient(to right, orange, cyan)",
                  }}
                  onClick={handleGradientChange}
                ></div>
                <div
                  className="h-10 w-10 cursor-pointer rounded-full"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right,#ff6b81, #c0cbe8)",
                  }}
                  onClick={handleGradientChange}
                ></div>
                <div
                  className="h-10 w-10 cursor-pointer rounded-full"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, #fff9b0, #b6d7a8)",
                  }}
                  onClick={handleGradientChange}
                ></div>
                <div
                  className="h-10 w-10 cursor-pointer rounded-full"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, #87bdd8, #d6bdd8)",
                  }}
                  onClick={handleGradientChange}
                ></div>
                <div
                  className="h-10 w-10 cursor-pointer rounded-full"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, #ff7979, #b3ffb3)",
                  }}
                  onClick={handleGradientChange}
                ></div>
                <div
                  className="h-10 w-10 cursor-pointer rounded-full"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, #61a3ff, #d0d0d0)",
                  }}
                  onClick={handleGradientChange}
                ></div>
                <div
                  className="h-10 w-10 cursor-pointer rounded-full"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, #b5ffb5, #61d1ff)",
                  }}
                  onClick={handleGradientChange}
                ></div>
                <div
                  className="h-10 w-10 cursor-pointer rounded-full"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, #c3e8ff, #ffcccc)",
                  }}
                  onClick={handleGradientChange}
                ></div>
                <div
                  className="h-10 w-10 cursor-pointer rounded-full"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, #ffb6c1, #ffee99)",
                  }}
                  onClick={handleGradientChange}
                ></div>
              </div>
              <div>
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
            </TabPanel>
          </TabContext>
        </div>

        <ToggleButtonGroup
          value={quoteGenre}
          exclusive
          onChange={(event, newValue) => {
            if (newValue == null) {
              setQuoteGenre("");
            } else {
              setQuoteGenre(newValue);
            }
          }}
        >
          <ToggleButton value="motivational">Motivational</ToggleButton>
          <ToggleButton value="inspirational">Inspirational</ToggleButton>
          <ToggleButton value="wisdom">Wisdom</ToggleButton>
          <ToggleButton value="famous-quotes">Famous Quotes</ToggleButton>
          {/* <ToggleButton value="friendship">Friendship</ToggleButton> */}
          <ToggleButton value="success">Success</ToggleButton>
          {/* <ToggleButton value="life">Life</ToggleButton> */}

          <FormControl style={{ minWidth: "5vw" }}>
            <InputLabel id="demo-simple-select-label">Others</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              // defaultValue={font}
              // value={quoteGenre}
              label="Genre"
              onChange={(event) => setQuoteGenre(event.target.value)}
            >
              <MenuItem value="friendship">Friendship</MenuItem>
              <MenuItem value="life">Life</MenuItem>
              <MenuItem value="spirituality">Spirituality</MenuItem>
              <MenuItem value="technology">Technology</MenuItem>
              <MenuItem value="truth">Truth</MenuItem>
              {/* <MenuItem value="work">Work</MenuItem> */}
              <MenuItem value="future">Future</MenuItem>
              <MenuItem value="philosophy">Philosophy</MenuItem>
              <MenuItem value="sports">Sports</MenuItem>
              <MenuItem value="history">History</MenuItem>
              <MenuItem value="humorous">Humorous</MenuItem>
              <MenuItem value="business">Business</MenuItem>
            </Select>
          </FormControl>
        </ToggleButtonGroup>

        <button
          className="mb-5 rounded-md border-none bg-black p-2 text-base font-medium text-white"
          onClick={getRandomQuote}
        >
          Get Random Quote
        </button>
      </div>

      <div className="m-4 flex h-full w-[50%] flex-col items-center justify-center">
        {background && (
          <div
            className="flex h-[80%] w-[95%] flex-col items-center justify-center rounded-xl px-4 text-center shadow-lg"
            id="canvas"
            style={
              background[0] === "#"
                ? { background: background, color: textColor }
                : background[0] === "l"
                  ? { background: background, color: textColor }
                  : {
                      background: "url(" + background + ")",
                      color: textColor,
                    }
            }
          >
            <h1
              className="text-6xl font-bold"
              style={{
                fontFamily: font,
                fontSize: `${quoteSize}px`,
                opacity: opacity,
              }}
            >
              {input}
            </h1>

            {author !== "" && (
              <span
                className="mt-5 text-2xl font-semibold"
                style={{ fontFamily: font, opacity: opacity }}
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
