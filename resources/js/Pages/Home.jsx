import Template from "./Template.jsx";
import { Carousel } from '@mantine/carousel';
import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';

export default function Home() {
    return (
        <>
            <div>
                <Template />
                <Carousel withIndicators height={200}>
                    <Carousel.Slide>1</Carousel.Slide>
                    <Carousel.Slide>2</Carousel.Slide>
                    <Carousel.Slide>3</Carousel.Slide>
                </Carousel>
            </div>
        </>
    );
}
