import { FC } from 'react';
import { Slide } from 'react-slideshow-image';

import 'react-slideshow-image/dist/styles.css';
import styles from './Slideshow.module.css';

interface Props {
    images: any[]
}

export const ImageSlideshow: FC<Props> = ({ images }) => {
    return (
        <Slide
            easing="ease"
            duration={7000}

        >
            {
                images.map(image => {
                    return (
                        <div className={styles['each-slide']} key={image}>
                            <div style={{
                                backgroundImage: `url(${image.url})`,
                                backgroundSize: 'contain',
                                backgroundRepeat: 'no-repeat;'
                            }}>
                            </div>
                        </div>
                    )

                })
            }

        </Slide>
    )
}
