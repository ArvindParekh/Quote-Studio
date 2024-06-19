import image1 from "/src/assets/image-1.jpeg";
import image2 from "/src/assets/image-2.jpeg";
import image3 from "/src/assets/image-3.jpeg";
import image4 from "/src/assets/image-4.jpeg";
import image5 from "/src/assets/image-5.jpeg";
import image6 from "/src/assets/image-6.jpeg";

const templatesData = [
  {
    backgroundImage: image1,
    background: "linear-gradient(to right, cyan, blue)",
    textColor: "#ffffff",
    font: "Shadows Into Light",
    size: "73",
    opacity: 1,
    genre: "famous-quotes",
    input: "We make our own fortunes and we call them fate.",
    author: "Benjamin Disraeli",
  },
  {
    backgroundImage: image2,
    background: "#7b0c87",
    textColor: "#ffffff",
    font: "Playfair Display",
    size: "61",
    opacity: 1,
    genre: "famous-quotes",
    input: "The secret of getting ahead is getting started.",
    author: "Mark Twain",
  },
  {
    backgroundImage: image3,
    background: "#ffbb00",
    textColor: "#000000",
    font: "Bebas Neue",
    size: "73",
    opacity: 1,
    genre: "famous-quotes",
    input: "Never mistake activity for achievement.",
    author: "John Wooden",
  },
  {
    backgroundImage: image4,
    background:
      "linear-gradient(to right, rgb(255, 249, 176), rgb(182, 215, 168))",
    textColor: "#000000",
    font: "Sedan",
    size: "64",
    opacity: 1,
    genre: "famous-quotes",
    input: "If it is not right do not do it; if it is not true do not say it.",
    author: "Marcus Aurelius",
  },
  {
    backgroundImage: image5,
    background: `url('/mountains.jpg')`,
    textColor: "#ffffff",
    font: "Permanent Marker",
    size: "58",
    opacity: 1,
    genre: "famous-quotes",
    input: "Our strength grows out of our weaknesses.",
    author: "Ralph Waldo Emerson",
  },
  {
    backgroundImage: image6,
    background:
      "linear-gradient(to right, rgb(255, 182, 193), rgb(255, 238, 153))",
    textColor: "#000000",
    font: "Caveat",
    size: "73",
    opacity: 1,
    genre: "famous-quotes",
    input: "We know what we are but know not what we may be.",
    author: "William Shakespeare",
  },
];

export default templatesData;
