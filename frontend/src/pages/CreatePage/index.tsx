import { useState } from "react";
import "./style.css";

import fipinho from '../../assets/fipinho.png'

const CreatePage = () => {
    const [isCourse, setIsCourse] = useState(true);

    return (
        <section className="create-page-main">
            <section className="lateral-menu"></section>
            <section className="form-content">
                <section className="lateral-canva">
                    <img src={fipinho} alt="" />
                </section>

                {isCourse && (
                    <section className="main-form">
                        <p>Curso</p>
                    </section>
                )}
            </section>
        </section>
    )
}

export default CreatePage;