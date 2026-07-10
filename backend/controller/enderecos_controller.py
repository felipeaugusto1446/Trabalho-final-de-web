from fastapi import APIRouter, Depends, HTTPException, status
from typing import List
from model.schemas import (
    EnderecoCreate, 
    EnderecoUpdate, 
    EnderecoResponse,
)

from db.crud import(
    criar_endereco,
    listar_enderecos,
    atualizar_endereco,
    deletar_endereco,
)
from middleware.auth import verificar_token

router = APIRouter(prefix="/enderecos", tags=["Endereços"])

@router.post("/", response_model=EnderecoResponse, status_code=status.HTTP_201_CREATED)
def adicionar_endereco(endereco: EnderecoCreate, usuario_logado: dict = Depends(verificar_token)):
    "Rota privada que adiciona um novo endereço após verificar se o usuario está realmente logado"
    
    dados = endereco.model_dump()
    
    dados["usuario_id"] = usuario_logado["id"]
    
    return criar_endereco(dados)

@router.get("/",response_model=list[EnderecoResponse])
def listar_meus_enderecos(usuario_logado: dict = Depends(verificar_token)):
    "Rota privada que lista os enderecos de um usuario logado"
    
    return listar_enderecos(usuario_logado["id"])

@router.put("/{endereço_id}",response_model=EnderecoResponse)
def editar_endereco(endereco_id: int, endereco: EnderecoUpdate, usuario_logado: dict = Depends(verificar_token)):
    "Rota privada que edita os dados de um endereço existente"
    
    dados_atualizados = endereco.model_dump(exclude_unset=True)
    
    endereco_salvo = atualizar_endereco(endereco_id, usuario_logado["id"], dados_atualizados)
    if not endereco_salvo:
        raise HTTPException(status_code=404, detail="Endereço não encontrado")
    
    return endereco_salvo

@router.delete("/{endereco_id}")
def remover_endereco(endereco_id: int, usuario_logado: dict = Depends(verificar_token)):
    "Rota privada que deleta um endereço"
    
    endereco_removido = deletar_endereco(endereco_id, usuario_id=["id"])
    
    if not endereco_removido:
        raise HTTPException(status_code=404, detail="Endereço não encontrado")
    
    return {"mensagem":"Endereço removido com sucesso :)"}
