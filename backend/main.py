from fastapi import FastAPI
from controller import auth_controller
from controller import enderecos_controller
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="API Meus Endereços", version="1.0.0")


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"], 
)
@app.get("/")
def root():
    return {"mensagem":"API RODANDO COM SUCESSO!!"}

app.include_router(auth_controller.router)
app.include_router(enderecos_controller.router)



