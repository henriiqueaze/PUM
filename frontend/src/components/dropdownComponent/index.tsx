import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import './style.css'

const DropdownComponent = ({title, content}:{title:string, content:string}) =>{
    const [isOpen, setIsOpen] = useState(false)

    return (
    <div className="dropdown" onClick={() => setIsOpen(!isOpen)}>
        <div className="dropdown-title">
            <h1>{title}</h1>
            {isOpen? <IoIosArrowUp className="dropdronw-icon"/>:<IoIosArrowDown className="dropdronw-icon"/>}
        </div>
        {isOpen && (<div className="faq-answer">
        <p>{content}</p>
        </div>)}
    </div>
    )
}


export default DropdownComponent;