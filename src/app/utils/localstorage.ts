export class LocalStorageUtils {

  public getUser(): any {
    const user = localStorage.getItem('manageproduct.user');
    return user ? JSON.parse(user) : null;
  }

  public saveUserLocalData(response: any): void {
    this.saveUserToken(response.accessToken);
    this.saveUser(response.userToken);
  }

  public clearUserLocalData(): void {
    localStorage.removeItem('manageproduct.token');
    localStorage.removeItem('manageproduct.user');
  }

  public getUserToken(): string | null {
    const token = localStorage.getItem('manageproduct.token');
    return token;
  }

  public saveUserToken(token: string): void {
    localStorage.setItem('manageproduct.token', token);
  }

  public saveUser(user: any): void {
    localStorage.setItem('manageproduct.user', JSON.stringify(user));
  }
}
