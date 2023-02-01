from pydantic import BaseSettings


class Settings(BaseSettings):
    ENV: str = 'dev'
    HOST: str = '0.0.0.0'
    PORT: int = 8000
    # DB_URL: str

    # TOKEN_URL: str
    # SECRET_KEY: str
    # ALGORITHM: str
    # ACCESS_TOKEN_EXPIRE_MINUTES: int

    class Config:
        env_file = "server/.env"


config = Settings()  # type: ignore
