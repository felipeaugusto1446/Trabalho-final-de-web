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
