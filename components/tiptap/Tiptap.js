"use client";
import "./styles.scss";
import React, { useCallback } from "react";
import { EditorContent, useEditor } from "@tiptap/react";

import Text from "@tiptap/extension-text";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import Heading from "@tiptap/extension-heading";
import Paragraph from "@tiptap/extension-paragraph";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Document from "@tiptap/extension-document";
import { Color } from "@tiptap/extension-color";
// import ListItem from "@tiptap/extension-list-item";
// import BulletList from "@tiptap/extension-bullet-list";
// import OrderedList from "@tiptap/extension-ordered-list";
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
  Link as LinkLogo,
} from "lucide-react";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";

const Tiptap = ({ name, value, setValue }) => {
  const editor = useEditor({
    extensions: [
      Bold,
      Color,
      Italic,
      Underline,
      Document,
      Paragraph,
      Text,
      TextStyle,
      Heading,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Link.configure({
        openOnClick: false,
      }),
      //   BulletList,
      //   OrderedList,
      //   ListItem,
    ],
    content: `
        <p >${value[`${name}`]}</p>
      `,
    onUpdate({ editor }) {
      setValue((prev) => ({ ...prev, [`${name}`]: editor.getHTML() }));
    },
  });

  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();

      return;
    }

    // update link
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);

  if (!editor) {
    return null;
  }

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

          <ToggleGroupItem value="underline" aria-label="Toggle underline">
            <button
              onClick={setLink}
              className={editor.isActive("link") ? "is-active" : ""}
            >
              <LinkLogo className="h-4 w-4" />
            </button>
          </ToggleGroupItem>

          <input
            type="color"
            onInput={(event) =>
              editor.chain().focus().setColor(event.target.value).run()
            }
            value={editor.getAttributes("textStyle").color}
            className="h-8 w-8"
            data-testid="setColor"
          />

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
