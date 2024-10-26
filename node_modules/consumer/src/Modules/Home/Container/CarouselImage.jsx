import React from 'react';
import { Carousel } from 'antd';
import './CarouselImage.css';

const CarouselImage = () => {
  return (
    <div className="carousel-container">
      <Carousel autoplay>
        {/* Ảnh 1 */}
        <div>
          <img
            src="https://pos.nvncdn.com/b153ea-53436/bn/20240629_kBiC1dXU.gif"  // Thay bằng link ảnh của bạn
            alt="Image 1"
            className="carousel-image"
          />
        </div>
        {/* Ảnh 2 */}
        <div>
          <img
            src="https://pos.nvncdn.com/b153ea-53436/bn/20241003_dCXmzV5W.gif"  // Thay bằng link ảnh của bạn
            alt="Image 2"
            className="carousel-image"
          />
        </div>
        {/* Ảnh 3 (nếu có) */}
        <div>
          <img
            src="https://pos.nvncdn.com/b153ea-53436/bn/20241017_MJzNNwVX.gif"  // Thay bằng link ảnh của bạn
            alt="Image 3"
            className="carousel-image"
          />
        </div>
      </Carousel>
    </div>
  );
};

export default CarouselImage;
