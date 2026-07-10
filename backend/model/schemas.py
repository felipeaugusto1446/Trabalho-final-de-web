from pydantic import BaseModel, EmailStr, Field, model_validator
from typing import Optional

class UsuarioBase(BaseModel):
    # Valida email automaticamente se o formato estiver correto segundo o pydantic
    email: EmailStr

class UsuarioCreate(UsuarioBase):
    senha: str = Field(min_length=4,description="A senha deve ter no mínimo 4 digitos")
    confirmacao_senha: str
    
    @model_validator(mode="after")
    def verifica_senha(self)->"UsuarioCreate":
        if self.senha != self.confirmacao_senha:
            raise ValueError("As duas senhas não coincidem")
        return self

class UsuarioLogin(UsuarioBase):
    senha: str

class UsuarioResponse(UsuarioBase):
    id: int
    
class EnderecoBase(BaseModel):
    cep: str
    rua: str
    bairro: str
    cidade: str
    descricao: str
    numero: str
    
class EnderecoCreate(EnderecoBase):
    pass

class EnderecoUpdate(BaseModel):
    cep: Optional[str] = None
    rua: Optional[str] = None
    bairro: Optional[str] = None
    cidade: Optional[str] = None
    descricao: Optional[str] = None
    numero: Optional[str] = None
    
class EnderecoResponse(EnderecoBase):
    id: int
    usuario_id: int
