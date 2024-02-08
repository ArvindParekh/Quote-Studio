import QuoteCard from "./components/quoteCard";

function App() {
  return (
    <>
      <main className="flex h-[100vh] w-[100vw] flex-col items-center justify-evenly bg-gray-100">
        {/* <h1 className='font-bold text-4xl w-[50%] text-center'>
               Generate a quote and share it on your socials!
            </h1> */}
        <section className="flex h-[80vh] w-[80vw] items-center rounded-3xl border bg-white shadow-lg">
          <QuoteCard />
        </section>
      </main>
    </>
  );
}

export default App;
