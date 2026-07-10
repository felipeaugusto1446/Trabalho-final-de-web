from fastapi import FastAPI
from controller import auth_controller

app = FastAPI(title="API Meus Endereços", version="1.0.0")

app.include_router(auth_controller.router)

@app.get("/")
def root():
    return {"mensagem":"API RODANDO COM SUCESSO!!"}
