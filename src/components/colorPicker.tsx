// https://gradient.page/picker

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
// import { cn } from '@/utils'
import { Paintbrush } from 'lucide-react'
import { useMemo, useRef } from 'react'

// function PickerExample() {
//     const [background, setBackground] = useState('#B4D455')

//     return (
//         <div
//             className="w-full h-full preview flex min-h-[350px] justify-center p-10 items-center rounded !bg-cover !bg-center transition-all"
//             style={{ background }}
//         >
//             <GradientPicker background={background} setBackground={setBackground} />
//         </div>
//     )
// }



function GradientPicker({
    background,
    setBackground,
    className,
    type
}: {
    background: string
    setBackground: (field: string, value: string) => void
    className?: string
    type: string
}) {
    const solids = [
        '#E2E2E2',
        '#ff75c3',
        '#ffa647',
        '#ffe83f',
        '#9fff5b',
        '#70e2ff',
        '#cd93ff',
        '#09203f',
    ]

    const gradients = [
        'linear-gradient(to top left,#accbee,#e7f0fd)',
        'linear-gradient(to top left,#d5d4d0,#d5d4d0,#eeeeec)',
        'linear-gradient(to top left,#000000,#434343)',
        'linear-gradient(to top left,#09203f,#537895)',
        'linear-gradient(to top left,#AC32E4,#7918F2,#4801FF)',
        'linear-gradient(to top left,#f953c6,#b91d73)',
        'linear-gradient(to top left,#ee0979,#ff6a00)',
        'linear-gradient(to top left,#F00000,#DC281E)',
        'linear-gradient(to top left,#00c6ff,#0072ff)',
        'linear-gradient(to top left,#4facfe,#00f2fe)',
        'linear-gradient(to top left,#0ba360,#3cba92)',
        'linear-gradient(to top left,#FDFC47,#24FE41)',
        'linear-gradient(to top left,#8a2be2,#0000cd,#228b22,#ccff00)',
        'linear-gradient(to top left,#40E0D0,#FF8C00,#FF0080)',
        'linear-gradient(to top left,#fcc5e4,#fda34b,#ff7882,#c8699e,#7046aa,#0c1db8,#020f75)',
        'linear-gradient(to top left,#ff75c3,#ffa647,#ffe83f,#9fff5b,#70e2ff,#cd93ff)',
        'linear-gradient(to right, pink, purple)',
        'linear-gradient(to right, cyan, blue)',
        'linear-gradient(to right, orange, cyan)',
        'linear-gradient(to right,#ff6b81, #c0cbe8)',
        'linear-gradient(to right, #fff9b0, #b6d7a8)',
        'linear-gradient(to right, #87bdd8, #d6bdd8)',
        'linear-gradient(to right, #ff7979, #b3ffb3)',
        'linear-gradient(to right, #61a3ff, #d0d0d0)',
        'linear-gradient(to right, #b5ffb5, #61d1ff)',
        'linear-gradient(to right, #c3e8ff, #ffcccc)',
        'linear-gradient(to right, #ffb6c1, #ffee99)',
    ]

    const images = [
        "url('https://images.unsplash.com/photo-1691200099282-16fd34790ade?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2532&q=90')",
        "url('/src/assets/bg-1.avif')",
        "url('https://images.unsplash.com/photo-1688822863426-8c5f9b257090?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2532&q=90')",
        "url('https://images.unsplash.com/photo-1691225850735-6e4e51834cad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2532&q=90')",
    ]

    const uploadImageRef = useRef(null);

    function getFileFromDevice() {
        uploadImageRef.current.click();
    }

    function handleFileUpload(e: { target: { files: Array } }) {
        const files = e.target.files[0];
        const objecturl = URL.createObjectURL(files);
        setBackground(type, objecturl);
    }

    const defaultTab = useMemo(() => {
        if (background.includes('url')) return 'image'
        if (background.includes('gradient')) return 'gradient'
        return 'solid'
    }, [background])

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={'outline'}
                    className={`w-[220px] justify-start text-left font-normal 
            ${!background ? 'text-muted-foreground' : ''} 
            ${className}`}
                >
                    <div className="w-full flex items-center gap-2">
                        {background ? (
                            <div
                                className="h-4 w-4 rounded !bg-center !bg-cover transition-all"
                                style={{ background }}
                            ></div>
                        ) : (
                            <Paintbrush className="h-4 w-4" />
                        )}
                        <div className="truncate flex-1">
                            {background ? background : 'Pick a color'}
                        </div>
                    </div>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64">
                <Tabs defaultValue={defaultTab} className="w-full">
                    <TabsList className="w-full mb-4">
                        <TabsTrigger className="flex-1" value="solid">
                            Solid
                        </TabsTrigger>
                        <TabsTrigger className="flex-1" value="gradient">
                            Gradient
                        </TabsTrigger>
                        <TabsTrigger className="flex-1" value="image">
                            Image
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="solid" className="flex flex-wrap gap-1 mt-0">
                        {solids.map((s) => (
                            <div
                                key={s}
                                style={{ background: s }}
                                className="rounded-md h-6 w-6 cursor-pointer active:scale-105"
                                onClick={() => setBackground(type, s)}
                            />
                        ))}
                    </TabsContent>

                    <TabsContent value="gradient" className="mt-0">
                        <div className="flex flex-wrap gap-1 mb-2">
                            {gradients.map((s) => (
                                <div
                                    key={s}
                                    style={{ background: s }}
                                    className="rounded-md h-6 w-6 cursor-pointer active:scale-105"
                                    onClick={() => setBackground(type, s)}
                                />
                            ))}
                        </div>

                        {/* <GradientButton background={background}>
                            💡 Get more at{' '}
                            <Link
                                href="https://gradient.page/css/ui-gradients"
                                className="hover:underline font-bold"
                                target="_blank"
                            >
                                Gradient Page
                            </Link>
                        </GradientButton> */}
                    </TabsContent>

                    <TabsContent value="image" className="mt-0">
                        <div className="grid grid-cols-2 gap-1 mb-2">
                            {images.map((s) => (
                                <div
                                    key={s}
                                    style={{ backgroundImage: s }}
                                    className="rounded-md bg-cover bg-center h-12 w-full cursor-pointer active:scale-105"
                                    onClick={() => {
                                        console.log(s);
                                        setBackground(type, s)
                                    }}
                                />
                            ))}
                        </div>

                        <input
                            type="file"
                            accept="image/*"
                            style={{ display: "none" }}
                            ref={uploadImageRef}
                            onChange={handleFileUpload}
                        />
                        <button
                            className="rounded-md border-none bg-black p-2 text-base font-medium text-white"
                            onClick={getFileFromDevice}
                        >
                            Select File
                        </button>
                        {/* <GradientButton background={background}>
                            🎁 Get abstract{' '}
                            <Link
                                href="https://gradient.page/wallpapers"
                                className="hover:underline font-bold"
                                target="_blank"
                            >
                                wallpapers
                            </Link>
                        </GradientButton> */}
                    </TabsContent>

                    <TabsContent value="password">Change your password here.</TabsContent>
                </Tabs>

                <Input
                    id="custom"
                    value={background}
                    className="col-span-2 h-8 mt-4"
                    onChange={(e) => setBackground(type, e.currentTarget.value)}
                />
            </PopoverContent>
        </Popover>
    )
}

// const GradientButton = ({
//     background,
//     children,
// }: {
//     background: string
//     children: React.ReactNode
// }) => {
//     return (
//         <div
//             className="p-0.5 rounded-md relative !bg-cover !bg-center transition-all"
//             style={{ background }}
//         >
//             <div className="bg-popover/80 rounded-md p-1 text-xs text-center">
//                 {children}
//             </div>
//         </div>
//     )
// }

export default GradientPicker;