import axios from "axios";
import { useEffect, useState } from "react"

const Perfil = () => {
    const [profile, setProfile] = useState([]);

    useEffect(() => {
        const atualizarProfile = async () => {
            const token = localStorage.getItem("token");

            try {
                const response = await axios.get('http://localhost:8080/auth/info', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (response.status === 200) {
                    setProfile(response.data);

                    console.log("Informações do usuário resgatadas!")
                }
            } catch (error) {
                if (error.response && error.response.status === 403) {
                    window.location.href = '/login'
                } else if (error.response && error.response.status === 404) {
                    console.log("Usuário não encontrado!")
                }
            }
        };

        atualizarProfile();
    }, [])

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = '/'
    }

    return (
        <main>
            <h1>Página de perfil</h1>

            <p>Bem vindo {profile.login}</p>
            <p>Seu cargo é: {profile.role}</p>

            <section>
                <button onClick={handleLogout} className="btn red">
                    Logout
                </button>
            </section>
        </main>
    )
}

export default Perfil