import { useEffect, useState } from "react";
import axios from 'axios';
import '../styles/Home.css'

const Home = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
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

                    console.log(response.data)
                }
            } catch (error) {
                if (error.response && error.response.status === 403) {
                    window.location.href = '/login'
                } else {
                    alert(`Erro interno no servidor: ${error.message}`);
                }
            }
        };

        atualizarPosts();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = '/'
    }

    return (
        <main>
            <h1><span className="destaque">USUÁRIO AUTHENTICADO!!!!</span></h1>

            <h1>Página inicial</h1>

            <section className="post-main">
                {posts.map(post => (
                    <section className="post" key={post.id}>
                        <h3><b>Nome: {post.nome}</b></h3>
                        <h3 className="titulo">Título: {post.titulo}</h3>
                        <p className="conteudo">{post.conteudo}</p>
                    </section>
                ))}
            </section>

            <section>
                <button onClick={handleLogout} className="btn red">
                    Logout
                </button>
            </section>
        </main>
    )
}

export default Home;