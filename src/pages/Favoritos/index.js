import './styles.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify'


function Favoritos() {
    const [filmes, setFilmes] = useState([]);

    useEffect(() => {
        const minhaLista = localStorage.getItem('@primefilx');
        setFilmes(JSON.parse(minhaLista) || []);

    }, []);


    function excluirFilme(id) {
        let filtroFilmes = filmes.filter((item) => {
            return (item.id !== id);

        });
        setFilmes(filtroFilmes);
        localStorage.setItem("@primefilx", JSON.stringify(filtroFilmes));
        toast.success("EXCLUÍDO COM SUCESSO!")

    }

    return (
        <div className='meus-filmes'>
            <h1>Meus Filmes</h1>
            {filmes.length === 0 && <span>Você não possui filmes salvos..</span>}

            <ul>
                {filmes.map((item) => {
                    return (<li key={item.id}>
                        <span>{item.title}</span>

                        <div>
                            <Link to={`/filme/${item.id}`}>Ver detalhes</Link>
                            <button onClick={() => excluirFilme(item.id)} className='btn-delete'>Excluir</button>
                        </div>
                    </li>

                    )
                })}
            </ul>
        </div>
    );
}
export default Favoritos;
