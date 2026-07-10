import json
import os

CAMINHO_DB = os.path.join(os.path.dirname(__file__),"database.json")

def ler_banco():
    
    with open(CAMINHO_DB,"r",encoding="utf-8") as f:
        return json.load(f)

def salvar_banco(dados):
    with open(CAMINHO_DB, "w", encoding="utf-8") as f:
        json.dump(dados, f, indent=4, ensure_ascii=False)

def buscar_usuario_por_email(email:str):
    "busca um usuario pelo email, se não encontrar, retorna null"
    banco = ler_banco()
    for usuario in banco.get("usuarios",[]):
        if usuario["email"]== email:
            return usuario
    return None

def criar_usuario(dados_usuario: dict):
    ""
    banco = ler_banco()
    usuarios = banco.get("usuarios",[])
    
    if not usuarios:
        novo_id = 1
    else:
        novo_id = usuarios[-1]["id"]+1
    
    dados_usuario["id"] = novo_id
    usuarios.append(dados_usuario)
    
    banco["usuarios"] = usuarios
    salvar_banco(banco)
    
    return dados_usuario
