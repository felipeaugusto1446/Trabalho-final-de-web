import jwt
from datetime import datetime, timedelta, timezone
from passlib.context import CryptContext
from fastapi import HTTPException, Security
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

# geracao do hash das senhas
pwd_context = CryptContext(schemes=["bcrypt"],deprecated="auto")

# Configurações do JWT
SECRET_KEY = "chavesecretasuperseguradoprojetodeweb"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

security = HTTPBearer()

def gerar_hash(senha: str) -> str:
    # recebe a senha normal e volta ela hasheada
    return pwd_context.hash(senha)

def verificar_senha(senha_normal: str, senha_hasheada: str) -> bool:
    # recebe a senha normal e a hasheada e compara elas
    return pwd_context.verify(senha_normal,senha_hasheada)

def gerar_token(dados_usuario: dict):
    "gera o jwt contendo email do usuario e um tempo de expiracao"
    dados_base = dados_usuario.copy()
    tempo_expiracao = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    dados_base.update({"exp":tempo_expiracao})
    
    dados_jwt = jwt.encode(dados_base,SECRET_KEY,ALGORITHM)
    return dados_jwt

def verificar_token(credenciais: HTTPAuthorizationCredentials = Security(security)):
    "aqui fica o middleware de fato, ele intercepta a requisicao, pega o token e verifica se é valido e se não expirou"
    "Se o JWT não foi válido ou tiver expirado, bloqueia o acesso"
    token = credenciais.credentials
    try:
        payload = jwt.decode(token,SECRET_KEY,algorithms=[ALGORITHM])
        return payload
    
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401,detail="Token expirado, faça o login novamente")
    
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401,detail="Token inválido ou faltando")

