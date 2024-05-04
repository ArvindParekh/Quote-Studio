import QuoteCard from "./components/quoteCard";

function App() {
  return (
    <>
      <main className="flex h-[100vh] w-[100vw] flex-col items-center justify-evenly bg-[#09171C]">
        {/* <h1 className='font-bold text-4xl w-[50%] text-center'>
               Generate a quote and share it on your socials!
            </h1> */}
        <QuoteCard />
      </main>
    </>
  );
}

export default App;
