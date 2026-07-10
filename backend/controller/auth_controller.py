from fastapi import APIRouter, HTTPException, status
from model.schemas import UsuarioCreate, UsuarioLogin, UsuarioResponse
from db.crud import buscar_usuario_por_email, criar_usuario
from middleware.auth import gerar_hash, verificar_senha, gerar_token

router = APIRouter(prefix="/auth", tags=["Autenticação"])

@router.post("/cadastro", response_model=UsuarioResponse, status_code=status.HTTP_201_CREATED)
def cadastrar_usuario(usuario: UsuarioCreate):
    "Rota de cadastro de novo usuario"
    
    usuario_existente = buscar_usuario_por_email(usuario.email)
    if usuario_existente:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Esse email ja esta cadastrado :("
        )
    
    senha_hasheada = gerar_hash(usuario.senha)
    
    novo_usuario = {
        "email": usuario.email,
        "senha_hash": senha_hasheada
    }
    
    usuario_salvo = criar_usuario(novo_usuario)
    
    return usuario_salvo

@router.post("/login")
def realizar_login(usuario: UsuarioLogin):
    "Rota de login de usuarios"
    
    usuario_bd = buscar_usuario_por_email(usuario.email)    
    if not usuario_bd:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Email ou senha incorretos :("
        )
    senha_valida = verificar_senha(usuario.senha, usuario_bd["senha_hash"])
    if not senha_valida:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Email ou senha incorretos :("
        )
        
    dados_token = {"sub": usuario_bd["email"], "id": usuario_bd["id"]}
    token = gerar_token(dados_token)
    
    return {"access_token": token,"token_type":"bearer"}
