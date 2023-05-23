import { FC } from 'react';
import { Fade, Slide } from 'react-slideshow-image';

import 'react-slideshow-image/dist/styles.css';
import styles from './Slideshow.module.css';

interface Props {
    images: any[]
}

export const ImageSlideshow: FC<Props> = ({ images }) => {
    return (
        <Fade
            easing="ease"
            duration={5000}
            arrows={false}
        >
            {
                images.map(image => {
                    return (
                        <div className={styles['each-slide']} key={image}>
                            <div style={{
                                backgroundImage: `url(${image.url})`,
                                backgroundSize: 'contain',
                                backgroundRepeat: 'no-repeat'
                            }}>
                            </div>

                        </div>
                    )

                })
            }

        </Fade>
    )
}
