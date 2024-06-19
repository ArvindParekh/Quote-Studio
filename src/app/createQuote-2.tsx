/**
 * v0 by Vercel.
 * @see https://v0.dev/t/A9YA19uHL8D
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import domtoimage from "dom-to-image"

export default function Component() {
    /* STATES */
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
    const [isToolbarOpen, setIsToolbarOpen] = useState(false)

    /* FUNCTIONS */
    function fetchRandomQuote() {
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
    // const handleQuoteChange = (field: string, value: string | number | number[]) => {
    //     setQuote({
    //         ...quote,
    //         [field]: value,
    //     })
    // }
    function downloadQuote() {
        try {
            domtoimage
                .toJpeg(document.getElementById("canvas"), { quality: 0.95 })
                .then(function (dataUrl: string) {
                    const link = document.createElement("a");
                    link.download = "quote.jpeg";
                    link.href = dataUrl;
                    link.click();
                });
        } catch (error) {
            console.log("Error downloading image: ", error);
        }
    }
    function copyToClipboard() {
        try {
            domtoimage
                .toBlob(document.getElementById("canvas"), { quality: 0.95 })
                .then((dataUrl: Blob) => {
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
    return (
        <div className="flex flex-col h-screen w-screen">
            <div
                className={`fixed bottom-4 right-4 z-20 transition-all duration-300 ${isToolbarOpen ? "scale-100 opacity-100" : "scale-0 opacity-0"
                    }`}
            >
                <Card className="w-[400px] p-4 space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold">Quote Customizer</h2>
                        <Button variant="ghost" size="icon" onClick={() => setIsToolbarOpen(!isToolbarOpen)}>
                            <VolumeXIcon className="h-6 w-6" />
                        </Button>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="quote-text">Quote</Label>
                            <Input id="quote-text" value={quote.text} onChange={(e) => handleQuoteChange("text", e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="quote-author">Author</Label>
                            <Input
                                id="quote-author"
                                value={quote.author}
                                onChange={(e) => handleQuoteChange("author", e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="font-size">Font Size</Label>
                            <Input
                                id="font-size"
                                type="number"
                                value={quote.fontSize}
                                onChange={(e) => handleQuoteChange("fontSize", parseInt(e.target.value))}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="opacity">Opacity</Label>
                            <Slider
                                id="opacity"
                                min={0}
                                max={1}
                                step={0.1}
                                value={[quote.opacity]}
                                onValueChange={(value) => handleQuoteChange("opacity", value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="font-style">Font Style</Label>
                            <Select
                                id="font-style"
                                value={quote.fontStyle}
                                onValueChange={(value) => handleQuoteChange("fontStyle", value)}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select font style" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="normal">Normal</SelectItem>
                                    <SelectItem value="italic">Italic</SelectItem>
                                    <SelectItem value="bold">Bold</SelectItem>
                                    <SelectItem value="bold italic">Bold Italic</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="background-type">Background</Label>
                            <Select
                                id="background-type"
                                value={quote.backgroundType}
                                onValueChange={(value) => handleQuoteChange("backgroundType", value)}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select background type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="color">Color</SelectItem>
                                    <SelectItem value="image">Image</SelectItem>
                                    <SelectItem value="gradient">Gradient</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        {quote.backgroundType === "color" && (
                            <div className="space-y-2 col-span-2">
                                <Label htmlFor="background-color">Background Color</Label>
                                <div />
                            </div>
                        )}
                        {quote.backgroundType === "image" && (
                            <div className="space-y-2 col-span-2">
                                <Label htmlFor="background-image">Background Image</Label>
                                <Input
                                    id="background-image"
                                    type="text"
                                    value={quote.backgroundImage}
                                    onChange={(e) => handleQuoteChange("backgroundImage", e.target.value)}
                                />
                            </div>
                        )}
                        {quote.backgroundType === "gradient" && (
                            <div className="space-y-2 col-span-2">
                                <Label htmlFor="background-gradient">Background Gradient</Label>
                                <div className="flex gap-4">
                                    <div />
                                    <div />
                                </div>
                            </div>
                        )}
                    </div>
                </Card>
            </div>
            <div className="flex-1 flex items-center justify-center bg-muted">
                <div
                    className="relative w-[800px] h-[600px] bg-cover bg-center"
                    style={{
                        backgroundColor: quote.backgroundColor,
                        backgroundImage:
                            quote.backgroundType === "gradient"
                                ? `linear-gradient(to bottom, ${quote.backgroundGradient?.[0]}, ${quote.backgroundGradient?.[1]})`
                                : undefined,
                    }}
                >
                    <div
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center"
                        style={{ fontSize: `${quote.fontSize}px`, fontStyle: quote.fontStyle, opacity: quote.opacity }}
                    >
                        <div className="text-4xl font-bold">{quote.text}</div>
                        <div className="text-2xl italic">- {quote.author}</div>
                    </div>
                </div>
            </div>
            <div className="flex justify-center gap-4 p-4 bg-background">
                <Button variant="outline" onClick={fetchRandomQuote}>
                    <RefreshCwIcon className="h-5 w-5 mr-2" />
                    Get Random Quote
                </Button>
                <Button variant="outline" onClick={downloadQuote}>
                    <DownloadIcon className="h-5 w-5 mr-2" />
                    Download
                </Button>
                <Button variant="outline" onClick={copyToClipboard}>
                    <CopyIcon className="h-5 w-5 mr-2" />
                    Copy to Clipboard
                </Button>
                <Button variant="ghost" size="icon" onClick={() => setIsToolbarOpen(!isToolbarOpen)}>
                    <SettingsIcon className="h-6 w-6" />
                </Button>
            </div>
        </div>
    )
}

// ICONS:
function CopyIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
            <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
        </svg>
    )
}


function DownloadIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" x2="12" y1="15" y2="3" />
        </svg>
    )
}


function RefreshCwIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
            <path d="M21 3v5h-5" />
            <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
            <path d="M8 16H3v5" />
        </svg>
    )
}


function SettingsIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
            <circle cx="12" cy="12" r="3" />
        </svg>
    )
}


function VolumeXIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <line x1="22" x2="16" y1="9" y2="15" />
            <line x1="16" x2="22" y1="9" y2="15" />
        </svg>
    )
}