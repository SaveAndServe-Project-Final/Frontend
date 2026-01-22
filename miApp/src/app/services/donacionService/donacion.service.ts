import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of, Subject, throwError } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { Donacion } from '../../models/donacion.model';

@Injectable({
  providedIn: 'root'
})
export class DonacionService {
  private baseUrl = 'http://localhost:9000';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse, operation = 'operation') {
    console.error(`Error en ${operation}:`, error);
    if (error.error instanceof ErrorEvent) {
      console.error('Error del cliente:', error.error.message);
    } else {
      console.error(`Error del servidor (${error.status}):`, error.error);
    }
    // Según el tipo de operación, decidimos si devolver array vacío o throwError
    if (operation.includes('get')) {
      return of([]);
    }
    return throwError(() => new Error(error.error?.message || 'Error en el servidor'));
  }

  getAll(): Observable<Donacion[]> {
    return this.http.get<Donacion[]>(`${this.baseUrl}/donaciones`, this.httpOptions).pipe(
      tap(donaciones => console.log('Total donaciones:', donaciones.length)),
      catchError(error => this.handleError(error, 'getAll'))
    );
  }

  getById(id: number): Observable<Donacion | null> {
    return this.http.get<Donacion>(`${this.baseUrl}/donaciones/${id}`, this.httpOptions).pipe(
      tap(donacion => console.log('Donación recuperada:', donacion)),
      catchError(error => {
        this.handleError(error, `getById ${id}`);
        return of(null);
      })
    );
  }

  getBancos(): Observable<any[]> {
    console.log('Solicitando bancos...');
    return this.http.get<any[]>(`${this.baseUrl}/bancos`, this.httpOptions).pipe(
      tap(bancos => console.log('Bancos recuperados:', bancos.length)),
      catchError(error => this.handleError(error, 'getBancos'))
    );
  }

  getTransportes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/transportes`, this.httpOptions).pipe(
      tap(transportes => console.log('Transportes recuperados:', transportes.length)),
      catchError(error => this.handleError(error, 'getTransportes'))
    );
  }

  getAlergenos(): Observable<any[]> {
    console.log('Solicitando alérgenos...');
    return this.http.get<any[]>(`${this.baseUrl}/alergenos`, this.httpOptions).pipe(
      tap(alergenos => {
        console.log('Alérgenos recibidos:', alergenos);
      }),
      catchError(error => {
        console.error('Error al obtener alérgenos:', error);
        return of([]); // Retorna array vacío en caso de error
      })
    );
  }

  getDonacionesByEmpresa(empresaId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/donaciones/empresa/${empresaId}`, this.httpOptions).pipe(
      tap(donaciones => console.log(`Donaciones de empresa ${empresaId}:`, donaciones.length)),
      catchError(error => this.handleError(error, `getDonacionesByEmpresa ${empresaId}`))
    );
  }
  

  getDonacionesByBanco(bancoId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/donaciones/bancos/${bancoId}`, this.httpOptions).pipe(
      tap(donaciones => console.log(`Donaciones de banco ${bancoId}:`, donaciones.length)),
      catchError(error => this.handleError(error, `getDonacionesByBanco ${bancoId}`))
    );
  }

  // createDonacion(donacion: any): Observable<any> {
  //   console.log('Enviando donación:', donacion);
  //   return this.http.post(`${this.baseUrl}/donaciones`, donacion, this.httpOptions).pipe(
  //     tap(response => console.log('Donación creada exitosamente:', response)),
  //     catchError(error => {
  //       console.error('Error al crear donación:', error);
  //       return throwError(() => new Error('No se pudo crear la donación. Por favor, inténtelo de nuevo.'));
  //     })
  //   );
  // }
   private donacionActualizadaSource = new Subject<void>();
  donacionActualizada$ = this.donacionActualizadaSource.asObservable();
   notifyDonacionActualizada() {
    this.donacionActualizadaSource.next();
  }

  createDonacion(donacion: any): Observable<any> {
    console.log('Enviando donación:', donacion);
    return this.http.post(`${this.baseUrl}/donaciones`, donacion, this.httpOptions).pipe(
      tap(response => {
        console.log('Donación creada exitosamente:', response);
        this.notifyDonacionActualizada();  // Avisar que hay una donación nueva
      }),
      catchError(error => {
        console.error('Error al crear donación:', error);
        return throwError(() => new Error('No se pudo crear la donación. Por favor, inténtelo de nuevo.'));
      })
    );
  }

  update(id: number, donacion: Donacion): Observable<Donacion | null> {
    return this.http.put<Donacion>(`${this.baseUrl}/donaciones/${id}`, donacion, this.httpOptions).pipe(
      tap(updated => console.log('Donación actualizada:', updated)),
      catchError(error => {
        this.handleError(error, `update ${id}`);
        return of(null);
      })
    );
  }

  delete(id: number): Observable<boolean> {
    return this.http.delete<void>(`${this.baseUrl}/donaciones/${id}`, this.httpOptions).pipe(
      map(() => true),
      catchError(error => {
        this.handleError(error, `delete ${id}`);
        return of(false);
      })
    );
  }

  // getDonacionesByEmpresa(empresaId: number): Observable<any[]> {
  //   return this.http.get<any[]>(`${this.baseUrl}/empresa/${empresaId}`);
  // }
// donacion.service.ts
// getDonacionesByEmpresa(empresaId: number): Observable<any[]> {
//   // Usar la URL completa de tu endpoint
//   return this.http.get<any[]>(`${this.baseUrl}/donaciones/empresa/${empresaId}`);
// }

updateEstadoDonacion(id: number, nuevoEstado: string): Observable<Donacion> {
  // Aquí enviamos la solicitud PUT con el nuevo estado
  return this.http.put<Donacion>(`${this.baseUrl}/${id}`, { estadoEnvio: nuevoEstado }).pipe(
    tap(response => console.log('Estado de donación actualizado:', response)),
    catchError(error => {
      console.error('Error al actualizar el estado de la donación:', error);
      return throwError(() => error);
    })
  );
}
// }

}