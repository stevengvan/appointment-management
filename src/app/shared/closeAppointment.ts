import { ViewContainerRef } from '@angular/core';

export function closeAppointment(container: ViewContainerRef) {
  document.body.style.overflowY = 'auto';
  container.clear();
}
