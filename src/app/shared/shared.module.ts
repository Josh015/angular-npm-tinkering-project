import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MaterialModule } from './material.module';

@NgModule({
  declarations: [],
  exports: [CommonModule, MaterialModule],
})
export class SharedModule {}
