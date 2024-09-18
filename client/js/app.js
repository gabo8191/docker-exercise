document.addEventListener('DOMContentLoaded', () => {
  const fetchLetters = () => {
    fetch('http://localhost:4000/api/letters')
      .then(response => {
        if (!response.ok) {
          // Si la respuesta no es exitosa, lanzar un error con el mensaje del backend
          return response.json().then(errorData => {
            throw new Error(errorData.error || 'Error desconocido');
          });
        }
        return response.json();
      })
      .then(data => {
        document.getElementById('letter-8000').textContent = `Letra obtenida: ${data.letter}`;
      })
      .catch(error => {
        console.error('Error desde el middleware:', error);
        document.getElementById('letter-8000').textContent = `Error al cargar la letra: ${error.message}`;
      });
  };

  document.getElementById('fetch-letters-btn').addEventListener('click', fetchLetters);
});
