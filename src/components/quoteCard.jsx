import { useRef } from "react";
import { useState } from "react";
import { ColorPicker } from "primereact/colorpicker";
import InputLabel from "@mui/material/InputLabel";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import domtoimage from "dom-to-image";
import fontsData from "../data/fonts";
import templatesData from "../data/templates";
import PrettoSlider from "./prettoSlider";

const QuoteCard = () => {
  const [quote, setQuote] = useState({
    input: "The quote goes here.",
    author: "Someone wise",
  });
  const [quoteConfig, setQuoteConfig] = useState({
    background: "#FFFFF2",
    textColor: "#000000",
    font: "Arial",
    size: "60",
    opacity: 1,
    genre: "",
  });
  const [value, setValue] = useState("1");
  const inputRef = useRef(null);

  function getRandomQuote() {
    fetch(
      `https://api.quotable.io/quotes/random?maxLength=80&tags=${quoteConfig.genre}`,
    )
      .then((res) => res.json())
      .then((data) => {
        setQuote((prev) => ({
          ...prev,
          input: data[0].content,
          author: data[0].author,
        }));
      });
  }

  function getFileFromDevice() {
    inputRef.current.click();
  }

  function handleChange(e) {
    const files = e.target.files[0];
    const objecturl = URL.createObjectURL(files);
    setQuoteConfig((prev) => ({ ...prev, background: objecturl }));
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
      console.log("Error downloading image: ", error);
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
      console.log("Error copying image: ", error);
    }
  }

  // function handleCopy() {
  //   const jsonString = JSON.stringify({
  //     background: quoteConfig.background,
  //     textColor: quoteConfig.textColor,
  //     font: quoteConfig.font,
  //     size: quoteConfig.size,
  //     opacity: quoteConfig.opacity,
  //     genre: quoteConfig.genre,
  //     input: quote.input,
  //     author: quote.author,
  //   });
  //   navigator.clipboard.writeText(jsonString);
  // }

  function handleFontChange(event) {
    setQuoteConfig((prev) => ({ ...prev, font: event.target.value }));
  }

  function handleFontSizeChange(event) {
    setQuoteConfig((prev) => ({ ...prev, size: event.target.value }));
  }

  function handleGradientChange(event) {
    const gradient = event.target.style.backgroundImage;
    setQuoteConfig((prev) => ({ ...prev, background: gradient }));
  }

  function handleTemplateClick(template) {
    setQuote((prev) => ({
      ...prev,
      author: template.author,
      input: template.input,
    }));
    setQuoteConfig((prev) => ({
      ...prev,
      background: template.background,
      textColor: template.textColor,
      font: template.font,
      size: template.size,
      opacity: template.opacity,
      genre: template.genre,
    }));
  }

  return (
    <section className="flex h-[80vh] w-full items-center justify-evenly">
      <div className="flex h-full w-[30%] flex-col gap-5 overflow-scroll rounded-3xl bg-[#7d2a52] p-7 text-white shadow-2xl shadow-[#7d2a52]">
        <div className="flex flex-col gap-2">
          <label className="font-medium">Quote</label>
          <input
            type="text"
            className="rounded-md border p-3 text-black focus:border-2 focus:border-black focus:outline-none"
            onChange={(e) =>
              setQuote((prev) => ({ ...prev, input: e.target.value }))
            }
            value={quote.input}
          />
        </div>

        <div>
          <PrettoSlider
            defaultValue={60}
            valueLabelDisplay="auto"
            style={{
              color: "white",
            }}
            onChange={handleFontSizeChange}
          />
        </div>

        <div>
          <PrettoSlider
            min={0}
            max={1}
            step={0.01}
            defaultValue={1}
            valueLabelDisplay="auto"
            style={{
              color: "white",
            }}
            onChange={(event) =>
              setQuoteConfig((prev) => ({
                ...prev,
                opacity: event.target.value,
              }))
            }
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-medium">Author</label>
          <input
            type="text"
            className="rounded-md border p-3 text-black focus:border-2 focus:border-black focus:outline-none"
            onChange={(e) =>
              setQuote((prev) => ({ ...prev, author: e.target.value }))
            }
            value={quote.author}
          />
        </div>

        <div>
          <FormControl fullWidth>
            <InputLabel
              id="demo-simple-select-label"
              style={{ color: "white", fontWeight: 500 }}
            >
              Font
            </InputLabel>
            <Select
              className="text-white"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              defaultValue={quoteConfig.font}
              value={quoteConfig.font}
              label="Font"
              sx={{
                color: "white",
                ".MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(228, 219, 233, 0.25)",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(228, 219, 233, 0.25)",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(228, 219, 233, 0.25)",
                },
                ".MuiSvgIcon-root ": {
                  fill: "white !important",
                },
              }}
              onChange={handleFontChange}
            >
              {fontsData.map((fonts, index) => {
                return (
                  <MenuItem
                    style={{
                      fontFamily: fonts,
                    }}
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
            <Box
              sx={{
                borderBottom: 1,
                borderColor: "divider",
              }}
            >
              <TabList onChange={(event, newValue) => setValue(newValue)}>
                <Tab
                  sx={{
                    color: "white",
                    "&.Mui-selected": { color: "black" },
                  }}
                  label="Color"
                  value="1"
                />
                <Tab
                  sx={{ color: "white", "&.Mui-selected": { color: "black" } }}
                  label="Image"
                  value="2"
                />
                <Tab
                  sx={{ color: "white", "&.Mui-selected": { color: "black" } }}
                  label="Gradient"
                  value="3"
                />
                <Tab
                  sx={{ color: "white", "&.Mui-selected": { color: "black" } }}
                  label="Templates"
                  value="4"
                />
              </TabList>
            </Box>
            <TabPanel value="1">
              {/* Color picker */}
              <div>
                <ColorPicker
                  value={quoteConfig.background}
                  inputStyle={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "5px",
                    margin: 4,
                  }}
                  height={4}
                  onChange={(e) =>
                    setQuoteConfig((prev) => ({
                      ...prev,
                      background: "#" + e.target.value,
                    }))
                  }
                />

                <ColorPicker
                  value={quoteConfig.textColor}
                  inputStyle={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "5px",
                    margin: 4,
                  }}
                  onChange={(e) =>
                    setQuoteConfig((prev) => ({
                      ...prev,
                      textColor: "#" + e.target.value,
                    }))
                  }
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
                className="rounded-md border-none bg-black p-2 text-base font-medium text-white"
                onClick={getFileFromDevice}
              >
                Select File
              </button>
            </TabPanel>
            <TabPanel value="3">
              <div className="flex flex-wrap gap-3">
                <div
                  className="h-10 w-10 cursor-pointer rounded-full"
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
                  value={quoteConfig.textColor}
                  inputStyle={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "5px",
                    margin: 4,
                  }}
                  onChange={(e) =>
                    setQuoteConfig((prev) => ({
                      ...prev,
                      textColor: "#" + e.target.value,
                    }))
                  }
                />
              </div>
            </TabPanel>
            <TabPanel value="4">
              <div className="flex flex-wrap gap-3">
                {templatesData.map((template, index) => {
                  return (
                    <div
                      key={index}
                      className="h-24 w-24 cursor-pointer rounded-md border"
                      style={{
                        backgroundImage: `url(${template.backgroundImage})`,
                        backgroundPosition: "center center",
                        backgroundSize: "cover",
                      }}
                      onClick={() => handleTemplateClick(template)}
                    ></div>
                  );
                })}
              </div>
            </TabPanel>
          </TabContext>
        </div>

        <ToggleButtonGroup
          value={quoteConfig.genre}
          exclusive
          sx={{
            color: "white", // This changes the text color to white
            backgroundColor: "white", // This changes the background color to white
            "&.MuiToggleButton-root": {
              color: "white", // Ensures the text color of ToggleButtons is white
              backgroundColor: "white", // Ensures the background color of ToggleButtons is white
            },
          }}
          onChange={(event, newValue) => {
            if (newValue == null) {
              setQuoteConfig((prev) => ({ ...prev, genre: "" }));
            } else {
              setQuoteConfig((prev) => ({ ...prev, genre: newValue }));
            }
          }}
        >
          <ToggleButton value="motivational">Motivational</ToggleButton>
          <ToggleButton value="inspirational">Inspirational</ToggleButton>
          {/* <ToggleButton value="wisdom">Wisdom</ToggleButton> */}
          <ToggleButton value="famous-quotes">Famous Quotes</ToggleButton>
          {/* <ToggleButton value="success">Success</ToggleButton> */}

          <FormControl style={{ minWidth: "5vw" }}>
            <InputLabel id="demo-simple-select-label">Others</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              // defaultValue={font}
              // value={quoteGenre}
              label="Genre"
              onChange={(event) =>
                setQuoteConfig((prev) => ({
                  ...prev,
                  genre: event.target.value,
                }))
              }
            >
              <MenuItem value="friendship">Friendship</MenuItem>
              <MenuItem value="life">Life</MenuItem>
              <MenuItem value="spirituality">Spirituality</MenuItem>
              <MenuItem value="technology">Technology</MenuItem>
              <MenuItem value="truth">Truth</MenuItem>
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
          className="rounded-md border-none bg-black p-2 text-base font-medium text-white"
          onClick={getRandomQuote}
        >
          Get Random Quote
        </button>
      </div>

      <div className="m-4 flex h-full w-[50%] flex-col items-center justify-center">
        {quoteConfig.background && (
          <div
            className="flex h-[80%] w-[95%] flex-col items-center justify-center rounded-xl px-4 text-center shadow-lg"
            id="canvas"
            style={
              quoteConfig.background[0] === "#"
                ? {
                    background: quoteConfig.background,
                    color: quoteConfig.textColor,
                  }
                : quoteConfig.background[0] === "l"
                  ? {
                      background: quoteConfig.background,
                      color: quoteConfig.textColor,
                    }
                  : {
                      background: "url(" + quoteConfig.background + ")",
                      color: quoteConfig.textColor,
                    }
            }
          >
            <h1
              className="text-6xl font-bold"
              style={{
                fontFamily: quoteConfig.font,
                fontSize: `${quoteConfig.size}px`,
                opacity: quoteConfig.opacity,
              }}
            >
              {quote.input}
            </h1>

            {quote.author !== "" && (
              <span
                className="mt-5 text-2xl font-semibold"
                style={{
                  fontFamily: quoteConfig.font,
                  opacity: quoteConfig.opacity,
                }}
              >
                -{quote.author}
              </span>
            )}
          </div>
        )}
        <div className="flex items-center justify-center gap-10">
          <button
            onClick={handleDownload}
            className="border-1 mt-4 rounded-md border border-black bg-[#7D2A52] p-3 px-7 text-white outline-none"
          >
            Download
          </button>

          <button
            onClick={handleCopy}
            className="border-1 mt-4 rounded-md border border-black bg-[#7D2A52] p-3 px-7 text-white outline-none"
          >
            Copy to Clipboard
          </button>
        </div>
      </div>
    </section>
  );
};

export default QuoteCard;
