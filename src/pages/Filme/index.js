import './styles.css';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../services/api';

function Filme() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [filme, setFilme] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        async function loadFilmes() {

            await api.get(`movie/${id}`, {
                params: {
                    api_key: '1630d10fd3e9f35433175201c404dd1a',
                    language: 'pt-BR',
                }
            })
                .then((response) => {
                    setFilme(response.data);
                    setLoading(false);
                })
                .catch(() => {
                    console.log('FILME nao encontrado');
                    navigate('/', { replace: true });
                })
        }

        loadFilmes();

        return () => {
            console.log('Desmontado');
        }

    }, [navigate, id]);

    function salvarFilme() {
        const minhaLista = localStorage.getItem('@primefilx');

        let filmesSalvos = JSON.parse(minhaLista) || [];

        const hasFilme = filmesSalvos.some((filmesSalvos) => filmesSalvos.id === filme.id);

        if (hasFilme) {
            toast.warn("ESSE FILME JÁ ESTA NA LISTA!")
            return;
        }

        filmesSalvos.push(filme);
        localStorage.setItem('@primefilx', JSON.stringify(filmesSalvos));
        toast.success('FILME SALVO COM SUCESSO');
        return;

    }


    if (loading) {
        return (
            <div className='filme-info'>
                <h1>Carregando detalhes...</h1>
            </div>
        )
    }
    return (
        <div className='filme-info'>
            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original${filme.backdrop_path}`} alt={filme.title} />
            <h3>Sinopse</h3>
            <span>{filme.overview}</span>
            <strong>{filme.vote_average} / 10</strong>

            <div className='area-buttons'>
                <button onClick={salvarFilme}>Salvar</button>
                <button><a target='blank' rel='external' href={`https://youtube.com/results?search_query=${filme.title} Trailer`} >Trailer</a></button>
            </div>
        </div>
    );
}

export default Filme;
