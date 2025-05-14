import './Hero.css';

function Hero() {
    return (
        <div className="relative h-[80vh] overflow-hidden">
            <img
                src="/diverselearners.png"  // replace with your correct path or import
                alt="Hero"
                className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/20 text-center text-white px-4">
                <div className="melting-text-container">
                    <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold mb-4 melting-text">
                        WHAT DID I JUST READ?
                    </h1>
                </div>
                <p className="max-w-2xl text-lg sm:text-xl">
                    YOUR NEW READING BUDDY
                </p>
            </div>
        </div>
    );
}

export default Hero;