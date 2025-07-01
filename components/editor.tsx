"use client";

import React, { useCallback, useMemo, useState } from "react";
import "../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {
  FieldValues,
  UseControllerProps,
  useController,
} from "react-hook-form";

// Import the Slate editor factory.
import { BaseEditor, Descendant, createEditor } from "slate";

// Import the Slate components and React plugin.
import { Slate, Editable, withReact, ReactEditor } from "slate-react";
import { withHistory } from "slate-history";
import { htmlToSlate, slateToHtml } from "@slate-serializers/html";

type CustomElement = { type: "paragraph"; children: CustomText[] };
type CustomText = { text: string };

declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

const Leaf = ({ attributes, children, leaf }: any) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.code) {
    children = <code>{children}</code>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  return <span {...attributes}>{children}</span>;
};

const Element = ({ attributes, children, element }: any) => {
  const style = { textAlign: element.align };
  switch (element.type) {
    case "block-quote":
      return (
        <blockquote style={style} {...attributes}>
          {children}
        </blockquote>
      );
    case "bulleted-list":
      return (
        <ul style={style} {...attributes}>
          {children}
        </ul>
      );
    case "heading-one":
      return (
        <h1 style={style} {...attributes}>
          {children}
        </h1>
      );
    case "heading-two":
      return (
        <h2 style={style} {...attributes}>
          {children}
        </h2>
      );
    case "list-item":
      return (
        <li style={style} {...attributes}>
          {children}
        </li>
      );
    case "numbered-list":
      return (
        <ol style={style} {...attributes}>
          {children}
        </ol>
      );
    default:
      return (
        <p style={style} {...attributes}>
          {children}
        </p>
      );
  }
};

const HOTKEYS = {
  "mod+b": "bold",
  "mod+i": "italic",
  "mod+u": "underline",
  "mod+`": "code",
};

export const TextEditor = <T extends FieldValues>(
  props: UseControllerProps<T>
) => {
  const { field } = useController(props);
  const renderElement = useCallback((props: any) => <Element {...props} />, []);
  const renderLeaf = useCallback((props: any) => <Leaf {...props} />, []);
  const [editor] = useState(() => withReact(withHistory(createEditor())));
  const initialValue: Descendant[] = field.value
    ? (htmlToSlate(field.value) as Descendant[])
    : [
        {
          type: "paragraph",
          children: [
            {
              text: "",
            },
          ],
        },
      ];
  return (
    <Slate
      editor={editor}
      initialValue={initialValue}
      onChange={(e) => {
        field.onChange(slateToHtml(e));
        field.onBlur();
      }}
    >
      <Editable
        className="!h-96"
        renderLeaf={renderLeaf}
        renderElement={renderElement}
        placeholder=""
        spellCheck
        autoFocus
      />
    </Slate>
  );
};
