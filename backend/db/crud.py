import json
import os

CAMINHO_DB = os.path.join(os.path.dirname(__file__),"database.json")

def ler_banco():
    
    with open(CAMINHO_DB,"r",encoding="utf-8") as f:
        try:
            return json.load(f)
        except json.JSONDecodeError:
            return {"usuarios": [], "enderecos": []}
    

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

def criar_endereco(dados_endereco: dict):
    "cria um novo endereco atrelado a um usuario"
    banco = ler_banco
    enderecos = banco.get("enderecos", [])
    
    if not enderecos:
        novo_id = 1
    else:
        novo_id =  enderecos[-1]["id"]+1
    
    dados_endereco["id"] = novo_id
    enderecos.append(dados_endereco)
    
    banco["enderecos"] = enderecos
    salvar_banco(banco)
    return dados_endereco

def listar_enderecos(usuadio_id: int):
    "busca os endereços que pertencem ao usuario logado"
    banco = ler_banco()
    enderecos = banco.get("enderecos",[])
    return [end for end in enderecos if end["usuario_id"] == usuadio_id]

def atualizar_endereco(endereco_id: int, usuario_id: int, dados_atualizados: dict):
    "atualiza um endereço existente, se ele pertence ao usuário logado"
    banco = ler_banco()
    enderecos = banco.get("enderecos", [])
    
    for i, end in enumerate(enderecos):
        if end["id"] == endereco_id and end["usuario_id"] == usuario_id:
            for chave, valor in dados_atualizados.items():
                if valor is not None:
                    enderecos[i][chave] = valor
                    
            banco["enderecos"] = enderecos
            salvar_banco(banco)
            return enderecos[i]
        
    return None

def deletar_endereco(endereco_id: int, usuario_id: int):
    "remove um endereco se ele pertence ao usuario logado"
    banco = ler_banco()
    enderecos = banco.get("enderecos", [])
    
    for i, end in enumerate(enderecos):
        if end["id"] == endereco_id and end["usuario_id"] == usuario_id:
            endereco_removido = enderecos.pop(i)
            banco["enderecos"] = enderecos
            salvar_banco(banco)
            return endereco_removido
    
    return None
