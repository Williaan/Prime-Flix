import './styles.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';


function Home() {
    const [filmes, setFilmes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        async function loadFilmes() {
            const response = await api.get('movie/now_playing', {
                params: {
                    api_key: '1630d10fd3e9f35433175201c404dd1a',
                    language: 'pt-BR',
                    page: 1
                }

            });

            setFilmes(response.data.results.slice(0, 10));
            setLoading();
        }

        loadFilmes();

    }, []);

    if (loading) {
        return (
            <div className='loading'>
                <h2>Carregando Filmes...</h2>
            </div>
        )
    }

    return (
        <div className='container'>
            <div className='lista-filmes'>
                {filmes.map((filme) => {
                    return (
                        <article key={filme.id}>
                            <strong>{filme.title}</strong>
                            <img src={`https://image.tmdb.org/t/p/original${filme.poster_path}`} alt={filme.title} />
                            <Link to={`/filme/${filme.id}`}>Detalhes</Link>
                        </article>
                    )

                })}
            </div>
        </div>
    );
}

export default Home;
