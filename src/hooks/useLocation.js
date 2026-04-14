import * as Location from "expo-location"; // Modo de localização do Expo
import { useEffect, useState } from "react"; // O Hook de efeitos colaterais, estado e ciclo de vida do React

export default function useLocation() {
  const [coords, setCoords] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    // Efeito colateral para obter a localização
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync(); // Solicita permissão para acessar a localização
      if (status !== "granted") {
        setErrorMsg("Permissão negada para acessar a localização");
        return;
      }

      let location = await Location.getCurrentPositionAsync({}); // Obtém a localização atual
      setCoords({
        latitude: location.coords.latitude, // Define as coordenadas de latitude e longitude
        longitude: location.coords.longitude,
      }); // Atualiza o estado com as coordenadas obtidas
    })(); // Função auto-invoca para obter a localização
  }, []); // O array vazio significa que o efeito só será executado uma vez, quando o componente for montado
  return { coords, errorMsg };
}
