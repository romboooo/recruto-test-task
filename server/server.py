from fastapi import FastAPI,Query,HTTPException

ERROR_MESSAGE = "Params name and msg are invalid"

app = FastAPI()  

def isParamsValid(name,msg) -> bool:
    return not (name == "" or msg == "") 

@app.get('/api')
async def hello(name: str = Query("Recruto"),
                msg: str = Query("Давай дружить")):
    if isParamsValid(name,msg):
        return f"Hello, {name}! {msg}!"
    else:
        raise HTTPException(400,ERROR_MESSAGE)