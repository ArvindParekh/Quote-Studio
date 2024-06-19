import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    ToggleGroup,
    ToggleGroupItem,
} from "@/components/ui/toggle-group"
import domtoimage from "dom-to-image"
import fontsData from "@/data/fontStylesData"
import "../fonts.css"
import templatesData from "@/data/templateData"
import GradientPicker from "@/components/colorPicker"

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
    const [tabNumber, setTabNumber] = useState("1");

    useEffect(() => {
        console.log(quoteConfig.background)
    }, [quote])

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

    function handleTemplateClick(template: {author: string, input: string, background: string, textColor: string, font: string, size: string, opacity: number, genre: string}) {
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

    const handleQuoteChange = (field: string, value: string | number | number[]) => {
        setQuote({
            ...quote,
            [field]: value,
        })
    }

    const handleQuoteConfigChange = (field: string, value: string | number) => {
        setQuoteConfig({
            ...quoteConfig,
            [field]: value,
        })
    }
    function downloadQuote() {
        try {
            domtoimage
                .toJpeg(document.getElementById("canvas")!, { quality: 0.95 })
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
                .toBlob(document.getElementById("canvas")!, { quality: 0.95 })
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
            {/* Quote Customizer Card */}
            <div
                className={`fixed bottom-4 right-4 z-20 transition-all duration-300 ${isToolbarOpen ? "scale-100 opacity-100" : "scale-0 opacity-0"
                    }`}
            >
                <Card className="w-[400px] p-4 space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold">Quote Customizer</h2>
                        <Button variant="ghost" size="icon" onClick={() => setIsToolbarOpen(!isToolbarOpen)}>
                            <CloseIcon className="h-6 w-6" />
                        </Button>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="quote-text">Quote</Label>
                            <Input id="quote-text" value={quote.input} onChange={(e) => handleQuoteChange("input", e.target.value)} />
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
                                value={quoteConfig.size}
                                onChange={(e) => handleQuoteConfigChange("size", parseInt(e.target.value))}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="opacity">Opacity</Label>
                            <Slider
                                id="opacity"
                                min={0}
                                max={1}
                                step={0.1}
                                value={[quoteConfig.opacity]}
                                onValueChange={(value) => handleQuoteConfigChange("opacity", value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="font-style">Font Style</Label>
                            <Select
                                id="font-style"
                                value={quoteConfig.font}
                                onValueChange={(value) => handleQuoteConfigChange("font", value)}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select font style" />
                                </SelectTrigger>
                                <SelectContent>
                                    {/* <SelectItem value="normal">Normal</SelectItem>
                                    <SelectItem value="italic">Italic</SelectItem>
                                    <SelectItem value="bold">Bold</SelectItem>
                                    <SelectItem value="bold italic">Bold Italic</SelectItem> */}
                                    {fontsData.map((fonts, index) => {
                                        return (
                                            <SelectItem
                                                style={{
                                                    fontFamily: fonts,
                                                }}
                                                key={index}
                                                value={fonts}
                                            >
                                                {fonts}
                                            </SelectItem>
                                        );
                                    })}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="background-type">Backgrounds</Label>
                            <Select
                                id="background-type"
                                // value={quoteConfig.background}
                                onValueChange={(value) => setTabNumber(value)}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select background type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="1">Canvas</SelectItem>
                                    <SelectItem value="2">Text</SelectItem>
                                    <SelectItem value="3">Templates</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        {tabNumber === "1" && (
                            <div className="space-y-2 col-span-2">
                                <Label htmlFor="background-color">Canvas Background</Label>
                                <div>
                                    <GradientPicker type="background" background={quoteConfig.background} setBackground={handleQuoteConfigChange} />
                                </div>
                            </div>
                        )}
                        {tabNumber === "2" && (
                            <div className="space-y-2 col-span-2">
                                <Label htmlFor="background-image">Text Color</Label>
                                <div>
                                    <GradientPicker type="textColor" background={quoteConfig.textColor} setBackground={handleQuoteConfigChange} />
                                </div>
                            </div>
                        )}
                        {tabNumber === "3" && (
                            <div className="space-y-2 col-span-2">
                                <Label htmlFor="templates">Pre-Defined Templates</Label>
                                <div className="flex gap-4 flex-wrap">
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
                            </div>
                        )}
                    </div>
                </Card>
            </div>

            {/* Canvas */}
            <div className="flex-1 flex items-center justify-center bg-muted">
                <div
                    className="relative w-[800px] h-[600px] rounded-lg bg-cover bg-center"
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
                                    background: `${quoteConfig.background} no-repeat center center/cover`,
                                    color: quoteConfig.textColor,
                                }
                    }
                >
                    <div
                        className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-[80%] ${quoteConfig.textColor[0] === 'l' ? "!bg-clip-text text-transparent !bg-cover !bg-center transition-all" : ""}`}
                        style={{ fontSize: `${quoteConfig.size}px`, opacity: quoteConfig.opacity, color: quoteConfig.textColor[0] === '#' ? quoteConfig.textColor : "", background: quoteConfig.textColor[0] === 'l' ? quoteConfig.textColor : "" }}
                    >
                        <h1
                            className={quoteConfig.textColor[0] === 'l' ? "!bg-clip-text text-transparent !bg-cover !bg-center transition-all" : ""}
                            style={{
                                fontFamily: quoteConfig.font,
                                fontSize: `${quoteConfig.size}px`,
                                opacity: quoteConfig.opacity,
                                color: quoteConfig.textColor[0] === '#' ? quoteConfig.textColor : "",
                                background: quoteConfig.textColor[0] === 'l' ? quoteConfig.textColor : ""
                            }}
                        >
                            {quote.input}
                        </h1>

                        {quote.author !== "" && (
                            <span
                                className={`mt-5 text-2xl font-semibold ${quoteConfig.textColor[0] === 'l' ? "!bg-clip-text text-transparent !bg-cover !bg-center transition-all" : ""}`}
                                style={{
                                    background: quoteConfig.textColor[0] === 'l' ? quoteConfig.textColor : "",
                                    backgroundClip: quoteConfig.textColor[0] === 'l' ? 'text' : "",
                                    color: quoteConfig.textColor[0] === '#' ? quoteConfig.textColor : "",
                                }}
                            >
                                -{quote.author}
                            </span>
                        )}
                    </div>

                </div>
            </div>

            {/* Footer Buttons */}
            <div className="flex justify-center gap-4 p-4 bg-background">

                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant="outline"
                        // onClick={fetchRandomQuoste}
                        >
                            <RefreshCwIcon className="h-5 w-5 mr-2" />
                            Get Random Quote
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                        <div className="grid gap-4">
                            <div className="space-y-2">
                                <h4 className="font-medium leading-none">Categories</h4>
                                <p className="text-sm text-muted-foreground">
                                    Select a category for the quote.
                                </p>
                            </div>
                            <div>
                                <ToggleGroup type="single" onClick={(e) => handleQuoteConfigChange("genre", e.target.ariaLabel)} className="grid grid-cols-2 gap-2">
                                    <ToggleGroupItem value="motivational" aria-label="motivational">
                                        Motivational
                                    </ToggleGroupItem>
                                    <ToggleGroupItem value="inspirational" aria-label="inspirational">
                                        Inspirational
                                    </ToggleGroupItem>
                                    <ToggleGroupItem value="humorous" aria-label="humorous">
                                        Funny
                                    </ToggleGroupItem>
                                    <ToggleGroupItem value="famous-quotes" aria-label="famous-quotes">
                                        Famous Quotes
                                    </ToggleGroupItem>
                                </ToggleGroup>
                                <Select onValueChange={(e) => handleQuoteConfigChange("genre", e)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Others" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="friendship">Friendship</SelectItem>
                                        <SelectItem value="life">Life</SelectItem>
                                        <SelectItem value="spirituality">Spirituality</SelectItem>
                                        <SelectItem value="technology">Technology</SelectItem>
                                        <SelectItem value="truth">Truth</SelectItem>
                                        <SelectItem value="future">Future</SelectItem>
                                        <SelectItem value="philosophy">Philosophy</SelectItem>
                                        <SelectItem value="sports">Sports</SelectItem>
                                        <SelectItem value="history">History</SelectItem>
                                        <SelectItem value="business">Business</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Button onClick={fetchRandomQuote} className="w-full mt-4 bg-black text-white">Get Random Quote</Button>
                            </div>
                        </div>
                    </PopoverContent>
                </Popover>
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
function CopyIcon(props: object) {
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


function DownloadIcon(props: object) {
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


function RefreshCwIcon(props: object) {
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


function SettingsIcon(props: object) {
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


function VolumeXIcon(props: object) {
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

function CloseIcon(props) {
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
            <path d="M18 6L6 18" />
            <path d="M6 6L18 18" />
        </svg>
    );
}