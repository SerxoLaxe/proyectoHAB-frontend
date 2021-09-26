import React from 'react'
 // import './style.css';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';


const Slider = ({ images }) => {
	return (
		<section className=''>
			
			<h1 style={{ 
			 margin: '20px', fontSize: '2rem', textAlign: 'center'
			}} className=''>Disfruta Estas Experiencias Ahora</h1>
			<Carousel infiniteLoop={true} showThumbs={false} showIndicators={false } autoPlay={true} intervalo={5000} showArrows={false} showStatus={false} 

			className=''>
				{images.map((image) => (
					<div key={image.id} className=''>
						<img width={650} height={650}  src={image.image} alt={image.title} />
						<p style={{ fontSize: '2rem' }}className=''>{image.title}</p>
					</div>
				))}
			</Carousel>
		</section>
	)
}

export default Slider;
