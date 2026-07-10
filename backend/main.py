from fastapi import FastAPI
from controller import auth_controller
from controller import enderecos_controller

app = FastAPI(title="API Meus Endereços", version="1.0.0")

@app.get("/")
def root():
    return {"mensagem":"API RODANDO COM SUCESSO!!"}

app.include_router(auth_controller.router)
app.include_router(enderecos_controller.router)


