'use client'
import React, { useState, useCallback, useMemo, useEffect, createElement, Children } from 'react'
import { createEditor, Transforms, Element, Editor, Node } from 'slate'
import { Slate, Editable, withReact } from 'slate-react'
import { BaseEditor, Descendant } from 'slate'
import { ReactEditor } from 'slate-react'
import { draft } from '../test_data'
import Image from 'next/image'
import { LeftNavigation } from '../components/navigations/left'
import { white_feel_icons, color_feel_icons } from '../feel_icons'
import { Header } from '../components/Header'
import { CreatePost } from '../api/posts'
import happa from "@/app/img/happa.png"
import image from "@/app/img/image-svgrepo-com.png"
import file from "@/app/img/file-04-svgrepo-com.png"
import plus from "@/app/img/plus-large-svgrepo-com.png"
//保存する際の形式
type CustomElement = { type: 'paragraph'; children: CustomText[],page:number };
type CustomText = {text: string, fontsize: number, bold: boolean, italic: boolean, underline: boolean, strike: boolean, color: string };

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor
    Element: CustomElement
    Text: CustomText
  }
}

const initialValue: CustomElement[] = [
  {
    type: 'paragraph',
    children: [{text: 'type here',fontsize:16,bold:false,italic:false,underline:false,strike:false,color:"#000000" }],
    page:0
  }
]
;

const initialPageData = () => ({
  editor: withReact(createEditor()),
  content: initialValue, // テキスト内容
});

export default function Post() {
  //Slateで書かれたもののデコレーションや保存
  const [editor,setEditor] = useState(() => withReact(createEditor()));
  //title
  const [title, setTitle] = useState("");
  //テキストの色
  const [color, setColor] = useState("black");
  //テキストの大きさ
  const [fontsize, setFontsize] = useState(100);
  //ページエディターはそれぞれ別々にしている
  const [page,setPage] = useState<Array<{ editor: ReactEditor; content: Descendant[] }>>();
  //気分のアイコン
  const [feelIcons, setFeelIcons] = useState([
    { id: 1, isColor: true, white: white_feel_icons[0], color: color_feel_icons[0] },
    { id: 2, isColor: false, white: white_feel_icons[1], color: color_feel_icons[1] },
    { id: 3, isColor: false, white: white_feel_icons[2], color: color_feel_icons[2] },
    { id: 4, isColor: false, white: white_feel_icons[3], color: color_feel_icons[3] },
    { id: 5, isColor: false, white: white_feel_icons[4], color: color_feel_icons[4] },
  ]);
  //テキストデコレーションの色
  const text_colors = [
    { color: "#000000", name: "黒色", },
    { color: "#9ca3af", name: "灰色", },
    { color: "#b8a193", name: "茶色", },
    { color: "#fb923c", name: "オレンジ色", },
    { color: "#facc15", name: "黄色", },
    { color: "#86efac", name: "緑色", },
    { color: "#93c5fd", name: "青色", },
    { color: "#c084fc", name: "紫色", },
    { color: "#f472b6", name: "ピンク色", },
    { color: "#f87171", name: "赤色", },
  ]
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

  const toggleFeelIcon = (id: number) => {
    //押されたアイコンのURL
    feelIcons.forEach(i => i.isColor = false);
    setFeelIcons((prev) =>
      prev.map((feel) =>
        feel.id === id
          ? { ...feel, isColor: !feel.isColor }
          : feel
      )
    );

  }

  let initialLoad = false;
  useEffect(()=>{
    //localstorageに保存されているpageの取得
    console.log("loaded");
    if(initialLoad)return;
    let list:Array<{editor:ReactEditor,content:Descendant[]}> = []; 
    for(let i = 0; i < localStorage.length;i++){
      const content = localStorage.getItem(`page${i+1}`);
      if(content){
        list.push({editor:withReact(createEditor()),content:JSON.parse(content)});
      }
    }
    setPage(list);
    initialLoad = true;
  },[])

  const showColorPicker = () => {
    document.getElementById("color_picker")?.classList.toggle("hidden");
  }

  const dragOver = (e: React.DragEvent) => {
    e.preventDefault();
    const parent: HTMLElement = e.target as HTMLElement;
    const { id } = parent;
    if (id != "content") return;
    parent.style.backgroundColor = "black";

  }
  const dragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    const parent: HTMLElement = e.target as HTMLElement;
    const { id } = parent;
    if (id != "content") return;
    parent.style.border = "";
  }
  const drop = (e: React.DragEvent<HTMLDivElement>) => {
    const parent: HTMLElement = e.target as HTMLElement;
    const id = localStorage.getItem("id");
    console.log("droped")
    if (!id) return;
    if (id === "image_add") {
      const element = document.getElementById(id);
      if (!element) return;
      const clone: HTMLElement = element.cloneNode(true) as HTMLElement;
      addImage(parent, clone);
    } else {
      addPage();
    }
  }

  const addImage = (parent: HTMLElement, clone: HTMLElement) => {
    if(!(parent.classList.contains("SlateParent")))return;
    clone.classList.remove("w-[80%]");
    clone.classList.add("w-1/4");
    parent.appendChild(clone);
  }

  const addPage = () => {
    if(page)setPage([...page,initialPageData()]); 
  }

  const toggleHoverText = (e: React.MouseEvent, color_text: string) => {
    const hover_text: HTMLElement = document.getElementById("hover_text") as HTMLElement;
    if (!hover_text) return;
    const target: HTMLElement = e.target as HTMLElement;
    const parent = target.parentNode;
    if (!parent) return;
    hover_text.classList.toggle("hidden");
    if (hover_text.classList.contains("hidden")) return;
    hover_text.innerText = color_text + "のテキスト";
    parent?.appendChild(hover_text);
  }

  //contentの選択時
  useEffect(() => {
    const text_navis = document.getElementById("text_navis");
    text_navis?.classList.add("hidden");
    let isSelecting = false;
    let isKeyup = false;
    document.addEventListener("selectionchange", () => {
      const selection = window.getSelection();
      if (!selection) { isSelecting = false; return; }
      if (!selection.isCollapsed) {
        isSelecting = true;
      } else {
        isSelecting = false;
      }
    });

    document.addEventListener("mouseup", () => {
      if (isSelecting) {
        isKeyup = true;
      }
      setTimeout(() => { isKeyup = false; }, 100)
    });
    // マウス移動時のイベントを監視
    document.addEventListener('mousemove', (event) => {
      if (!text_navis) return;
      if (!isKeyup && !isSelecting) {
        text_navis.classList.add("hidden");
      } else if (isKeyup) {
        text_navis.classList.remove("hidden");
        const mouseX = event.clientX; // マウスのX座標
        const mouseY = event.clientY; // マウスのY座標
        
        // ツールチップをマウスカーソル付近に配置
        text_navis.style.left = `${mouseX }px`;
        text_navis.style.top = `${mouseY - 50}px`;
      }
    });
  }, []);



  //動的に変更されるスタイルの更新
  useEffect(() => {
    CustomEditor.setFontSizeMark(editor);
  }, [fontsize])
  useEffect(() => {
    CustomEditor.setColorMark(editor);
  }, [color]);

  useEffect(() => {
    console.log(page);
  }, [page]);


  // 右側の処理
  //投稿を押すと
  const test = () =>{
    const context:any[] = [];
    console.log(page);
    page?.forEach((p,i)=>{
      console.log(i);
      p.content.map((c)=>{
        let content = c as CustomElement;
        content = {...content,page:i+1};
        context.push(content);
      })
    });
    console.log(context);
    //[{type:"paragraph",children:[{bold: true, color: '#c084fc', fontsize: '24', text: 'public '},{bold:true,text:"test"},{bold:true,text:"test"}]},{type:"paragraph",children:[{bold:true,text:"test"}]}]
    CreatePost(title,"満足",context,13178326,"処理中","123asd");

  }

  const dragStart = (e:any) => {
    e.dataTransfer.effectAllowed = "move";
    const {id} = e.target;
    localStorage.setItem("id",id);
}
  return (
    <div id="body" className='flex relative'>
      <LeftNavigation />
      <div id="post_body" onDrop={(e) => drop(e)} onDragOver={e => dragOver(e)} onDragLeave={e => dragLeave(e)} className='w-[60%] h-screen overflow-y-auto hidden-scrollbar flex flex-col items-center relative'>
        <Header/>
        <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)} className='text-4xl outline-none m-5 mt-10' placeholder='今日のハイライト' />
        <div className='flex flex-col bg-[#DDD4CF] w-[70%] h-[30%] rounded-xl p-6 place-items-center'>
          <span className='text-left w-full'>今、どんな気分?</span>
          <div className='grid grid-cols-5 gap-10 m-5'>
            {feelIcons.map((icon, i) => (
              <div key={i}>
                <button onClick={() => { toggleFeelIcon(icon.id) }}><Image src={icon.isColor ? icon.color : icon.white} alt="feel icon" className='w-full h-full' /></button>
              </div>
            ))}
          </div>
        </div>
        {/* テキスト入力欄 */}
        {
          page?.map((p,i)=>(
            <div className='SlateParent object-cover w-full h-96 flex flex-col items-center' key={i}>
              <Slate
                editor={p.editor}
                initialValue={p.content}
                onChange={(value) => {
                  const isAstChange = editor.operations.some(
                    op => 'set_selection' !== op.type
                  )
                  if (isAstChange) {
                    // Save the value to Local Storage.
                    const v = value as CustomElement[];
                    if(v[0].children[0].text == ""){localStorage.removeItem(`page${i+1}`);return}
                    const content = JSON.stringify(value);
                    localStorage.setItem(`page${i+1}`, content);
                    console.log(value);
                    setPage(prevPages => {
                      // 重複を避け、最新のページ内容を追加
                      const newPages = [...prevPages as { editor: ReactEditor; content: Descendant[]; }[]];
                      newPages[i].content = value; // 特定のインデックスのページを更新
                      return newPages;
                    });
                  }
                }}
              >
                {i>0?(<div className='flex object-cover w-full items-center'>
                        <hr className="object-cover w-1/2 h-2 bg-[#DDD4CF] rounded-lg mx-12  "/>
                        <p className="px-3">
                          page{i+1}
                        </p>
                        <hr className="object-cover w-1/2 h-2 bg-[#DDD4CF] rounded-lg mx-12 "/>
                      </div>):(<></>)}
                <Editable
                  className='w-[80%] m-3'
                  // エディターを押しているものにする
                  onSelect={()=>setEditor(p.editor)}
                  renderElement={renderElement}
                  renderLeaf={renderLeaf}
                />
              </Slate>
            </div>
          ))
        }
      </div>
      {/* 右側 */}
      <div className="bg-[url('img/mokume.png')] bg-repeat-round w-[20%] h-screen relative flex flex-col items-center">
        <div className="flex -ml-8 items-center">
            <Image src={happa} alt="happa" width={50} className="h-full" />
            <p className="text-center m-3 text-xl text-green-300">下書き</p>
        </div>
        <div id="image_add" className="object-cover w-[80%] h-[30%] bg-[#D9D9D9] my-3 rounded-lg flex items-center justify-center relative p-3" draggable="true" onDragStart={e=>dragStart(e)} >
            <Image src={image} alt="image icon" className="object-cover w-[60%]" draggable="false"></Image>
            <Image src={plus} alt="plus icon" className="absolute top-3 left-3 object-cover w-[20%] h-[20%]" draggable="false"></Image>
        </div>
        <div id="page_add" className="object-cover w-[80%] h-[30%] bg-[#D9D9D9] mt-3 rounded-lg flex items-center justify-center relative p-3" draggable="true" onDragStart={e=>dragStart(e)}>
            <Image src={file} alt="file icon" className="object-cover w-[60%]" draggable="false"></Image>
            <Image src={plus} alt="plus icon" className="absolute top-3 left-3 object-cover w-[20%] h-[20%]" draggable="false"></Image>
        </div>
        <button className="bg-[#B8A193] rounded-lg text-white w-[40%] p-3 text-2xl my-5" onClick={test}>
            投稿
        </button>
    </div>
      {/* テキストデコレーション */}
      <div id="text_navis" className='flex justify-between p-1 w-52 absolute top-3 z-10 bg-[#DDD4CF] rounded-lg'>
        <select name="font-size" id="" className='outline-none bg-transparent'
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
        <button onClick={() => { showColorPicker() }} className='relative'>
          A
          <div id="color_picker" className='hidden flex flex-col absolute top-5 left-0 object-cover w-28 border border-black rounded-lg '>
            <div className='grid grid-cols-5 grid-rows-2  hover:cursor-pointer'>
              {
                text_colors.map((text_color, i) => (
                  <div key={i}
                    onMouseEnter={(e) => { toggleHoverText(e, text_color.name) }}
                    onMouseLeave={(e) => { toggleHoverText(e, text_color.name) }}
                    onClick={() => { setColor(text_color.color); CustomEditor.setColorMark(editor); }}
                    className='relative'>
                    <p style={{ color: text_color.color }}>A</p>
                  </div>
                ))
              }

            </div>
          </div>
        </button>

      </div>
      <p id="hover_text" className='bg-black text-white rounded-lg absolute -top-5 -left-10 hidden w-36 text-nowrap '></p>
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