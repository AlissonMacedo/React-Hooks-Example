import React, { useState, useEffect } from 'react';

export default function App(){
  const [repositories, setRepositories] = useState([
    { id: 1, name: 'repo-1' },
    { id: 1, name: 'repo-2' },
    { id: 1, name: 'repo-3' },
    { id: 1, name: 'repo-4' },
  ]);
  const [repositoriesgit, setRepositoriesgit] = useState([])

  const [location, setLocation] = useState([])


  function handleAddRepository() {
    setRepositories([...repositories, { id: Math.random(), name: 'Novo Repo' }]);
  }

  useEffect(async () => {
    const response = await fetch('http://api.github.com/users/AlissonMacedo/repos');
    const data = await response.json();

    setRepositoriesgit(data);

  }, []);


  useEffect(() => {
    const filtered = repositoriesgit.filter(repo => repo.favorite);

    document.title = `Voce temm ${filtered.length} favoritos`


  }, [repositoriesgit]);

  function handleFavorite(id) {
    const newRepositories = repositoriesgit.map(repo => {
      return repo.id === id ? { ...repo, favorite: !repo.favorite } : repo
    });
    setRepositoriesgit(newRepositories);
  }



  useEffect(() => {
    navigator.geolocation.watchPosition(handlePositionReceived)
  }, []);


  function handlePositionReceived({ coords }){
    const { latitude, longitude } = coords;

    setLocation({ latitude, longitude });

  }


  return (
    <>
      <div style={{ flex:1, justifyContent: 'center', alignContent: 'center' }}>
      <div style={{ borderColor: '#000', border: 'solid', padding: 10, marginBottom: 10, background: '#eee' }}>
        <ul>
        {repositories.map(repo => (
          <li key={repo.id}>{repo.name}</li>
        ))}
        </ul>
        <button onClick={handleAddRepository} >
          Adicionar Repositorio
        </button>
      </div>
      <div style={{ borderColor: '#000', border: 'solid', padding: 10, marginBottom: 10, background: '#eee' }}>
        {repositoriesgit.map(repo => (
          <li key={repo.id}>{repo.name}
          {repo.favorite && <span>(Favorito)</span>}
          <button onClick={() =>handleFavorite(repo.id)} >Favoritar</button>
          </li>
        ))}
        
      </div>


      <div style={{ borderColor: '#000', border: 'solid', padding: 10, marginBottom: 10, background: '#eee' }}>
        Latitude: {location.latitude}    <br />
        Longitude: {location.longitude}
      </div>
      </div>
    </>

  )
}


