// components/RichTextEditor.tsx
import dynamic from 'next/dynamic';
import { Quill } from 'react-quill';

import 'react-quill/dist/quill.snow.css';






interface RichTextEditorProps {
    value: string;
    onChange: (content: string) => void;
}

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const RichTextEditor: React.FC<RichTextEditorProps> = ({ value, onChange }) => {
    const handleChange = (content: string) => {
        onChange(content);
    };

    var toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        // ['blockquote', 'code-block'],

        // [{ 'header': 1 }, { 'header': 2 }],               // custom button values
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        // [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
        // [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
        // [{ 'direction': 'rtl' }],                         // text direction

        // [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        [{ 'font': [] }],
        [{ 'align': [] }],

        // ['clean']                                         // remove formatting button
    ];

    const moduleq = {
        toolbar: toolbarOptions
    }

    return <ReactQuill modules={moduleq} value={value} onChange={handleChange} />;
};

export default RichTextEditor;
