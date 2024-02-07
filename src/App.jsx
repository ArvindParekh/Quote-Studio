import QuoteCard from "./components/quoteCard";

function App() {
  return (
    <>
      <main className="w-[100vw] h-[100vh] flex flex-col justify-evenly items-center bg-gray-100">
        <h1 className="font-bold text-4xl w-[50%] text-center">
          Generate a quote and share it on your socials!
        </h1>
        <section className="border h-[80vh] w-[80vw] flex items-center rounded-3xl shadow-lg bg-white">
          <QuoteCard />
        </section>
      </main>
    </>
  );
}

export default App;
