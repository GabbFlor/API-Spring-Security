import { Link } from "react-router-dom"
import '../styles/Add_postagem.css'
import { useEffect, useState } from "react"
import axios from "axios"
import Swal from "sweetalert2"

const Add_postagem = () => {
    const [userInfo, setUserInfo] = useState([])
    const [titulo, setTitulo] = useState("")
    const [conteudo, setConteudo] = useState("")

    useEffect(() => {
        const pegarUserInfo = async () => {
            const token = localStorage.getItem("token");

            try {
                const response = await axios.get('http://localhost:8080/auth/info', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (response.status === 200) {
                    setUserInfo(response.data);

                    if(response.data.role === "USER") {
                        window.location.href = '/'
                    }
                }
            } catch (error) {
                if (error.response && error.response.status === 403) {
                    window.location.href = '/login'
                } else {
                    console.error(`Erro interno no servidor: ${error.message}`)
                }
            }
        };

        pegarUserInfo();
    }, [])

    const handleEnviarPostagem = (e) => {
        e.preventDefault();

        if (titulo == "" || conteudo == "") {
            alert("Preencha todos os campos.")
        } else {
            const token = localStorage.getItem("token");

            axios.post('http://localhost:8080/postagens', 
            {
                nome: userInfo.login,
                titulo: titulo,
                conteudo: conteudo
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
            .then(response => {
                if (response.status === 201) {
                    Swal.fire({
                        icon: "success",
                        title: "Sucesso!",
                        text: "Postagem adicionada!",
                        timer: 1500
                    })
                    .then(() => {
                        setTitulo("")
                        setConteudo("")
                    })
                }
            })
            .catch(error => {
                if (error.response && error.response.status === 403) {
                    Swal.fire({
                        icon: "error",
                        title: "Erro!",
                        text: `Você não tem permissão para enviar postagens!`,
                        timer: 1500
                    })
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Erro!",
                        text: `Erro interno no servidor: ${error.message}`,
                        // timer: 1500
                    })
                }
            })
        }
    }

    return (
        <main>
            <form action="" className="form-add-postagem" onSubmit={handleEnviarPostagem}
            >
                <h1>Adicionar postagem</h1>

                <h1></h1>

                <div className="div-input-add-postagem">
                    <label htmlFor="name">Titulo:</label>
                    <input 
                        type="text" 
                        placeholder="Titulo" 
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                        required
                        className="form-input-add-postagem"
                    />
                </div>

                <div className="div-input-add-postagem">
                    <label htmlFor="senha">Conteudo:</label>
                    <textarea 
                        type="password" 
                        placeholder="Escreva aqui..."
                        value={conteudo}
                        onChange={(e) => setConteudo(e.target.value)}
                        required
                        className="form-textarea-add-postagem"
                    />
                </div>

                <button type="submit" className="btn green">Enviar</button>
            </form>
        </main>
    )
}

export default Add_postagem