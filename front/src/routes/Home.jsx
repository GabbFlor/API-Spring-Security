import { useEffect, useState } from "react";
import axios from 'axios';
import '../styles/Home.css'
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const Home = () => {
    const [userInfo, setUserInfo] = useState([])
    const [posts, setPosts] = useState([]);

    const atualizarPosts = async () => {
        const token = localStorage.getItem("token");

        try {
            const response = await axios.get('http://localhost:8080/postagens', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.status === 200) {
                setPosts(response.data);

                console.log("Posts resgatados.")
            }
        } catch (error) {
            if (error.response && error.response.status === 403) {
                window.location.href = '/login'
            } else {
                console.error(`Erro interno no servidor: ${error.message}`);
            }
        }
    };

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
            }
        } catch (error) {
            console.error(`Erro interno no servidor: ${error.message}`)
        }
    };
    
    useEffect(() => {
        pegarUserInfo();
        atualizarPosts();
    }, []);

    const handleDelete = (id) => {
        Swal.fire({
            title: "Você tem certeza?",
            text: "Não será possível restaurar a mensagem após isso.",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sim, deletar",
            denyButtonText: "Cancelar"
        })
        .then((result) => {
            if (result.isConfirmed) {
                const token = localStorage.getItem("token");
                axios.delete(`http://localhost:8080/postagens/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                .then(response => {
                    if (response.status === 200) {
                        Swal.fire({
                            icon: "success",
                            title: "Sucesso!",
                            text: "Post deletado",
                            timer: 1000
                        })
                        .then(() => {
                            atualizarPosts();
                        })
                    }
                })
                .catch(error => {
                    if (error.response && error.response.status === 403) {
                        Swal.fire({
                            icon: "error",
                            title: "Erro!",
                            text: `Você não tem permissão para deletar postagens!`,
                            timer: 1500
                        })
                    } else {
                        Swal.fire({
                            icon: "error",
                            title: "Erro!",
                            text: `Erro interno no servidor: ${error.message}`,
                        })
                    }
                })
            }
        })
    }

    return (
        <main>
            <h1>Página inicial</h1>

            <section className="post-main">
                {posts.map(post => (
                    <section className="post" key={post.id}>
                        <h3><b>Nome: {post.nome}</b></h3>
                        <h3 className="titulo">Título: {post.titulo}</h3>
                        <p className="conteudo">{post.conteudo}</p>

                        {userInfo.role == "ADMIN" ? (
                            <button className="btn red" onClick={() => handleDelete(post.id)}>Deletar</button>
                        ) : (
                            <div></div>
                        )}
                        
                    </section>
                ))}
            </section>
        </main>
    )
}

export default Home;