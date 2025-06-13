import "./App.css";
import { useEffect, useState } from "react";
interface QueryParams {
  name: string;
  msg: string;
}

const BASE_URL = "https://recruto-test-task.vercel.app";

async function fetchHello(name: string, msg: string) {
  const url = `${BASE_URL}/?name=${encodeURIComponent(
    name
  )}&message=${encodeURIComponent(msg)}`;
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
  const [params, setParams] = useState<QueryParams>({
    name: "Recruto",
    msg: "Давай дружить",
  });

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const name = queryParams.get("name") || "Recruto";
    const msg = queryParams.get("message") || "Давай дружить";

    const getData = async () => {
      try {
        const result = await fetchHello(name, msg);
        setParams({ name, msg });
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
        Hello, {params.name}! {params.msg}!
      </div>
    </>
  );
}

export default App;
