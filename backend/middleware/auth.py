import jwt
from datetime import datetime
from passlib.context import CryptContext
from fastapi import HTTPException, Security
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

# geracao do hash das senhas
pwd_context = CryptContext(schemes=["bcrypt"],deprecated="auto")

# Configurações do JWT
SECRET_KEY = "chavesecretasuperseguradoprojetodeweb"
ALGORITHM = "HS256"
ACESS_TOKEN_EXPIRE_MINUTES = 60

security = HTTPBearer()


