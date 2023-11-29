function buscarTempo() {
  const chaveAPI = "1f2f2d04924f7016dc4931ce924bda3e";
  const idioma = "pt_BR";
  const quantidade = "1";

  const entradaCidade = document.getElementById('cityInput').value;
  const url = `http://api.openweathermap.org/geo/1.0/direct?q=${entradaCidade}&limit=${quantidade}&appid=${chaveAPI}&lang=${idioma}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const resultadosTempo = document.getElementById('resultadosTempo');
      resultadosTempo.innerHTML = ''; 

      if (data.length > 0) {
        const cidade = data[0];
        const latitude = cidade.lat;
        const longitude = cidade.lon;

        const urlTempo = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${chaveAPI}&lang=${idioma}`;

        fetch(urlTempo)
          .then(response => response.json())
          .then(dadosTempo => {
            const resultadoHTML = `
              <h2>Resultados para ${cidade.name}, ${cidade.country}</h2>
              <p>Latitude: ${latitude}</p>
              <p>Longitude: ${longitude}</p>
              <p>Sensação térmica: ${dadosTempo.main.feels_like}</p>
              <p>Descrição: ${dadosTempo.weather[0].description}</p>
            `;
            resultadosTempo.innerHTML = resultadoHTML;
          })
          .catch(error => {
            console.error('Erro na segunda requisição:', error);
          });
      } else {
        resultadosTempo.innerHTML = '<p>Nenhuma cidade com esse nome foi encontrada.</p>';
      }
    })
    .catch(error => {
      console.error('Erro na primeira requisição:', error);
    });
}
