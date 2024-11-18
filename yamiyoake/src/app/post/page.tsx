'use client'
// Import React dependencies.
import React, { useState,useCallback,useMemo, useEffect } from 'react'
// Import the Slate editor factory.
import { createEditor,Transforms,Element,Editor,Node} from 'slate'
// Import the Slate components and React plugin.
import { Slate, Editable, withReact } from 'slate-react'
import { BaseEditor, Descendant } from 'slate'
import { ReactEditor } from 'slate-react'
import { draft } from '../test_data'
type CustomElement = { type: 'paragraph'; children: CustomText[] };
type CustomText = { text: string,fontsize:number,bold:boolean,italic:boolean,underline:boolean,strike:boolean,color:string};

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

export default function Test(){
    const [editor] = useState(() => withReact(createEditor()));
    const [color,setColor] = useState("black");
    const [fontsize,setFontsize] = useState(100);
    const CustomEditor = {
      //それぞれのテキストの状態変更
      isBoldMarkActive(editor:BaseEditor & ReactEditor) {
        const marks = Editor.marks(editor);
        return marks ? marks.bold === true : false;
      },
      isItalicMarkActive(editor:BaseEditor & ReactEditor) {
        const marks = Editor.marks(editor);
        return marks ? marks.italic === true : false;
      },
      isUnderlineMarkActive(editor:BaseEditor & ReactEditor) {
        const marks = Editor.marks(editor);
        return marks ? marks.underline === true : false;
      },
      isStrikeMarkActive(editor:BaseEditor & ReactEditor) {
        const marks = Editor.marks(editor);
        return marks ? marks.strike === true : false;
      },
      
      
      toggleBoldMark(editor:BaseEditor & ReactEditor) {
        const isActive = CustomEditor.isBoldMarkActive(editor)
        if (isActive) {
          Editor.removeMark(editor, 'bold');
        } else {
          Editor.addMark(editor, 'bold', true);
        }
      },
      toggleItalicMark(editor:BaseEditor & ReactEditor) {
        const isActive = CustomEditor.isItalicMarkActive(editor)
        if (isActive) {
          Editor.removeMark(editor, 'italic');
        } else {
          Editor.addMark(editor, 'italic', true);
        }
      },
      toggleUnderlineMark(editor:BaseEditor & ReactEditor) {
        const isActive = CustomEditor.isUnderlineMarkActive(editor)
        if (isActive) {
          Editor.removeMark(editor, 'underline');
        } else {
          Editor.addMark(editor, 'underline', true);
        }
      },
      toggleStrikeMark(editor:BaseEditor & ReactEditor) {
        const isActive = CustomEditor.isStrikeMarkActive(editor)
        if (isActive) {
          Editor.removeMark(editor, 'strike');
        } else {
          Editor.addMark(editor, 'strike', true);
        }
      },
      setFontSizeMark(editor:BaseEditor & ReactEditor){
        console.log(fontsize);
        Editor.addMark(editor,'fontsize',fontsize);
      },
      setColorMark(editor:BaseEditor & ReactEditor) {
        Editor.addMark(editor, 'color', color);
      },
    }

    const renderElement = useCallback((props:any) => {
        switch (props.element.type) {
          default:
            return <DefaultElement {...props} />
        }
      }, []);

       // Define a leaf rendering function that is memoized with `useCallback`.
       const renderLeaf = useCallback(
        (props: any) => <Leaf {...props} />,
        [color,fontsize]
      )

    initialValue = useMemo(
    () =>
        JSON.parse(localStorage.getItem('content') as string) || [
        draft,
        ],
    []
    )

    useEffect(()=>{
      CustomEditor.setFontSizeMark(editor);
    },[fontsize])

    return(
        <div>
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
                <div className='felx items-center '>
                  <select name="font-size" id="" className='outline-none'
                    onChange={(e)=>{
                      setFontsize(e.target.value as unknown as number);
                    }}
                  >
                    <option value="16">normal</option>
                    <option value="32">h1</option>
                    <option value="24">h2</option>
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
                  
                  <input type="color" name="" id="" className='bg-transparent rounded-xl w-8 h-8' 
                      onChange={event=>{
                          setColor(event.target.value);
                          CustomEditor.setColorMark(editor);
                          }}
                  />
                </div>
                <Editable
                  className='outline-none'
                  renderElement={renderElement}
                  renderLeaf={renderLeaf}
                />
            </Slate>
        </div>
    );
}


const DefaultElement = (props:any) => {
    return <p {...props.attributes}>{props.children}</p>
}

const Leaf = ({ attributes, children, leaf,}: any) => {
    return (
      <span
        {...attributes}
        style={{
          fontWeight: leaf.bold ? 'bold' : 'normal',
          fontSize:leaf.fontsize ? leaf.fontsize + 'px':'16px',
          fontStyle:leaf.italic ? 'italic':'normal',
          textDecorationLine:leaf.underline ? 'underline':leaf.strike ? 'line-through':'none',
          color: leaf.color ? leaf.color : 'black',
        }}
      >
        {children}
      </span>
    )
  }