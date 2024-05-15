# 🌈 Quote Generator App

Create and customize beautiful quote images with ease! Express yourself, share your thoughts, and spread inspiration through visually stunning quotes.

## Features

✏️ **Dynamic Editing**: See real-time changes as you edit your quote, including color adjustments and text modifications.

🖼️ **Background Customization**: Personalize your quote with customizable background colors or images.

🎨 **Themes and Templates**: Choose from a variety of pre-designed themes and templates to make your quotes stand out.

📷 **Image Filters**: Apply filters to your background images for added visual appeal.

🌐 **Random Quote Generator**: Get inspired with a random quote when you're feeling creative block.

🔤 **Custom Fonts**: Express your style with a selection of fonts or upload your own.

## 📦 Technologies

- `React`
- `Tailwind`
- `dom-to-image`

## Process

I started by making the most basic layout, a page divided into two parts - left for the sidebar and right for the actual quote-image. Once that was done, I focused on just building the basic functionalities in the sidebar - the input for quote and author and configuring them to reflect on the quote-image.

I initially used `html2canvas` library to handling the conversion of the DOM element into an image. But that didn't work out very well and had issues with borders. So I had to switch to another library called `dom-to-image`.

After the basics were set up and the mvp made with download and copy to clipboard functionality, I went on iterating over it to include all the additional features - size, opacity, random quotes, font styles, quote categories, gradients, and templates.

After all this, the final step was updating the UI to make it a bit more attractive.

## Learnings

One of the main things I learned was to effectively utilize the `useState` hook. I intially had a huge number of them to store different states of the app. After a point, there were too many of them and I had to figure out to refactor them. I brought them down to just two, making use of objects and arrays to store different configs into a single useState.

## How to Use

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/your-username/quote-generator-app.git
   cd quote-generator-app
   ```
2. **Install dependencies:**
   ```bash
   pnpm install
   ```
3. **Start the app:**
   ```bash
   pnpm run dev
   ```

## TO-DOs

1. **Image Filters:**
   Integrate a library or tool that provides image filters and overlays (e.g., CSS filters or JavaScript image processing libraries).
   Allow users to apply different filters to their background images and adjust the intensity.

2. **Image Cropping and Positioning:**
   Implement an image cropping and positioning tool using libraries like react-image-crop or HTML5 Canvas.
   Allow users to crop and adjust the position of their background images.

3. **AI Background image generation:**
   Use AI tools like DallE 3 or gpt-4o to generate custom background image based on user's prompts right within the app itself. Anything else we can do with AI?

## Preview

https://github.com/ArvindParekh/Quote-Studio/assets/71211731/33eb0d72-b2df-4e8a-93e9-bb026d500eb9

## Contributing

All contributions are welcome! Feel free to open issues, suggest new features, or submit pull requests!

Made with ❤️ by [Arvind Parekh](https://twitter.com/ArvindParekh_21)
