import React, { useEffect, useState } from 'react';
import { CloudinaryContext, Image, Transformation } from 'cloudinary-react';


const PdfViewer: React.FC = () => {
    const [pdfPublicId, setPdfPublicId] = useState('');

    useEffect(() => {
        const fetchPdf = async () => {
            // Configura el public_id del archivo PDF en Cloudinary
            const pdfPublicId = 'https://res.cloudinary.com/test-ae/image/upload/v1685404596/is2ijvh21uwtehuupadz.pdf';

            setPdfPublicId(pdfPublicId);
        };

        fetchPdf();
    }, []);

    return (
        <div>
            <h1>Visor de PDF</h1>
            {pdfPublicId && (
                <CloudinaryContext cloudName="test-ae">
                    <a href={pdfPublicId} download>
                        <Image publicId={pdfPublicId} secure="true" width="600" height="800" alt='pfd' >
                            <Transformation fetchFormat="auto" />
                        </Image>

                    </a>

                </CloudinaryContext>
            )}
        </div>
    );
};

export default PdfViewer;
