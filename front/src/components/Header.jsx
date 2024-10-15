import axios from "axios";
import { useEffect, useState } from "react"
import '../styles/Header.css'
import { Link } from "react-router-dom";

const Header = () => {
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
                }
            } catch (error) {
                if (error.response && error.response.status === 403) {
                    console.log("nenhum usuário autenticado")
                } else if (error.response && error.response.status === 404) {
                    console.error("Usuário não encontrado!")
                }
            }
        };

        atualizarProfile();
    }, [])

    return (
        <header className="header">
            <section>
                <Link to={'/'}><h1>Home</h1></Link>
            </section>

            <form action="">
                <input 
                    type="search"
                    placeholder="Pesquisar"
                />
            </form>

            <nav>
                {profile.role == "ADMIN" ? (
                    <ul>
                        <li><Link to={'/add-postagem'}>Adicionar postagem</Link></li>
                        <li><Link to={'/perfil'}>Perfil</Link></li>
                    </ul>
                ) : profile.role == "USER" ? (
                    <ul>
                        <li><Link to={'/perfil'}>Perfil</Link></li>
                    </ul>
                ) : (
                    <ul>
                        <li><Link to={'/login'}>Login</Link></li>
                        <li><Link to={'/registro'}>Registre-se</Link></li>
                    </ul>
                )}
                
            </nav>
        </header>
    )
}

export default Header;