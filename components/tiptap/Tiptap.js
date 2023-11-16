"use client";

import { EditorContent, useEditor } from "@tiptap/react";

import Text from "@tiptap/extension-text";
import TextAlign from "@tiptap/extension-text-align";
import Heading from "@tiptap/extension-heading";
import Paragraph from "@tiptap/extension-paragraph";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Underline from "@tiptap/extension-underline";

import Document from "@tiptap/extension-document";
// import ListItem from "@tiptap/extension-list-item";
// import BulletList from "@tiptap/extension-bullet-list";
import {
  Bold as BoldLogo,
  Italic as ItalicLogo,
  Underline as UnderlineLogo,
  Eraser,
  List,
  ListOrdered,
  AlignJustify,
  AlignCenter,
  AlignLeft,
  AlignRight,
} from "lucide-react";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const Tiptap = ({ name, value, setValue }) => {
  const editor = useEditor({
    extensions: [
      Bold,
      Italic,
      Underline,
      Document,
      Paragraph,
      Text,
      Heading,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      //   BulletList,
      //   ListItem,
    ],
    content: `
        <p>${value?.content}</p>
      `,
    onUpdate({ editor }) {
      setValue((prev) => ({ ...prev, [`${name}`]: editor.getHTML() }));
    },
  });

  if (!editor) {
    return null;
  }
  console.log("editor", editor);

  return (
    <>
      <div className="flex justify-between">
        <ToggleGroup type="multiple">
          <ToggleGroupItem value="bold" aria-label="Toggle bold">
            <button
              onClick={() => editor.chain().focus().toggleBold().run()}
              disabled={!editor?.can().chain().focus().toggleBold().run()}
            >
              <BoldLogo
                className={
                  editor?.isActive("bold") ? "is-active h-4 w-4" : "h-4 w-4"
                }
              />
            </button>
          </ToggleGroupItem>
          <ToggleGroupItem value="italic" aria-label="Toggle italic">
            <button
              onClick={() => editor.chain().focus().toggleItalic().run()}
              disabled={!editor?.can().chain().focus().toggleItalic().run()}
              className={editor?.isActive("italic") ? "is-active " : ""}
            >
              <ItalicLogo className="h-4 w-4" />
            </button>
          </ToggleGroupItem>
          <ToggleGroupItem value="underline" aria-label="Toggle underline">
            <button
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              disabled={!editor?.can().chain().focus().toggleUnderline().run()}
              className={editor?.isActive("italic") ? "is-active " : ""}
            >
              <UnderlineLogo className="h-4 w-4" />
            </button>
          </ToggleGroupItem>

          {/* <ToggleGroupItem value="bulletList" aria-label="Toggle list">
            <button
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className={editor.isActive("bulletList") ? "is-active" : ""}
            >
              <List className="h-4 w-4" />
            </button>
          </ToggleGroupItem>
          <ToggleGroupItem value="orderedList" aria-label="Toggle list-order">
            <button
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              className={editor.isActive("orderedList") ? "is-active" : ""}
            >
              <ListOrdered className="h-4 w-4" />
            </button>
          </ToggleGroupItem> */}

          <ToggleGroupItem aria-label="Toggle eraser">
            <button
              onClick={() => editor.chain().focus().unsetAllMarks().run()}
            >
              <Eraser className="h-4 w-4" />
            </button>
          </ToggleGroupItem>
        </ToggleGroup>

        <div div className="space-x-6 mt-2.5">
          <button
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
            className={
              editor.isActive({ textAlign: "left" }) ? "is-active" : ""
            }
          >
            <AlignLeft className="h-4 w-4" />
          </button>

          <button
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
            className={
              editor.isActive({ textAlign: "center" }) ? "is-active" : ""
            }
          >
            <AlignCenter className="h-4 w-4" />
          </button>

          <button
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
            className={
              editor.isActive({ textAlign: "right" }) ? "is-active" : ""
            }
          >
            <AlignRight className="h-4 w-4" />
          </button>

          <button
            onClick={() => editor.chain().focus().setTextAlign("justify").run()}
            className={
              editor.isActive({ textAlign: "justify" }) ? "is-active" : ""
            }
          >
            <AlignJustify className="h-4 w-4" />
          </button>
        </div>
      </div>
      <EditorContent editor={editor} />
    </>
  );
};

export default Tiptap;
// export default () => {
//   return <EditorContent editor={editor} />;
// };
