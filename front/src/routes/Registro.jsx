import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import '../styles/LoginRegistro.css';
import Swal from "sweetalert2";

const Registro = () => {
    const [nome, setNome] = useState("");
    const [senha, setSenha] = useState("");
    const [role, setRole] = useState("USER");

    const handleRegistro = (e) => {
        e.preventDefault(); // Evita o comportamento padrão do formulário

        if (nome == "" || senha == "") {
            alert("Preencha todos os campos.")
        } else {
            axios.post('http://localhost:8080/auth/registro', {
                login: nome,
                password: senha,
                role: role
            })
            .then(response => {
                if (response.status === 200) {
                    Swal.fire({
                        icon: "success",
                        title: "Sucesso",
                        text: `O usuário com o nome "${nome}" foi criado com sucesso!`,
                        timer: 1500
                    })
                    .then(() => {
                        const token = response.data.token;

                        // armazena o token no armazenamento local, para que continue armazenado mesmo após fechar o navegador 
                        localStorage.setItem("token", token);

                        // futuramente colocar para redirecionar para a rota "/" aqui
                        window.location.href = '/'
                    })
                }
            })
            .catch(error => {
                if (error.response && error.response.status === 409) {
                    Swal.fire({
                        icon: "error",
                        title: "Erro",
                        text: `Já existe um usuário com esse nome, tente outro.`,
                        timer: 1500
                    })

                    setNome("")
                    setSenha("")
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Erro",
                        text: `Erro interno no servidor: ${error.message}`,
                        timer: 1500
                    })
                }
            })
        }
    };

    return (
        <main>
            <form action="" className="form registro" onSubmit={handleRegistro}>
                <h1>Registrar conta</h1>

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

                <div>
                    <select 
                        htmlFor="Autoridade"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="select-role"
                    >
                        <option value="USER">User</option>
                        <option value="ADMIN">Admin</option>
                    </select>
                </div>

                <button type="submit" className="btn green">Registrar</button>
                <Link to={"/login"} className="link">Já tenho login</Link>
            </form>
        </main>
    );
};

export default Registro;
