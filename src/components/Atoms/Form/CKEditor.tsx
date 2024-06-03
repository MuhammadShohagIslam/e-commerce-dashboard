import { useEffect, useRef } from "react";
import {
    Controller,
    FieldValues,
    Control,
    Path,
    FieldError,
} from "react-hook-form";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import { Editor } from "@ckeditor/ckeditor5-core";

import cn from "../../../utils/cn";

interface CKEditorAtomProps<T extends FieldValues> {
    control: Control<T>;
    name: Path<T>;
    errors?: FieldError | undefined;
    placeholder: string | undefined;
    errorMessage: string | undefined;
    className: string | undefined;
}

const CKEditorAtom = <T extends FieldValues>({
    control,
    name,
    placeholder,
    errorMessage,
    className,
    errors,
}: CKEditorAtomProps<T>) => {
    const editorRef: React.MutableRefObject<Editor | null> = useRef(null);

    useEffect(() => {
        let styleElement: HTMLStyleElement | null = null;
        if (errors?.message) {
            // create a style element
            styleElement = document.createElement("style");

            // set the CSS rules inside the style element
            styleElement.innerHTML = `
            .ck-content {
               color: #b91c1c;
               background: #fef2f2 !important;
            }
            .ck-content:focus-visible{
                border-color: #ef4444 !important;
            }
            .ck-placeholder:before, .ck.ck-placeholder:before {
                color: #dc2626 !important;
                font-size: 13px !important;
            }
        `;
            // append the style element to the document's head
            document.head.appendChild(styleElement);
        }

        // cleanup function to remove the style element when component unmounts
        return () => {
            if (styleElement) {
                document.head.removeChild(styleElement);
            }
        };
    }, [errors?.message]);

    return (
        <Controller
            name={name}
            control={control}
            rules={{
                required: errorMessage || false,
            }}
            render={({ field: { onChange, onBlur, value, ref } }) => (
                <div
                    className={cn(
                        "border rounded-[2px] drop-shadow-md  ",
                        className ? className : ""
                    )}
                >
                    <CKEditor
                        editor={ClassicEditor}
                        data={value}
                        config={{
                            placeholder: placeholder || "",
                        }}
                        onReady={(editor) => {
                            editorRef.current = editor;
                        }}
                        onChange={(_event, editor) => {
                            const data = editor.getData();
                            onChange(data);
                        }}
                        onBlur={() => {
                            onBlur();
                        }}
                        ref={ref}
                    />
                </div>
            )}
        />
    );
};

export default CKEditorAtom;
