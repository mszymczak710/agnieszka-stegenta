import { Injectable } from '@angular/core';

import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ToastService {
  constructor(private toastrService: ToastrService) {}

  private showMessage(type: 'error' | 'success', key: string): void {
    if (type === 'success') {
      this.toastrService.success(key);
    } else {
      this.toastrService.error(key);
    }
  }

  showSuccessMessage(key: string): void {
    this.showMessage('success', key);
  }

  showErrorMessage(key: string): void {
    this.showMessage('error', key);
  }
}
