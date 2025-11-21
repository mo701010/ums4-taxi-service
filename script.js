// 🌍 Toon huidige locatie met de Geolocation API
document.getElementById('locatieBtn').addEventListener('click', () => {
  navigator.geolocation.getCurrentPosition(
    pos => {
      const { latitude, longitude } = pos.coords;
      document.getElementById('locatie').innerText =
        `Je bent hier: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
    },
    err => {
      document.getElementById('locatie').innerText = 'Locatie niet beschikbaar: ' + err.message;
    }
  );
});

// 🌤 Weer API (Open-Meteo, gratis & zonder sleutel)
document.getElementById('weerBtn').addEventListener('click', () => {
  navigator.geolocation.getCurrentPosition(pos => {
    const lat = pos.coords.latitude;
    const lon = pos.coords.longitude;
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;

    fetch(url)
      .then(res => res.json())
      .then(data => {
        const weather = data.current_weather;
        document.getElementById('weerData').innerHTML =
          `🌡️ Temperatuur: ${weather.temperature}°C<br>💨 Windsnelheid: ${weather.windspeed} km/h`;
      })
      .catch(err => {
        document.getElementById('weerData').innerText = 'Kon weer niet ophalen: ' + err.message;
      });
  });
});
