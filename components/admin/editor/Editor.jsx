// import {
//   IconAlignCenter,
//   IconAlignJustified,
//   IconAlignLeft,
//   IconAlignRight,
//   IconArrowBackUp,
//   IconArrowForwardUp,
//   IconBlockquote,
//   IconBold,
//   IconCode,
//   IconColumnInsertLeft,
//   IconColumnInsertRight,
//   IconColumnRemove,
//   IconH1,
//   IconH2,
//   IconH3,
//   IconHighlight,
//   IconItalic,
//   IconLayoutDistributeHorizontal,
//   IconLine,
//   IconLinkMinus,
//   IconLinkPlus,
//   IconList,
//   IconListCheck,
//   IconListNumbers,
//   IconPhoto,
//   IconPhotoPlus,
//   IconRowInsertBottom,
//   IconRowInsertTop,
//   IconRowRemove,
//   IconStrikethrough,
//   IconSubscript,
//   IconSuperscript,
//   IconTableMinus,
//   IconTablePlus,
//   IconUnderline,
// } from "@tabler/icons-react";
// import Blockquote from "@tiptap/extension-blockquote";
// import Bold from "@tiptap/extension-bold";
// import BulletList from "@tiptap/extension-bullet-list";
// import Code from "@tiptap/extension-code";
// import { Color } from "@tiptap/extension-color";
// import Document from "@tiptap/extension-document";
// import Dropcursor from "@tiptap/extension-dropcursor";
// import HardBreak from "@tiptap/extension-hard-break";
// import Heading from "@tiptap/extension-heading";
// import Highlight from "@tiptap/extension-highlight";
// import History from "@tiptap/extension-history";
// import HorizontalRule from "@tiptap/extension-horizontal-rule";
// import Italic from "@tiptap/extension-italic";
// import Link from "@tiptap/extension-link";
// import ListItem from "@tiptap/extension-list-item";
// import OrderedList from "@tiptap/extension-ordered-list";
// import Paragraph from "@tiptap/extension-paragraph";
// import Placeholder from "@tiptap/extension-placeholder";
// import Strike from "@tiptap/extension-strike";
// import Subscript from "@tiptap/extension-subscript";
// import Superscript from "@tiptap/extension-superscript";
// import { Table } from "@tiptap/extension-table";
// import TableCell from "@tiptap/extension-table-cell";
// import TableHeader from "@tiptap/extension-table-header";
// import TableRow from "@tiptap/extension-table-row";
// import TaskItem from "@tiptap/extension-task-item";
// import TaskList from "@tiptap/extension-task-list";
// import Text from "@tiptap/extension-text";
// import TextAlign from "@tiptap/extension-text-align";
// import { TextStyle } from "@tiptap/extension-text-style";
// import Underline from "@tiptap/extension-underline";
// import { EditorContent, useEditor } from "@tiptap/react";
// import { useRef } from "react";
// import ImageResize from "tiptap-extension-resize-image";
// import "./EditorStyle.css";

// import { Image } from "@tiptap/extension-image";

// /**
//  * Converts legacy JSON-array content to HTML for TipTap.
//  * New content is already an HTML string and is returned as-is.
//  */
// function normalizeContent(content) {
//   if (!content) return content;

//   let arr;
//   try {
//     arr = JSON.parse(content);
//   } catch {
//     return content; // Already an HTML string
//   }

//   if (!Array.isArray(arr)) return content;

//   const parts = [];
//   let inList = false;

//   for (const item of arr) {
//     if (typeof item !== "string") continue;

//     if (item.startsWith("- \n")) {
//       // Bullet list item
//       if (!inList) {
//         parts.push("<ul>");
//         inList = true;
//       }
//       const text = item.replace(/^-\s*\n\s*/, "").trim();
//       parts.push(`<li><p>${text}</p></li>`);
//     } else {
//       if (inList) {
//         parts.push("</ul>");
//         inList = false;
//       }

//       const trimmed = item.trim();
//       if (!trimmed) continue;

//       if (trimmed.endsWith(":")) {
//         // Lead-in sentence — keep as paragraph
//         parts.push(`<p>${trimmed}</p>`);
//       } else if (trimmed.length <= 70 && !/[.,]$/.test(trimmed)) {
//         // Short, no trailing period/comma — treat as heading
//         if (/^\d+\.\s/.test(trimmed)) {
//           parts.push(`<h3>${trimmed}</h3>`);
//         } else {
//           parts.push(`<h2>${trimmed}</h2>`);
//         }
//       } else {
//         parts.push(`<p>${trimmed}</p>`);
//       }
//     }
//   }

//   if (inList) parts.push("</ul>");

//   return parts.join("");
// }

// const LinkedImage = Image.extend({
//   addAttributes() {
//     return {
//       ...this.parent?.(),
//       href: {
//         default: null,
//       },
//       target: {
//         default: "_blank",
//       },
//     };
//   },

//   renderHTML({ HTMLAttributes }) {
//     const { href, target, ...rest } = HTMLAttributes;
//     const img = ["img", rest];
//     return href ? ["a", { href, target }, img] : img;
//   },

//   parseHTML() {
//     return [
//       {
//         tag: "a[href] > img",
//         getAttrs: (node) => {
//           const parent = node.parentNode;
//           return {
//             ...node.attributes,
//             href: parent.getAttribute("href"),
//             target: parent.getAttribute("target") || "_blank",
//           };
//         },
//       },
//       {
//         tag: "img",
//         getAttrs: (node) => ({
//           ...node.attributes,
//         }),
//       },
//     ];
//   },
// });

// function Editor({ content, onChange }) {
//   const processingDataUriImagesRef = useRef(false);

//   const dataUriToFile = (dataUri, index) => {
//     const match = dataUri.match(/^data:(image\/[\w.+-]+);base64,(.+)$/);
//     if (!match) return null;

//     const mimeType = match[1];
//     const base64Data = match[2];
//     const binary = atob(base64Data);
//     const bytes = new Uint8Array(binary.length);

//     for (let i = 0; i < binary.length; i += 1) {
//       bytes[i] = binary.charCodeAt(i);
//     }

//     const extMap = {
//       "image/jpeg": "jpg",
//       "image/png": "png",
//       "image/gif": "gif",
//       "image/webp": "webp",
//     };
//     const ext = extMap[mimeType] || "jpg";

//     return new File([bytes], `pasted-${Date.now()}-${index}.${ext}`, {
//       type: mimeType,
//     });
//   };

//   const editor = useEditor({
//     immediatelyRender: false,
//     extensions: [
//       Document,
//       Paragraph,
//       Text,
//       Image,
//       ImageResize,
//       Dropcursor,
//       BulletList,
//       ListItem,
//       Heading.configure({
//         levels: [1, 2, 3],
//       }),
//       OrderedList,
//       Bold,
//       Underline,
//       TextAlign.configure({
//         types: ["heading", "paragraph", "table"],
//       }),
//       Italic,
//       Table.configure({
//         resizable: true,
//       }),
//       TableRow,
//       TableHeader,
//       TableCell,
//       Blockquote,
//       HorizontalRule,
//       HardBreak,
//       Code,
//       Highlight.configure({ multicolor: true }),
//       Strike,
//       History,
//       TextStyle,
//       Color,
//       TaskList,
//       TaskItem.configure({
//         nested: true,
//       }),
//       LinkedImage, // instead of default Image
//       Link,
//       Subscript,
//       Superscript,
//       Placeholder.configure({
//         placeholder: "Write Content...",
//       }),
//       Link.configure({
//         openOnClick: false,
//         autolink: true,
//         defaultProtocol: "https",
//         protocols: ["http", "https"],
//         isAllowedUri: (url, ctx) => {
//           try {
//             // construct URL
//             const parsedUrl = url.includes(":")
//               ? new URL(url)
//               : new URL(`${ctx.defaultProtocol}://${url}`);

//             // use default validation
//             if (!ctx.defaultValidate(parsedUrl.href)) {
//               return false;
//             }

//             // disallowed protocols
//             const disallowedProtocols = ["ftp", "file", "mailto"];
//             const protocol = parsedUrl.protocol.replace(":", "");

//             if (disallowedProtocols.includes(protocol)) {
//               return false;
//             }

//             // only allow protocols specified in ctx.protocols
//             const allowedProtocols = ctx.protocols.map((p) =>
//               typeof p === "string" ? p : p.scheme,
//             );

//             if (!allowedProtocols.includes(protocol)) {
//               return false;
//             }

//             // disallowed domains
//             const disallowedDomains = [
//               "example-phishing.com",
//               "malicious-site.net",
//             ];
//             const domain = parsedUrl.hostname;

//             if (disallowedDomains.includes(domain)) {
//               return false;
//             }

//             // all checks have passed
//             return true;
//           } catch {
//             return false;
//           }
//         },
//         shouldAutoLink: (url) => {
//           try {
//             // construct URL
//             const parsedUrl = url.includes(":")
//               ? new URL(url)
//               : new URL(`https://${url}`);

//             // only auto-link if the domain is not in the disallowed list
//             const disallowedDomains = [
//               "example-no-autolink.com",
//               "another-no-autolink.com",
//             ];
//             const domain = parsedUrl.hostname;

//             return !disallowedDomains.includes(domain);
//           } catch {
//             return false;
//           }
//         },
//       }),
//     ],

//     content: normalizeContent(content),
//     editorProps: {
//       handlePaste(view, event) {
//         const items = event.clipboardData?.items;
//         if (!items?.length) return false;

//         const files = [];
//         for (const item of items) {
//           if (item.type.startsWith("image/")) {
//             const file = item.getAsFile();
//             if (file) files.push(file);
//           }
//         }

//         // Binary image files in clipboard: upload immediately and insert
//         if (files.length) {
//           event.preventDefault();
//           const pastePos = view.state.selection.from;
//           files.forEach(async (file, index) => {
//             try {
//               const imageUrl = await uploadImage(file);
//               const pos = pastePos + index;
//               editor
//                 .chain()
//                 .focus()
//                 .setTextSelection(pos)
//                 .setImage({ src: imageUrl })
//                 .run();
//               onChange(editor.getHTML());
//             } catch (error) {
//               console.error("Error pasting image:", error);
//             }
//           });
//           return true;
//         }

//         // Fall through to TipTap default (handles HTML / text paste).
//         // replaceAllNonLocalImages in onUpdate will catch any external URL
//         // <img> nodes that TipTap inserts from pasted HTML.
//         return false;
//       },

//       handleDrop(view, event) {
//         const files = [];
//         if (event.dataTransfer?.files?.length) {
//           for (const file of event.dataTransfer.files) {
//             if (file.type.startsWith("image/")) files.push(file);
//           }
//         }
//         if (!files.length) return false;

//         event.preventDefault();
//         const coords = { left: event.clientX, top: event.clientY };
//         const dropPos =
//           view.posAtCoords(coords)?.pos ?? view.state.selection.from;

//         files.forEach(async (file, index) => {
//           try {
//             const imageUrl = await uploadImage(file);
//             editor
//               .chain()
//               .focus()
//               .setTextSelection(dropPos + index)
//               .setImage({ src: imageUrl })
//               .run();
//             onChange(editor.getHTML());
//           } catch (error) {
//             console.error("Error dropping image:", error);
//           }
//         });
//         return true;
//       },
//     },
//     onUpdate: ({ editor }) => {
//       onChange(editor.getHTML());
//       void replaceAllNonLocalImages(editor);
//     },
//   });

//   const setLink = () => {
//     const previousUrl = editor.getAttributes("link").href;
//     const url = window.prompt("URL", previousUrl);

//     // cancelled
//     if (url === null) {
//       return;
//     }

//     // empty
//     if (url === "") {
//       editor.chain().focus().extendMarkRange("link").unsetLink().run();

//       return;
//     }

//     // update link
//     try {
//       editor
//         .chain()
//         .focus()
//         .extendMarkRange("link")
//         .setLink({ href: url })
//         .run();
//     } catch (e) {
//       alert(e.message);
//     }
//   };

//   const uploadImage = async (file) => {
//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("target", "content");

//     const res = await fetch("/api/admin/upload", {
//       method: "POST",
//       body: formData,
//     });
//     const json = await res.json();
//     if (!res.ok) throw new Error(json.error || "Image upload failed");
//     return json.path;
//   };

//   /** Upload an external image URL by having the server fetch it (avoids CORS). */
//   const uploadImageFromUrl = async (externalUrl) => {
//     const res = await fetch("/api/admin/upload", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ url: externalUrl, target: "content" }),
//     });
//     const json = await res.json();
//     if (!res.ok) throw new Error(json.error || "Image upload failed");
//     return json.path;
//   };

//   /**
//    * Single pass that replaces every non-local image src with an uploaded copy.
//    * Handles:
//    *   • data:image/... (base64 from paste/drag)
//    *   • https?://...   (external URL from pasted HTML)
//    * Local paths (/uploads/..., /archive-images/..., /conent/...) are skipped.
//    */
//   const replaceAllNonLocalImages = async (editorInstance) => {
//     if (!editorInstance || processingDataUriImagesRef.current) return;

//     const imageNodes = [];
//     editorInstance.state.doc.descendants((node, pos) => {
//       if (node.type.name !== "image") return;
//       const src = node.attrs?.src;
//       if (typeof src !== "string") return;
//       const isDataUri = src.startsWith("data:image/");
//       const isExternal =
//         src.startsWith("http://") || src.startsWith("https://");
//       if (isDataUri || isExternal) imageNodes.push({ pos, src, isDataUri });
//     });

//     if (!imageNodes.length) return;

//     processingDataUriImagesRef.current = true;
//     try {
//       for (let i = 0; i < imageNodes.length; i += 1) {
//         const { pos, src, isDataUri } = imageNodes[i];
//         let imageUrl;
//         if (isDataUri) {
//           const file = dataUriToFile(src, i);
//           if (!file) continue;
//           imageUrl = await uploadImage(file);
//         } else {
//           imageUrl = await uploadImageFromUrl(src);
//         }
//         editorInstance
//           .chain()
//           .setNodeSelection(pos)
//           .updateAttributes("image", { src: imageUrl })
//           .run();
//       }
//     } catch (error) {
//       console.error("Error uploading pasted/dropped images:", error);
//     } finally {
//       processingDataUriImagesRef.current = false;
//     }
//   };

//   const addImage = () => {
//     const input = document.createElement("input");
//     input.type = "file";
//     input.accept = "image/*";

//     input.click();

//     input.onchange = async (event) => {
//       const file = event.target.files[0];

//       if (file) {
//         try {
//           const imageUrl = await uploadImage(file);
//           editor.chain().focus().setImage({ src: imageUrl }).run();
//           onChange(editor.getHTML());
//         } catch (error) {
//           console.error("Error adding image:", error);
//         }
//       }
//     };
//   };

//   const handleAddLinkToImage = () => {
//     if (!editor) return;

//     const { state } = editor;
//     const { selection } = state;
//     const pos = selection.from;

//     const node = state.doc.nodeAt(pos);
//     if (!node || node.type.name !== "image") {
//       alert("Please select an image to add a link.");
//       return;
//     }

//     const currentAttrs = node.attrs;
//     const currentHref = currentAttrs.href || "";

//     const href = prompt("Enter URL to link this image:", currentHref);

//     if (href !== null) {
//       if (currentHref !== href) {
//         editor
//           .chain()
//           .focus()
//           .setNodeSelection(pos)
//           .updateAttributes("image", {
//             ...currentAttrs,
//             href,
//             target: "_blank",
//           })
//           .run();
//       } else {
//         alert("This image already has the link.");
//       }
//     }
//   };

//   if (!editor) {
//     return null;
//   }

//   return (
//     <>
//       <div className="control-group">
//         <div>
//           {/* 1st Column */}
//           <div className="btnSection">
//             <button
//               onClick={(event) => {
//                 event.preventDefault();
//                 editor.chain().focus().undo().run();
//               }}
//               disabled={!editor.can().undo()}
//             >
//               <IconArrowBackUp stroke={2} />
//             </button>
//             <button
//               onClick={(event) => {
//                 event.preventDefault();
//                 editor.chain().focus().redo().run();
//               }}
//               disabled={!editor.can().redo()}
//             >
//               <IconArrowForwardUp stroke={2} />
//             </button>
//             <button
//               onClick={(event) => {
//                 event.preventDefault();
//                 editor.chain().focus().toggleBold().run();
//               }}
//               className={editor.isActive("bold") ? "is-active" : ""}
//             >
//               <IconBold stroke={2} />
//             </button>
//             <button
//               onClick={(event) => {
//                 event.preventDefault();
//                 editor.chain().focus().toggleUnderline().run();
//               }}
//               className={editor.isActive("underline") ? "is-active" : ""}
//             >
//               <IconUnderline stroke={2} />
//             </button>
//             <button
//               onClick={(event) => {
//                 event.preventDefault();
//                 editor.chain().focus().toggleItalic().run();
//               }}
//               className={editor.isActive("italic") ? "is-active" : ""}
//             >
//               <IconItalic stroke={2} />
//             </button>
//             <button
//               onClick={(event) => {
//                 event.preventDefault();
//                 editor.chain().focus().toggleStrike().run();
//               }}
//               className={editor.isActive("strike") ? "is-active" : ""}
//             >
//               <IconStrikethrough stroke={2} />
//             </button>
//           </div>

//           {/* 2nd Column */}
//           <div className="btnSection">
//             <button
//               onClick={(event) => {
//                 event.preventDefault();
//                 editor.chain().focus().setHardBreak().run();
//               }}
//             >
//               <IconLine stroke={2} />
//             </button>
//             <button
//               onClick={(event) => {
//                 event.preventDefault();
//                 editor.chain().focus().toggleCode().run();
//               }}
//               className={editor.isActive("code") ? "is-active" : ""}
//             >
//               <IconCode stroke={2} />
//             </button>
//             <button
//               onClick={(event) => {
//                 event.preventDefault();
//                 editor.chain().focus().toggleHighlight().run();
//               }}
//               className={editor.isActive("highlight") ? "is-active" : ""}
//             >
//               <IconHighlight stroke={2} />
//             </button>
//             <button
//               onClick={(event) => {
//                 event.preventDefault();
//                 editor.chain().focus().setHorizontalRule().run();
//               }}
//             >
//               <IconLayoutDistributeHorizontal stroke={2} />
//             </button>
//             <button
//               onClick={(event) => {
//                 event.preventDefault();
//                 editor.chain().focus().toggleSubscript().run();
//               }}
//               className={editor.isActive("subscript") ? "is-active" : ""}
//             >
//               <IconSubscript stroke={2} />
//             </button>
//             <button
//               onClick={(event) => {
//                 event.preventDefault();
//                 editor.chain().focus().toggleSuperscript().run();
//               }}
//               className={editor.isActive("superscript") ? "is-active" : ""}
//             >
//               <IconSuperscript stroke={2} />
//             </button>
//           </div>

//           {/* 3rd Column */}
//           <div className="btnSection">
//             <button
//               onClick={(event) => {
//                 event.preventDefault();
//                 editor.chain().focus().toggleBulletList().run();
//               }}
//               className={editor.isActive("bulletList") ? "is-active" : ""}
//             >
//               <IconList stroke={2} />
//             </button>
//             <button
//               onClick={(event) => {
//                 event.preventDefault();
//                 editor.chain().focus().toggleOrderedList().run();
//               }}
//               className={editor.isActive("orderedList") ? "is-active" : ""}
//             >
//               <IconListNumbers stroke={2} />
//             </button>
//             <button
//               onClick={(event) => {
//                 event.preventDefault();
//                 editor.chain().focus().toggleTaskList().run();
//               }}
//               className={editor.isActive("taskList") ? "is-active" : ""}
//             >
//               <IconListCheck stroke={2} />
//             </button>
//             <button
//               onClick={(event) => {
//                 event.preventDefault();
//                 editor.chain().focus().toggleBlockquote().run();
//               }}
//               className={editor.isActive("blockquote") ? "is-active" : ""}
//             >
//               <IconBlockquote stroke={2} />
//             </button>
//             <button
//               onClick={(event) => {
//                 event.preventDefault();
//                 addImage();
//               }}
//             >
//               <IconPhotoPlus stroke={2} />
//             </button>
//           </div>

//           {/* 4th Column */}
//           <div className="btnSection">
//             <div className="button-group">
//               <button
//                 onClick={(event) => {
//                   event.preventDefault();
//                   setLink(); // Call setLink function
//                   editor.chain().focus().addRowAfter().run();
//                 }}
//                 className={editor.isActive("link") ? "is-active" : ""}
//               >
//                 <IconLinkPlus stroke={2} />
//               </button>

//               <button
//                 onClick={(event) => {
//                   event.preventDefault();
//                   editor.chain().focus().unsetLink().run();
//                 }}
//                 disabled={!editor.isActive("link")}
//               >
//                 <IconLinkMinus stroke={2} />
//               </button>
//             </div>
//           </div>

//           {/* 5th Column */}
//           <div className="btnSection">
//             <button
//               onClick={(event) => {
//                 event.preventDefault();
//                 editor.chain().focus().setTextAlign("left").run();
//               }}
//               className={
//                 editor.isActive({ textAlign: "left" }) ? "is-active" : ""
//               }
//             >
//               <IconAlignLeft stroke={2} />
//             </button>
//             <button
//               onClick={(event) => {
//                 event.preventDefault();
//                 editor.chain().focus().setTextAlign("center").run();
//               }}
//               className={
//                 editor.isActive({ textAlign: "center" }) ? "is-active" : ""
//               }
//             >
//               <IconAlignCenter stroke={2} />
//             </button>
//             <button
//               onClick={(event) => {
//                 event.preventDefault();
//                 editor.chain().focus().setTextAlign("right").run();
//               }}
//               className={
//                 editor.isActive({ textAlign: "right" }) ? "is-active" : ""
//               }
//             >
//               <IconAlignRight stroke={2} />
//             </button>
//             <button
//               onClick={(event) => {
//                 event.preventDefault();
//                 editor.chain().focus().setTextAlign("justify").run();
//               }}
//               className={
//                 editor.isActive({ textAlign: "justify" }) ? "is-active" : ""
//               }
//             >
//               <IconAlignJustified stroke={2} />
//             </button>
//           </div>

//           {/* 6th Column */}
//           <div className="btnSection">
//             <button
//               onClick={(event) => {
//                 event.preventDefault();
//                 editor.chain().focus().toggleHeading({ level: 1 }).run();
//               }}
//               className={
//                 editor.isActive("heading", { level: 1 }) ? "is-active" : ""
//               }
//             >
//               <IconH1 stroke={2} />
//             </button>
//             <button
//               onClick={(event) => {
//                 event.preventDefault();
//                 editor.chain().focus().toggleHeading({ level: 2 }).run();
//               }}
//               className={
//                 editor.isActive("heading", { level: 2 }) ? "is-active" : ""
//               }
//             >
//               <IconH2 stroke={2} />
//             </button>
//             <button
//               onClick={(event) => {
//                 event.preventDefault();
//                 editor.chain().focus().toggleHeading({ level: 3 }).run();
//               }}
//               className={
//                 editor.isActive("heading", { level: 3 }) ? "is-active" : ""
//               }
//             >
//               <IconH3 stroke={2} />
//             </button>
//           </div>

//           {/* 7th Column */}
//           <div className="btnSection">
//             <button
//               onClick={(event) => {
//                 event.preventDefault();
//                 editor
//                   .chain()
//                   .focus()
//                   .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
//                   .run();
//               }}
//             >
//               <IconTablePlus stroke={2} />
//             </button>
//             <button
//               onClick={(event) => {
//                 event.preventDefault();
//                 editor.chain().focus().addRowBefore().run();
//               }}
//             >
//               <IconRowInsertTop stroke={2} />
//             </button>
//             <button
//               onClick={(event) => {
//                 event.preventDefault();
//                 editor.chain().focus().addRowAfter().run();
//               }}
//             >
//               <IconRowInsertBottom stroke={2} />
//             </button>
//             <button
//               onClick={(event) => {
//                 event.preventDefault();
//                 editor.chain().focus().deleteRow().run();
//               }}
//             >
//               <IconRowRemove stroke={2} />
//             </button>
//             <button
//               onClick={(event) => {
//                 event.preventDefault();
//                 editor.chain().focus().addColumnBefore().run();
//               }}
//             >
//               <IconColumnInsertLeft stroke={2} />
//             </button>
//             <button
//               onClick={(event) => {
//                 event.preventDefault();
//                 editor.chain().focus().addColumnAfter().run();
//               }}
//             >
//               <IconColumnInsertRight stroke={2} />
//             </button>
//             <button
//               onClick={(event) => {
//                 event.preventDefault();
//                 editor.chain().focus().deleteColumn().run();
//               }}
//             >
//               <IconColumnRemove stroke={2} />
//             </button>
//             <button
//               onClick={(event) => {
//                 event.preventDefault();
//                 editor.chain().focus().deleteTable().run();
//               }}
//             >
//               <IconTableMinus stroke={2} />
//             </button>
//           </div>

//           {/* 8th Column */}
//           <div className="btnSection">
//             <input
//               type="color"
//               onInput={(event) =>
//                 editor.chain().focus().setColor(event.target.value).run()
//               }
//               value={editor.getAttributes("textStyle").color}
//               data-testid="setColor"
//             />
//             <button
//               onClick={(event) => {
//                 event.preventDefault();
//                 editor.chain().focus().setColor("#958DF1").run();
//               }}
//               className={
//                 editor.isActive("textStyle", { color: "#958DF1" })
//                   ? "is-active"
//                   : ""
//               }
//               data-testid="setPurple"
//             >
//               Purple
//             </button>
//             <button
//               onClick={(event) => {
//                 event.preventDefault();
//                 editor.chain().focus().setColor("#F98181").run();
//               }}
//               className={
//                 editor.isActive("textStyle", { color: "#F98181" })
//                   ? "is-active"
//                   : ""
//               }
//               data-testid="setRed"
//             >
//               Red
//             </button>
//             <button
//               onClick={(event) => {
//                 event.preventDefault();
//                 editor.chain().focus().setColor("#FBBC88").run();
//               }}
//               className={
//                 editor.isActive("textStyle", { color: "#FBBC88" })
//                   ? "is-active"
//                   : ""
//               }
//               data-testid="setOrange"
//             >
//               Orange
//             </button>
//             <button
//               onClick={(event) => {
//                 event.preventDefault();
//                 editor.chain().focus().setColor("#FAF594").run();
//               }}
//               className={
//                 editor.isActive("textStyle", { color: "#FAF594" })
//                   ? "is-active"
//                   : ""
//               }
//               data-testid="setYellow"
//             >
//               Yellow
//             </button>
//             <button
//               onClick={(event) => {
//                 event.preventDefault();
//                 editor.chain().focus().setColor("#70CFF8").run();
//               }}
//               className={
//                 editor.isActive("textStyle", { color: "#70CFF8" })
//                   ? "is-active"
//                   : ""
//               }
//               data-testid="setBlue"
//             >
//               Blue
//             </button>
//             <button
//               onClick={(event) => {
//                 event.preventDefault();
//                 editor.chain().focus().setColor("#94FADB").run();
//               }}
//               className={
//                 editor.isActive("textStyle", { color: "#94FADB" })
//                   ? "is-active"
//                   : ""
//               }
//               data-testid="setTeal"
//             >
//               Teal
//             </button>
//             <button
//               onClick={(event) => {
//                 event.preventDefault();
//                 editor.chain().focus().setColor("#B9F18D").run();
//               }}
//               className={
//                 editor.isActive("textStyle", { color: "#B9F18D" })
//                   ? "is-active"
//                   : ""
//               }
//               data-testid="setGreen"
//             >
//               Green
//             </button>
//             <button
//               onClick={(event) => {
//                 event.preventDefault();
//                 editor.chain().focus().unsetColor().run();
//               }}
//               data-testid="unsetColor"
//             >
//               Unset color
//             </button>
//           </div>

//           <div>
//             <button
//               onClick={(event) => {
//                 event.preventDefault();
//                 handleAddLinkToImage();
//               }}
//             >
//               <IconPhoto stroke={2} />
//             </button>
//           </div>
//         </div>
//       </div>

//       <div className="editor-container">
//         <EditorContent editor={editor} />
//       </div>
//     </>
//   );
// }

// export default Editor;











// components/admin/editor/Editor.jsx

import {
  IconAlignCenter,
  IconAlignJustified,
  IconAlignLeft,
  IconAlignRight,
  IconArrowBackUp,
  IconArrowForwardUp,
  IconBlockquote,
  IconBold,
  IconCode,
  IconColumnInsertLeft,
  IconColumnInsertRight,
  IconColumnRemove,
  IconH1,
  IconH2,
  IconH3,
  IconHighlight,
  IconItalic,
  IconLayoutDistributeHorizontal,
  IconLine,
  IconLinkMinus,
  IconLinkPlus,
  IconList,
  IconListCheck,
  IconListNumbers,
  IconPhoto,
  IconPhotoPlus,
  IconRowInsertBottom,
  IconRowInsertTop,
  IconRowRemove,
  IconStrikethrough,
  IconSubscript,
  IconSuperscript,
  IconTableMinus,
  IconTablePlus,
  IconUnderline,
} from "@tabler/icons-react";
import Blockquote from "@tiptap/extension-blockquote";
import Bold from "@tiptap/extension-bold";
import BulletList from "@tiptap/extension-bullet-list";
import Code from "@tiptap/extension-code";
import { Color } from "@tiptap/extension-color";
import Document from "@tiptap/extension-document";
import Dropcursor from "@tiptap/extension-dropcursor";
import HardBreak from "@tiptap/extension-hard-break";
import Heading from "@tiptap/extension-heading";
import Highlight from "@tiptap/extension-highlight";
import History from "@tiptap/extension-history";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import Italic from "@tiptap/extension-italic";
import Link from "@tiptap/extension-link";
import ListItem from "@tiptap/extension-list-item";
import OrderedList from "@tiptap/extension-ordered-list";
import Paragraph from "@tiptap/extension-paragraph";
import Placeholder from "@tiptap/extension-placeholder";
import Strike from "@tiptap/extension-strike";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import { Table } from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import Text from "@tiptap/extension-text";
import TextAlign from "@tiptap/extension-text-align";
import { TextStyle } from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import { useRef, useCallback } from "react";
import ImageResize from "tiptap-extension-resize-image";
import "./EditorStyle.css";
import { Image } from "@tiptap/extension-image";

/**
 * Converts legacy JSON-array content to HTML for TipTap.
 */
function normalizeContent(content) {
  if (!content) return content;

  let arr;
  try {
    arr = JSON.parse(content);
  } catch {
    return content;
  }

  if (!Array.isArray(arr)) return content;

  const parts = [];
  let inList = false;

  for (const item of arr) {
    if (typeof item !== "string") continue;

    if (item.startsWith("- \n")) {
      if (!inList) { parts.push("<ul>"); inList = true; }
      const text = item.replace(/^-\s*\n\s*/, "").trim();
      parts.push(`<li><p>${text}</p></li>`);
    } else {
      if (inList) { parts.push("</ul>"); inList = false; }
      const trimmed = item.trim();
      if (!trimmed) continue;
      if (trimmed.endsWith(":")) {
        parts.push(`<p>${trimmed}</p>`);
      } else if (trimmed.length <= 70 && !/[.,]$/.test(trimmed)) {
        if (/^\d+\.\s/.test(trimmed)) {
          parts.push(`<h3>${trimmed}</h3>`);
        } else {
          parts.push(`<h2>${trimmed}</h2>`);
        }
      } else {
        parts.push(`<p>${trimmed}</p>`);
      }
    }
  }

  if (inList) parts.push("</ul>");
  return parts.join("");
}

const LinkedImage = Image.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      href: { default: null },
      target: { default: "_blank" },
    };
  },

  renderHTML({ HTMLAttributes }) {
    const { href, target, ...rest } = HTMLAttributes;
    const img = ["img", rest];
    return href ? ["a", { href, target }, img] : img;
  },

  parseHTML() {
    return [
      {
        tag: "a[href] > img",
        getAttrs: (node) => {
          const parent = node.parentNode;
          return {
            ...node.attributes,
            href: parent.getAttribute("href"),
            target: parent.getAttribute("target") || "_blank",
          };
        },
      },
      { tag: "img" },
    ];
  },
});

function Editor({ content, onChange }) {
  // ─── Refs ────────────────────────────────────────────────────
  const processingImagesRef = useRef(false);
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;
  // Track all local image srcs currently in editor to detect deletions
  const trackedImagesRef = useRef(new Set());
  // Ref for deleteImageFromServer so onUpdate closure always has latest version
  const deleteImageFromServerRef = useRef(null);

  // ─── Helpers ─────────────────────────────────────────────────
  const dataUriToFile = (dataUri, index) => {
    const match = dataUri.match(/^data:(image\/[\w.+-]+);base64,(.+)$/);
    if (!match) return null;
    const mimeType = match[1];
    const base64Data = match[2];
    const binary = atob(base64Data);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
    const extMap = { "image/jpeg": "jpg", "image/png": "png", "image/gif": "gif", "image/webp": "webp" };
    const ext = extMap[mimeType] || "jpg";
    return new File([bytes], `pasted-${Date.now()}-${index}.${ext}`, { type: mimeType });
  };

  const uploadImage = useCallback(async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("target", "content");
    const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || "Image upload failed");
    return json.path;
  }, []);

  const uploadImageFromUrl = useCallback(async (externalUrl) => {
    const res = await fetch("/api/admin/upload", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: externalUrl, target: "content" }),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || "Image upload failed");
    return json.path;
  }, []);

  const deleteImageFromServer = useCallback(async (src) => {
    // Only delete local uploaded images — skip external URLs
    if (!src || src.startsWith("http://") || src.startsWith("https://") || src.startsWith("data:")) return;
    console.log("[Editor] Deleting image from server:", src);
    try {
      const res = await fetch("/api/admin/upload", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ path: src }),
      });
      const json = await res.json();
      console.log("[Editor] Delete response:", res.status, json);
    } catch (error) {
      console.error("[Editor] Error deleting image from server:", error);
    }
  }, []);
  deleteImageFromServerRef.current = deleteImageFromServer;

  /**
   * FIX: Replace non-local images WITHOUT triggering onChange during processing.
   * Uses a flag to prevent the onUpdate → replaceAllNonLocalImages → onUpdate loop
   * that was causing images to disappear when typing after upload.
   */
  const replaceAllNonLocalImages = useCallback(async (editorInstance) => {
    if (!editorInstance || processingImagesRef.current) return;

    const imageNodes = [];
    editorInstance.state.doc.descendants((node, pos) => {
      if (node.type.name !== "image") return;
      const src = node.attrs?.src;
      if (typeof src !== "string") return;
      const isDataUri = src.startsWith("data:image/");
      const isExternal = src.startsWith("http://") || src.startsWith("https://");
      if (isDataUri || isExternal) imageNodes.push({ pos, src, isDataUri });
    });

    if (!imageNodes.length) return;

    processingImagesRef.current = true;
    try {
      for (let i = 0; i < imageNodes.length; i++) {
        const { pos, src, isDataUri } = imageNodes[i];

        // Re-check node still exists at same pos with same src
        const currentNode = editorInstance.state.doc.nodeAt(pos);
        if (!currentNode || currentNode.type.name !== "image" || currentNode.attrs?.src !== src) {
          continue;
        }

        let imageUrl;
        if (isDataUri) {
          const file = dataUriToFile(src, i);
          if (!file) continue;
          imageUrl = await uploadImage(file);
        } else {
          imageUrl = await uploadImageFromUrl(src);
        }

        // FIX: Use setMeta to mark this transaction so onUpdate skips calling onChange
        editorInstance
          .chain()
          .setNodeSelection(pos)
          .updateAttributes("image", { src: imageUrl })
          .run();
      }
    } catch (error) {
      console.error("Error uploading images:", error);
    } finally {
      processingImagesRef.current = false;
      // Emit final HTML after all images are replaced
      onChangeRef.current(editorInstance.getHTML());
    }
  }, [uploadImage, uploadImageFromUrl]);

  // ─── Editor setup ─────────────────────────────────────────────
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      Document, Paragraph, Text, Dropcursor,
      BulletList, ListItem, OrderedList,
      Heading.configure({ levels: [1, 2, 3] }),
      Bold, Underline, Italic, Strike,
      TextAlign.configure({ types: ["heading", "paragraph", "table"] }),
      Table.configure({ resizable: true }),
      TableRow, TableHeader, TableCell,
      Blockquote, HorizontalRule, HardBreak,
      Code,
      Highlight.configure({ multicolor: true }),
      History,
      TextStyle, Color,
      TaskList,
      TaskItem.configure({ nested: true }),
      LinkedImage,
      ImageResize,
      Subscript, Superscript,
      Placeholder.configure({ placeholder: "Write Content..." }),
      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: "https",
        protocols: ["http", "https"],
        isAllowedUri: (url, ctx) => {
          try {
            const parsedUrl = url.includes(":") ? new URL(url) : new URL(`${ctx.defaultProtocol}://${url}`);
            if (!ctx.defaultValidate(parsedUrl.href)) return false;
            const disallowedProtocols = ["ftp", "file", "mailto"];
            const protocol = parsedUrl.protocol.replace(":", "");
            if (disallowedProtocols.includes(protocol)) return false;
            const allowedProtocols = ctx.protocols.map((p) => typeof p === "string" ? p : p.scheme);
            if (!allowedProtocols.includes(protocol)) return false;
            return true;
          } catch { return false; }
        },
        shouldAutoLink: (url) => {
          try {
            const parsedUrl = url.includes(":") ? new URL(url) : new URL(`https://${url}`);
            const disallowedDomains = ["example-no-autolink.com"];
            return !disallowedDomains.includes(parsedUrl.hostname);
          } catch { return false; }
        },
      }),
    ],

    content: normalizeContent(content),

    onCreate: ({ editor: editorInstance }) => {
      // Populate trackedImagesRef with images already in content (edit mode)
      const initialSrcs = new Set();
      editorInstance.state.doc.descendants((node) => {
        if (node.type.name === "image") {
          const src = node.attrs?.src;
          if (src && !src.startsWith("data:") && !src.startsWith("http://") && !src.startsWith("https://")) {
            initialSrcs.add(src);
          }
        }
      });
      trackedImagesRef.current = new Set(initialSrcs);
      console.log("[Editor] onCreate - tracked images:", [...initialSrcs]);
    },

    editorProps: {
      // ── Paste handler ──────────────────────────────────────────
      handlePaste(view, event) {
        const clipboardData = event.clipboardData;
        if (!clipboardData) return false;

        const items = clipboardData.items;

        // 1. Check for image files in clipboard (screenshots, copied images)
        const imageFiles = [];
        for (const item of items) {
          if (item.kind === "file" && item.type.startsWith("image/")) {
            const file = item.getAsFile();
            if (file) imageFiles.push(file);
          }
        }

        if (imageFiles.length > 0) {
          event.preventDefault();
          const pastePos = view.state.selection.from;
          imageFiles.forEach(async (file, index) => {
            try {
              const imageUrl = await uploadImage(file);
              const insertPos = pastePos + index;
              editor?.chain().focus().setTextSelection(insertPos).setImage({ src: imageUrl }).run();
              onChangeRef.current(editor?.getHTML() || "");
            } catch (error) {
              console.error("Error pasting image:", error);
            }
          });
          return true;
        }

        // 2. Check for plain text paste — let TipTap handle it natively
        // This ensures formatted text, links, etc. paste correctly
        return false;
      },

      // ── Drop handler ───────────────────────────────────────────
      handleDrop(view, event) {
        const files = [];
        if (event.dataTransfer?.files?.length) {
          for (const file of event.dataTransfer.files) {
            if (file.type.startsWith("image/")) files.push(file);
          }
        }
        if (!files.length) return false;

        event.preventDefault();
        const coords = { left: event.clientX, top: event.clientY };
        const dropPos = view.posAtCoords(coords)?.pos ?? view.state.selection.from;

        files.forEach(async (file, index) => {
          try {
            const imageUrl = await uploadImage(file);
            editor?.chain().focus().setTextSelection(dropPos + index).setImage({ src: imageUrl }).run();
            onChangeRef.current(editor?.getHTML() || "");
          } catch (error) {
            console.error("Error dropping image:", error);
          }
        });
        return true;
      },
    },

    // ── onUpdate ──────────────────────────────────────────────────
    onUpdate: ({ editor: editorInstance }) => {
      // FIX: Skip onChange during image processing to prevent content reset
      if (!processingImagesRef.current) {
        onChangeRef.current(editorInstance.getHTML());
      }

      // ── Detect deleted local images and remove from server ──
      const currentSrcs = new Set();
      editorInstance.state.doc.descendants((node) => {
        if (node.type.name === "image") {
          const src = node.attrs?.src;
          if (src && !src.startsWith("data:") && !src.startsWith("http://") && !src.startsWith("https://")) {
            currentSrcs.add(src);
          }
        }
      });

      // Find images that were tracked before but are now gone
      const prevSrcs = trackedImagesRef.current;
      trackedImagesRef.current = new Set(currentSrcs);
      for (const src of prevSrcs) {
        if (!currentSrcs.has(src)) {
          console.log("[Editor] Image removed from editor, deleting:", src);
          void deleteImageFromServerRef.current?.(src);
        }
      }

      // Check for any data-uri or external images that need uploading
      void replaceAllNonLocalImages(editorInstance);
    },
  });

  // ─── Actions ──────────────────────────────────────────────────
  const setLink = () => {
    if (!editor) return;
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    try {
      editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
    } catch (e) {
      alert(e.message);
    }
  };

  const addImage = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.click();
    input.onchange = async (event) => {
      const file = event.target.files[0];
      if (!file) return;
      try {
        const imageUrl = await uploadImage(file);
        editor.chain().focus().setImage({ src: imageUrl }).run();
        onChangeRef.current(editor.getHTML());
      } catch (error) {
        console.error("Error adding image:", error);
      }
    };
  };

  const handleAddLinkToImage = () => {
    if (!editor) return;
    const { state } = editor;
    const { selection } = state;
    const pos = selection.from;
    const node = state.doc.nodeAt(pos);
    if (!node || node.type.name !== "image") {
      alert("Please select an image to add a link.");
      return;
    }
    const currentAttrs = node.attrs;
    const currentHref = currentAttrs.href || "";
    const href = prompt("Enter URL to link this image:", currentHref);
    if (href !== null) {
      if (currentHref !== href) {
        editor.chain().focus().setNodeSelection(pos).updateAttributes("image", { ...currentAttrs, href, target: "_blank" }).run();
      } else {
        alert("This image already has the link.");
      }
    }
  };

  if (!editor) return null;

  return (
    <>
      <div className="control-group">
        <div>
          {/* 1st Column - History + Text Formatting */}
          <div className="btnSection">
            <button onClick={(e) => { e.preventDefault(); editor.chain().focus().undo().run(); }} disabled={!editor.can().undo()}>
              <IconArrowBackUp stroke={2} />
            </button>
            <button onClick={(e) => { e.preventDefault(); editor.chain().focus().redo().run(); }} disabled={!editor.can().redo()}>
              <IconArrowForwardUp stroke={2} />
            </button>
            <button onClick={(e) => { e.preventDefault(); editor.chain().focus().toggleBold().run(); }} className={editor.isActive("bold") ? "is-active" : ""}>
              <IconBold stroke={2} />
            </button>
            <button onClick={(e) => { e.preventDefault(); editor.chain().focus().toggleUnderline().run(); }} className={editor.isActive("underline") ? "is-active" : ""}>
              <IconUnderline stroke={2} />
            </button>
            <button onClick={(e) => { e.preventDefault(); editor.chain().focus().toggleItalic().run(); }} className={editor.isActive("italic") ? "is-active" : ""}>
              <IconItalic stroke={2} />
            </button>
            <button onClick={(e) => { e.preventDefault(); editor.chain().focus().toggleStrike().run(); }} className={editor.isActive("strike") ? "is-active" : ""}>
              <IconStrikethrough stroke={2} />
            </button>
          </div>

          {/* 2nd Column - Code, Highlight, etc */}
          <div className="btnSection">
            <button onClick={(e) => { e.preventDefault(); editor.chain().focus().setHardBreak().run(); }}>
              <IconLine stroke={2} />
            </button>
            <button onClick={(e) => { e.preventDefault(); editor.chain().focus().toggleCode().run(); }} className={editor.isActive("code") ? "is-active" : ""}>
              <IconCode stroke={2} />
            </button>
            <button onClick={(e) => { e.preventDefault(); editor.chain().focus().toggleHighlight().run(); }} className={editor.isActive("highlight") ? "is-active" : ""}>
              <IconHighlight stroke={2} />
            </button>
            <button onClick={(e) => { e.preventDefault(); editor.chain().focus().setHorizontalRule().run(); }}>
              <IconLayoutDistributeHorizontal stroke={2} />
            </button>
            <button onClick={(e) => { e.preventDefault(); editor.chain().focus().toggleSubscript().run(); }} className={editor.isActive("subscript") ? "is-active" : ""}>
              <IconSubscript stroke={2} />
            </button>
            <button onClick={(e) => { e.preventDefault(); editor.chain().focus().toggleSuperscript().run(); }} className={editor.isActive("superscript") ? "is-active" : ""}>
              <IconSuperscript stroke={2} />
            </button>
          </div>

          {/* 3rd Column - Lists + Image */}
          <div className="btnSection">
            <button onClick={(e) => { e.preventDefault(); editor.chain().focus().toggleBulletList().run(); }} className={editor.isActive("bulletList") ? "is-active" : ""}>
              <IconList stroke={2} />
            </button>
            <button onClick={(e) => { e.preventDefault(); editor.chain().focus().toggleOrderedList().run(); }} className={editor.isActive("orderedList") ? "is-active" : ""}>
              <IconListNumbers stroke={2} />
            </button>
            <button onClick={(e) => { e.preventDefault(); editor.chain().focus().toggleTaskList().run(); }} className={editor.isActive("taskList") ? "is-active" : ""}>
              <IconListCheck stroke={2} />
            </button>
            <button onClick={(e) => { e.preventDefault(); editor.chain().focus().toggleBlockquote().run(); }} className={editor.isActive("blockquote") ? "is-active" : ""}>
              <IconBlockquote stroke={2} />
            </button>
            <button onClick={(e) => { e.preventDefault(); addImage(); }}>
              <IconPhotoPlus stroke={2} />
            </button>
          </div>

          {/* 4th Column - Links */}
          <div className="btnSection">
            <button onClick={(e) => { e.preventDefault(); setLink(); }} className={editor.isActive("link") ? "is-active" : ""}>
              <IconLinkPlus stroke={2} />
            </button>
            <button onClick={(e) => { e.preventDefault(); editor.chain().focus().unsetLink().run(); }} disabled={!editor.isActive("link")}>
              <IconLinkMinus stroke={2} />
            </button>
          </div>

          {/* 5th Column - Alignment */}
          <div className="btnSection">
            <button onClick={(e) => { e.preventDefault(); editor.chain().focus().setTextAlign("left").run(); }} className={editor.isActive({ textAlign: "left" }) ? "is-active" : ""}>
              <IconAlignLeft stroke={2} />
            </button>
            <button onClick={(e) => { e.preventDefault(); editor.chain().focus().setTextAlign("center").run(); }} className={editor.isActive({ textAlign: "center" }) ? "is-active" : ""}>
              <IconAlignCenter stroke={2} />
            </button>
            <button onClick={(e) => { e.preventDefault(); editor.chain().focus().setTextAlign("right").run(); }} className={editor.isActive({ textAlign: "right" }) ? "is-active" : ""}>
              <IconAlignRight stroke={2} />
            </button>
            <button onClick={(e) => { e.preventDefault(); editor.chain().focus().setTextAlign("justify").run(); }} className={editor.isActive({ textAlign: "justify" }) ? "is-active" : ""}>
              <IconAlignJustified stroke={2} />
            </button>
          </div>

          {/* 6th Column - Headings */}
          <div className="btnSection">
            <button onClick={(e) => { e.preventDefault(); editor.chain().focus().toggleHeading({ level: 1 }).run(); }} className={editor.isActive("heading", { level: 1 }) ? "is-active" : ""}>
              <IconH1 stroke={2} />
            </button>
            <button onClick={(e) => { e.preventDefault(); editor.chain().focus().toggleHeading({ level: 2 }).run(); }} className={editor.isActive("heading", { level: 2 }) ? "is-active" : ""}>
              <IconH2 stroke={2} />
            </button>
            <button onClick={(e) => { e.preventDefault(); editor.chain().focus().toggleHeading({ level: 3 }).run(); }} className={editor.isActive("heading", { level: 3 }) ? "is-active" : ""}>
              <IconH3 stroke={2} />
            </button>
          </div>

          {/* 7th Column - Table */}
          <div className="btnSection">
            <button onClick={(e) => { e.preventDefault(); editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run(); }}>
              <IconTablePlus stroke={2} />
            </button>
            <button onClick={(e) => { e.preventDefault(); editor.chain().focus().addRowBefore().run(); }}>
              <IconRowInsertTop stroke={2} />
            </button>
            <button onClick={(e) => { e.preventDefault(); editor.chain().focus().addRowAfter().run(); }}>
              <IconRowInsertBottom stroke={2} />
            </button>
            <button onClick={(e) => { e.preventDefault(); editor.chain().focus().deleteRow().run(); }}>
              <IconRowRemove stroke={2} />
            </button>
            <button onClick={(e) => { e.preventDefault(); editor.chain().focus().addColumnBefore().run(); }}>
              <IconColumnInsertLeft stroke={2} />
            </button>
            <button onClick={(e) => { e.preventDefault(); editor.chain().focus().addColumnAfter().run(); }}>
              <IconColumnInsertRight stroke={2} />
            </button>
            <button onClick={(e) => { e.preventDefault(); editor.chain().focus().deleteColumn().run(); }}>
              <IconColumnRemove stroke={2} />
            </button>
            <button onClick={(e) => { e.preventDefault(); editor.chain().focus().deleteTable().run(); }}>
              <IconTableMinus stroke={2} />
            </button>
          </div>

          {/* 8th Column - Colors */}
          <div className="btnSection">
            <input
              type="color"
              onInput={(e) => editor.chain().focus().setColor(e.target.value).run()}
              value={editor.getAttributes("textStyle").color || "#000000"}
              data-testid="setColor"
            />
            {[
              { label: "Purple", color: "#958DF1" },
              { label: "Red", color: "#F98181" },
              { label: "Orange", color: "#FBBC88" },
              { label: "Yellow", color: "#FAF594" },
              { label: "Blue", color: "#70CFF8" },
              { label: "Teal", color: "#94FADB" },
              { label: "Green", color: "#B9F18D" },
            ].map(({ label, color }) => (
              <button
                key={color}
                onClick={(e) => { e.preventDefault(); editor.chain().focus().setColor(color).run(); }}
                className={editor.isActive("textStyle", { color }) ? "is-active" : ""}
                data-testid={`set${label}`}
              >{label}</button>
            ))}
            <button onClick={(e) => { e.preventDefault(); editor.chain().focus().unsetColor().run(); }} data-testid="unsetColor">
              Unset color
            </button>
          </div>

          {/* Image link */}
          <div className="btnSection">
            <button onClick={(e) => { e.preventDefault(); handleAddLinkToImage(); }}>
              <IconPhoto stroke={2} />
            </button>
          </div>
        </div>
      </div>

      <div className="editor-container">
        <EditorContent editor={editor} />
      </div>
    </>
  );
}

export default Editor;