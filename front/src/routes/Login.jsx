import axios from "axios";
import { useState } from "react";
import '../styles/LoginRegistro.css';
import { Link } from "react-router-dom";

const Login = () => {
    const [nome, setNome] = useState("");
    const [senha, setSenha] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();

        if (nome == "" || senha == "") {
            alert("Preencha todos os campos.")
        } else {
            axios.post('http://localhost:8080/auth/login', {
                login: nome,
                password: senha
            })
            .then(response => {
              if (response.status === 200) {
                    alert(`Bem vindo ${nome}`)

                    const token = response.data.token;

                    // armazena o token no armazenamento local, para que continue armazenado mesmo após fechar o navegador 
                    localStorage.setItem("token", token);

                    // futuramente colocar para redirecionar para a rota "/" aqui
                    window.location.href = '/'

                    setNome("")
                    setSenha("")
                }
            })
            .catch(error => {
                if (error.response && error.response.status === 403) {
                    alert(`Credenciais incorretas`)

                    setNome("")
                    setSenha("")
                } else {
                    alert(`Erro interno no servidor: ${error.message}.`)
                }
            })
        }
    }

    return (
        <main>
            <form action="" className="form registro" onSubmit={handleLogin}>
                <h1>Entrar</h1>

                <div className="div-input">
                    <label htmlFor="name">Nome:</label>
                    <input 
                        type="text" 
                        placeholder="Nome" 
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        required
                        className="form-input"
                    />
                </div>

                <div className="div-input">
                    <label htmlFor="senha">Senha:</label>
                    <input 
                        type="password" 
                        placeholder="Senha"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        required
                        className="form-input"
                    />
                </div>

                <button type="submit" className="btn green">Entrar</button>
                <Link to={'/registro'} className="link">Não tenho uma conta</Link>
            </form>
        </main>
    );
}

export default Login;