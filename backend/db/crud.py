import json
import os

CAMINHO_DB = os.path.join(os.path.dirname(__file__),"database.json")

def ler_banco():
    
    with open(CAMINHO_DB,"r",encoding="utf-8") as f:
        return json.load(f)

def salvar_banco(dados):
    with open(CAMINHO_DB, "w", encoding="utf-8") as f:
        json.dump(dados, f, indent=4, ensure_ascii=False)
