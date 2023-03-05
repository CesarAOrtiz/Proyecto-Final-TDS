from os import path
from fastapi import FastAPI, status
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from starlette.exceptions import HTTPException as StarletteHTTPException
from starlette.requests import Request
from utils import ErrorResponse
from router import router
import nltk

# env/nltk_data
# nltk.download('punkt', download_dir='env/nltk_data')
# nltk.download('stopwords', download_dir='env/nltk_data')
# nltk.download('vader_lexicon', download_dir='env/nltk_data')
# nltk_data
# nltk.download('punkt', download_dir='nltk_data')
# nltk.download('stopwords', download_dir='nltk_data')
# nltk.download('vader_lexicon', download_dir='nltk_data')

# if not path.exists('./nltk_data/sentiment/vader_lexicon.zip'):
#     nltk.download('vader_lexicon', './nltk_data')
# if not path.exists('./nltk_data/corpora/stopwords.zip'):
#     nltk.download('stopwords', './nltk_data')
# if not path.exists('./nltk_data/tokenizers/punkt.zip'):
#     nltk.download('punkt', './nltk_data')

# if not path.exists('./env/share/nltk_data/sentiment/vader_lexicon.zip'):
#     nltk.download('vader_lexicon', 'env/nltk_data')

# if not path.exists('./env/share/nltk_data/corpora/stopwords.zip'):
#     nltk.download('stopwords', './nltk_data')

# if not path.exists('./env/share/nltk_data/tokenizers/punkt.zip'):
#     nltk.download('punkt', './nltk_data')

app = FastAPI()


@app.exception_handler(StarletteHTTPException)
async def http_exception_handler(req: Request, exc: StarletteHTTPException) -> JSONResponse:
    response = ErrorResponse(
        success=False, message=exc.detail or "", status_code=exc.status_code)
    return JSONResponse(response.dict(), status_code=exc.status_code)


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(req: Request, exc: RequestValidationError) -> JSONResponse:
    response = ErrorResponse(success=False, message="Error de validación",
                             status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                             data=exc.errors())
    return JSONResponse(response.dict(), status_code=status.HTTP_422_UNPROCESSABLE_ENTITY)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["POST", "GET", "PUT", "DELETE"],
    allow_headers=["*"],
)

app.include_router(router)

app.mount("/", StaticFiles(directory=path.abspath("../client/build").replace("\\",
          "/"), html=True), name="app")
