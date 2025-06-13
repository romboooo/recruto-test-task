import "./App.css";
import { useEffect, useState } from "react";

async function fetchHello(name: string, msg: string) {
  const url = `api/?name=${encodeURIComponent(
    name
  )}&msg=${encodeURIComponent(msg)}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        `Ошибка сервера: ${response.status} ${response.statusText}`
      );
    }
    return await response.text();
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
    throw new Error("Не удалось получить данные с сервера");
  }
}
function App() {
  const [serverResponse, setServerResponse] = useState<string>("");


  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const name = queryParams.get("name") || "Recruto";
    const msg = queryParams.get("message") || "Давай дружить";

    const getData = async () => {
      try {
        const result = await fetchHello(name, msg);
        setServerResponse(result); 
      } catch (error) {
        console.log(
          error instanceof Error ? error.message : "Something went wrong"
        );
      }
    };
    getData();
  }, []);
  return (
    <>
      <div>
        {serverResponse}
      </div>
    </>
  );
}

export default App;
