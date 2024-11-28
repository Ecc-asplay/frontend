'use client'
// Import React dependencies.
import React, { useState, useCallback, useMemo, useEffect } from 'react'
// Import the Slate editor factory.
import { createEditor, Transforms, Element, Editor, Node } from 'slate'
// Import the Slate components and React plugin.
import { Slate, Editable, withReact } from 'slate-react'
import { BaseEditor, Descendant } from 'slate'
import { ReactEditor } from 'slate-react'
import { draft } from '../test_data'
import Image from 'next/image'
import { LeftNavigation } from '../components/navigations/left'
import { DraftNavigation } from '../components/post/draftnav'
import { white_icons, color_icons } from '../feel_icons'
type CustomElement = { type: 'paragraph'; children: CustomText[] };
type CustomText = { text: string, fontsize: number, bold: boolean, italic: boolean, underline: boolean, strike: boolean, color: string };

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor
    Element: CustomElement
    Text: CustomText
  }
}

let initialValue = [
  {
    type: 'paragraph',
    children: [{ text: 'A line of text in a paragraph.' }],
  },
]

export default function Test() {
  const [editor] = useState(() => withReact(createEditor()));
  const [color, setColor] = useState("black");
  const [fontsize, setFontsize] = useState(100);
  const [reactionIcons, setReactionIcons] = useState([
    { id: 1, isColor: true, white: white_icons[0], color: color_icons[0] },
    { id: 2, isColor: false, white: white_icons[1], color: color_icons[1] },
    { id: 3, isColor: false, white: white_icons[2], color: color_icons[2] },
    { id: 4, isColor: false, white: white_icons[3], color: color_icons[3] },
    { id: 5, isColor: false, white: white_icons[4], color: color_icons[4] },
  ])
  const CustomEditor = {
    //それぞれのテキストの状態変更
    isBoldMarkActive(editor: BaseEditor & ReactEditor) {
      const marks = Editor.marks(editor);
      return marks ? marks.bold === true : false;
    },
    isItalicMarkActive(editor: BaseEditor & ReactEditor) {
      const marks = Editor.marks(editor);
      return marks ? marks.italic === true : false;
    },
    isUnderlineMarkActive(editor: BaseEditor & ReactEditor) {
      const marks = Editor.marks(editor);
      return marks ? marks.underline === true : false;
    },
    isStrikeMarkActive(editor: BaseEditor & ReactEditor) {
      const marks = Editor.marks(editor);
      return marks ? marks.strike === true : false;
    },


    toggleBoldMark(editor: BaseEditor & ReactEditor) {
      const isActive = CustomEditor.isBoldMarkActive(editor)
      if (isActive) {
        Editor.removeMark(editor, 'bold');
      } else {
        Editor.addMark(editor, 'bold', true);
      }
    },
    toggleItalicMark(editor: BaseEditor & ReactEditor) {
      const isActive = CustomEditor.isItalicMarkActive(editor)
      if (isActive) {
        Editor.removeMark(editor, 'italic');
      } else {
        Editor.addMark(editor, 'italic', true);
      }
    },
    toggleUnderlineMark(editor: BaseEditor & ReactEditor) {
      const isActive = CustomEditor.isUnderlineMarkActive(editor)
      if (isActive) {
        Editor.removeMark(editor, 'underline');
      } else {
        Editor.addMark(editor, 'underline', true);
      }
    },
    toggleStrikeMark(editor: BaseEditor & ReactEditor) {
      const isActive = CustomEditor.isStrikeMarkActive(editor)
      if (isActive) {
        Editor.removeMark(editor, 'strike');
      } else {
        Editor.addMark(editor, 'strike', true);
      }
    },
    setFontSizeMark(editor: BaseEditor & ReactEditor) {
      console.log(fontsize);
      Editor.addMark(editor, 'fontsize', fontsize);
    },
    setColorMark(editor: BaseEditor & ReactEditor) {
      Editor.addMark(editor, 'color', color);
    },
  }

  const renderElement = useCallback((props: any) => {
    switch (props.element.type) {
      default:
        return <DefaultElement {...props} />
    }
  }, []);

  // Define a leaf rendering function that is memoized with `useCallback`.
  const renderLeaf = useCallback(
    (props: any) => <Leaf {...props} />,
    [color, fontsize]
  )

  const toggleReactionIcon = (id: number) => {
    //押されたアイコンのURL
    reactionIcons.forEach(i => i.isColor = false);
    setReactionIcons((prev) =>
      prev.map((reaction) =>
        reaction.id === id
          ? { ...reaction, isColor: !reaction.isColor }
          : reaction
      )
    );

  }


  initialValue = useMemo(
    () =>
      JSON.parse(localStorage.getItem('content') as string) || draft,
      
    []
  );

  const dragOver = (e:React.DragEvent) =>{
    const parent:HTMLElement = e.target as HTMLElement;
    const {id} = parent;
    if(id != "content")return;
    parent.style.backgroundColor = "black";

  }
  const dragLeave = (e:React.DragEvent) =>{
    const parent:HTMLElement = e.target as HTMLElement;
    const {id} = parent;
    if(id != "content")return;
    parent.style.border = "";
  }
  const drop = () =>{
    console.log("drop")
    // const parent:HTMLElement = e.target as HTMLElement;
    // const id  = localStorage.getItem("id");
    // console.log(localStorage);
    // console.log("droped")
    // if(!id)return;
    // const element = document.getElementById(id);
    // if(!element)return;
    // parent.appendChild(element);
  }
  useEffect(()=>{
    const body = document.getElementById("post_body");
    if(!body)return;
    body?.addEventListener("drop",drop);
  },[])

  useEffect(() => {
    CustomEditor.setFontSizeMark(editor);
  }, [fontsize]);
  useEffect(()=>{
    window.document.getElementById("post_body")?.addEventListener('drop',(e)=>drop());
  },[])
  
  return (
    <div className='flex'>
      <LeftNavigation />
      <div id="post_body"  onDropCapture={()=>alert("cap")} onDrop={()=>alert("asdd")} onDragOver={e=>dragOver(e)} onDragLeave={e=>dragLeave(e)} className='w-[60%] h-screen overflow-y-auto hidden-scrollbar flex flex-col items-center relative'>
        <hr className="header bg-[#B8A193] object-cover w-full h-[5%] absolute top-0 left-0" />
        <input type="text" onDrop={()=>drop()} className='text-4xl outline-none m-5 mt-10' placeholder='title' />
        <div className='flex flex-col bg-[#DDD4CF] w-[70%] h-[30%] rounded-xl p-6 place-items-center'>
          <span className='text-left w-full'>今、どんな気分?</span>
          <div className='grid grid-cols-5 gap-10 m-5'>
            {reactionIcons.map((icon, i) => (
              <div key={i}>
                <button onClick={() => { toggleReactionIcon(icon.id) }}><Image src={icon.isColor ? icon.color : icon.white} alt="reaction icon" className='w-full h-full' /></button>
              </div>
            ))}
          </div>
        </div>
        <Slate
          editor={editor}
          initialValue={initialValue as Descendant[]}
          onChange={value => {
            const isAstChange = editor.operations.some(
              op => 'set_selection' !== op.type
            )
            if (isAstChange) {
              // Save the value to Local Storage.
              const content = JSON.stringify(value)
              localStorage.setItem('content', content)
            }
          }}
        >
          <div className='flex items-center'>
            <select name="font-size" id="" className='outline-none'
              onChange={(e) => {
                console.log(e.target.value);
                setFontsize(e.target.value as unknown as number);
              }}
            >
              <option value="16">normal</option>
              <option value="24">h1</option>
              <option value="32">h2</option>
            </select>
            <button
              className='mx-1'
              onMouseDown={event => {
                event.preventDefault()
                CustomEditor.toggleBoldMark(editor)
              }}
            >
              <span className='font-bold'>B</span>
            </button>
            <button
              className='mx-1'
              onMouseDown={event => {
                event.preventDefault()
                CustomEditor.toggleItalicMark(editor)
              }}
            >
              <span className='italic'>I</span>
            </button>
            <button
              className='mx-1'
              onMouseDown={event => {
                event.preventDefault()
                CustomEditor.toggleUnderlineMark(editor)
              }}
            >
              <span className='underline'>U</span>
            </button>
            <button
              className='mx-1'
              onMouseDown={event => {
                event.preventDefault()
                CustomEditor.toggleStrikeMark(editor)
              }}
            >
              <span className='line-through'>S</span>
            </button>
            <div id="color_selector" className='relative w-[15px] h-[15px] bg-red-400 rounded-full' onClick={() => { const colorinput = document.getElementById('color_input'); colorinput?.click() }}>
              <input type="color" name="" id="color_input" className='hidden absolute top-0 right-0' 
                onChange={event => {
                  setColor(event.target.value);
                  CustomEditor.setColorMark(editor);
                  const color_selector = document.getElementById("color_selector");
                  if(color_selector) color_selector.style.backgroundColor = event.target.value;
                }}
              />
            </div>
            

          </div>
          <Editable
            id="content"
            className='w-[80%] m-3'
            renderElement={renderElement}
            renderLeaf={renderLeaf}
          />
        </Slate>
      </div>

      <DraftNavigation />
    </div>
  );
}


const DefaultElement = (props: any) => {
  return <p {...props.attributes}>{props.children}</p>
}

const Leaf = ({ attributes, children, leaf, }: any) => {
  return (
    <span
      {...attributes}
      style={{
        fontWeight: leaf.bold ? 'bold' : 'normal',
        fontSize: leaf.fontsize ? leaf.fontsize + 'px' : '16px',
        fontStyle: leaf.italic ? 'italic' : 'normal',
        textDecorationLine: leaf.underline ? 'underline' : leaf.strike ? 'line-through' : 'none',
        color: leaf.color ? leaf.color : 'black',
      }}
    >
      {children}
    </span>
  )
}