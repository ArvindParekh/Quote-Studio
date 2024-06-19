import { Link } from "react-router-dom";

const Root = () => {
    return (
        <>
            <main className="flex h-screen w-screen flex-col items-center justify-center gap-14 bg-gray-100">
                <h1 className="w-[50%] text-center text-6xl font-bold">
                    Generate a quote and share it on your socials!
                </h1>
                <Link
                    to="/generate"
                    className="rounded-md border bg-black p-3 px-7 font-medium text-white outline-none transition-all hover:border hover:border-black hover:bg-white hover:text-black"
                >
                    Get Started
                </Link>
                <footer className="absolute bottom-10 rounded-3xl border px-10 py-3 shadow-lg">
                    Made by{" "}
                    <Link to="https://twitter.com/ArvindParekh_21" target="_blank">
                        @ArvindParekh
                    </Link>{" "}
                    ♥
                </footer>
            </main>
        </>
    );
};

export default Root;
