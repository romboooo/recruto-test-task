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
    const msg = queryParams.get("msg") || "Давай дружить";

    const getData = async () => {
      try {
       let result = await fetchHello(name, msg);
       result = result.replace(/^"|"$/g, '');

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
    <div className="app-container">
      <div className="content">{serverResponse}</div>
      
      <footer className="footer">
        <div className="footer-center">Роман Бурейко</div>
        <div className="footer-center">
          <a 
            href="https://github.com/romboooo" 
            target="_blank" 
            rel="noopener noreferrer"
            className="footer-link"
          >
            Мой гитхаб
          </a>
          <a 
            href="https://github.com/romboooo/recruto-test-task" 
            target="_blank" 
            rel="noopener noreferrer"
            className="footer-link"
          >
            Текущая репа
          </a>
          <a 
            href="https://t.me/romboooo" 
            target="_blank" 
            rel="noopener noreferrer"
            className="footer-link"
          >
            Мой тг
          </a>
          <a 
            href="mailto:romboooo@yandex.ru" 
            className="footer-link"
          >
            Почта
          </a>
        </div>
        <div className="footer-center">2025</div>
      </footer>
    </div>
  );
}

export default App;
