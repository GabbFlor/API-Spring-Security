import { useEffect, useState } from "react";
import axios from 'axios';


const Home = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/postagens')

        .then(response => {
            if (response.status === 200) {
                setPosts(response.data);
                console.log(posts);
            }
        })
        .catch(error => {
            if (error.response && error.response.status === 403) {
                alert("USUÁRIO NÃO AUTENTICADO")
            } else {
                alert(`Erro interno no servidor: ${error.message}`)
            }
        });
    })

    return (
        <main>
            <h1>Página inicial</h1>
        </main>
    )
}

export default Home;