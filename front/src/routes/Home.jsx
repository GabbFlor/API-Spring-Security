import { useEffect, useState } from "react";
import axios from 'axios';
import { useHistory } from "react-router-dom";


const Home = () => {
    const [posts, setPosts] = useState([]);
    const history = useHistory();

    useEffect(() => {
        const atualizarPosts = async () => {
            const token = localStorage.getItem("token");

            try {
                const response = await axios.get('http://localhost:8080/postagens', {
                    // headers: {
                    //     Authorization: `Bearer ${token}`
                    // }
                });

                if (response.status === 200) {
                    setPosts(response.data);
                }
            } catch (error) {
                if (error.response && error.response.status === 403) {
                    history.push('/registro');
                } else {
                    alert(`Erro interno no servidor: ${error.message}`);
                }
            }
        };

        atualizarPosts();
    }, [history]);

    return (
        <main>
            <h1>Página inicial</h1>
        </main>
    )
}

export default Home;