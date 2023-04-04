import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader
import { Carousel } from 'react-responsive-carousel'

const Banner = () => {
    const images = [
        '/Carousel1.jpg',
        '/Carousel2.jpg',
        '/Carousel3.jpg',
        '/Carousel4.jpg',
    ]
    return (
        <div
            className="relative"
            style={{ maxHeight: '300px', minHeight: '300px' }}
        >
            {/* <div className="absolute h-36 w-full bg-gradient-to-t from-gray-100 bottom-0 to-transparent z-10"></div> */}
            <Carousel
                autoPlay
                infiniteLoop
                showStatus={false}
                showIndicators={false}
                showThumbs={false}
                interval={5000}
            >
                {images.map(image => (
                    <div
                        className=""
                        style={{ maxHeight: '550px', minHeight: '550px' }}
                    >
                        <img loading="lazy" src={image} />
                    </div>
                ))}
            </Carousel>
        </div>
    )
}

export default Banner
