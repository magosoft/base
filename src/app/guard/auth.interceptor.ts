import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = sessionStorage.getItem('auth-token');
  if (token) {
    const reqClone = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`),
    });
    return next(reqClone);
  } else {
    return next(req);
  }
};
