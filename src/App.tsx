import './App.css'
import { useEffect, useState } from 'react'
interface queryParams{
  name: string,
  msg: string
}

function App() {
  const params = useState<queryParams>({
    name: "Recruto",
    msg: "Давай дружить"
  })

  useEffect(() => {
  })
  return <>
  </>
}

export default App
