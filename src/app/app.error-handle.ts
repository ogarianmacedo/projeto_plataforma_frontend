import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class AppErrorHandle extends ErrorHandler {

    constructor(
        private injector: Injector
    ) {
        super();
    }

    handleError(errorResponse: HttpErrorResponse | any) {
        if (errorResponse instanceof HttpErrorResponse) {
            if (errorResponse.error.status === 'Token is Invalid') {
                this.redirecionaLogin();
            }

            if (errorResponse.error.status === 'Token is Expired') {
                this.redirecionaLogin();
            }

            if (errorResponse.error.status === 'Authorization Token not found') {
              this.redirecionaLogin();
            }

            if (errorResponse.status === 400 || errorResponse.status === 401) {
                this.redirecionaLogin();
            }
        }

        super.handleError(errorResponse);
    }

    redirecionaLogin(): void {
        window.location.reload();
        const router = this.injector.get(Router);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        router.navigate(['auth/login']);
    }
}
