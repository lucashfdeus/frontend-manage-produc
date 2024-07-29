import { LocalStorageUtils } from './../utils/localstorage';
import { HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { throwError } from "rxjs";
import { environment } from 'src/environments/environment.development';

interface CustomErrorResponse {
  error: {
    errors: string[];
  };
}

export abstract class BaseService {

  public LocalStorage = new LocalStorageUtils();

  protected UrlServiceV1: string = environment.apiUrlv1;

  protected GetHeaderJson() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        //'Authorization': `Bearer ${this.LocalStorage.obterTokenUsuario()}`
      })
    };
  }

  protected extractData(response: any) {
    return response.data || {};
  }

  protected serviceError(response: HttpErrorResponse): any {
    const customError: string[] = [];
    const customResponse: CustomErrorResponse = { error: { errors: [] } };

    if (response instanceof HttpErrorResponse) {
      if (response.status === 500) {
        customError.push("Ocorreu um erro no processamento, tente novamente mais tarde ou contate o nosso suporte.");
      } else if (response.statusText === "Unknown Error") {
        customError.push("Ocorreu um erro desconhecido");
      } else {
        customError.push(`Erro: ${response.status} - ${response.statusText}`);
      }
    }

    customResponse.error.errors = customError;

    console.error(response);
    return throwError(response);
  }
}
